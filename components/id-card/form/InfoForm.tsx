"use client"

import type React from "react"
import type { FormComponentProps } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PROGRAM_TYPE_OPTIONS } from "@/lib/constants"
import { useFormContext } from "react-hook-form"

/**
 * 学生信息表单组件
 * 用于输入学生的个人信息和学术信息
 */
export const InfoForm: React.FC<FormComponentProps> = ({ formData, onChange }) => {
  // 获取表单上下文
  const form = useFormContext()

  // 处理文本输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    onChange(name, value)
  }

  // 处理选择框变化
  const handleSelectChange = (name: string, value: string) => {
    onChange(name, value)
  }

  // 计算入学年份选项（从当前年份向前10年）
  const currentYear = new Date().getFullYear()
  const enrollmentYears = Array.from({ length: 10 }, (_, i) => {
    const year = currentYear - i
    return { label: year.toString(), value: year.toString() }
  })

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>证件信息</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 姓名 */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>姓名</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="输入学生姓名"
                    onChange={(e) => {
                      field.onChange(e)
                      handleInputChange(e)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 学号 */}
          <FormField
            control={form.control}
            name="studentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>学号</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="输入学生学号"
                    onChange={(e) => {
                      field.onChange(e)
                      handleInputChange(e)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 学院 */}
          <FormField
            control={form.control}
            name="faculty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>学院</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="输入所属学院"
                    onChange={(e) => {
                      field.onChange(e)
                      handleInputChange(e)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 学位类型 */}
          <FormField
            control={form.control}
            name="programType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>学位类型</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value)
                    handleSelectChange("programType", value)
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="选择学位类型" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {PROGRAM_TYPE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 入学年份 */}
          <FormField
            control={form.control}
            name="enrollmentYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>入学年份</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value)
                    handleSelectChange("enrollmentYear", value)
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="选择入学年份" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {enrollmentYears.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 有效期至 */}
          <FormField
            control={form.control}
            name="validityEnd"
            render={({ field }) => (
              <FormItem>
                <FormLabel>有效期至</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="格式: YYYY/MM (例如: 2028/06)"
                    onChange={(e) => {
                      field.onChange(e)
                      handleInputChange(e)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-6 border-t pt-6">
          <h3 className="text-lg font-medium mb-4">学校信息</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 学校名称 */}
            <FormField
              control={form.control}
              name="universityName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>学校名称</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="输入学校名称"
                      onChange={(e) => {
                        field.onChange(e)
                        handleInputChange(e)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 学校网站 */}
            <FormField
              control={form.control}
              name="universityWebsite"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>学校网站</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="输入学校网站"
                      onChange={(e) => {
                        field.onChange(e)
                        handleInputChange(e)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 学校地址 */}
            <FormField
              control={form.control}
              name="universityAddress"
              render={({ field }) => (
                <FormItem className="col-span-1 md:col-span-2">
                  <FormLabel>学校地址</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="输入学校地址"
                      onChange={(e) => {
                        field.onChange(e)
                        handleInputChange(e)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 联系方式 */}
            <FormField
              control={form.control}
              name="universityContact"
              render={({ field }) => (
                <FormItem className="col-span-1 md:col-span-2">
                  <FormLabel>联系方式</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="输入学校联系方式"
                      onChange={(e) => {
                        field.onChange(e)
                        handleInputChange(e)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 官方签名 */}
            <FormField
              control={form.control}
              name="officialSignature"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>官方签名</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="输入教务处签名"
                      onChange={(e) => {
                        field.onChange(e)
                        handleInputChange(e)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default InfoForm
