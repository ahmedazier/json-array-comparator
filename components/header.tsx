import { ArrowUpDown } from "lucide-react"
import { ModeToggle } from "./toggle-mode"

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background py-4 px-8">
      <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8 justify-between">
        <div className="flex items-center gap-2 text-lg font-semibold md:text-xl">
          <ArrowUpDown className="w-6 h-6" />
          <span>JSON Array Comparator</span>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
