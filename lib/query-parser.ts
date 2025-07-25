import type { QueryCondition, ParsedQuery, JsonItem } from './types'
  
  export class QueryParser {
    private static readonly OPERATORS = [
      ">=",
      "<=",
      "!=",
      "=",
      ">",
      "<",
      "contains",
      "startswith",
      "endswith",
      "includes",
      "exists",
      "not exists",
      "in",
      "not in",
    ]
  
    private static readonly LOGICAL_OPERATORS = ["AND", "OR"]
  
    static parse(queryString: string): ParsedQuery {
      if (!queryString.trim()) {
        return { conditions: [], isValid: true }
      }
  
      try {
        const conditions = this.parseConditions(queryString)
        return { conditions, isValid: true }
      } catch (error) {
        return {
          conditions: [],
          isValid: false,
          error: error instanceof Error ? error.message : "Invalid query syntax",
        }
      }
    }
  
    private static parseConditions(queryString: string): QueryCondition[] {
      const conditions: QueryCondition[] = []
  
      // Split by AND/OR while preserving the operators
      const parts = queryString.split(/\s+(AND|OR)\s+/i)
  
      for (let i = 0; i < parts.length; i += 2) {
        const conditionStr = parts[i].trim()
        const logicalOp = i + 1 < parts.length ? (parts[i + 1].toUpperCase() as "AND" | "OR") : undefined
  
        const condition = this.parseCondition(conditionStr)
        if (logicalOp) {
          condition.logicalOperator = logicalOp
        }
  
        conditions.push(condition)
      }
  
      return conditions
    }
  
    private static parseCondition(conditionStr: string): QueryCondition {
      // Find the operator
      let operator = ""
      let operatorIndex = -1
  
      for (const op of this.OPERATORS) {
        const index = conditionStr.toLowerCase().indexOf(op.toLowerCase())
        if (index !== -1 && (operatorIndex === -1 || index < operatorIndex)) {
          operator = op
          operatorIndex = index
        }
      }
  
      if (operatorIndex === -1) {
        throw new Error(`No valid operator found in condition: ${conditionStr}`)
      }
  
      const property = conditionStr.substring(0, operatorIndex).trim()
      const valueStr = conditionStr.substring(operatorIndex + operator.length).trim()
  
      if (!property) {
        throw new Error(`Property name is required in condition: ${conditionStr}`)
      }
  
      const value = this.parseValue(valueStr, operator)
  
      return { property, operator: operator.toLowerCase(), value }
    }
  
    private static parseValue(valueStr: string, operator: string): unknown {
      if (!valueStr && !["exists", "not exists"].includes(operator.toLowerCase())) {
        throw new Error(`Value is required for operator: ${operator}`)
      }
  
      // Handle array values for 'in' and 'not in' operators
      if (["in", "not in"].includes(operator.toLowerCase())) {
        if (!valueStr.startsWith("[") || !valueStr.endsWith("]")) {
          throw new Error(`Array value required for '${operator}' operator. Use format: [value1, value2, ...]`)
        }
  
        const arrayContent = valueStr.slice(1, -1)
        return arrayContent.split(",").map((v) => this.parseSimpleValue(v.trim()))
      }
  
      return this.parseSimpleValue(valueStr)
    }
  
    private static parseSimpleValue(valueStr: string): unknown {
      if (!valueStr) return null
  
      // Remove quotes if present
      if ((valueStr.startsWith('"') && valueStr.endsWith('"')) || (valueStr.startsWith("'") && valueStr.endsWith("'"))) {
        return valueStr.slice(1, -1)
      }
  
      // Try to parse as number
      const num = Number(valueStr)
      if (!isNaN(num)) {
        return num
      }
  
      // Try to parse as boolean
      if (valueStr.toLowerCase() === "true") return true
      if (valueStr.toLowerCase() === "false") return false
      if (valueStr.toLowerCase() === "null") return null
  
      // Return as string
      return valueStr
    }
  }
  
  export class QueryExecutor {
    static execute(data: JsonItem[], query: ParsedQuery): JsonItem[] {
      if (!query.isValid || query.conditions.length === 0) {
        return data
      }
  
      return data.filter((item) => this.evaluateItem(item, query.conditions))
    }
  
    private static evaluateItem(item: JsonItem, conditions: QueryCondition[]): boolean {
      if (conditions.length === 0) return true
  
      let result = this.evaluateCondition(item, conditions[0])
  
      for (let i = 1; i < conditions.length; i++) {
        const condition = conditions[i - 1]
        const nextResult = this.evaluateCondition(item, conditions[i])
  
        if (condition.logicalOperator === "OR") {
          result = result || nextResult
        } else {
          result = result && nextResult
        }
      }
  
      return result
    }
  
    private static evaluateCondition(item: JsonItem, condition: QueryCondition): boolean {
      const value = this.getNestedValue(item, condition.property)
  
      switch (condition.operator) {
        case "=":
          return value === condition.value
        case "!=":
          return value !== condition.value
        case ">":
          return typeof value === 'number' && typeof condition.value === 'number' && value > condition.value
        case "<":
          return typeof value === 'number' && typeof condition.value === 'number' && value < condition.value
        case ">=":
          return typeof value === 'number' && typeof condition.value === 'number' && value >= condition.value
        case "<=":
          return typeof value === 'number' && typeof condition.value === 'number' && value <= condition.value
        case "contains":
          return typeof value === "string" && value.toLowerCase().includes(String(condition.value).toLowerCase())
        case "startswith":
          return typeof value === "string" && value.toLowerCase().startsWith(String(condition.value).toLowerCase())
        case "endswith":
          return typeof value === "string" && value.toLowerCase().endsWith(String(condition.value).toLowerCase())
        case "includes":
          return (
            Array.isArray(value) &&
            value.some((v) =>
              typeof v === "string" && typeof condition.value === "string"
                ? v.toLowerCase().includes(condition.value.toLowerCase())
                : v === condition.value,
            )
          )
        case "exists":
          return value !== undefined && value !== null
        case "not exists":
          return value === undefined || value === null
        case "in":
          return Array.isArray(condition.value) && condition.value.includes(value)
        case "not in":
          return !Array.isArray(condition.value) || !condition.value.includes(value)
        default:
          return false
      }
    }
  
    private static getNestedValue(obj: JsonItem, path: string): unknown {
      return path.split(".").reduce((current: unknown, key: string) => {
        if (current && typeof current === 'object' && !Array.isArray(current)) {
          return (current as Record<string, unknown>)[key]
        }
        return undefined
      }, obj as unknown)
    }
  }
  