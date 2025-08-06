"use client";

import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpDown, Play, Zap } from "lucide-react";
import JsonArrayComparator from "@/components/tools/json-array";

function DemoSkeleton() {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-6 w-48" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-48 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-48 w-full" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-48" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-6 w-32" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-6 w-40" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="border-l-4">
                <CardHeader className="pb-2">
                  <Skeleton className="h-4 w-20" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-12 mb-2" />
                  <Skeleton className="h-3 w-24" />
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function HomeDemo() {
  return (
    <section id="demo" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Play className="h-3 w-3 mr-1" />
            Live Demo
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Try the JSON Array Comparator
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the power of advanced JSON array comparison with real-time filtering 
            and detailed analysis. No registration required.
          </p>
        </div>

        <Card className="border-primary/20 shadow-lg">
          <CardHeader className="border-b bg-muted/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <ArrowUpDown className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">JSON Array Comparator</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Compare, filter, and analyze JSON arrays with advanced query capabilities
                  </p>
                </div>
              </div>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Zap className="h-3 w-3" />
                Interactive
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Suspense fallback={<DemoSkeleton />}>
              <div className="animate-in fade-in duration-500">
                <JsonArrayComparator />
              </div>
            </Suspense>
          </CardContent>
        </Card>

        {/* Quick Start Guide */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <CardTitle className="text-lg">Paste Your JSON</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Copy and paste your JSON arrays into the input fields. The tool supports 
                complex nested structures and arrays.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-950">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <CardTitle className="text-lg">Apply Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Use the advanced query language to filter your data. Support for complex 
                conditions, logical operators, and array operations.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 dark:bg-green-950">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <CardTitle className="text-lg">Analyze Results</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get detailed insights into additions, deletions, modifications, and 
                identical items with visual diff highlighting.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
} 