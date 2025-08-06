import { AppSidebar } from "@/components/docs-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowRight, Code, FileText, Zap, CheckCircle, AlertTriangle, Info } from "lucide-react"

export default function DocsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">
                  JSON Array Comparator
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Documentation</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Hero Section */}
          <div className="space-y-4" id="introduction">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">v1.0.0</Badge>
              <Badge variant="outline" className="text-xs">Beta</Badge>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">JSON Array Comparator Documentation</h1>
            <p className="text-muted-foreground max-w-2xl">
              A powerful tool for comparing JSON arrays, finding differences, and analyzing data structures. 
              Built with Next.js, TypeScript, and modern web technologies.
            </p>
          </div>

          <Separator />

          {/* Quick Start Section */}
          <section className="space-y-4" id="quick-start">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold">Quick Start</h2>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
                <CardDescription>
                  Learn how to use the JSON Array Comparator in just a few steps
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                        1
                      </div>
                      <h3 className="font-medium">Input Your Data</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Paste your JSON arrays into the input fields. The tool supports both single arrays and multiple arrays for comparison.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                        2
                      </div>
                      <h3 className="font-medium">Configure Options</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Set comparison options like case sensitivity, array order importance, and nested object handling.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                        3
                      </div>
                      <h3 className="font-medium">View Results</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Analyze the differences, export results, and get detailed insights about your data.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Features Section */}
          <section className="space-y-4" id="core-features">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold">Core Features</h2>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    Array Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Compare multiple JSON arrays with advanced algorithms that detect:
                  </p>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      Missing elements
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      Additional elements
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      Modified values
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      Structural differences
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    JSON Validation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Built-in validation ensures your data is properly formatted:
                  </p>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      Syntax validation
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      Type checking
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      Error highlighting
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      Auto-formatting
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Code Examples */}
          <section className="space-y-4" id="usage-examples">
            <div className="flex items-center gap-2">
              <Code className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold">Usage Examples</h2>
            </div>
            
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Comparison</TabsTrigger>
                <TabsTrigger value="advanced">Advanced Features</TabsTrigger>
                <TabsTrigger value="api">API Usage</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4" id="basic-comparison">
                <Card>
                  <CardHeader>
                    <CardTitle>Simple Array Comparison</CardTitle>
                    <CardDescription>
                      Compare two arrays and find differences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md bg-muted p-4">
                      <pre className="text-sm">
{`// Input Arrays
Array 1: [1, 2, 3, 4]
Array 2: [1, 2, 4, 5]

// Results
Missing: [3]
Added: [5]
Common: [1, 2, 4]`}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="advanced" className="space-y-4" id="advanced-features">
                <Card>
                  <CardHeader>
                    <CardTitle>Object Array Comparison</CardTitle>
                    <CardDescription>
                      Compare arrays of objects with nested properties
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md bg-muted p-4">
                      <pre className="text-sm">
{`// Input Arrays
Array 1: [
  { id: 1, name: "John", age: 25 },
  { id: 2, name: "Jane", age: 30 }
]
Array 2: [
  { id: 1, name: "John", age: 26 },
  { id: 3, name: "Bob", age: 35 }
]

// Results
Modified: [{ id: 1, name: "John", age: 25 → 26 }]
Added: [{ id: 3, name: "Bob", age: 35 }]
Missing: [{ id: 2, name: "Jane", age: 30 }]`}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="api" className="space-y-4" id="api-usage">
                <Card>
                  <CardHeader>
                    <CardTitle>Programmatic Usage</CardTitle>
                    <CardDescription>
                      Use the comparison functions in your code
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md bg-muted p-4">
                      <pre className="text-sm">
{`import { compareArrays } from '@/lib/array-comparator'

const array1 = [1, 2, 3, 4]
const array2 = [1, 2, 4, 5]

const result = compareArrays(array1, array2, {
  caseSensitive: true,
  ignoreOrder: false,
  deepCompare: true
})

console.log(result)
// {
//   missing: [3],
//   added: [5],
//   common: [1, 2, 4],
//   differences: [...]
// }`}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </section>

          {/* Tips and Best Practices */}
          <section className="space-y-4" id="best-practices">
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold">Best Practices</h2>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Use consistent data types:</strong> Ensure your arrays contain the same data types for accurate comparisons.
                </AlertDescription>
              </Alert>
              
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Handle large datasets:</strong> For arrays with 1000+ items, consider using pagination or chunking.
                </AlertDescription>
              </Alert>
              
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Validate input data:</strong> Always validate your JSON before comparison to avoid errors.
                </AlertDescription>
              </Alert>
              
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Export results:</strong> Use the export feature to save comparison results for later analysis.
                </AlertDescription>
              </Alert>
            </div>
          </section>

          {/* Call to Action */}
          <section className="space-y-4">
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <h3 className="text-xl font-semibold">Ready to Get Started?</h3>
                  <p className="text-muted-foreground max-w-md">
                    Try the JSON Array Comparator now and see how easy it is to compare your data.
                  </p>
                  <Button asChild>
                    <a href="/" className="flex items-center gap-2">
                      Try the Tool
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 