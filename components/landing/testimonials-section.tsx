import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Car Owner",
    content:
      "Rudzz made it so easy to find a reliable mechanic when my car broke down during a road trip. Within minutes, I was connected with a nearby service provider who fixed the issue at a fair price.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Sarah Williams",
    role: "Auto Shop Owner",
    content:
      "As a service provider, Rudzz has helped me connect with new customers in my area. The platform is easy to use and has significantly increased my business over the past year.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Michael Chen",
    role: "Car Enthusiast",
    content:
      "I've been using Rudzz for all my automotive needs. The ability to message providers directly and get quotes before committing has saved me both time and money.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Users Say</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Don't just take our word for it. Here's what customers and service providers think about Rudzz.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border bg-card text-card-foreground">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar>
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

