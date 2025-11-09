"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DEGREE_TYPE_OPTIONS } from "@/lib/constants"
import type { AdmissionLetterInfoFormProps } from "@/lib/types"

/**
 * 录取通知书信息表单组件
 */
export default function AdmissionLetterInfoForm({
  formData,
  formErrors,
  onChange,
  onFileChange,
  onSubmit,
}: AdmissionLetterInfoFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-1 gap-6">
        {/* 大学信息 */}
        <Card>
          <CardHeader>
            <CardTitle>大学信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="universityName">大学名称</Label>
                <Input
                  id="universityName"
                  name="universityName"
                  value={formData.universityName}
                  onChange={onChange}
                  placeholder="例如：国际大学"
                  className={formErrors.universityName ? "border-red-500" : ""}
                />
                {formErrors.universityName && <p className="text-red-500 text-sm">{formErrors.universityName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="universityLogo">大学标志</Label>
                <div className="grid grid-cols-1 gap-2">
                  <Input
                    type="file"
                    id="universityLogo"
                    name="universityLogo"
                    accept="image/*"
                    onChange={(e) => onFileChange(e, "universityLogo")}
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
                      <p className="text-xs text-gray-500 mt-2">推荐尺寸：200x200像素</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="universityAddress">大学地址</Label>
                <Input
                  id="universityAddress"
                  name="universityAddress"
                  value={formData.universityAddress}
                  onChange={onChange}
                  placeholder="例如：北京市海淀区大学路100号"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="universityContact">联系电话</Label>
                <Input
                  id="universityContact"
                  name="universityContact"
                  value={formData.universityContact}
                  onChange={onChange}
                  placeholder="例如：010-12345678"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="universityWebsite">网站</Label>
              <Input
                id="universityWebsite"
                name="universityWebsite"
                value={formData.universityWebsite}
                onChange={onChange}
                placeholder="例如：www.university.edu"
              />
            </div>
          </CardContent>
        </Card>

        {/* 学生信息 */}
        <Card>
          <CardHeader>
            <CardTitle>学生信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentName">学生姓名</Label>
                <Input
                  id="studentName"
                  name="studentName"
                  value={formData.studentName}
                  onChange={onChange}
                  placeholder="例如：张三"
                  className={formErrors.studentName ? "border-red-500" : ""}
                />
                {formErrors.studentName && <p className="text-red-500 text-sm">{formErrors.studentName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="studentId">学生ID</Label>
                <Input
                  id="studentId"
                  name="studentId"
                  value={formData.studentId}
                  onChange={onChange}
                  placeholder="例如：2023001001"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentAddress">学生地址</Label>
                <Input
                  id="studentAddress"
                  name="studentAddress"
                  value={formData.studentAddress}
                  onChange={onChange}
                  placeholder="例如：北京市朝阳区阳光路200号"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="studentEmail">电子邮箱</Label>
                <Input
                  id="studentEmail"
                  name="studentEmail"
                  type="email"
                  value={formData.studentEmail}
                  onChange={onChange}
                  placeholder="例如：student@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="studentPhone">联系电话</Label>
              <Input
                id="studentPhone"
                name="studentPhone"
                value={formData.studentPhone}
                onChange={onChange}
                placeholder="例如：13812345678"
              />
            </div>
          </CardContent>
        </Card>

        {/* 录取信息 */}
        <Card>
          <CardHeader>
            <CardTitle>录取信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="programName">专业名称</Label>
                <Input
                  id="programName"
                  name="programName"
                  value={formData.programName}
                  onChange={onChange}
                  placeholder="例如：计算机科学"
                  className={formErrors.programName ? "border-red-500" : ""}
                />
                {formErrors.programName && <p className="text-red-500 text-sm">{formErrors.programName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="departmentName">院系名称</Label>
                <Input
                  id="departmentName"
                  name="departmentName"
                  value={formData.departmentName}
                  onChange={onChange}
                  placeholder="例如：计算机科学学院"
                  className={formErrors.departmentName ? "border-red-500" : ""}
                />
                {formErrors.departmentName && <p className="text-red-500 text-sm">{formErrors.departmentName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="degreeType">学位类型</Label>
                <Select
                  name="degreeType"
                  value={formData.degreeType}
                  onValueChange={(value) => onChange({ target: { name: "degreeType", value } })}
                >
                  <SelectTrigger>
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
                <Label htmlFor="admissionDate">录取日期</Label>
                <Input
                  id="admissionDate"
                  name="admissionDate"
                  type="date"
                  value={formData.admissionDate}
                  onChange={onChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="programStartDate">开学日期</Label>
                <Input
                  id="programStartDate"
                  name="programStartDate"
                  type="date"
                  value={formData.programStartDate}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="programDuration">学制</Label>
                <Input
                  id="programDuration"
                  name="programDuration"
                  value={formData.programDuration}
                  onChange={onChange}
                  placeholder="例如：4年"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="scholarshipInfo">奖学金信息</Label>
                <Input
                  id="scholarshipInfo"
                  name="scholarshipInfo"
                  value={formData.scholarshipInfo}
                  onChange={onChange}
                  placeholder="例如：一等奖学金 5000元/年"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 信件内容 */}
        <Card>
          <CardHeader>
            <CardTitle>信件内容</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="letterTitle">通知书标题</Label>
              <Input
                id="letterTitle"
                name="letterTitle"
                value={formData.letterTitle}
                onChange={onChange}
                placeholder="例如：录取通知书"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="letterContent">通知书正文</Label>
              <Textarea
                id="letterContent"
                name="letterContent"
                value={formData.letterContent}
                onChange={onChange}
                placeholder="填写录取通知书的主要内容..."
                rows={6}
                className={formErrors.letterContent ? "border-red-500" : ""}
              />
              {formErrors.letterContent && <p className="text-red-500 text-sm">{formErrors.letterContent}</p>}
              <p className="text-xs text-gray-500">支持换行，使用\n表示换行</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="congratulatoryMessage">祝贺语</Label>
              <Textarea
                id="congratulatoryMessage"
                name="congratulatoryMessage"
                value={formData.congratulatoryMessage}
                onChange={onChange}
                placeholder="填写祝贺语..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nextStepsInfo">后续步骤</Label>
              <Textarea
                id="nextStepsInfo"
                name="nextStepsInfo"
                value={formData.nextStepsInfo}
                onChange={onChange}
                placeholder="填写学生需要完成的后续步骤..."
                rows={4}
              />
              <p className="text-xs text-gray-500">支持换行，使用\n表示换行</p>
            </div>
          </CardContent>
        </Card>

        {/* 签名信息 */}
        <Card>
          <CardHeader>
            <CardTitle>签名信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="signatoryName">签名人姓名</Label>
                <Input
                  id="signatoryName"
                  name="signatoryName"
                  value={formData.signatoryName}
                  onChange={onChange}
                  placeholder="例如：李主任"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signatoryTitle">签名人职位</Label>
                <Input
                  id="signatoryTitle"
                  name="signatoryTitle"
                  value={formData.signatoryTitle}
                  onChange={onChange}
                  placeholder="例如：招生办主任"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => window.location.reload()}>
              重置
            </Button>
            <Button type="submit">下一步</Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  )
}
