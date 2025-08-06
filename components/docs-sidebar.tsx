import * as React from "react"
import { GalleryVerticalEnd, Minus, Plus, Sparkles } from "lucide-react"

import { SearchForm } from "./docs-search-form"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Documentation navigation data for JSON Array Comparator
interface NavItem {
  title: string
  url: string
  isActive?: boolean
  comingSoon?: boolean
}

interface NavSection {
  title: string
  url: string
  items: NavItem[]
}

const data: { navMain: NavSection[] } = {
  navMain: [
    {
      title: "Documentation",
      url: "#documentation",
      items: [
        {
          title: "Introduction",
          url: "#introduction",
        },
        {
          title: "Quick Start",
          url: "#quick-start",
        },
        {
          title: "Core Features",
          url: "#core-features",
        },
      ],
    },
    {
      title: "Features",
      url: "#features",
      items: [
        {
          title: "Array Comparison",
          url: "#array-comparison",
          isActive: true,
        },
        {
          title: "JSON Validation",
          url: "#json-validation",
        },
        {
          title: "Difference Highlighting",
          url: "#difference-highlighting",
        },
        {
          title: "Export Results",
          url: "#export-results",
          comingSoon: true,
        },
      ],
    },
    {
      title: "Usage Examples",
      url: "#usage-examples",
      items: [
        {
          title: "Basic Comparison",
          url: "#basic-comparison",
        },
        {
          title: "Advanced Features",
          url: "#advanced-features",
        },
        {
          title: "API Usage",
          url: "#api-usage",
          comingSoon: true,
        },
      ],
    },
    {
      title: "Best Practices",
      url: "#best-practices",
      items: [
        {
          title: "Data Types",
          url: "#data-types",
        },
        {
          title: "Large Datasets",
          url: "#large-datasets",
        },
        {
          title: "Validation",
          url: "#validation",
        },
        {
          title: "Export Tips",
          url: "#export-tips",
          comingSoon: true,
        },
      ],
    },
    {
      title: "API Reference",
      url: "#api-reference",
      items: [
        {
          title: "Comparison Functions",
          url: "#comparison-functions",
        },
        {
          title: "Configuration Options",
          url: "#configuration-options",
        },
        {
          title: "Event Handlers",
          url: "#event-handlers",
          comingSoon: true,
        },
        {
          title: "Utility Functions",
          url: "#utility-functions",
          comingSoon: true,
        },
      ],
    },
    {
      title: "Troubleshooting",
      url: "#troubleshooting",
      items: [
        {
          title: "Common Issues",
          url: "#common-issues",
        },
        {
          title: "Debug Guide",
          url: "#debug-guide",
        },
        {
          title: "Performance Issues",
          url: "#performance-issues",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b border-border/50 pb-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="hover:bg-accent/50 transition-colors">
              <a href="/" className="flex items-center gap-3">
                <div className="bg-primary text-primary-foreground flex aspect-square size-10 items-center justify-center rounded-lg shadow-sm">
                  <GalleryVerticalEnd className="size-5" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold text-base">Documentation</span>
                  <span className="text-xs text-muted-foreground">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="mt-4">
          <SearchForm />
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2 py-4">
        <ScrollArea className="h-[calc(100vh-200px)]">
          <SidebarGroup>
            <SidebarMenu className="space-y-1">
              {data.navMain.map((item, index) => (
                <Collapsible
                  key={item.title}
                  defaultOpen={index === 1}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className="w-full justify-between hover:bg-accent/50 transition-colors">
                        <span className="font-medium text-sm">{item.title}</span>
                        <div className="flex items-center gap-2">
                          <Plus className="size-4 transition-transform group-data-[state=open]/collapsible:hidden group-data-[state=closed]/collapsible:rotate-90" />
                          <Minus className="size-4 transition-transform group-data-[state=closed]/collapsible:hidden group-data-[state=open]/collapsible:rotate-90" />
                        </div>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    {item.items?.length ? (
                      <CollapsibleContent className="mt-1">
                        <SidebarMenuSub className="space-y-1">
                          {item.items.map((item) => (
                            <SidebarMenuSubItem key={item.title}>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <SidebarMenuSubButton
                                      asChild
                                      isActive={item.isActive}
                                      className="text-sm hover:bg-accent/50 transition-colors"
                                    >
                                      <a 
                                        href={item.url} 
                                        className={`flex items-center w-full ${
                                          item.comingSoon 
                                            ? "pointer-events-none opacity-60 cursor-not-allowed" 
                                            : "hover:text-foreground"
                                        }`}
                                      >
                                        <span className="truncate flex-1">{item.title}</span>
                                        {item.comingSoon && (
                                          <span className="ml-2 text-xs bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 dark:from-yellow-900 dark:to-orange-900 dark:text-yellow-200 px-2 py-0.5 rounded-full font-medium shadow-sm flex items-center gap-1 flex-shrink-0">
                                            <Sparkles className="size-2" />
                                            Coming Soon
                                          </span>
                                        )}
                                      </a>
                                    </SidebarMenuSubButton>
                                  </TooltipTrigger>
                                  {item.comingSoon && (
                                    <TooltipContent side="right" className="max-w-xs">
                                      <p className="text-sm">
                                        We're working hard to bring you this feature! 
                                        <br />
                                        <span className="text-muted-foreground">Stay tuned for updates.</span>
                                      </p>
                                    </TooltipContent>
                                  )}
                                </Tooltip>
                              </TooltipProvider>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    ) : null}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </ScrollArea>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
} 