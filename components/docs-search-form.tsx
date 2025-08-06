import { Search } from "lucide-react"

import { Label } from "@/components/ui/label"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from "@/components/ui/sidebar"

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  return (
    <form {...props} className="w-full">
      <SidebarGroup className="py-0">
        <SidebarGroupContent className="relative">
          <Label htmlFor="search" className="sr-only">
            Search documentation
          </Label>
          <SidebarInput
            id="search"
            placeholder="Search the docs..."
            className="pl-9 pr-4 h-9 text-sm bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-colors"
          />
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  )
} 