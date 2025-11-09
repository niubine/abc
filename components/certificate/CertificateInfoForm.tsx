"use client"

import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { FormComponentProps } from "@/lib/types"
import type { CertificateFormData } from "@/lib/types"
import { DEGREE_TYPE_OPTIONS, STUDY_MODE_OPTIONS } from "@/lib/constants"
import Image from "next/image"

const CertificateInfoForm: React.FC<FormComponentProps> = ({ formData, onChange, onFileChange }) => {
  const data = formData as CertificateFormData

  const handleChange = (name: string, value: string | boolean) => {
    onChange(name, value)
  }

  // 处理文件上传
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (onFileChange) {
      onFileChange(e, field)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>证明信息</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 大学信息部分 */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">大学信息</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="universityName">大学名称</Label>
              <Input
                id="universityName"
                name="universityName"
                value={data.universityName}
                onChange={(e) => handleChange("universityName", e.target.value)}
                placeholder="Enter university name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="universityLogo">大学标志</Label>
              <div className="grid grid-cols-1 gap-2">
                <Input
                  type="file"
                  id="universityLogo"
                  name="universityLogo"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, "universityLogo")}
                  className="hidden"
                />
                <div className="flex gap-2">
                  <div className="w-16 h-16 border rounded overflow-hidden">
                    <img
                      src={data.universityLogo || "/placeholder.svg"}
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
          </div>
          <div className="space-y-2">
            <Label htmlFor="certificateTitle">证明标题</Label>
            <Input
              id="certificateTitle"
              name="certificateTitle"
              value={data.certificateTitle}
              onChange={(e) => handleChange("certificateTitle", e.target.value)}
              placeholder="例如：Certificate of Enrollment / Proof of Study"
            />
          </div>
        </div>

        {/* 学生信息部分 */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">学生信息</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 col-span-1">
              <Label htmlFor="fullName">学生姓名</Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="例如: John Smith"
                value={data.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
              />
            </div>

            <div className="space-y-2 col-span-1">
              <Label htmlFor="studentId">学生ID</Label>
              <Input
                id="studentId"
                name="studentId"
                placeholder="例如: S12345678"
                value={data.studentId}
                onChange={(e) => handleChange("studentId", e.target.value)}
              />
            </div>

            {/* 学生照片上传 */}
            <div className="space-y-2 col-span-1 md:col-span-2">
              <Label htmlFor="studentPhoto-upload">学生照片</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div className="col-span-1">
                  <input
                    id="studentPhoto-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const reader = new FileReader()
                        reader.onload = (event) => {
                          if (event.target?.result) {
                            handleChange("studentPhoto", event.target.result as string)
                          }
                        }
                        reader.readAsDataURL(e.target.files[0])
                      }
                    }}
                  />
                  <label
                    htmlFor="studentPhoto-upload"
                    className="cursor-pointer bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded text-center"
                  >
                    选择学生照片
                  </label>
                </div>

                <div className="col-span-2">
                  {data.studentPhoto ? (
                    <div className="flex items-center gap-4">
                      <div className="relative w-[75px] h-[100px] border rounded overflow-hidden">
                        <Image
                          src={data.studentPhoto || "/placeholder.svg"}
                          alt="学生照片预览"
                          fill
                          style={{ objectFit: "cover" }}
                          className="rounded-md"
                          sizes="75px"
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 mt-2">请上传一张正面免冠照片，建议尺寸3:4</p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate">出生日期</Label>
              <Input
                id="birthDate"
                name="birthDate"
                type="date"
                value={data.birthDate}
                onChange={(e) => handleChange("birthDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nationality">国籍</Label>
              <Input
                id="nationality"
                name="nationality"
                value={data.nationality}
                onChange={(e) => handleChange("nationality", e.target.value)}
                placeholder="输入国籍"
              />
            </div>
          </div>
        </div>

        {/* 学术信息部分 */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">学术信息</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="faculty">院系</Label>
              <Input
                id="faculty"
                name="faculty"
                value={data.faculty}
                onChange={(e) => handleChange("faculty", e.target.value)}
                placeholder="输入院系名称"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="major">专业</Label>
              <Input
                id="major"
                name="major"
                value={data.major}
                onChange={(e) => handleChange("major", e.target.value)}
                placeholder="输入专业名称"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="degreeType">学位类型</Label>
              <Select value={data.degreeType} onValueChange={(value) => handleChange("degreeType", value)}>
                <SelectTrigger id="degreeType">
                  <SelectValue placeholder="选择学位类型" />
                </SelectTrigger>
                <SelectContent>
                  {DEGREE_TYPE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="studyMode">学习模式</Label>
              <Select value={data.studyMode} onValueChange={(value) => handleChange("studyMode", value)}>
                <SelectTrigger id="studyMode">
                  <SelectValue placeholder="选择学习模式" />
                </SelectTrigger>
                <SelectContent>
                  {STUDY_MODE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="enrollmentDate">入学日期</Label>
              <Input
                id="enrollmentDate"
                name="enrollmentDate"
                type="date"
                value={data.enrollmentDate}
                onChange={(e) => handleChange("enrollmentDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expectedGraduationDate">预计毕业日期</Label>
              <Input
                id="expectedGraduationDate"
                name="expectedGraduationDate"
                type="date"
                value={data.expectedGraduationDate}
                onChange={(e) => handleChange("expectedGraduationDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentYear">当前学年</Label>
              <Input
                id="currentYear"
                name="currentYear"
                value={data.currentYear}
                onChange={(e) => handleChange("currentYear", e.target.value)}
                placeholder="例如：First Year, Second Year等"
              />
            </div>
          </div>
        </div>

        {/* 证明内容部分 */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">证明内容</h3>
          <div className="space-y-2">
            <Label htmlFor="certificateContent">证明文本</Label>
            <Textarea
              id="certificateContent"
              name="certificateContent"
              value={data.certificateContent}
              onChange={(e) => handleChange("certificateContent", e.target.value)}
              placeholder="输入证明内容（请使用英文）"
              rows={4}
            />
          </div>
        </div>

        {/* 签发信息部分 */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">签发信息</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="issueDate">签发日期</Label>
              <Input
                id="issueDate"
                name="issueDate"
                type="date"
                value={data.issueDate}
                onChange={(e) => handleChange("issueDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="validityPeriod">有效期限</Label>
              <Input
                id="validityPeriod"
                name="validityPeriod"
                value={data.validityPeriod}
                onChange={(e) => handleChange("validityPeriod", e.target.value)}
                placeholder="例如：6 months"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="issuerTitle">签发人职位</Label>
              <Input
                id="issuerTitle"
                name="issuerTitle"
                value={data.issuerTitle}
                onChange={(e) => handleChange("issuerTitle", e.target.value)}
                placeholder="例如：Registrar, Dean等"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="issuerSignature">签发人签名</Label>
              <Input
                id="issuerSignature"
                name="issuerSignature"
                value={data.issuerSignature}
                onChange={(e) => handleChange("issuerSignature", e.target.value)}
                placeholder="输入签发人姓名作为签名"
              />
              <p className="text-xs text-gray-500 mt-1">此处输入的文字将显示为签名</p>
            </div>
          </div>
        </div>

        {/* 联系信息部分 */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">联系信息</h3>
          <div className="space-y-2">
            <Label htmlFor="contactInfo">联系方式</Label>
            <Textarea
              id="contactInfo"
              name="contactInfo"
              value={data.contactInfo}
              onChange={(e) => handleChange("contactInfo", e.target.value)}
              placeholder="输入用于验证此证明的联系方式（请使用英文）"
              rows={3}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CertificateInfoForm
