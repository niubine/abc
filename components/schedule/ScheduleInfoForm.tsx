"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Trash, Plus, Edit, School, Calendar, User, BookOpen } from "lucide-react"
import { HOUR_FORMAT_OPTIONS } from "@/lib/constants"
import type { ScheduleFormData, ScheduleCourse } from "@/lib/types"

interface ScheduleInfoFormProps {
  formData: ScheduleFormData
  onChange: (name: string, value: string | boolean | number | string[] | ScheduleCourse[]) => void
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void
  onAddCourse: () => void
  onEditCourse: (courseId: string) => void
  onDeleteCourse: (courseId: string) => void
}

export default function ScheduleInfoForm({
  formData,
  onChange,
  onFileChange,
  onAddCourse,
  onEditCourse,
  onDeleteCourse,
}: ScheduleInfoFormProps) {
  // 格式化时间
  const formatTime = (time: string) => {
    if (!time) return ""

    if (formData.hourFormat === "12h") {
      const [hours, minutes] = time.split(":").map(Number)
      const period = hours >= 12 ? "PM" : "AM"
      const hour12 = hours % 12 || 12
      return `${hour12}:${minutes.toString().padStart(2, "0")} ${period}`
    }

    return time
  }

  // 获取课程模式标签颜色
  const getModeColor = (mode: string) => {
    switch (mode) {
      case "In-Person":
        return "bg-green-100 text-green-800 border-green-200"
      case "Online":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Hybrid":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  // 获取课程类型标签颜色
  const getTypeColor = (type: string) => {
    switch (type) {
      case "Lecture":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "Seminar":
        return "bg-indigo-100 text-indigo-800 border-indigo-200"
      case "Lab":
        return "bg-cyan-100 text-cyan-800 border-cyan-200"
      case "Tutorial":
        return "bg-rose-100 text-rose-800 border-rose-200"
      case "Workshop":
        return "bg-emerald-100 text-emerald-200 border-emerald-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* 基本信息 */}
      <Card>
        <CardHeader>
          <CardTitle>基本信息</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="universityName">学校名称</Label>
              <Input
                id="universityName"
                name="universityName"
                value={formData.universityName}
                onChange={(e) => onChange("universityName", e.target.value)}
                placeholder="输入学校名称"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="universityLogo">学校标志</Label>
              <div className="grid grid-cols-1 gap-2">
                <Input
                  type="file"
                  id="universityLogo"
                  name="universityLogo"
                  accept="image/*"
                  onChange={(e) => onFileChange && onFileChange(e, "universityLogo")}
                  className="hidden"
                />
                <div className="flex gap-2">
                  <div className="w-16 h-16 border rounded overflow-hidden">
                    <img
                      src={formData.universityLogo || "/placeholder.svg"}
                      alt="学校Logo"
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <Label
                      htmlFor="universityLogo"
                      className="cursor-pointer bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded text-center"
                    >
                      选择Logo
                    </Label>
                    <p className="text-xs text-gray-500 mt-2">上传学校或组织的Logo</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">院系/学院</Label>
              <Input
                id="department"
                name="department"
                value={formData.department}
                onChange={(e) => onChange("department", e.target.value)}
                placeholder="输入院系或学院名称"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">学生姓名</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={(e) => onChange("fullName", e.target.value)}
                placeholder="输入学生姓名"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="studentId">学号</Label>
              <Input
                id="studentId"
                name="studentId"
                value={formData.studentId}
                onChange={(e) => onChange("studentId", e.target.value)}
                placeholder="输入学号"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="major">专业</Label>
              <Input
                id="major"
                name="major"
                value={formData.major}
                onChange={(e) => onChange("major", e.target.value)}
                placeholder="输入专业"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="academicYear">学年</Label>
              <Input
                id="academicYear"
                name="academicYear"
                value={formData.academicYear}
                onChange={(e) => onChange("academicYear", e.target.value)}
                placeholder="例如：2023-2024"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="term">学期</Label>
              <Input
                id="term"
                name="term"
                value={formData.term}
                onChange={(e) => onChange("term", e.target.value)}
                placeholder="例如：2023年秋季学期"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="scheduleTitle">课程表标题</Label>
              <Input
                id="scheduleTitle"
                name="scheduleTitle"
                value={formData.scheduleTitle}
                onChange={(e) => onChange("scheduleTitle", e.target.value)}
                placeholder="输入课程表标题"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hourFormat">时间格式</Label>
              <Select value={formData.hourFormat} onValueChange={(value) => onChange("hourFormat", value)}>
                <SelectTrigger id="hourFormat">
                  <SelectValue placeholder="选择时间格式" />
                </SelectTrigger>
                <SelectContent>
                  {HOUR_FORMAT_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 显示选项 */}
      <Card>
        <CardHeader>
          <CardTitle>显示选项</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="showWeekends">显示周末</Label>
              <Switch
                id="showWeekends"
                checked={formData.showWeekends}
                onCheckedChange={(checked) => onChange("showWeekends", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="showInstructors">显示教师</Label>
              <Switch
                id="showInstructors"
                checked={formData.showInstructors}
                onCheckedChange={(checked) => onChange("showInstructors", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="showLocations">显示地点</Label>
              <Switch
                id="showLocations"
                checked={formData.showLocations}
                onCheckedChange={(checked) => onChange("showLocations", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="showCourseType">显示课程类型</Label>
              <Switch
                id="showCourseType"
                checked={formData.showCourseType}
                onCheckedChange={(checked) => onChange("showCourseType", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="showCredits">显示学分</Label>
              <Switch
                id="showCredits"
                checked={formData.showCredits}
                onCheckedChange={(checked) => onChange("showCredits", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="showNotes">显示备注</Label>
              <Switch
                id="showNotes"
                checked={formData.showNotes}
                onCheckedChange={(checked) => onChange("showNotes", checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 课程信息 */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>课程信息</CardTitle>
          <Button variant="outline" size="sm" onClick={onAddCourse}>
            <Plus className="mr-1 h-4 w-4" />
            添加课程
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.courses.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">暂无课程，请点击"添加课程"按钮添加</div>
          ) : (
            <div className="space-y-4">
              {formData.courses.map((course, index) => (
                <div key={course.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <div>
                        <h4 className="font-medium text-lg">{course.courseName || "未命名课程"}</h4>
                        <p className="text-sm text-muted-foreground">{course.courseCode}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => onEditCourse(course.id)}>
                        <Edit className="h-4 w-4 text-primary" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => onDeleteCourse(course.id)}>
                        <Trash className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mt-3">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{course.instructor || "无教师信息"}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <School className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {course.building} {course.room ? `${course.room}` : ""}
                        {!course.building && !course.room && course.location ? course.location : ""}
                        {!course.building && !course.room && !course.location && "无地点信息"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {course.days
                          .map((day) =>
                            day === "Monday"
                              ? "周一"
                              : day === "Tuesday"
                                ? "周二"
                                : day === "Wednesday"
                                  ? "周三"
                                  : day === "Thursday"
                                    ? "周四"
                                    : day === "Friday"
                                      ? "周五"
                                      : day === "Saturday"
                                        ? "周六"
                                        : day === "Sunday"
                                          ? "周日"
                                          : day,
                          )
                          .join(", ")}{" "}
                        {course.startTime && course.endTime
                          ? `${formatTime(course.startTime)} - ${formatTime(course.endTime)}`
                          : "无时间信息"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <Badge variant="outline" className={getModeColor(course.mode)}>
                          {course.mode === "In-Person"
                            ? "线下"
                            : course.mode === "Online"
                              ? "线上"
                              : course.mode === "Hybrid"
                                ? "混合"
                                : course.mode}
                        </Badge>
                        <Badge variant="outline" className={getTypeColor(course.type)}>
                          {course.type === "Lecture"
                            ? "讲座"
                            : course.type === "Seminar"
                              ? "研讨"
                              : course.type === "Lab"
                                ? "实验"
                                : course.type === "Tutorial"
                                  ? "辅导"
                                  : course.type === "Workshop"
                                    ? "工作坊"
                                    : course.type}
                        </Badge>
                        {formData.showCredits && <Badge variant="outline">{course.credits} 学分</Badge>}
                      </div>
                    </div>
                  </div>

                  {course.notes && formData.showNotes && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      <p>
                        <span className="font-medium">备注：</span> {course.notes}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
