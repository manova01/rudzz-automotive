import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Car, MapPin, Search } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32">
      <div className="container flex flex-col items-center text-center">
        <div className="mx-auto max-w-3xl space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Find Trusted Automotive Service Providers Near You
          </h1>
          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
            Connect with qualified mechanics and service centers in your area. Get quotes, book appointments, and solve
            your automotive needs with ease.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="gap-2 bg-primary hover:bg-primary/90">
              <Link href="/providers">
                <Search className="h-4 w-4" />
                Find Providers
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="gap-2 border-primary text-primary hover:bg-primary/10"
            >
              <Link href="/become-provider">
                <Car className="h-4 w-4" />
                Become a Provider
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 grid w-full max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col items-center gap-2 rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <Search className="h-10 w-10 text-primary" />
            <h3 className="text-xl font-semibold">Find Services</h3>
            <p className="text-center text-sm text-muted-foreground">
              Search for automotive services based on your location and needs
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <MapPin className="h-10 w-10 text-secondary" />
            <h3 className="text-xl font-semibold">Location-Based</h3>
            <p className="text-center text-sm text-muted-foreground">
              Discover service providers near you with our geolocation feature
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <Car className="h-10 w-10 text-accent" />
            <h3 className="text-xl font-semibold">Expert Providers</h3>
            <p className="text-center text-sm text-muted-foreground">
              Connect with qualified mechanics and automotive specialists
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

