"use client"

import { useState, useEffect } from "react"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { MapPin, MessageSquare } from "lucide-react"
import { Star, Phone, Car } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

type Provider = {
  id: string
  name: string
  description: string
  specialization: string
  rating: number
  reviews: number
  distance: number
  address: string
  phone: string
  image: string
}

export default function ProvidersPage() {
  const [providers, setProviders] = useState<Provider[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [maxDistance, setMaxDistance] = useState(20)
  const { toast } = useToast()
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          toast({
            title: "Location detected",
            description: "Showing service providers near you",
          })
        },
        (error) => {
          console.error("Error getting location:", error)
          toast({
            title: "Location access denied",
            description: "Please enable location services to find nearby providers",
            variant: "destructive",
          })
        },
      )
    }

    // Mock data for service providers
    const mockProviders: Provider[] = [
      {
        id: "1",
        name: "Auto Fix Garage",
        description: "Full-service auto repair shop specializing in domestic and foreign vehicles.",
        specialization: "General Repairs",
        rating: 4.5,
        reviews: 42,
        distance: 2.3,
        address: "123 Main St, Anytown, USA",
        phone: "(555) 123-4567",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "2",
        name: "City Mechanics",
        description: "Specializing in brake service, suspension, and alignment.",
        specialization: "Brake Service",
        rating: 5.0,
        reviews: 28,
        distance: 3.1,
        address: "456 Oak Ave, Anytown, USA",
        phone: "(555) 987-6543",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "3",
        name: "Express Oil Change",
        description: "Quick oil changes and basic maintenance services.",
        specialization: "Oil Changes",
        rating: 4.2,
        reviews: 56,
        distance: 1.8,
        address: "789 Elm St, Anytown, USA",
        phone: "(555) 456-7890",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "4",
        name: "Precision Auto Care",
        description: "High-end vehicle specialists with certified technicians.",
        specialization: "Luxury Vehicles",
        rating: 4.8,
        reviews: 35,
        distance: 5.2,
        address: "101 Pine Rd, Anytown, USA",
        phone: "(555) 321-0987",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "5",
        name: "Tire World",
        description: "Complete tire sales, installation, and repair services.",
        specialization: "Tires",
        rating: 4.0,
        reviews: 63,
        distance: 4.5,
        address: "202 Cedar Ln, Anytown, USA",
        phone: "(555) 654-3210",
        image: "/placeholder.svg?height=100&width=100",
      },
    ]

    setProviders(mockProviders)
    setLoading(false)
  }, [toast])

  const filteredProviders = providers
    .filter((provider) => provider.distance <= maxDistance)
    .filter(
      (provider) =>
        provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="bg-muted py-12">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Find Automotive Service Providers
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Connect with qualified mechanics and service centers in your area
              </p>
            </div>
          </div>
        </div>

        <div className="container py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Filters</h2>
                <p className="text-sm text-muted-foreground">Refine your search results</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="search" className="text-sm font-medium">
                    Search
                  </label>
                  <Input
                    id="search"
                    placeholder="Search providers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="distance" className="text-sm font-medium">
                      Max Distance
                    </label>
                    <span className="text-sm text-muted-foreground">{maxDistance} miles</span>
                  </div>
                  <Slider
                    id="distance"
                    min={1}
                    max={50}
                    step={1}
                    value={[maxDistance]}
                    onValueChange={(value) => setMaxDistance(value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Specializations</label>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                      General Repairs
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                      Oil Changes
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                      Brake Service
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                      Tires
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                      Luxury Vehicles
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-3">
              {loading ? (
                <div className="flex h-40 items-center justify-center">
                  <p>Loading providers...</p>
                </div>
              ) : filteredProviders.length === 0 ? (
                <div className="flex h-40 items-center justify-center">
                  <p>No providers found matching your criteria.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Showing {filteredProviders.length} providers</p>
                    <p className="text-sm text-muted-foreground">
                      {userLocation ? "Using your current location" : "Location not available"}
                    </p>
                  </div>

                  <div className="space-y-6">
                    {filteredProviders.map((provider) => (
                      <Card key={provider.id}>
                        <CardHeader className="flex flex-row items-start gap-4 pb-2">
                          <div className="h-16 w-16 rounded-md bg-muted">
                            <img
                              src={provider.image || "/placeholder.svg"}
                              alt={provider.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <CardTitle>{provider.name}</CardTitle>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-primary text-primary" />
                                <span className="text-sm font-medium">{provider.rating}</span>
                                <span className="text-sm text-muted-foreground">({provider.reviews} reviews)</span>
                              </div>
                            </div>
                            <CardDescription>{provider.specialization}</CardDescription>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">{provider.description}</p>
                          <div className="mt-4 flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>{provider.distance} miles away</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <span>{provider.phone}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Car className="h-4 w-4 text-muted-foreground" />
                              <span>{provider.specialization}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline" asChild>
                            <Link href={`/providers/${provider.id}`}>View Details</Link>
                          </Button>
                          <Button className="gap-2">
                            <MessageSquare className="h-4 w-4" />
                            Contact
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

