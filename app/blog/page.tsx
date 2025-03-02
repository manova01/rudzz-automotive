import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays, Clock } from "lucide-react"
import Link from "next/link"

type BlogPost = {
  id: string
  title: string
  excerpt: string
  content: string
  author: {
    name: string
    image: string | null
  }
  date: string
  readTime: string
  tags: string[]
  image: string
}

export default function BlogPage() {
  // Mock blog posts data
  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "10 Essential Car Maintenance Tips for Every Driver",
      excerpt:
        "Regular maintenance is key to keeping your vehicle running smoothly and avoiding costly repairs down the road.",
      content: "",
      author: {
        name: "John Smith",
        image: null,
      },
      date: "2023-05-15",
      readTime: "5 min read",
      tags: ["Maintenance", "Tips"],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "2",
      title: "Understanding Your Car's Warning Lights: What They Mean and What to Do",
      excerpt:
        "Those mysterious symbols on your dashboard are trying to tell you something important about your vehicle.",
      content: "",
      author: {
        name: "Sarah Johnson",
        image: null,
      },
      date: "2023-06-02",
      readTime: "7 min read",
      tags: ["Diagnostics", "Safety"],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "3",
      title: "How to Choose the Right Auto Service Provider for Your Vehicle",
      excerpt:
        "Finding a trustworthy mechanic can be challenging. Here's what to look for when selecting an automotive service provider.",
      content: "",
      author: {
        name: "Michael Chen",
        image: null,
      },
      date: "2023-06-20",
      readTime: "6 min read",
      tags: ["Service", "Tips"],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "4",
      title: "The Future of Automotive: Electric Vehicles and What They Mean for Maintenance",
      excerpt:
        "As electric vehicles become more common, maintenance needs are changing. Here's what EV owners need to know.",
      content: "",
      author: {
        name: "Emily Rodriguez",
        image: null,
      },
      date: "2023-07-10",
      readTime: "8 min read",
      tags: ["Electric Vehicles", "Future"],
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="bg-muted py-12">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Automotive Blog</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Stay informed with the latest automotive tips, news, and maintenance advice
              </p>
            </div>
          </div>
        </div>

        <div className="container py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={post.author.image || undefined} alt={post.author.name} />
                      <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{post.author.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <CalendarDays className="h-3 w-3" />
                          <span>
                            {new Date(post.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/blog/${post.id}`}>Read More</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

