"use client"

import type React from "react"

import { useRef, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdmissionLetterInfoForm from "./AdmissionLetterInfoForm"
import AdmissionLetterDesignForm from "./AdmissionLetterDesignForm"
import AdmissionLetterPreview from "./AdmissionLetterPreview"
import { useAdmissionLetter } from "@/hooks/useAdmissionLetter"
import { exportToImage } from "@/lib/utils"
import html2canvas from "html2canvas"

/**
 * 录取通知书生成器组件
 */
export default function AdmissionLetterGenerator() {
  // 使用录取通知书Hook
  const { formData, formErrors, handleInputChange, handleFileChange, resetForm, validateForm, setFormData } =
    useAdmissionLetter()

  // 预览引用
  const previewRef = useRef<HTMLDivElement>(null)

  // 活动标签状态
  const [activeTab, setActiveTab] = useState("info")

  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setActiveTab("preview")
    }
  }

  // 处理字段变更
  const handleFieldChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // 处理下载
  const handleDownload = async (quality: string) => {
    if (!previewRef.current) return

    try {
      // 设置导出质量
      const scale = quality === "ultra" ? 4 : quality === "high" ? 3 : quality === "medium" ? 2 : 1

      // 使用html2canvas捕获预览
      const canvas = await html2canvas(previewRef.current, {
        scale,
        useCORS: true,
        logging: false,
        backgroundColor: formData.paperColor || "#ffffff",
      })

      // 导出为PNG
      exportToImage(canvas, `admission-letter-${formData.studentName.replace(/\s+/g, "-")}`, "png")
    } catch (error) {
      console.error("导出错误:", error)
      alert("导出过程中发生错误，请重试。")
    }
  }

  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full tabs-container">
        <div className="bg-gray-100 rounded-md p-2 w-full mb-6">
          <TabsList className="flex mx-0 tabs-list overflow-x-auto bg-transparent">
            <TabsTrigger className="tabs-trigger" value="info">
              录取信息
            </TabsTrigger>
            <TabsTrigger className="tabs-trigger" value="design">
              设计选项
            </TabsTrigger>
            <TabsTrigger className="tabs-trigger" value="preview">
              预览
            </TabsTrigger>
          </TabsList>
        </div>

        {/* 信息表单 */}
        <TabsContent value="info" className="mt-0">
          <AdmissionLetterInfoForm
            formData={formData}
            formErrors={formErrors}
            onChange={handleInputChange}
            onFileChange={handleFileChange}
            onSubmit={handleSubmit}
          />
        </TabsContent>

        {/* 设计表单 */}
        <TabsContent value="design" className="mt-0">
          <AdmissionLetterDesignForm
            formData={formData}
            formErrors={formErrors}
            onChange={handleInputChange}
            onFileChange={handleFileChange}
            onSubmit={handleSubmit}
          />
        </TabsContent>

        {/* 预览 */}
        <TabsContent value="preview" className="mt-0">
          <AdmissionLetterPreview
            formData={formData}
            onChange={handleFieldChange}
            onDownload={handleDownload}
            previewRef={previewRef}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
