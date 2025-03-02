import Image from "next/image"

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`relative h-8 w-8 ${className}`}>
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Asset%201%20%285%29-XsIkPp9seye56JdKe5XTHV8tyWlu0s.png"
        alt="Rudzz Logo"
        fill
        className="object-contain"
      />
    </div>
  )
}

