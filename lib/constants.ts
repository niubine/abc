import type {
  CardStyle,
  CardOrientation,
  CodeType,
  IDCardFormData,
  CertificateFormData,
  ScheduleFormData,
  ScheduleCourse,
  AdmissionLetterFormData,
  TranscriptFormData,
  TranscriptCourse,
} from "./types"

// 默认卡片方向
export const DEFAULT_CARD_ORIENTATION: CardOrientation = "landscape"

// 默认卡片风格
export const DEFAULT_CARD_STYLE: CardStyle = "modern"

// 默认码类型
export const DEFAULT_CODE_TYPE: CodeType = "barcode"

// 导出质量选项
export const EXPORT_QUALITY_OPTIONS = [
  { label: "标准质量 (较小文件)", value: "low" },
  { label: "高清质量", value: "medium" },
  { label: "超高清 (推荐)", value: "high" },
  { label: "最高质量 (大文件)", value: "ultra" },
]

// 卡片方向选项
export const CARD_ORIENTATION_OPTIONS = [
  { label: "Portrait", value: "portrait" },
  { label: "Landscape (Credit Card Size)", value: "landscape" },
]

// 卡片风格选项
export const CARD_STYLE_OPTIONS = [{ label: "Modern", value: "modern" }]

// 码类型选项
export const CODE_TYPE_OPTIONS = [
  { label: "Barcode", value: "barcode" },
  { label: "QR Code", value: "qrcode" },
]

// 课程类型选项
export const PROGRAM_TYPE_OPTIONS = [
  { label: "Bachelor", value: "Bachelor" },
  { label: "Master", value: "Master" },
  { label: "PhD", value: "PhD" },
]

// 学位类型选项
export const DEGREE_TYPE_OPTIONS = [
  { label: "Bachelor's Degree", value: "Bachelor" },
  { label: "Master's Degree", value: "Master" },
  { label: "PhD", value: "PhD" },
]

// 学习模式选项
export const STUDY_MODE_OPTIONS = [
  { label: "Full-time", value: "Full-time" },
  { label: "Part-time", value: "Part-time" },
]

// 字体选项
export const FONT_FAMILY_OPTIONS = [
  { label: "Times New Roman", value: "Times New Roman, serif" },
  { label: "Arial", value: "Arial, sans-serif" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Calibri", value: "Calibri, sans-serif" },
  { label: "Garamond", value: "Garamond, serif" },
  { label: "Palatino", value: "Palatino Linotype, Book Antiqua, Palatino, serif" },
  { label: "Century Gothic", value: "Century Gothic, sans-serif" },
  { label: "Tahoma", value: "Tahoma, sans-serif" },
]

// 边框样式选项
export const BORDER_STYLE_OPTIONS = [
  { label: "Solid", value: "solid" },
  { label: "Dashed", value: "dashed" },
  { label: "Dotted", value: "dotted" },
  { label: "Double", value: "double" },
]

// 花纹类型选项
export const PATTERN_TYPE_OPTIONS = [
  { label: "Corner Pattern", value: "corner" },
  { label: "Border Pattern", value: "border" },
  { label: "Background Pattern", value: "background" },
  { label: "Badge Style", value: "badge" },
]

// 花纹位置选项
export const PATTERN_POSITION_OPTIONS = [
  { label: "All Positions", value: "all" },
  { label: "Top Only", value: "top" },
  { label: "Bottom Only", value: "bottom" },
  { label: "Left Only", value: "left" },
  { label: "Right Only", value: "right" },
  { label: "Corners Only", value: "corners" },
]

// 各种课程的标准学制年限
export const PROGRAM_DURATION = {
  Bachelor: 4,
  Master: 2,
  PhD: 4,
  default: 4,
}

// 默认表单数据
export const DEFAULT_FORM_DATA: IDCardFormData = {
  // 个人信息
  fullName: "Emily Johnson",
  studentId: "2023001001",
  faculty: "School of Computer Science",
  universityName: "International University",
  validityStart: new Date().toISOString().split("T")[0],
  validityEnd: new Date(new Date().setFullYear(new Date().getFullYear() + 4)).toISOString().split("T")[0],
  enrollmentYear: new Date().getFullYear().toString(),
  programType: "Bachelor",
  photo: "/placeholder.svg?height=150&width=120",
  logo: "/placeholder.svg?height=60&width=60",
  cardColor: "#1e40af",
  textColor: "#ffffff",
  backgroundImage: "/placeholder.svg?height=90&width=140",
  backgroundOpacity: "30",

  // 卡片选项
  orientation: DEFAULT_CARD_ORIENTATION,
  cardStyle: DEFAULT_CARD_STYLE,
  codeType: DEFAULT_CODE_TYPE,
  cardNumber: "C" + Math.floor(10000000 + Math.random() * 90000000).toString(), // 卡编号
  officialSignature: "S. Davis", // 教务处签名
  realisticEffect: false, // 真实质感效果
  pngQuality: "high", // PNG导出质量: low, medium, high, ultra

  // 水印设置
  enableWatermark: true,
  watermarkText: "AUTHENTIC",
  watermarkColor: "#000000",
  watermarkOpacity: 3, // 水印透明度 (百分比，这里表示3%)
  watermarkSize: "14", // 水印大小级别
  watermarkAngle: "-30", // 水印角度
  watermarkLineWidth: "20", // 斜纹线条宽度

  // 大学信息
  universityAddress: "123 University Avenue, Boston, MA 02115",
  universityContact: "(617) 555-1234",
  universityWebsite: "www.university.edu",

  // 背面设置
  backEnabled: true,
  termsOfUse:
    "This card must be carried while on campus. Violation of university policies may result in card revocation.",
  termsText: "Terms and Conditions",
  backTitle: "Student ID Card Information",
  useCustomBack: false,
  backContent: "Thank you for using our student ID system.",
  emergencyContact: "(617) 555-4321",
  accessList: "Library, Cafeteria, Dormitory, Computer Labs, Gym",
  lostCardInfo: "If found, please return to the University Lost & Found Office or call the number below.",
  returnInfo: "",
  backLogo: "/placeholder.svg?height=60&width=60",
  backLogoOpacity: "70",
}

// 默认在读证明数据
export const DEFAULT_CERTIFICATE_DATA: CertificateFormData = {
  // 基本信息
  universityName: "International University",
  universityLogo: "/placeholder.svg?height=80&width=80",
  fullName: "Emily Johnson",
  studentId: "2023001001",
  birthDate: "1998-05-15",
  nationality: "United States",
  faculty: "School of Computer Science",
  major: "Computer Science",
  degreeType: "Bachelor",
  studyMode: "Full-time",
  enrollmentDate: "2023-09-01",
  expectedGraduationDate: "2027-06-30",
  currentYear: "First Year",
  studentPhoto: "",

  // 证书详情
  certificateTitle: "Certificate of Enrollment",

  // 证明内容
  certificateContent:
    "This is to certify that the above-named student is currently enrolled as a student in good standing at International University. The student is making satisfactory progress towards their degree.",

  // 签发信息
  issueDate: new Date().toISOString().split("T")[0],
  validityPeriod: "6 months",
  issuerTitle: "Registrar",
  issuerSignature: "Jane Smith",

  // 联系信息
  contactInfo:
    "For verification of this certificate, please contact the Office of the Registrar at registrar@internationaluniversity.edu or call +1 (617) 555-1234.",

  // 设计选项
  paperColor: "#ffffff",
  headerColor: "#1e40af",
  textColor: "#000000",
  fontFamily: "Times New Roman, serif",
  enableWatermark: false,
  watermarkText: "OFFICIAL DOCUMENT",
  watermarkOpacity: 5,
  watermarkColor: "#000000",
  watermarkSize: "14",
  watermarkAngle: "-30",
  watermarkLineWidth: "20",
  enableBorder: true,
  borderColor: "#1e40af",
  borderStyle: "solid",

  // 花纹设置
  enablePattern: true,
  patternType: "corner",
  patternColor: "#1e40af",
  patternOpacity: 15,
  patternSize: "30",
  patternPosition: "all",

  // 导出选项
  pngQuality: "high",
}

// 星期几选项
export const DAYS_OF_WEEK_OPTIONS = [
  { label: "Monday", value: "Monday" },
  { label: "Tuesday", value: "Tuesday" },
  { label: "Wednesday", value: "Wednesday" },
  { label: "Thursday", value: "Thursday" },
  { label: "Friday", value: "Friday" },
  { label: "Saturday", value: "Saturday" },
  { label: "Sunday", value: "Sunday" },
]

// 课程模式选项
export const COURSE_MODE_OPTIONS = [
  { label: "In-Person", value: "In-Person" },
  { label: "Online", value: "Online" },
  { label: "Hybrid", value: "Hybrid" },
]

// 课程类型选项
export const COURSE_TYPE_OPTIONS = [
  { label: "Lecture", value: "Lecture" },
  { label: "Seminar", value: "Seminar" },
  { label: "Lab", value: "Lab" },
  { label: "Tutorial", value: "Tutorial" },
  { label: "Workshop", value: "Workshop" },
]

// 课程颜色选项
export const COURSE_COLOR_OPTIONS = [
  { label: "Blue", value: "#3b82f6" },
  { label: "Green", value: "#10b981" },
  { label: "Red", value: "#ef4444" },
  { label: "Purple", value: "#8b5cf6" },
  { label: "Orange", value: "#f97316" },
  { label: "Pink", value: "#ec4899" },
  { label: "Cyan", value: "#06b6d4" },
  { label: "Yellow", value: "#eab308" },
  { label: "Indigo", value: "#4f46e5" },
  { label: "Teal", value: "#14b8a6" },
]

// 时间格式选项
export const HOUR_FORMAT_OPTIONS = [
  { label: "12-hour (AM/PM)", value: "12h" },
  { label: "24-hour", value: "24h" },
]

// 默认课程数据
const DEFAULT_COURSES: ScheduleCourse[] = [
  {
    id: "1",
    courseCode: "CS101",
    courseName: "Introduction to Computer Science",
    instructor: "Prof. John Smith",
    credits: 3,
    location: "Science Building",
    building: "SCI",
    room: "101",
    startTime: "09:00",
    endTime: "10:30",
    days: ["Monday", "Wednesday"],
    color: "#3b82f6",
    mode: "In-Person",
    type: "Lecture",
    notes: "Bring your laptop to every class",
  },
  {
    id: "2",
    courseCode: "MATH201",
    courseName: "Calculus II",
    instructor: "Dr. Sarah Johnson",
    credits: 4,
    location: "Mathematics Building",
    building: "MATH",
    room: "305",
    startTime: "11:00",
    endTime: "12:30",
    days: ["Tuesday", "Thursday"],
    color: "#10b981",
    mode: "In-Person",
    type: "Lecture",
    notes: "",
  },
  {
    id: "3",
    courseCode: "CS101L",
    courseName: "Intro to CS Lab",
    instructor: "TA Michael Brown",
    credits: 1,
    location: "Computer Lab",
    building: "SCI",
    room: "B12",
    startTime: "14:00",
    endTime: "16:00",
    days: ["Friday"],
    color: "#3b82f6",
    mode: "In-Person",
    type: "Lab",
    notes: "",
  },
  {
    id: "4",
    courseCode: "ENG105",
    courseName: "Academic Writing",
    instructor: "Prof. Emily Davis",
    credits: 3,
    location: "Online",
    building: "",
    room: "",
    startTime: "15:30",
    endTime: "17:00",
    days: ["Monday", "Wednesday"],
    color: "#ef4444",
    mode: "Online",
    type: "Seminar",
    notes: "Zoom link will be provided in the course portal",
  },
]

// 默认课程表数据
export const DEFAULT_SCHEDULE_DATA: ScheduleFormData = {
  // 基本信息
  universityName: "International University",
  universityLogo: "/placeholder.svg?height=80&width=80",
  department: "School of Computer Science",
  fullName: "Emily Johnson",
  studentId: "2023001001",
  major: "Computer Science",
  term: "Fall 2023",
  academicYear: "2023-2024",

  // 课程表设置
  scheduleTitle: "Course Schedule",
  courses: DEFAULT_COURSES,

  // 显示选项
  showWeekends: false,
  showInstructors: true,
  showLocations: true,
  showCourseType: true,
  showCredits: true,
  showNotes: true,

  // 时间设置
  startHour: 8,
  endHour: 20,
  hourFormat: "12h",

  // 设计选项
  headerColor: "#1e40af",
  tableHeaderColor: "#e2e8f0",
  textColor: "#000000",
  borderColor: "#cbd5e1",
  paperColor: "#ffffff",
  fontFamily: "Arial, sans-serif",

  // 水印设置
  enableWatermark: true,
  watermarkText: "OFFICIAL SCHEDULE",
  watermarkColor: "#000000",
  watermarkOpacity: 3,
  watermarkSize: "14",
  watermarkAngle: "-30",

  // 导出选项
  pngQuality: "high",
}

// 默认录取通知书数据
export const DEFAULT_ADMISSION_LETTER_DATA: AdmissionLetterFormData = {
  // 大学信息
  universityName: "International University",
  universityLogo: "/placeholder.svg?height=80&width=80",
  universityAddress: "123 University Avenue, Boston, MA 02115",
  universityContact: "(617) 555-1234",
  universityWebsite: "www.university.edu",

  // 学生信息
  studentName: "Emily Johnson",
  studentId: "2023001001",
  studentAddress: "456 Student Street, Boston, MA 02116",
  studentEmail: "emily.johnson@email.com",
  studentPhone: "(617) 555-5678",

  // 录取信息
  programName: "Computer Science",
  departmentName: "School of Computer Science",
  degreeType: "Bachelor",
  admissionDate: new Date().toISOString().split("T")[0],
  programStartDate: "2023-09-01",
  programDuration: "4 years",
  scholarshipInfo: "Merit Scholarship: $5,000 per year",

  // 信件内容
  letterTitle: "Letter of Admission",
  letterContent:
    "Dear Emily Johnson,\n\nWe are pleased to inform you that you have been accepted to the Computer Science program at International University for the Fall 2023 semester. Your academic achievements and personal qualities have impressed our admissions committee, and we believe you will make valuable contributions to our university community.\n\nYour admission is for the Bachelor's degree program in Computer Science, which is a 4-year program. Classes will begin on September 1, 2023.",
  congratulatoryMessage:
    "Congratulations on your acceptance! We look forward to welcoming you to our campus and supporting your academic journey.",
  nextStepsInfo:
    "To confirm your enrollment, please complete the following steps:\n1. Submit your enrollment confirmation by June 1, 2023\n2. Pay the enrollment deposit of $500\n3. Register for orientation (August 25-28, 2023)\n4. Complete housing application (if applicable)\n\nAdditional information regarding these steps will be sent to your email.",

  // 签名信息
  signatoryName: "Dr. Robert Anderson",
  signatoryTitle: "Dean of Admissions",
  signatorySignature: "",
  officialStamp: "",

  // 设计选项
  headerColor: "#1e40af",
  textColor: "#000000",
  accentColor: "#4f46e5",
  paperColor: "#ffffff",
  fontFamily: "Times New Roman, serif",

  // 水印设置
  enableWatermark: true,
  watermarkText: "OFFICIAL ADMISSION",
  watermarkColor: "#000000",
  watermarkOpacity: 3,
  watermarkSize: "14",
  watermarkAngle: "-30",

  // 边框设置
  enableBorder: true,
  borderColor: "#1e40af",
  borderStyle: "solid",

  // 导出选项
  pngQuality: "high",
}

// 默认成绩单课程数据
const DEFAULT_TRANSCRIPT_COURSES: TranscriptCourse[] = [
  {
    id: "1",
    courseCode: "CS101",
    courseName: "Introduction to Computer Science",
    credits: 3,
    grade: "A",
    semester: "Fall",
    academicYear: "2022-2023",
    completed: true,
  },
  {
    id: "2",
    courseCode: "MATH201",
    courseName: "Calculus I",
    credits: 4,
    grade: "B+",
    semester: "Fall",
    academicYear: "2022-2023",
    completed: true,
  },
  {
    id: "3",
    courseCode: "ENG105",
    courseName: "Academic Writing",
    credits: 3,
    grade: "A-",
    semester: "Fall",
    academicYear: "2022-2023",
    completed: true,
  },
  {
    id: "4",
    courseCode: "PHYS101",
    courseName: "Physics for Scientists and Engineers",
    credits: 4,
    grade: "B",
    semester: "Fall",
    academicYear: "2022-2023",
    completed: true,
  },
  {
    id: "5",
    courseCode: "CS102",
    courseName: "Data Structures and Algorithms",
    credits: 3,
    grade: "A",
    semester: "Spring",
    academicYear: "2022-2023",
    completed: true,
  },
  {
    id: "6",
    courseCode: "MATH202",
    courseName: "Calculus II",
    credits: 4,
    grade: "B+",
    semester: "Spring",
    academicYear: "2022-2023",
    completed: true,
  },
  {
    id: "7",
    courseCode: "CS201",
    courseName: "Computer Organization",
    credits: 3,
    grade: "A-",
    semester: "Spring",
    academicYear: "2022-2023",
    completed: true,
  },
  {
    id: "8",
    courseCode: "STAT201",
    courseName: "Statistics for Computer Science",
    credits: 3,
    grade: "B+",
    semester: "Spring",
    academicYear: "2022-2023",
    completed: true,
  },
  {
    id: "9",
    courseCode: "CS210",
    courseName: "Database Systems",
    credits: 3,
    grade: "A",
    semester: "Fall",
    academicYear: "2023-2024",
    completed: true,
  },
  {
    id: "10",
    courseCode: "CS220",
    courseName: "Software Engineering",
    credits: 3,
    grade: "A-",
    semester: "Fall",
    academicYear: "2023-2024",
    completed: true,
  },
  {
    id: "11",
    courseCode: "CS230",
    courseName: "Operating Systems",
    credits: 3,
    grade: "B+",
    semester: "Fall",
    academicYear: "2023-2024",
    completed: true,
  },
  {
    id: "12",
    courseCode: "CS240",
    courseName: "Computer Networks",
    credits: 3,
    grade: "In Progress",
    semester: "Spring",
    academicYear: "2023-2024",
    completed: false,
  },
]

// 默认成绩单数据
export const DEFAULT_TRANSCRIPT_DATA: TranscriptFormData = {
  // 大学信息
  universityName: "International University",
  universityLogo: "/placeholder.svg?height=80&width=80",
  universityAddress: "123 University Avenue, Boston, MA 02115",
  universityContact: "(617) 555-1234",
  universityWebsite: "www.university.edu",

  // 学生信息
  studentName: "Emily Johnson",
  studentId: "2023001001",
  programName: "Computer Science",
  departmentName: "School of Computer Science",
  degreeType: "Bachelor",
  enrollmentDate: "2022-09-01",
  expectedGraduationDate: "2026-06-30",
  studentPhoto: "/placeholder.svg?height=150&width=120",

  // 成绩信息
  courses: DEFAULT_TRANSCRIPT_COURSES,
  currentGPA: "3.75",
  totalCredits: 36,
  completedCredits: 33,

  // 签发信息
  issueDate: new Date().toISOString().split("T")[0],
  registrarName: "Dr. Jane Smith",
  registrarTitle: "University Registrar",
  registrarSignature: "",

  // 设计选项
  headerColor: "#1e40af",
  tableHeaderColor: "#e2e8f0",
  textColor: "#000000",
  accentColor: "#4f46e5",
  paperColor: "#ffffff",
  fontFamily: "Times New Roman, serif",

  // 水印设置
  enableWatermark: true,
  watermarkText: "OFFICIAL TRANSCRIPT",
  watermarkColor: "#000000",
  watermarkOpacity: 3,
  watermarkSize: "14",
  watermarkAngle: "-30",

  // 边框设置
  enableBorder: true,
  borderColor: "#1e40af",
  borderStyle: "solid",

  // 显示选项
  showStudentPhoto: true,
  showGradePoints: true,
  showGradeScale: true,
  showSemesterGPA: true,

  // 导出选项
  pngQuality: "high",
}

// 成绩等级对应的绩点
export const GRADE_POINTS = {
  "A+": 4.0,
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  "D+": 1.3,
  D: 1.0,
  F: 0.0,
  P: null, // Pass, not counted in GPA
  NP: null, // No Pass, not counted in GPA
  I: null, // Incomplete
  W: null, // Withdrawal
  "In Progress": null, // Currently taking
}

// 成绩等级选项
export const GRADE_OPTIONS = [
  { label: "A+", value: "A+" },
  { label: "A", value: "A" },
  { label: "A-", value: "A-" },
  { label: "B+", value: "B+" },
  { label: "B", value: "B" },
  { label: "B-", value: "B-" },
  { label: "C+", value: "C+" },
  { label: "C", value: "C" },
  { label: "C-", value: "C-" },
  { label: "D+", value: "D+" },
  { label: "D", value: "D" },
  { label: "F", value: "F" },
  { label: "P (Pass)", value: "P" },
  { label: "NP (No Pass)", value: "NP" },
  { label: "I (Incomplete)", value: "I" },
  { label: "W (Withdrawal)", value: "W" },
  { label: "In Progress", value: "In Progress" },
]

// 学期选项
export const SEMESTER_OPTIONS = [
  { label: "Fall", value: "Fall" },
  { label: "Spring", value: "Spring" },
  { label: "Summer", value: "Summer" },
  { label: "Winter", value: "Winter" },
]
