"use client"

import type React from "react"
import { useState, type RefObject } from "react"
import type { IDCardFormData } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { EXPORT_QUALITY_OPTIONS } from "@/lib/constants"
import CardPreview from "@/components/id-card/preview/CardPreview"
import { Download } from "lucide-react"
import { useFormContext } from "react-hook-form"
import PreviewContainer from "@/components/common/PreviewContainer"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

/**
 * 预览表单组件
 * 用于显示卡片预览和导出选项
 */
export interface IDCardPreviewFormProps {
  formData: IDCardFormData
  onChange: (name: string, value: string | boolean) => void
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void
  onDownload: (quality: string) => void
  previewRef?: RefObject<HTMLDivElement | null>
}

export const PreviewForm: React.FC<IDCardPreviewFormProps> = ({ formData, onChange, onDownload, previewRef }) => {
  // 获取表单上下文
  const form = useFormContext()

  // 导出质量
  const [exportQuality, setExportQuality] = useState<string>("high")

  // 处理下载按钮点击
  const handleDownload = () => {
    onDownload(exportQuality)
  }

  // 处理质量选择
  const handleQualityChange = (quality: string) => {
    setExportQuality(quality)
  }

  // 预览内容
  const previewContent = (
    <div id="student-card" ref={previewRef} className="w-full max-w-md">
      {/* 卡片正面预览 */}
      <CardPreview formData={formData} showBack={false} />

      {/* 卡片背面预览 - 仅当背面可用时显示 */}
      {formData.backEnabled && (
        <div className="mt-4">
          <CardPreview formData={formData} showBack={true} />
        </div>
      )}
    </div>
  )

  // 底部操作区
  const footerContent = (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 导出质量选择 */}
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full">
                {EXPORT_QUALITY_OPTIONS.find((opt) => opt.value === exportQuality)?.label || "选择导出质量"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {EXPORT_QUALITY_OPTIONS.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => handleQualityChange(option.value)}
                  className="flex items-center justify-between"
                >
                  {option.label}
                  {exportQuality === option.value && (
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-2"
                    >
                      <path
                        d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* 下载按钮 */}
        <Button variant="default" onClick={handleDownload} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          下载学生证
        </Button>
      </div>
    </>
  )

  return (
    <PreviewContainer title="学生证预览" footer={footerContent}>
      {previewContent}
    </PreviewContainer>
  )
}

export default PreviewForm
