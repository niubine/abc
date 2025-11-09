"use client"

import { useState } from "react"
import { FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import DisclaimerModal from "./DisclaimerModal"

export default function Header() {
  const [showDisclaimer, setShowDisclaimer] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-blue-600 to-indigo-700 shadow-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* 网站Logo和名称 */}
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-white" />
            <h1 className="text-xl font-bold text-white md:text-2xl">
              <span className="hidden sm:inline">VSID-</span>
              <span className="font-extrabold tracking-tight">Student ID Generator</span>
            </h1>
          </div>

          {/* 免责声明按钮 - 点击时打开弹窗 */}
          <Button
            variant="outline"
            className="bg-white/10 text-white hover:bg-white/20 hover:text-white"
            onClick={() => setShowDisclaimer(true)}
          >
            免责声明
          </Button>
        </div>
      </header>

      {/* 免责声明弹窗 */}
      <DisclaimerModal isOpen={showDisclaimer} onOpenChange={setShowDisclaimer} showCloseButton={true} />
    </>
  )
}
