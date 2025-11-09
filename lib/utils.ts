import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { PROGRAM_DURATION } from "./constants"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 计算过期年份的辅助函数
export const calculateExpiryYear = (enrollmentYear: number, programType: string): number => {
  return enrollmentYear + (PROGRAM_DURATION[programType as keyof typeof PROGRAM_DURATION] || PROGRAM_DURATION.default)
}

// 生成随机卡号
export const generateRandomCardNumber = (): string => {
  return "C" + Math.floor(10000000 + Math.random() * 90000000).toString()
}

// 将hex颜色转换为rgba
export const hexToRgba = (hex: string, alpha = 1): string => {
  const r = Number.parseInt(hex.slice(1, 3), 16)
  const g = Number.parseInt(hex.slice(3, 5), 16)
  const b = Number.parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

// 将水印颜色和透明度转换为rgba
export const getWatermarkColor = (color: string, opacity: string): string => {
  return hexToRgba(color, Number(opacity) / 100)
}

// 格式化有效期日期显示
export const formatValidityDate = (dateStr: string): string => {
  if (!dateStr) return ""
  return dateStr.replace("-", "/")
}

// 处理卡片背景图片样式，包括透明度
export const getBackgroundImageStyle = (image: string, opacity: string, isBack = false) => {
  if (!image) return {}

  const adjustedOpacity = isBack ? Number(opacity) / 200 : Number(opacity) / 100

  return {
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: adjustedOpacity,
  }
}

// 导出为图片功能
export const exportToImage = (canvas: HTMLCanvasElement, fileName: string, type: string) => {
  const link = document.createElement("a")
  link.download = `${fileName}.${type}`
  link.href = canvas.toDataURL(`image/${type}`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// 检查输入数据的有效性
export const validateFormData = (formData: any): Record<string, string> => {
  const errors: Record<string, string> = {}

  // 必填字段检查
  if (!formData.fullName) errors.fullName = "姓名不能为空"
  if (!formData.studentId) errors.studentId = "学生ID不能为空"
  if (!formData.faculty) errors.faculty = "院系不能为空"
  if (!formData.universityName) errors.universityName = "学校名称不能为空"

  // 日期检查
  if (formData.validityStart && formData.validityEnd) {
    const startDate = new Date(formData.validityStart)
    const endDate = new Date(formData.validityEnd)
    if (startDate > endDate) {
      errors.validityEnd = "有效期结束日期必须晚于开始日期"
    }
  }

  return errors
}

// 格式化日期
export function formatDate(dateString: string): string {
  if (!dateString) return ""

  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return dateString

    // 格式化为 YYYY年MM月DD日 格式
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return `${year}年${month.toString().padStart(2, "0")}月${day.toString().padStart(2, "0")}日`
  } catch (error) {
    console.error("日期格式化错误:", error)
    return dateString
  }
}
