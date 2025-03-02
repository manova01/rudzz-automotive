import { MessageSquare, MapPin, Shield, Newspaper, Car, Users } from "lucide-react"

export function FeaturesSection() {
  return (
    <section className="bg-muted py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Everything You Need in One Platform
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Rudzz provides a comprehensive solution for connecting with automotive service providers
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <MapPin className="h-10 w-10 text-primary" />
            <h3 className="mt-4 text-xl font-semibold">Geolocation Search</h3>
            <p className="mt-2 text-muted-foreground">
              Find service providers near your location with our advanced geolocation technology
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <MessageSquare className="h-10 w-10 text-secondary" />
            <h3 className="mt-4 text-xl font-semibold">Messaging System</h3>
            <p className="mt-2 text-muted-foreground">
              Communicate directly with service providers to discuss your needs and get quotes
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <Shield className="h-10 w-10 text-accent" />
            <h3 className="mt-4 text-xl font-semibold">Verified Providers</h3>
            <p className="mt-2 text-muted-foreground">
              All service providers are verified to ensure quality and reliability
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <Newspaper className="h-10 w-10 text-primary" />
            <h3 className="mt-4 text-xl font-semibold">Automotive Blog</h3>
            <p className="mt-2 text-muted-foreground">
              Stay informed with the latest automotive tips, news, and maintenance advice
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <Car className="h-10 w-10 text-secondary" />
            <h3 className="mt-4 text-xl font-semibold">Service Listings</h3>
            <p className="mt-2 text-muted-foreground">
              Browse detailed listings of services offered by providers in your area
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <Users className="h-10 w-10 text-accent" />
            <h3 className="mt-4 text-xl font-semibold">User Reviews</h3>
            <p className="mt-2 text-muted-foreground">
              Read and write reviews to help others find the best service providers
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

