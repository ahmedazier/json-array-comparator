"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowUpDown, Zap, Shield, BarChart3 } from "lucide-react";
import Link from "next/link";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[size:20px_20px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/50 to-transparent" />
      
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <Badge 
            variant="secondary" 
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium"
          >
            <Zap className="h-3 w-3" />
            Powerful JSON Array Comparison Tool
          </Badge>

          {/* Main Heading */}
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Compare JSON Arrays with
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              {" "}Advanced Filtering
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            Effortlessly compare, filter, and analyze JSON arrays with powerful query capabilities. 
            Get detailed insights into additions, deletions, and modifications with real-time filtering.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex items-center justify-center gap-4 sm:gap-6">
            <Button size="lg" className="group shadow-lg hover:shadow-xl transition-all duration-300" asChild>
              <Link href="#demo">
                Try Demo
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="group hover:bg-accent transition-all duration-300" asChild>
              <Link href="/docs">
                View Documentation
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <ArrowUpDown className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Smart Comparison</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Deep object comparison with nested property analysis
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Advanced Filtering</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Powerful query language for precise data filtering
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Detailed Reports</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Comprehensive analysis with visual diff highlighting
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 