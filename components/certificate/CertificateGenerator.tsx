"use client"

import type React from "react"
import { useRef } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { useCertificate } from "@/hooks/useCertificate"
import { DEFAULT_CERTIFICATE_DATA } from "@/lib/constants"
import CertificateInfoForm from "./CertificateInfoForm"
import CertificateDesignForm from "./CertificateDesignForm"
import CertificatePreview from "./CertificatePreview"
import type { CertificateFormData } from "@/lib/types"
import html2canvas from "html2canvas"
import { exportToImage } from "@/lib/utils"

const CertificateGenerator: React.FC = () => {
  const previewRef = useRef<HTMLDivElement>(null)

  // 使用react-hook-form
  const form = useForm<CertificateFormData>({
    defaultValues: DEFAULT_CERTIFICATE_DATA as CertificateFormData,
  })

  // 使用自定义Hook获取证书状态和处理函数
  const { formData, formErrors, handleInputChange, handleFileChange, resetForm } =
    useCertificate(DEFAULT_CERTIFICATE_DATA)

  // 处理表单字段变更
  const handleFormChange = (name: string, value: string | boolean) => {
    handleInputChange({ target: { name, value } } as any)
  }

  // 下载证书图片
  const handleDownload = (quality: string) => {
    if (!previewRef.current) return

    // 验证表单数据
    const errors = validateCertificateData(formData)
    if (Object.keys(errors).length > 0) {
      alert("请先完成必填信息。")
      return
    }

    const fileName = `${formData.fullName || "student"}_certificate`

    // 添加临时样式修复
    const styleFixElement = document.createElement("style")
    styleFixElement.id = "export-fix-style"
    styleFixElement.innerHTML = `
      #certificate-preview img { display: inline-block !important; }
      #certificate-preview { font-variant: normal !important; }
      .h-full { height: 100% !important; }
      .w-full { width: 100% !important; }
      .object-contain { object-fit: contain !important; }
      .object-cover { object-fit: cover !important; }
    `
    document.head.appendChild(styleFixElement)

    // 滚动到顶部，确保渲染正确
    window.scrollTo(0, 0)

    // 添加小延迟，确保渲染完成
    setTimeout(() => {
      html2canvas(previewRef.current as HTMLElement, {
        scale: quality === "ultra" ? 4 : quality === "high" ? 3 : quality === "medium" ? 2 : 1,
        useCORS: true,
        allowTaint: true,
        backgroundColor: formData.paperColor,
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
        },
      }).then((canvas) => {
        exportToImage(canvas, fileName, "png")
        // 移除临时样式
        document.getElementById("export-fix-style")?.remove()
      })
    }, 300)
  }

  // 验证证书数据
  const validateCertificateData = (data: CertificateFormData): Record<string, string> => {
    const errors: Record<string, string> = {}

    // 必填字段验证
    if (!data.fullName) errors.fullName = "必填项"
    if (!data.studentId) errors.studentId = "必填项"
    if (!data.universityName) errors.universityName = "必填项"
    if (!data.faculty) errors.faculty = "必填项"
    if (!data.major) errors.major = "必填项"
    if (!data.degreeType) errors.degreeType = "必填项"
    if (!data.studyMode) errors.studyMode = "必填项"
    if (!data.enrollmentDate) errors.enrollmentDate = "必填项"
    if (!data.expectedGraduationDate) errors.expectedGraduationDate = "必填项"
    if (!data.issueDate) errors.issueDate = "必填项"

    return errors
  }

  return (
    <div>
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
                证明信息
              </TabsTrigger>
              <TabsTrigger className="tabs-trigger" value="design">
                设计选项
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="info" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 表单部分 */}
              <div className="order-2 lg:order-1">
                <CertificateInfoForm formData={formData} onChange={handleFormChange} onFileChange={handleFileChange} />
              </div>

              {/* 预览部分 */}
              <div className="order-1 lg:order-2">
                <CertificatePreview
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 表单部分 */}
              <div className="order-2 lg:order-1">
                <CertificateDesignForm formData={formData} onChange={handleFormChange} />
              </div>

              {/* 预览部分 */}
              <div className="order-1 lg:order-2">
                <CertificatePreview
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
    </div>
  )
}

export default CertificateGenerator
