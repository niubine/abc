import type React from "react"
import type { ReactNode } from "react"
import { Card, CardTitle } from "@/components/ui/card"

interface PreviewContainerProps {
  title: string
  children: ReactNode
  actions?: ReactNode
  footer?: ReactNode
  className?: string
}

/**
 * 通用预览容器组件
 * 包含标准的预览区布局：标题、内容区和底部操作区
 */
const PreviewContainer: React.FC<PreviewContainerProps> = ({ title, children, actions, footer, className = "" }) => {
  return (
    <Card className={`pt-0 px-6 pb-6 ${className}`}>
      {/* 标题区 */}
      <div className="mt-4 mb-4 flex items-center justify-between">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>

      {/* 内容区 */}
      <div className="flex justify-center p-2">{children}</div>

      {/* 底部区域 */}
      {footer && <div className="mt-6 px-2">{footer}</div>}
    </Card>
  )
}

export default PreviewContainer
