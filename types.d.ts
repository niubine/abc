import type React from "react"
// Existing types remain unchanged...

export type ExportQuality = "high" | "medium" | "low"

/**
 * 录取通知书表单数据
 */
export interface AdmissionLetterFormData {
  // 大学信息
  universityName: string
  universityLogo: string
  universityAddress: string
  universityContact: string
  universityWebsite: string

  // 学生信息
  studentName: string
  studentId: string
  studentAddress: string
  studentEmail: string
  studentPhone: string

  // 录取信息
  programName: string
  departmentName: string
  degreeType: string
  admissionDate: string
  programStartDate: string
  programDuration: string
  scholarshipInfo: string

  // 信件内容
  letterTitle: string
  letterContent: string
  congratulatoryMessage: string
  nextStepsInfo: string

  // 签名信息
  signatoryName: string
  signatoryTitle: string
  signatorySignature: string
  officialStamp: string

  // 设计选项
  headerColor: string
  textColor: string
  accentColor: string
  paperColor: string
  fontFamily: string

  // 水印设置
  enableWatermark: boolean
  watermarkText: string
  watermarkColor: string
  watermarkOpacity: number
  watermarkSize: string
  watermarkAngle: string

  // 边框设置
  enableBorder: boolean
  borderColor: string
  borderStyle: string

  // 导出选项
  pngQuality?: ExportQuality
}

/**
 * 成绩单课程数据
 */
export interface TranscriptCourse {
  id: string
  courseCode: string
  courseName: string
  credits: number
  grade: string
  semester: string
  academicYear: string
  completed: boolean
}

/**
 * 成绩单表单数据
 */
export interface TranscriptFormData {
  // 大学信息
  universityName: string
  universityLogo: string
  universityAddress: string
  universityContact: string
  universityWebsite: string

  // 学生信息
  studentName: string
  studentId: string
  programName: string
  departmentName: string
  degreeType: string
  enrollmentDate: string
  expectedGraduationDate: string
  studentPhoto: string

  // 成绩信息
  courses: TranscriptCourse[]
  currentGPA: string
  totalCredits: number
  completedCredits: number

  // 签发信息
  issueDate: string
  registrarName: string
  registrarTitle: string
  registrarSignature: string

  // 设计选项
  headerColor: string
  tableHeaderColor: string
  textColor: string
  accentColor: string
  paperColor: string
  fontFamily: string

  // 水印设置
  enableWatermark: boolean
  watermarkText: string
  watermarkColor: string
  watermarkOpacity: number
  watermarkSize: string
  watermarkAngle: string

  // 边框设置
  enableBorder: boolean
  borderColor: string
  borderStyle: string

  // 显示选项
  showStudentPhoto: boolean
  showGradePoints: boolean
  showGradeScale: boolean
  showSemesterGPA: boolean

  // 导出选项
  pngQuality?: ExportQuality
}

// 成绩单预览组件属性
export interface TranscriptPreviewProps {
  formData: TranscriptFormData
  onChange: (name: string, value: string | boolean | number) => void
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void
  onDownload?: (quality: string) => void
  previewRef?: React.RefObject<HTMLDivElement>
}

// 成绩单表单组件属性
export interface TranscriptFormProps {
  formData: TranscriptFormData
  onChange: (name: string, value: string | boolean | number) => void
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void
}

// 成绩单课程编辑器属性
export interface CourseGradeEditorProps {
  courses: TranscriptCourse[]
  onChange: (courses: TranscriptCourse[]) => void
}

// 录取通知书预览组件属性
export interface AdmissionLetterPreviewProps {
  formData: AdmissionLetterFormData
  onChange: (name: string, value: string | boolean | number) => void
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void
  onDownload?: (quality: string) => void
  previewRef?: React.RefObject<HTMLDivElement>
}

// 录取通知书表单组件属性
export interface AdmissionLetterFormProps {
  formData: AdmissionLetterFormData
  onChange: (name: string, value: string | boolean | number) => void
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void
}
