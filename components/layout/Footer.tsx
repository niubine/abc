import { Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-gray-50 py-4">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} Virtual Student ID Generator. 保留所有权利.</p>
          <p className="mt-2 flex items-center justify-center text-sm text-gray-500">
            Made with <Heart className="mx-1 h-4 w-4 text-red-500" /> by Creator
          </p>
        </div>
      </div>
    </footer>
  )
}
