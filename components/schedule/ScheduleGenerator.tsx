"use client"

import { useRef, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import html2canvas from "html2canvas"
import { exportToImage } from "@/lib/utils"
import { useSchedule } from "@/hooks/useSchedule"
import { DEFAULT_SCHEDULE_DATA } from "@/lib/constants"
import ScheduleInfoForm from "./ScheduleInfoForm"
import ScheduleDesignForm from "./ScheduleDesignForm"
import SchedulePreview from "./SchedulePreview"
import CourseEditor from "./CourseEditor"
import type { ScheduleFormData, ScheduleCourse } from "@/lib/types"

export default function ScheduleGenerator() {
  // 预览引用
  const previewRef = useRef<HTMLDivElement>(null)

  // 活动标签状态
  const [activeTab, setActiveTab] = useState("info")

  // 使用react-hook-form
  const form = useForm<ScheduleFormData>({
    defaultValues: DEFAULT_SCHEDULE_DATA,
  })

  // 使用自定义Hook获取课程表状态和处理函数
  const {
    formData,
    formErrors,
    editingCourse,
    handleInputChange,
    handleFileChange,
    addCourse,
    editCourse,
    saveCourse,
    cancelEditCourse,
    deleteCourse,
  } = useSchedule(DEFAULT_SCHEDULE_DATA)

  // 处理表单字段变更
  const handleFormChange = (name: string, value: string | boolean | number | string[] | ScheduleCourse[]) => {
    if (typeof value === "string" || typeof value === "boolean" || typeof value === "number") {
      handleInputChange({ target: { name, value, type: typeof value } } as any)
    } else {
      // 处理数组类型的值
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  // 设置表单数据（用于数组类型的值）
  const setFormData = (updater: (prev: ScheduleFormData) => ScheduleFormData) => {
    const newData = updater(formData)
    Object.entries(newData).forEach(([key, value]) => {
      if (key !== "courses" && key !== "daysOfWeek") {
        if (typeof value === "string" || typeof value === "boolean" || typeof value === "number") {
          handleInputChange({ target: { name: key, value, type: typeof value } } as any)
        }
      }
    })

    // 特殊处理数组类型
    if (newData.courses !== formData.courses) {
      handleFormChange("courses", newData.courses)
    }
  }

  // 下载课程表图片
  const handleDownload = async (quality: string) => {
    if (!previewRef.current) return

    // 验证表单数据
    if (Object.keys(formErrors).length > 0) {
      alert("请完成所有必填字段。")
      return
    }

    const fileName = `${formData.fullName || "student"}_schedule`

    try {
      // 1. 导出前临时注入样式修复
      const fixStyle = document.createElement("style")
      fixStyle.id = "export-fix-style"
      fixStyle.textContent = `
        img { 
          display: inline-block !important; 
        }
        .schedule-container {
          font-variant: normal !important;
        }
        .h-full {
          height: 100% !important;
        }
        .w-full {
          width: 100% !important;
        }
        .object-contain {
          object-fit: contain !important;
        }
      `
      document.head.appendChild(fixStyle)

      // 2. 导出前确保滚动条位置正确
      window.scrollTo(0, 0)

      // 3. 等待渲染完成
      await new Promise((resolve) => setTimeout(resolve, 300))

      // 设置缩放比例
      const scaleValue = quality === "ultra" ? 6 : quality === "high" ? 4 : quality === "medium" ? 3 : 2

      // 4. 使用html2canvas导出
      const canvas = await html2canvas(previewRef.current, {
        scale: scaleValue,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
        scrollY: -window.scrollY,
        foreignObjectRendering: false,
      })

      // 5. 导出图片
      exportToImage(canvas, fileName, "png")

      // 6. 移除临时样式
      document.getElementById("export-fix-style")?.remove()
    } catch (err) {
      console.error("导出图片时发生错误:", err)
      alert("导出图片失败，请稍后再试。")
    }
  }

  return (
    <div>
      {/* 表单错误提示 */}
      {Object.keys(formErrors).length > 0 && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>表单信息不完整</AlertTitle>
          <AlertDescription>请填写所有必填字段后再继续操作。</AlertDescription>
        </Alert>
      )}

      {/* 课程编辑器 */}
      {editingCourse && <CourseEditor course={editingCourse} onUpdate={saveCourse} onCancel={cancelEditCourse} />}

      {!editingCourse && (
        <Form {...form}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full tabs-container">
            <div className="bg-gray-100 rounded-md p-2 w-full mb-6">
              <TabsList className="flex mx-0 tabs-list overflow-x-auto bg-transparent">
                <TabsTrigger className="tabs-trigger" value="info">
                  课程信息
                </TabsTrigger>
                <TabsTrigger className="tabs-trigger" value="design">
                  设计选项
                </TabsTrigger>
                <TabsTrigger className="tabs-trigger" value="preview">
                  预览
                </TabsTrigger>
              </TabsList>
            </div>

            {/* 课程信息表单 */}
            <TabsContent value="info" className="mt-0">
              <ScheduleInfoForm
                formData={formData}
                onChange={handleFormChange}
                onFileChange={handleFileChange}
                onAddCourse={addCourse}
                onEditCourse={editCourse}
                onDeleteCourse={deleteCourse}
              />
            </TabsContent>

            {/* 设计选项表单 */}
            <TabsContent value="design" className="mt-0">
              <ScheduleDesignForm formData={formData} onChange={handleFormChange} onFileChange={handleFileChange} />
            </TabsContent>

            {/* 预览 */}
            <TabsContent value="preview" className="mt-0">
              <SchedulePreview
                formData={formData}
                onChange={handleFormChange}
                onFileChange={handleFileChange}
                onDownload={handleDownload}
                previewRef={previewRef}
              />
            </TabsContent>
          </Tabs>
        </Form>
      )}
    </div>
  )
}
