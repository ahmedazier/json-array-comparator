"use client";

import {
  ArrowUpDown,
  Github,
  Home,
  Info,
  Settings,
  FileText,
  Menu,
  X
} from "lucide-react";
import { ModeToggle } from "./toggle-mode";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "./ui/sheet";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      href: "/",
      label: "Home",
      icon: Home
    },
    {
      href: "/about",
      label: "About",
      icon: Info
    },
    {
      href: "/docs",
      label: "Documentation",
      icon: FileText
    },
    {
      href: "/settings",
      label: "Settings",
      icon: Settings
    }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <ArrowUpDown className="h-4 w-4" />
            </div>
            <span className="text-lg font-semibold tracking-tight md:text-xl">
              JSON Array Comparator
            </span>
          </div>
          <Badge className="ml-2 text-xs font-medium rounded-full px-2.5 py-0.5 transition-all duration-300 cursor-pointer">
            Beta
          </Badge>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
                  "text-muted-foreground hover:text-foreground hover:bg-accent",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                )}
              >
                <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:flex items-center gap-2 border-border/50 bg-background/50 backdrop-blur-sm hover:bg-accent/50 transition-all duration-200"
            asChild
          >
            <Link
              href="https://github.com/ahmedazier/json-array-comparator"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
            </Link>
          </Button>

          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="md:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                  <span className="text-lg font-semibold">Navigation</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "group flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200",
                        "text-muted-foreground hover:text-foreground hover:bg-accent",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      )}
                    >
                      <Icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
                
                {/* Mobile Authentication Section */}
                <div className="mt-6 pt-6 border-t border-border/50">
                  <div className="flex flex-col gap-4 px-2">
                    {/* Mode Toggle */}
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm font-medium text-muted-foreground">Theme</span>
                      <ModeToggle />
                    </div>
                    
                    {/* GitHub Link */}
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3 py-3"
                      asChild
                    >
                      <Link
                        href="https://github.com/ahmedazier/json-array-comparator"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-5 w-5" />
                        <span>GitHub</span>
                      </Link>
                    </Button>
                    
                    {/* Authentication Buttons */}
                    <SignedOut>
                      <div className="flex flex-col gap-3 pt-2">
                        <SignInButton>
                          <Button variant="outline" className="w-full justify-start gap-3 py-3">
                            <span>Sign In</span>
                          </Button>
                        </SignInButton>
                        <SignUpButton>
                          <Button className="w-full justify-start gap-3 py-3">
                            <span>Sign Up</span>
                          </Button>
                        </SignUpButton>
                      </div>
                    </SignedOut>
                    <SignedIn>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-sm font-medium text-muted-foreground">Account</span>
                        <UserButton />
                      </div>
                    </SignedIn>
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
