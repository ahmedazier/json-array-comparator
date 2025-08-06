"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  BarChart3, 
  Code, 
  Zap, 
  Shield,
  ArrowUpDown,
  FileText,
  Settings,
  Eye
} from "lucide-react";

const features = [
  {
    icon: ArrowUpDown,
    title: "Smart Array Comparison",
    description: "Deep object comparison with nested property analysis and customizable sorting keys.",
    badge: "Core Feature",
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950"
  },
  {
    icon: Filter,
    title: "Advanced Query Filtering",
    description: "Powerful query language supporting complex conditions, logical operators, and array operations.",
    badge: "Advanced",
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950"
  },
  {
    icon: BarChart3,
    title: "Detailed Analysis Reports",
    description: "Comprehensive reports showing additions, deletions, modifications, and identical items.",
    badge: "Analytics",
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950"
  },
  {
    icon: Code,
    title: "JSON Format Support",
    description: "Full support for complex JSON structures including nested objects and arrays.",
    badge: "Standard",
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-950"
  },
  {
    icon: Search,
    title: "Real-time Filtering",
    description: "Instant filtering and comparison results with live query validation.",
    badge: "Performance",
    color: "text-red-600",
    bgColor: "bg-red-50 dark:bg-red-950"
  },
  {
    icon: Shield,
    title: "Data Safety",
    description: "Client-side processing ensures your data never leaves your browser.",
    badge: "Security",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50 dark:bg-indigo-950"
  }
];

export function HomeFeatures() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Features
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need for JSON array comparison
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful tools and features designed to make JSON array comparison simple, 
            accurate, and efficient.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="group hover:shadow-lg hover:scale-105 transition-all duration-300 border-border/50">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${feature.bgColor}`}>
                      <Icon className={`h-5 w-5 ${feature.color}`} />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <CardTitle>Lightning Fast</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Optimized algorithms ensure quick comparison of large JSON arrays with 
                real-time filtering and instant results.
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                <CardTitle>Visual Diff</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Clear visual indicators show exactly what changed, with detailed 
                side-by-side comparisons and highlighted differences.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
} 