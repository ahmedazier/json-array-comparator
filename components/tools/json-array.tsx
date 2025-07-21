"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, CheckCircle, Plus, Minus, Edit, ArrowUpDown, Filter, Search } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { QueryBuilder } from "./query-builder"
import type { ParsedQuery } from "@/lib/query-parser"

interface ComparisonResult {
  additions: any[]
  deletions: any[]
  modifications: Array<{
    original: any
    modified: any
    differences: string[]
  }>
  identical: any[]
  originalCount: number
  filteredCount: number
  queries: {
    array1: ParsedQuery
    array2: ParsedQuery
  }
}

interface DiffItem {
  type: "addition" | "deletion" | "modification" | "identical"
  item: any
  differences?: string[]
  original?: any
}

export default function Component() {
  const [array1Input, setArray1Input] = useState(`[
  {"id": 1, "name": "Alex Rivera", "age": 28, "city": "Miami", "skills": ["Vue.js", "MongoDB"], "status": "active"},
  {"id": 2, "name": "Zoe Anderson", "age": 31, "city": "Portland", "skills": ["Ruby", "Rails"], "status": "active"},
  {"id": 3, "name": "Kai Zhang", "age": 26, "city": "Austin", "skills": ["Swift", "iOS"], "status": "inactive"},
  {"id": 4, "name": "Maya Patel", "age": 29, "city": "Denver", "skills": ["Kotlin", "Android"], "status": "pending"},
  {"id": 5, "name": "Liam O'Connor", "age": 33, "city": "Boston", "skills": ["C#", ".NET"], "status": "active"}
]`)

  const [array2Input, setArray2Input] = useState(`[
  {"id": 2, "name": "Zoe Anderson", "age": 32, "city": "Portland", "skills": ["Ruby", "Rails", "PostgreSQL"], "status": "active"},
  {"id": 1, "name": "Alex Rivera", "age": 28, "city": "Miami", "skills": ["Vue.js", "MongoDB"], "status": "active"},
  {"id": 4, "name": "Maya Patel", "age": 29, "city": "Denver", "skills": ["Kotlin", "Android"], "status": "active"},
  {"id": 6, "name": "Sofia Rodriguez", "age": 27, "city": "Phoenix", "skills": ["Flutter", "Dart"], "status": "active"},
  {"id": 5, "name": "Liam O'Connor", "age": 34, "city": "Boston", "skills": ["C#", ".NET", "Azure"], "status": "active"}
]`)

  const [sortBy, setSortBy] = useState<string>("id")
  const [error, setError] = useState<string>("")

  // Query states
  const [array1Query, setArray1Query] = useState<ParsedQuery>({ conditions: [], isValid: true })
  const [array2Query, setArray2Query] = useState<ParsedQuery>({ conditions: [], isValid: true })
  const [filteredArray1, setFilteredArray1] = useState<any[]>([])
  const [filteredArray2, setFilteredArray2] = useState<any[]>([])

  const parseJsonArray = (input: string): any[] | null => {
    try {
      const parsed = JSON.parse(input)
      if (!Array.isArray(parsed)) {
        throw new Error("Input must be an array")
      }
      return parsed
    } catch (err) {
      return null
    }
  }

  const sortArray = (array: any[], sortKey: string): any[] => {
    if (sortKey === "none") return [...array]

    return [...array].sort((a, b) => {
      const aVal = getNestedValue(a, sortKey)
      const bVal = getNestedValue(b, sortKey)

      if (aVal === bVal) return 0
      if (aVal == null) return 1
      if (bVal == null) return -1

      if (typeof aVal === "string" && typeof bVal === "string") {
        return aVal.localeCompare(bVal)
      }

      return aVal < bVal ? -1 : 1
    })
  }

  const getNestedValue = (obj: any, path: string): any => {
    return path.split(".").reduce((current, key) => current?.[key], obj)
  }

  const deepEqual = (obj1: any, obj2: any): boolean => {
    if (obj1 === obj2) return true

    if (obj1 == null || obj2 == null) return false

    if (typeof obj1 !== typeof obj2) return false

    if (typeof obj1 !== "object") return obj1 === obj2

    if (Array.isArray(obj1) !== Array.isArray(obj2)) return false

    if (Array.isArray(obj1)) {
      if (obj1.length !== obj2.length) return false
      return obj1.every((item, index) => deepEqual(item, obj2[index]))
    }

    const keys1 = Object.keys(obj1)
    const keys2 = Object.keys(obj2)

    if (keys1.length !== keys2.length) return false

    return keys1.every((key) => keys2.includes(key) && deepEqual(obj1[key], obj2[key]))
  }

  const findDifferences = (obj1: any, obj2: any, path = ""): string[] => {
    const differences: string[] = []

    if (typeof obj1 !== typeof obj2) {
      differences.push(`${path}: type changed from ${typeof obj1} to ${typeof obj2}`)
      return differences
    }

    if (typeof obj1 !== "object" || obj1 === null || obj2 === null) {
      if (obj1 !== obj2) {
        differences.push(`${path}: value changed from ${JSON.stringify(obj1)} to ${JSON.stringify(obj2)}`)
      }
      return differences
    }

    if (Array.isArray(obj1) && Array.isArray(obj2)) {
      if (obj1.length !== obj2.length) {
        differences.push(`${path}: array length changed from ${obj1.length} to ${obj2.length}`)
      }

      const maxLength = Math.max(obj1.length, obj2.length)
      for (let i = 0; i < maxLength; i++) {
        const newPath = `${path}[${i}]`
        if (i >= obj1.length) {
          differences.push(`${newPath}: item added`)
        } else if (i >= obj2.length) {
          differences.push(`${newPath}: item removed`)
        } else {
          differences.push(...findDifferences(obj1[i], obj2[i], newPath))
        }
      }
      return differences
    }

    const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)])

    for (const key of allKeys) {
      const newPath = path ? `${path}.${key}` : key

      if (!(key in obj1)) {
        differences.push(`${newPath}: property added with value ${JSON.stringify(obj2[key])}`)
      } else if (!(key in obj2)) {
        differences.push(`${newPath}: property removed (was ${JSON.stringify(obj1[key])})`)
      } else {
        differences.push(...findDifferences(obj1[key], obj2[key], newPath))
      }
    }

    return differences
  }

  const findMatchingItem = (item: any, array: any[], sortKey: string): any => {
    if (sortKey === "none") {
      return array.find((arrayItem) => deepEqual(item, arrayItem))
    }

    const itemKey = getNestedValue(item, sortKey)
    return array.find((arrayItem) => {
      const arrayItemKey = getNestedValue(arrayItem, sortKey)
      return itemKey === arrayItemKey
    })
  }

  const compareArrays = (
    arr1: any[],
    arr2: any[],
    sortKey: string,
    queries: { array1: ParsedQuery; array2: ParsedQuery },
  ): ComparisonResult => {
    const sorted1 = sortArray(arr1, sortKey)
    const sorted2 = sortArray(arr2, sortKey)

    const result: ComparisonResult = {
      additions: [],
      deletions: [],
      modifications: [],
      identical: [],
      originalCount: arr1.length + arr2.length,
      filteredCount: sorted1.length + sorted2.length,
      queries,
    }

    // Find deletions and modifications
    for (const item1 of sorted1) {
      const matchingItem = findMatchingItem(item1, sorted2, sortKey)

      if (!matchingItem) {
        result.deletions.push(item1)
      } else if (deepEqual(item1, matchingItem)) {
        result.identical.push(item1)
      } else {
        const differences = findDifferences(item1, matchingItem)
        result.modifications.push({
          original: item1,
          modified: matchingItem,
          differences,
        })
      }
    }

    // Find additions
    for (const item2 of sorted2) {
      const matchingItem = findMatchingItem(item2, sorted1, sortKey)
      if (!matchingItem) {
        result.additions.push(item2)
      }
    }

    return result
  }

  const comparisonResult = useMemo(() => {
    setError("")

    const array1 = parseJsonArray(array1Input)
    const array2 = parseJsonArray(array2Input)

    if (!array1) {
      setError("Invalid JSON in Array 1")
      return null
    }

    if (!array2) {
      setError("Invalid JSON in Array 2")
      return null
    }

    // Use filtered arrays if queries are applied, otherwise use original arrays
    const dataToCompare1 = array1Query.conditions.length > 0 ? filteredArray1 : array1
    const dataToCompare2 = array2Query.conditions.length > 0 ? filteredArray2 : array2

    return compareArrays(dataToCompare1, dataToCompare2, sortBy, {
      array1: array1Query,
      array2: array2Query,
    })
  }, [array1Input, array2Input, sortBy, filteredArray1, filteredArray2, array1Query, array2Query])

  const getSortKeys = (): string[] => {
    const array1 = parseJsonArray(array1Input)
    if (!array1 || array1.length === 0) return ["none"]

    const keys = new Set<string>()
    keys.add("none")

    const extractKeys = (obj: any, prefix = "") => {
      if (typeof obj === "object" && obj !== null && !Array.isArray(obj)) {
        Object.keys(obj).forEach((key) => {
          const fullKey = prefix ? `${prefix}.${key}` : key
          if (typeof obj[key] !== "object" || obj[key] === null) {
            keys.add(fullKey)
          } else if (!Array.isArray(obj[key])) {
            extractKeys(obj[key], fullKey)
          }
        })
      }
    }

    array1.forEach((item) => extractKeys(item))
    return Array.from(keys)
  }

  const formatJson = (obj: any): string => {
    return JSON.stringify(obj, null, 2)
  }

  const getDiffItems = (): DiffItem[] => {
    if (!comparisonResult) return []

    const items: DiffItem[] = []

    comparisonResult.deletions.forEach((item) => {
      items.push({ type: "deletion", item })
    })

    comparisonResult.additions.forEach((item) => {
      items.push({ type: "addition", item })
    })

    comparisonResult.modifications.forEach((mod) => {
      items.push({
        type: "modification",
        item: mod.modified,
        differences: mod.differences,
        original: mod.original,
      })
    })

    comparisonResult.identical.forEach((item) => {
      items.push({ type: "identical", item })
    })

    return items
  }

  const formatQueryConditions = (query: ParsedQuery): string => {
    if (!query.isValid || query.conditions.length === 0) {
      return "No filter applied"
    }

    return query.conditions
      .map((condition, index) => {
        const conditionStr = `${condition.property} ${condition.operator} ${
          Array.isArray(condition.value) ? `[${condition.value.join(", ")}]` : JSON.stringify(condition.value)
        }`

        return index > 0 && query.conditions[index - 1].logicalOperator
          ? `${query.conditions[index - 1].logicalOperator} ${conditionStr}`
          : conditionStr
      })
      .join(" ")
  }

  // Initialize filtered arrays with original data
  const originalArray1 = parseJsonArray(array1Input) || []
  const originalArray2 = parseJsonArray(array2Input) || []

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowUpDown className="w-5 h-5" />
            JSON Array Comparator with Query Filtering
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="array1">Array 1 (JSON)</Label>
              <Textarea
                id="array1"
                value={array1Input}
                onChange={(e) => setArray1Input(e.target.value)}
                className="font-mono text-sm min-h-[200px]"
                placeholder="Enter first JSON array..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="array2">Array 2 (JSON)</Label>
              <Textarea
                id="array2"
                value={array2Input}
                onChange={(e) => setArray2Input(e.target.value)}
                className="font-mono text-sm min-h-[200px]"
                placeholder="Enter second JSON array..."
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="space-y-2">
              <Label>Sort By</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {getSortKeys().map((key) => (
                    <SelectItem key={key} value={key}>
                      {key === "none" ? "No sorting" : key}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Query Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Query Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <QueryBuilder
              data={originalArray1}
              onQueryChange={(query, filtered) => {
                setArray1Query(query)
                setFilteredArray1(filtered)
              }}
              label="Array 1 Filter"
              placeholder="e.g., age > 25 AND status = 'active'"
            />
            <QueryBuilder
              data={originalArray2}
              onQueryChange={(query, filtered) => {
                setArray2Query(query)
                setFilteredArray2(filtered)
              }}
              label="Array 2 Filter"
              placeholder="e.g., city contains 'New' OR skills includes 'React'"
            />
          </div>
        </CardContent>
      </Card>

      {comparisonResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 mb-4">
              <Search className="w-5 h-5" />
              Filtered Comparison Results
            </CardTitle>
            <div className="space-y-2">
              <div className="flex flex-col gap-4 text-sm mb-4 md:flex-row">
                <Badge variant="destructive" className="flex items-center gap-1">
                  <Minus className="w-3 h-3" />
                  {comparisonResult.deletions.length} Deletions
                </Badge>
                <Badge variant="default" className="flex items-center gap-1 bg-green-500">
                  <Plus className="w-3 h-3" />
                  {comparisonResult.additions.length} Additions
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Edit className="w-3 h-3" />
                  {comparisonResult.modifications.length} Modifications
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  {comparisonResult.identical.length} Identical
                </Badge>
              </div>

              {/* Query Information */}
              <div className="text-xs text-muted-foreground space-y-1">
                <div>
                  <strong>Array 1 Query:</strong> {formatQueryConditions(comparisonResult.queries.array1)}
                </div>
                <div>
                  <strong>Array 2 Query:</strong> {formatQueryConditions(comparisonResult.queries.array2)}
                </div>
                <div>
                  <strong>Sort Key:</strong> {sortBy === "none" ? "No sorting" : sortBy}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="detailed">Detailed View</TabsTrigger>
                <TabsTrigger value="side-by-side">Side by Side</TabsTrigger>
                <TabsTrigger value="report">Report</TabsTrigger>
              </TabsList>

              <TabsContent value="summary" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="border-red-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-red-600 flex items-center gap-1">
                        <Minus className="w-4 h-4" />
                        Deletions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-red-600">{comparisonResult.deletions.length}</div>
                      <p className="text-xs text-muted-foreground">Items removed from Array 1</p>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-green-600 flex items-center gap-1">
                        <Plus className="w-4 h-4" />
                        Additions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">{comparisonResult.additions.length}</div>
                      <p className="text-xs text-muted-foreground">New items in Array 2</p>
                    </CardContent>
                  </Card>

                  <Card className="border-yellow-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-yellow-600 flex items-center gap-1">
                        <Edit className="w-4 h-4" />
                        Modifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-yellow-600">{comparisonResult.modifications.length}</div>
                      <p className="text-xs text-muted-foreground">Items with changes</p>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-blue-600 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        Identical
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-600">{comparisonResult.identical.length}</div>
                      <p className="text-xs text-muted-foreground">Unchanged items</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Filter Summary */}
                <Card className="bg-muted/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Filter Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs space-y-1">
                    <div>
                      <strong>Array 1:</strong> {filteredArray1.length || originalArray1.length} items
                      {array1Query.conditions.length > 0 && ` (filtered from ${originalArray1.length})`}
                    </div>
                    <div>
                      <strong>Array 2:</strong> {filteredArray2.length || originalArray2.length} items
                      {array2Query.conditions.length > 0 && ` (filtered from ${originalArray2.length})`}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="detailed" className="space-y-4">
                <div className="space-y-4">
                  {getDiffItems().map((diffItem, index) => (
                    <Card
                      key={index}
                      className={`border-l-4 ${
                        diffItem.type === "deletion"
                          ? "border-l-red-500"
                          : diffItem.type === "addition"
                            ? "border-l-green-500"
                            : diffItem.type === "modification"
                              ? "border-l-yellow-500"
                              : "border-l-blue-500"
                      }`}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <Badge
                            variant={
                              diffItem.type === "deletion"
                                ? "destructive"
                                : diffItem.type === "addition"
                                  ? "default"
                                  : diffItem.type === "modification"
                                    ? "secondary"
                                    : "outline"
                            }
                            className={diffItem.type === "addition" ? "bg-green-500" : ""}
                          >
                            {diffItem.type === "deletion" && <Minus className="w-3 h-3 mr-1" />}
                            {diffItem.type === "addition" && <Plus className="w-3 h-3 mr-1" />}
                            {diffItem.type === "modification" && <Edit className="w-3 h-3 mr-1" />}
                            {diffItem.type === "identical" && <CheckCircle className="w-3 h-3 mr-1" />}
                            {diffItem.type.charAt(0).toUpperCase() + diffItem.type.slice(1)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">{formatJson(diffItem.item)}</pre>
                        {diffItem.differences && diffItem.differences.length > 0 && (
                          <div className="mt-3 space-y-1">
                            <Label className="text-sm font-medium">Changes:</Label>
                            <ul className="text-xs space-y-1">
                              {diffItem.differences.map((diff, diffIndex) => (
                                <li key={diffIndex} className="text-muted-foreground">
                                  • {diff}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="side-by-side" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Array 1 (Filtered)</CardTitle>
                      <div className="text-xs text-muted-foreground">Query: {formatQueryConditions(array1Query)}</div>
                    </CardHeader>
                    <CardContent>
                      <pre className="text-xs bg-muted p-3 rounded overflow-x-auto max-h-96">
                        {JSON.stringify(filteredArray1.length > 0 ? filteredArray1 : originalArray1, null, 2)}
                      </pre>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Array 2 (Filtered)</CardTitle>
                      <div className="text-xs text-muted-foreground">Query: {formatQueryConditions(array2Query)}</div>
                    </CardHeader>
                    <CardContent>
                      <pre className="text-xs bg-muted p-3 rounded overflow-x-auto max-h-96">
                        {JSON.stringify(filteredArray2.length > 0 ? filteredArray2 : originalArray2, null, 2)}
                      </pre>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="report" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Filtered Comparison Report</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="prose prose-sm max-w-none">
                      <h3>Query Information</h3>
                      <div className="bg-muted p-3 rounded text-sm">
                        <div>
                          <strong>Array 1 Query:</strong> {formatQueryConditions(comparisonResult.queries.array1)}
                        </div>
                        <div>
                          <strong>Array 2 Query:</strong> {formatQueryConditions(comparisonResult.queries.array2)}
                        </div>
                        <div>
                          <strong>Sort Key:</strong> {sortBy === "none" ? "No sorting applied" : sortBy}
                        </div>
                      </div>

                      <h3>Filter Results</h3>
                      <ul>
                        <li>
                          Array 1: {filteredArray1.length || originalArray1.length} items
                          {array1Query.conditions.length > 0 &&
                            ` (filtered from ${originalArray1.length} original items)`}
                        </li>
                        <li>
                          Array 2: {filteredArray2.length || originalArray2.length} items
                          {array2Query.conditions.length > 0 &&
                            ` (filtered from ${originalArray2.length} original items)`}
                        </li>
                      </ul>

                      <h3>Comparison Results</h3>
                      <ul>
                        <li>
                          <strong>{comparisonResult.deletions.length}</strong> items were deleted from the filtered
                          dataset
                        </li>
                        <li>
                          <strong>{comparisonResult.additions.length}</strong> items were added to the filtered dataset
                        </li>
                        <li>
                          <strong>{comparisonResult.modifications.length}</strong> items were modified in the filtered
                          dataset
                        </li>
                        <li>
                          <strong>{comparisonResult.identical.length}</strong> items remained identical in the filtered
                          dataset
                        </li>
                      </ul>

                      {comparisonResult.modifications.length > 0 && (
                        <>
                          <h3>Detailed Modifications</h3>
                          {comparisonResult.modifications.map((mod, index) => (
                            <div key={index} className="border-l-4 border-l-yellow-500 pl-4 my-4">
                              <h4>Modified Item {index + 1}</h4>
                              <ul className="text-sm">
                                {mod.differences.map((diff, diffIndex) => (
                                  <li key={diffIndex}>{diff}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </>
                      )}

                      <h3>Query Syntax Used</h3>
                      <p>The comparison was performed using the following query capabilities:</p>
                      <ul className="text-sm">
                        <li>
                          <strong>Comparison operators:</strong> =, !=, &gt;, &lt;, &gt;=, &lt;=
                        </li>
                        <li>
                          <strong>String operations:</strong> contains, startswith, endswith
                        </li>
                        <li>
                          <strong>Array operations:</strong> includes, in, not in
                        </li>
                        <li>
                          <strong>Existence checks:</strong> exists, not exists
                        </li>
                        <li>
                          <strong>Logical operators:</strong> AND, OR
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
