"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { DAYS_OF_WEEK_OPTIONS, COURSE_MODE_OPTIONS, COURSE_TYPE_OPTIONS, COURSE_COLOR_OPTIONS } from "@/lib/constants"
import type { ScheduleCourse } from "@/lib/types"

interface CourseEditorProps {
  course: ScheduleCourse
  onUpdate: (updatedCourse: ScheduleCourse) => void
  onCancel: () => void
}

export default function CourseEditor({ course, onUpdate, onCancel }: CourseEditorProps) {
  const [editedCourse, setEditedCourse] = useState<ScheduleCourse>({ ...course })

  // 处理输入变化
  const handleInputChange = (field: keyof ScheduleCourse, value: string | number) => {
    setEditedCourse((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // 处理星期几多选
  const handleDayChange = (day: string) => {
    const currentDays = [...editedCourse.days]
    const index = currentDays.indexOf(day)

    if (index === -1) {
      // 添加日期
      setEditedCourse((prev) => ({
        ...prev,
        days: [...prev.days, day],
      }))
    } else {
      // 移除日期
      setEditedCourse((prev) => ({
        ...prev,
        days: prev.days.filter((d) => d !== day),
      }))
    }
  }

  // 保存课程
  const handleSave = () => {
    onUpdate(editedCourse)
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>编辑课程</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="courseName">课程名称</Label>
            <Input
              id="courseName"
              value={editedCourse.courseName}
              onChange={(e) => handleInputChange("courseName", e.target.value)}
              placeholder="输入课程名称"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="courseCode">课程代码</Label>
            <Input
              id="courseCode"
              value={editedCourse.courseCode}
              onChange={(e) => handleInputChange("courseCode", e.target.value)}
              placeholder="输入课程代码"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructor">授课教师</Label>
            <Input
              id="instructor"
              value={editedCourse.instructor}
              onChange={(e) => handleInputChange("instructor", e.target.value)}
              placeholder="输入授课教师"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="credits">学分</Label>
            <Input
              id="credits"
              type="number"
              value={editedCourse.credits}
              onChange={(e) => handleInputChange("credits", Number(e.target.value))}
              placeholder="输入学分"
              min="0"
              max="10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="building">教学楼</Label>
            <Input
              id="building"
              value={editedCourse.building}
              onChange={(e) => handleInputChange("building", e.target.value)}
              placeholder="输入教学楼"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="room">教室</Label>
            <Input
              id="room"
              value={editedCourse.room}
              onChange={(e) => handleInputChange("room", e.target.value)}
              placeholder="输入教室"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">其他地点</Label>
            <Input
              id="location"
              value={editedCourse.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              placeholder="输入其他地点信息"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="startTime">开始时间</Label>
            <Input
              id="startTime"
              type="time"
              value={editedCourse.startTime}
              onChange={(e) => handleInputChange("startTime", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endTime">结束时间</Label>
            <Input
              id="endTime"
              type="time"
              value={editedCourse.endTime}
              onChange={(e) => handleInputChange("endTime", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mode">授课模式</Label>
            <Select value={editedCourse.mode} onValueChange={(value) => handleInputChange("mode", value)}>
              <SelectTrigger id="mode">
                <SelectValue placeholder="选择授课模式" />
              </SelectTrigger>
              <SelectContent>
                {COURSE_MODE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.value === "In-Person"
                      ? "线下"
                      : option.value === "Online"
                        ? "线上"
                        : option.value === "Hybrid"
                          ? "混合"
                          : option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">课程类型</Label>
            <Select value={editedCourse.type} onValueChange={(value) => handleInputChange("type", value)}>
              <SelectTrigger id="type">
                <SelectValue placeholder="选择课程类型" />
              </SelectTrigger>
              <SelectContent>
                {COURSE_TYPE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.value === "Lecture"
                      ? "讲座"
                      : option.value === "Seminar"
                        ? "研讨"
                        : option.value === "Lab"
                          ? "实验"
                          : option.value === "Tutorial"
                            ? "辅导"
                            : option.value === "Workshop"
                              ? "工作坊"
                              : option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="color">课程颜色</Label>
            <Select value={editedCourse.color} onValueChange={(value) => handleInputChange("color", value)}>
              <SelectTrigger id="color">
                <SelectValue placeholder="选择课程颜色" />
              </SelectTrigger>
              <SelectContent>
                {COURSE_COLOR_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: option.value }} />
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>上课日期</Label>
          <div className="flex flex-wrap gap-4 mt-2">
            {DAYS_OF_WEEK_OPTIONS.map((day) => (
              <div key={day.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`day-${day.value}`}
                  checked={editedCourse.days.includes(day.value)}
                  onCheckedChange={() => handleDayChange(day.value)}
                />
                <Label htmlFor={`day-${day.value}`}>
                  {day.value === "Monday"
                    ? "周一"
                    : day.value === "Tuesday"
                      ? "周二"
                      : day.value === "Wednesday"
                        ? "周三"
                        : day.value === "Thursday"
                          ? "周四"
                          : day.value === "Friday"
                            ? "周五"
                            : day.value === "Saturday"
                              ? "周六"
                              : day.value === "Sunday"
                                ? "周日"
                                : day.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">备注</Label>
          <Textarea
            id="notes"
            value={editedCourse.notes}
            onChange={(e) => handleInputChange("notes", e.target.value)}
            placeholder="输入课程备注信息"
            rows={3}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>
          取消
        </Button>
        <Button onClick={handleSave}>保存课程</Button>
      </CardFooter>
    </Card>
  )
}
