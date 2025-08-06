import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Github, 
  Linkedin, 
  Mail, 
  Globe, 
  Code, 
  Zap, 
  Shield, 
  Users,
  ArrowUpDown,
  FileText,
  Settings,
  BarChart3,
  Link
} from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src="https://github.com/ahmedazier.png" alt="Ahmed Azier" />
            <AvatarFallback className="text-2xl">AA</AvatarFallback>
          </Avatar>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">Ahmed Azier</h1>
        <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
          Full-stack developer passionate about creating powerful tools and innovative solutions. 
          Creator of the JSON Array Comparator - a modern web application for comparing and analyzing JSON data structures.
        </p>
        <div className="flex justify-center gap-4 mb-8">
          <Button variant="outline" asChild>
            <a href="https://github.com/ahmedazier" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="https://github.com/ahmedazier/json-array-comparator" target="_blank" rel="noopener noreferrer">
              <Code className="mr-2 h-4 w-4" />
              Project Repository
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/" target="_blank" rel="noopener noreferrer">
              <Link className="mr-2 h-4 w-4" />
              Demo App
            </a>
          </Button>
        </div>
      </div>

      <Separator className="mb-12" />

      {/* Project Overview */}
      <div className="grid gap-8 md:grid-cols-2 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowUpDown className="h-5 w-5" />
              About the Project
            </CardTitle>
            <CardDescription>
              JSON Array Comparator is a powerful web application designed to help developers and data analysts compare JSON arrays efficiently.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Key Features</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Code className="h-3 w-3" />
                  Advanced array comparison algorithms
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="h-3 w-3" />
                  Real-time filtering and querying
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-3 w-3" />
                  Client-side data processing
                </li>
                <li className="flex items-center gap-2">
                  <BarChart3 className="h-3 w-3" />
                  Detailed analysis reports
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Technology Stack
            </CardTitle>
            <CardDescription>
              Built with modern web technologies for optimal performance and user experience.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Next.js 15</Badge>
                <Badge variant="secondary">TypeScript</Badge>
                <Badge variant="secondary">Tailwind CSS</Badge>
                <Badge variant="secondary">shadcn/ui</Badge>
                <Badge variant="secondary">React 19</Badge>
                <Badge variant="secondary">Clerk Auth</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Features Grid */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Project Features</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowUpDown className="h-5 w-5 text-blue-600" />
                Smart Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Advanced algorithms that detect missing elements, additions, modifications, and structural differences between JSON arrays.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-600" />
                Query System
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Powerful query language supporting complex conditions, logical operators, and array operations for precise data filtering.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Comprehensive reports showing detailed analysis with visual indicators and exportable results.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Developer Info */}
      <div className="grid gap-8 md:grid-cols-2 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              About the Developer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Ahmed Azier is a passionate full-stack developer with expertise in modern web technologies. 
              This project demonstrates his commitment to creating useful tools that solve real-world problems 
              in data analysis and comparison.
            </p>
            <div className="space-y-2">
              <h3 className="font-semibold">Skills & Expertise</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">React</Badge>
                <Badge variant="outline">Next.js</Badge>
                <Badge variant="outline">TypeScript</Badge>
                <Badge variant="outline">Node.js</Badge>
                <Badge variant="outline">Python</Badge>
                <Badge variant="outline">Database Design</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Connect & Collaborate
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Github className="h-4 w-4" />
                <a 
                  href="https://github.com/ahmedazier" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm hover:underline"
                >
                  github.com/ahmedazier
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4" />
                <span className="text-sm text-muted-foreground">
                  Available for collaboration and opportunities
                </span>
              </div>
            </div>
            <div className="pt-4">
              <Button asChild className="w-full">
                <a href="https://github.com/ahmedazier/json-array-comparator" target="_blank" rel="noopener noreferrer">
                  View Project on GitHub
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Stats */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Project Statistics</CardTitle>
          <CardDescription>
            Key metrics and achievements of the JSON Array Comparator project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">100%</div>
              <div className="text-sm text-muted-foreground">Client-side Processing</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">Advanced</div>
              <div className="text-sm text-muted-foreground">Query System</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">Real-time</div>
              <div className="text-sm text-muted-foreground">Analysis</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">Modern</div>
              <div className="text-sm text-muted-foreground">Tech Stack</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground">
        <p>
          Built with ❤️ by Ahmed Azier | 
          <a 
            href="https://github.com/ahmedazier/json-array-comparator" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:underline ml-1"
          >
            View Source
          </a>
        </p>
      </div>
    </div>
  )
} 