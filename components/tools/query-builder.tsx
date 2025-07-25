"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QueryParser, QueryExecutor } from "@/lib/query-parser"
import type { ParsedQuery, QueryBuilderProps, JsonItem } from "@/lib/types"
import { AlertCircle, HelpCircle, Play, Code } from "lucide-react"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"

export function QueryBuilder({ data, onQueryChange, label, placeholder }: QueryBuilderProps) {
  const [queryString, setQueryString] = useState("")
  const [parsedQuery, setParsedQuery] = useState<ParsedQuery>({ conditions: [], isValid: true })
  const [filteredData, setFilteredData] = useState<JsonItem[]>(data)
  const [showHelp, setShowHelp] = useState(false)

  const handleQueryChange = (newQuery: string) => {
    setQueryString(newQuery)
    const parsed = QueryParser.parse(newQuery)
    setParsedQuery(parsed)

    if (parsed.isValid) {
      const filtered = QueryExecutor.execute(data, parsed)
      setFilteredData(filtered)
      onQueryChange(parsed, filtered)
    } else {
      setFilteredData([])
      onQueryChange(parsed, [])
    }
  }

  const executeQuery = () => {
    handleQueryChange(queryString)
  }

  const clearQuery = () => {
    setQueryString("")
    const emptyQuery = { conditions: [], isValid: true }
    setParsedQuery(emptyQuery)
    setFilteredData(data)
    onQueryChange(emptyQuery, data)
  }

  const exampleQueries = [
    "age > 25",
    "name contains 'John'",
    "skills includes 'React'",
    "age >= 30 AND city = 'New York'",
    "status in ['active', 'pending']",
    "email exists",
    "address.city = 'Seattle'",
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">{label}</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setShowHelp(!showHelp)} className="h-8 w-8 p-0">
            <HelpCircle className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`query-${label}`}>Query</Label>
          <div className="flex gap-2">
            <Input
              id={`query-${label}`}
              value={queryString}
              onChange={(e) => setQueryString(e.target.value)}
              placeholder={placeholder || "Enter query (e.g., age > 25 AND city = 'New York')"}
              className="font-mono text-sm"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  executeQuery()
                }
              }}
            />
            <Button onClick={executeQuery} size="sm" className="shrink-0">
              <Play className="h-4 w-4" />
            </Button>
            <Button onClick={clearQuery} variant="outline" size="sm" className="shrink-0 bg-transparent">
              Clear
            </Button>
          </div>
        </div>

        {!parsedQuery.isValid && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{parsedQuery.error}</AlertDescription>
          </Alert>
        )}

        {parsedQuery.isValid && parsedQuery.conditions.length > 0 && (
          <div className="space-y-2">
            <Label className="text-xs">Parsed Conditions:</Label>
            <div className="flex flex-wrap gap-1">
              {parsedQuery.conditions.map((condition, index) => (
                <div key={index} className="flex items-center gap-1">
                  <Badge variant="outline" className="text-xs">
                    {condition.property} {condition.operator}{" "}
                    {Array.isArray(condition.value)
                      ? `[${condition.value.join(", ")}]`
                      : JSON.stringify(condition.value)}
                  </Badge>
                  {condition.logicalOperator && (
                    <Badge variant="secondary" className="text-xs">
                      {condition.logicalOperator}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Filtered: {filteredData.length} / {data.length} items
          </span>
          {filteredData.length !== data.length && (
            <Badge variant="secondary" className="text-xs">
              {((filteredData.length / data.length) * 100).toFixed(1)}% match
            </Badge>
          )}
        </div>

        <Collapsible open={showHelp} onOpenChange={setShowHelp}>
          <CollapsibleContent className="space-y-4">
            <Card className="bg-muted/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  Query Syntax Help
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-xs font-medium">Operators:</Label>
                  <div className="text-xs text-muted-foreground mt-1 space-y-1">
                    <div>
                      <code>=, !=, &gt;, &lt;, &gt;=, &lt;=</code> - Comparison
                    </div>
                    <div>
                      <code>contains, startswith, endswith</code> - String operations
                    </div>
                    <div>
                      <code>includes</code> - Array contains value
                    </div>
                    <div>
                      <code>exists, not exists</code> - Property existence
                    </div>
                    <div>
                      <code>in, not in</code> - Value in array
                    </div>
                    <div>
                      <code>AND, OR</code> - Logical operators
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-medium">Examples:</Label>
                  <div className="grid grid-cols-1 gap-1 mt-1">
                    {exampleQueries.map((example, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        className="justify-start h-auto p-1 text-xs font-mono"
                        onClick={() => setQueryString(example)}
                      >
                        {example}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>

        {filteredData.length > 0 && (
          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="json">JSON</TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="space-y-2">
              <div className="max-h-40 overflow-y-auto space-y-1">
                {filteredData.slice(0, 5).map((item, index) => (
                  <div key={index} className="text-xs p-2 bg-muted rounded">
                    {Object.entries(item)
                      .slice(0, 3)
                      .map(([key, value]) => (
                        <span key={key} className="mr-3">
                          <strong>{key}:</strong> {JSON.stringify(value)}
                        </span>
                      ))}
                    {Object.keys(item).length > 3 && <span className="text-muted-foreground">...</span>}
                  </div>
                ))}
                {filteredData.length > 5 && (
                  <div className="text-xs text-muted-foreground text-center py-1">
                    ... and {filteredData.length - 5} more items
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="json">
              <Textarea value={JSON.stringify(filteredData, null, 2)} readOnly className="font-mono text-xs max-h-40" />
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  )
}
