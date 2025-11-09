"use client"

import { useRef } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import InfoForm from "@/components/id-card/form/InfoForm"
import DesignForm from "@/components/id-card/form/DesignForm"
import PreviewForm from "@/components/id-card/form/PreviewForm"
import { useIDCard } from "@/hooks/useIDCard"
import { DEFAULT_FORM_DATA } from "@/lib/constants"
import html2canvas from "html2canvas"
import { exportToImage, validateFormData } from "@/lib/utils"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import type { IDCardFormData } from "@/lib/types"
import CertificateGenerator from "@/components/certificate/CertificateGenerator"
import ScheduleGenerator from "@/components/schedule/ScheduleGenerator"
import AdmissionLetterGenerator from "@/components/admission-letter/AdmissionLetterGenerator"
import TranscriptGenerator from "@/components/transcript/TranscriptGenerator"
import Footer from "@/components/layout/Footer"

/**
 * 主页组件
 */
export default function Home() {
  // 使用非空断言，确保ref类型不包含null
  const previewRef = useRef<HTMLDivElement>(null)

  // 使用react-hook-form
  const form = useForm<IDCardFormData>({
    defaultValues: DEFAULT_FORM_DATA as IDCardFormData,
  })

  // 使用自定义Hook获取卡片状态和处理函数
  const { formData, formErrors, handleInputChange, handleFileChange, resetForm } = useIDCard(
    DEFAULT_FORM_DATA as IDCardFormData,
  )

  // 处理表单字段变更
  const handleFormChange = (name: string, value: string | boolean) => {
    handleInputChange({ target: { name, value } } as any)
  }

  // 下载卡片图片
  const handleDownload = async (quality: string) => {
    if (!previewRef.current) return

    // 验证表单数据
    const errors = validateFormData(formData)
    if (Object.keys(errors).length > 0) {
      alert("请先完成必填信息。")
      return
    }

    const fileName = `${formData.fullName || "student"}_id_card`

    try {
      // 1. 导出前临时注入样式修复
      const fixStyle = document.createElement("style")
      fixStyle.id = "export-fix-style"
      fixStyle.textContent = `
        img { 
          display: inline-block !important; 
        }
        #student-card {
          font-variant: normal !important;
        }
        .realistic-card {
          position: relative !important;
        }
        .realistic-content {
          position: relative !important;
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
        .object-cover {
          object-fit: cover !important;
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
        onclone: (documentClone: Document) => {
          // 在克隆文档中再次应用样式修复
          const imgElements = documentClone.querySelectorAll("img")
          imgElements.forEach((element) => {
            if (element instanceof HTMLElement) {
              element.style.display = "inline-block"
            }
          })

          const cardContainer = documentClone.getElementById("student-card")
          if (cardContainer) {
            cardContainer.style.fontVariant = "normal"
          }
        },
      })

      // 5. 导出图片
      exportToImage(canvas, fileName, "png")

      // 6. 移除临时样式
      document.getElementById("export-fix-style")?.remove()
    } catch (err) {
      console.error("导出图片时发生错误:", err)
      alert("导出图片失败，请稍后再试")
    }
  }

  // 打印卡片
  const handlePrint = () => {
    window.print()
  }

  return (
    <>
      <div className="container mx-auto px-4 pt-4 pb-8">
        {/* 证件类型选择 */}
        <Tabs defaultValue="id-card" className="w-full mb-6 tabs-container">
          <div className="bg-gray-100 rounded-md p-2 w-full">
            <TabsList className="flex mx-0 tabs-list overflow-x-auto bg-transparent">
              <TabsTrigger className="tabs-trigger" value="id-card">
                学生证
              </TabsTrigger>
              <TabsTrigger className="tabs-trigger" value="certificate">
                在读证明
              </TabsTrigger>
              <TabsTrigger className="tabs-trigger" value="schedule">
                课程表
              </TabsTrigger>
              <TabsTrigger className="tabs-trigger" value="admission">
                录取通知书
              </TabsTrigger>
              <TabsTrigger className="tabs-trigger" value="transcript">
                成绩单
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="id-card">
            {/* 表单错误提示 */}
            {Object.keys(formErrors).length > 0 && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>表单信息不完整</AlertTitle>
                <AlertDescription>请填写所有必填字段后再继续操作。</AlertDescription>
              </Alert>
            )}

            <Form {...form}>
              <Tabs defaultValue="info" className="w-full tabs-container">
                <div className="bg-gray-100 rounded-md p-2 w-full mb-6">
                  <TabsList className="flex mx-0 tabs-list overflow-x-auto bg-transparent">
                    <TabsTrigger className="tabs-trigger" value="info">
                      证件信息
                    </TabsTrigger>
                    <TabsTrigger className="tabs-trigger" value="design">
                      设计选项
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="info" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 表单部分 */}
                    <div className="order-2 md:order-1">
                      <InfoForm formData={formData} onChange={handleFormChange} onFileChange={handleFileChange} />
                    </div>

                    {/* 预览部分 */}
                    <div className="order-1 md:order-2">
                      <PreviewForm
                        formData={formData}
                        onChange={handleFormChange}
                        onFileChange={handleFileChange}
                        onDownload={handleDownload}
                        previewRef={previewRef}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="design" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 表单部分 */}
                    <div className="order-2 md:order-1">
                      <DesignForm formData={formData} onChange={handleFormChange} onFileChange={handleFileChange} />
                    </div>

                    {/* 预览部分 */}
                    <div className="order-1 md:order-2">
                      <PreviewForm
                        formData={formData}
                        onChange={handleFormChange}
                        onFileChange={handleFileChange}
                        onDownload={handleDownload}
                        previewRef={previewRef}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Form>
          </TabsContent>

          <TabsContent value="certificate">
            <CertificateGenerator />
          </TabsContent>

          <TabsContent value="schedule">
            <ScheduleGenerator />
          </TabsContent>

          <TabsContent value="admission">
            <AdmissionLetterGenerator />
          </TabsContent>

          <TabsContent value="transcript">
            <TranscriptGenerator />
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </>
  )
}
