"use client"

import { useState } from "react"
import { AlertTriangle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function DisclaimerBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <Alert className="relative border-amber-300 bg-amber-50 text-amber-900 shadow-md">
      <AlertTriangle className="h-5 w-5 text-amber-600" />
      <AlertDescription className="flex-1 text-sm md:text-base">
        <strong>免责声明：</strong> 本工具仅供学习和参考使用，生成的证件不具有任何法律效力。
        严禁用于任何非法用途，使用者需自行承担所有法律责任。
      </AlertDescription>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 h-6 w-6 rounded-full p-0 text-amber-600 hover:bg-amber-200 hover:text-amber-900"
        onClick={() => setIsVisible(false)}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">关闭</span>
      </Button>
    </Alert>
  )
}
