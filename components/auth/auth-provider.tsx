"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

type User = {
  id: string
  name: string | null
  email: string
  image: string | null
  role: "customer" | "provider" | "admin"
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, role: "customer" | "provider") => Promise<void>
  logout: () => void
  isLoading: boolean
  isAdmin: boolean
  isProvider: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, this would be an API call to check session
        const storedUser = localStorage.getItem("rudzz_user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Authentication error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call to authenticate
      // Simulating authentication for demo purposes
      if (email && password) {
        // Mock user data
        const mockUser: User = {
          id: "user_" + Math.random().toString(36).substr(2, 9),
          name: email.split("@")[0],
          email,
          image: null,
          role: email.includes("admin") ? "admin" : email.includes("provider") ? "provider" : "customer",
        }

        setUser(mockUser)
        localStorage.setItem("rudzz_user", JSON.stringify(mockUser))

        toast({
          title: "Login successful",
          description: "Welcome back to Rudzz!",
        })

        router.push("/dashboard")
      } else {
        throw new Error("Invalid credentials")
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please check your credentials and try again",
        variant: "destructive",
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string, role: "customer" | "provider") => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call to register
      // Simulating registration for demo purposes
      if (name && email && password) {
        // Mock user data
        const mockUser: User = {
          id: "user_" + Math.random().toString(36).substr(2, 9),
          name,
          email,
          image: null,
          role,
        }

        setUser(mockUser)
        localStorage.setItem("rudzz_user", JSON.stringify(mockUser))

        toast({
          title: "Registration successful",
          description: "Welcome to Rudzz!",
        })

        router.push("/dashboard")
      } else {
        throw new Error("Please fill in all required fields")
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Please check your information and try again",
        variant: "destructive",
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("rudzz_user")
    router.push("/")
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    })
  }

  const isAdmin = user?.role === "admin"
  const isProvider = user?.role === "provider"

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isLoading,
        isAdmin,
        isProvider,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

