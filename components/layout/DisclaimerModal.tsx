"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface DisclaimerModalProps {
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
  showCloseButton?: boolean
}

export default function DisclaimerModal({
  isOpen: controlledIsOpen,
  onOpenChange,
  showCloseButton = false,
}: DisclaimerModalProps) {
  // 内部状态用于自动显示（首次访问）
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  // 倒计时状态
  const [countdown, setCountdown] = useState(8)
  // 是否允许关闭
  const [canClose, setCanClose] = useState(false)

  // 合并外部和内部状态
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen
  const setIsOpen = (open: boolean) => {
    if (onOpenChange) {
      onOpenChange(open)
    }
    setInternalIsOpen(open)
  }

  // 处理弹窗打开状态变化
  useEffect(() => {
    if (isOpen && !showCloseButton) {
      // 重置倒计时和关闭状态
      setCountdown(8)
      setCanClose(false)

      // 启动倒计时
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            setCanClose(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      // 清理函数
      return () => clearInterval(timer)
    }
  }, [isOpen, showCloseButton])

  useEffect(() => {
    // 只有在没有外部控制时才检查本地存储
    if (controlledIsOpen === undefined) {
      const hasSeenDisclaimer = localStorage.getItem("hasSeenDisclaimer")
      if (!hasSeenDisclaimer) {
        setInternalIsOpen(true)
      }
    }
  }, [controlledIsOpen])

  const handleAccept = () => {
    // 记录用户已经看过免责声明
    localStorage.setItem("hasSeenDisclaimer", "true")
    setIsOpen(false)
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        // 只有在允许关闭或者是手动打开的情况下才能关闭
        if (!open || canClose || showCloseButton) {
          setIsOpen(open)
        }
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center text-amber-700">
            <AlertTriangle className="mr-2 h-5 w-5" />
            免责声明
          </DialogTitle>
          <DialogDescription className="text-gray-700">请在使用本工具前仔细阅读以下声明</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4 text-gray-700">
          <p>
            本工具"Virtual Student ID Generator"仅供学习、教育和参考目的使用。生成的所有证件均为虚拟证件，不具有任何法律效力或官方认证。
          </p>
          <p>
            <strong>严禁用途：</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>伪造官方文件或证件</li>
            <li>欺诈、诈骗或任何非法活动</li>
            <li>冒充他人身份</li>
            <li>任何可能违反法律法规的用途</li>
          </ul>
          <p>
            使用本工具即表示您同意自行承担使用风险和法律责任。开发者对因使用本工具而导致的任何直接或间接损失不承担任何责任。
          </p>
        </div>
        <DialogFooter className="flex items-center justify-between sm:justify-between">
          {!showCloseButton ? (
            <>
              <div className="flex items-center text-amber-600">
                {!canClose && (
                  <>
                    <Clock className="mr-1 h-4 w-4 animate-pulse" />
                    <span className="text-sm">请阅读 {countdown} 秒</span>
                  </>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => (window.location.href = "about:blank")}>
                  不同意并离开
                </Button>
                <Button
                  onClick={handleAccept}
                  disabled={!canClose}
                  className={!canClose ? "opacity-50 cursor-not-allowed" : ""}
                >
                  我已阅读并同意
                </Button>
              </div>
            </>
          ) : (
            <Button onClick={handleAccept}>关闭</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
