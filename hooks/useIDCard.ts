"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import JsBarcode from "jsbarcode"
import type { IDCardFormData, CardStyle } from "@/lib/types"
import { DEFAULT_FORM_DATA, DEFAULT_CARD_STYLE } from "@/lib/constants"
import { calculateExpiryYear, validateFormData } from "@/lib/utils"

export const useIDCard = (initialData: IDCardFormData = DEFAULT_FORM_DATA) => {
  // 卡片表单数据
  const [formData, setFormData] = useState<IDCardFormData>(initialData)

  // 表单错误
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // 卡片样式
  const [cardStyle, setCardStyle] = useState<CardStyle>(DEFAULT_CARD_STYLE)

  // 条形码引用
  const barcodeRefs = {
    modern: useRef<SVGSVGElement>(null),
    classic: useRef<SVGSVGElement>(null),
    minimal: useRef<SVGSVGElement>(null),
    landscape: useRef<SVGSVGElement>(null),
  }

  // 验证表单数据
  useEffect(() => {
    setFormErrors(validateFormData(formData))
  }, [formData])

  // 生成条形码
  useEffect(() => {
    if (formData.codeType === "barcode" || formData.orientation === "landscape") {
      const studentId = formData.studentId || "S12345678"

      // 生成各种样式的条形码
      generateBarcode(barcodeRefs.modern.current, studentId, {
        width: 2,
        height: 40,
        fontSize: 12,
        displayValue: true,
      })

      generateBarcode(barcodeRefs.classic.current, studentId, {
        width: 1.5,
        height: 30,
        fontSize: 10,
        displayValue: true,
      })

      generateBarcode(barcodeRefs.minimal.current, studentId, {
        width: 2,
        height: 40,
        fontSize: 12,
        displayValue: true,
      })

      generateBarcode(barcodeRefs.landscape.current, studentId, {
        width: 1.5,
        height: 24,
        fontSize: 10,
        displayValue: false,
        textMargin: 0,
      })
    }
  }, [formData.studentId, formData.codeType, formData.orientation, cardStyle])

  // 处理输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    // 当入学年份改变时，自动推断过期时间
    if (name === "enrollmentYear") {
      const year = Number.parseInt(value)
      if (!isNaN(year)) {
        const expiryYear = calculateExpiryYear(year, formData.programType)
        setFormData({
          ...formData,
          [name]: value,
          validityEnd: `${expiryYear}-06`, // 假设学年6月结束
        })
      }
    }
  }

  // 处理选择变化
  const handleSelectChange = (name: string, value: string | boolean) => {
    setFormData({ ...formData, [name]: value })

    // 当课程类型改变时，自动推断过期时间
    if (name === "programType" && typeof value === "string") {
      const enrollmentYear = Number.parseInt(formData.enrollmentYear)
      if (!isNaN(enrollmentYear)) {
        const expiryYear = calculateExpiryYear(enrollmentYear, value)
        setFormData({
          ...formData,
          [name]: value,
          validityEnd: `${expiryYear}-06`, // 假设学年6月结束
        })
      }
    }
  }

  // 处理文件上传
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({ ...formData, [field]: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  // 重置表单
  const resetForm = () => {
    setFormData(DEFAULT_FORM_DATA)
    setFormErrors({})
  }

  // 下载卡片
  const downloadCard = async (quality: string) => {
    const cardElement = document.getElementById("student-card")
    if (!cardElement) return

    try {
      // 根据导出质量设置scale
      let scaleValue = 2
      switch (quality) {
        case "low":
          scaleValue = 2
          break
        case "medium":
          scaleValue = 3
          break
        case "high":
          scaleValue = 4
          break
        case "ultra":
          scaleValue = 6
          break
        default:
          scaleValue = 4
      }

      // 动态导入html2canvas
      const html2canvasModule = await import("html2canvas")
      const html2canvas = html2canvasModule.default

      // 捕获卡片元素
      const canvas = await html2canvas(cardElement, {
        scale: scaleValue, // 根据用户选择的质量设置缩放参数
        useCORS: true, // 允许加载跨域图像
        backgroundColor: null, // 保持背景透明
        logging: false, // 关闭日志
        allowTaint: true, // 允许污染画布
        scrollY: -window.scrollY, // 确保捕获整个内容，即使有滚动
      })

      // 创建下载链接
      const link = document.createElement("a")

      // 将canvas转换为dataURL
      const image = canvas.toDataURL("image/png")

      // 设置下载属性
      link.href = image
      link.download = `student-id-${formData.studentId || "card"}.png`

      // 触发下载
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err) {
      console.error("Error generating image:", err)
      alert("无法生成图片，请稍后再试")
    }
  }

  // 辅助函数：生成条形码
  const generateBarcode = (barcodeRef: SVGSVGElement | null, value: string, options: any) => {
    if (barcodeRef) {
      try {
        JsBarcode(barcodeRef, value, {
          format: "CODE128",
          lineColor: "#000",
          ...options,
          margin: 0,
          background: "transparent",
        })
      } catch (e) {
        console.error("Error generating barcode:", e)
      }
    }
  }

  return {
    formData,
    formErrors,
    cardStyle,
    barcodeRefs,
    setFormData,
    setCardStyle,
    handleInputChange,
    handleSelectChange,
    handleFileChange,
    resetForm,
    downloadCard,
  }
}
