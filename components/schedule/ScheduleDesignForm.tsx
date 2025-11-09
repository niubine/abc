"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { FONT_FAMILY_OPTIONS } from "@/lib/constants"
import type { ScheduleFormData } from "@/lib/types"

interface ScheduleDesignFormProps {
  formData: ScheduleFormData
  onChange: (name: string, value: string | boolean | number) => void
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void
}

export default function ScheduleDesignForm({ formData, onChange, onFileChange }: ScheduleDesignFormProps) {
  return (
    <div className="space-y-6">
      {/* 时间设置 */}
      <Card>
        <CardHeader>
          <CardTitle>时间设置</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startHour">开始时间</Label>
              <Select
                value={formData.startHour.toString()}
                onValueChange={(value) => onChange("startHour", Number.parseInt(value, 10))}
              >
                <SelectTrigger id="startHour">
                  <SelectValue placeholder="选择开始时间" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 6).map((hour) => (
                    <SelectItem key={hour} value={hour.toString()}>
                      {hour}:00
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="endHour">结束时间</Label>
              <Select
                value={formData.endHour.toString()}
                onValueChange={(value) => onChange("endHour", Number.parseInt(value, 10))}
              >
                <SelectTrigger id="endHour">
                  <SelectValue placeholder="选择结束时间" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 12).map((hour) => (
                    <SelectItem key={hour} value={hour.toString()}>
                      {hour}:00
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 设计选项 */}
      <Card>
        <CardHeader>
          <CardTitle>设计选项</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="headerColor">标题颜色</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="headerColor"
                  name="headerColor"
                  type="color"
                  value={formData.headerColor}
                  onChange={(e) => onChange("headerColor", e.target.value)}
                  className="w-12 h-8 p-1"
                />
                <span className="text-sm">{formData.headerColor}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tableHeaderColor">表头颜色</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="tableHeaderColor"
                  name="tableHeaderColor"
                  type="color"
                  value={formData.tableHeaderColor}
                  onChange={(e) => onChange("tableHeaderColor", e.target.value)}
                  className="w-12 h-8 p-1"
                />
                <span className="text-sm">{formData.tableHeaderColor}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="textColor">文字颜色</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="textColor"
                  name="textColor"
                  type="color"
                  value={formData.textColor}
                  onChange={(e) => onChange("textColor", e.target.value)}
                  className="w-12 h-8 p-1"
                />
                <span className="text-sm">{formData.textColor}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="borderColor">边框颜色</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="borderColor"
                  name="borderColor"
                  type="color"
                  value={formData.borderColor}
                  onChange={(e) => onChange("borderColor", e.target.value)}
                  className="w-12 h-8 p-1"
                />
                <span className="text-sm">{formData.borderColor}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paperColor">背景颜色</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="paperColor"
                  name="paperColor"
                  type="color"
                  value={formData.paperColor}
                  onChange={(e) => onChange("paperColor", e.target.value)}
                  className="w-12 h-8 p-1"
                />
                <span className="text-sm">{formData.paperColor}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fontFamily">字体</Label>
              <Select value={formData.fontFamily} onValueChange={(value) => onChange("fontFamily", value)}>
                <SelectTrigger id="fontFamily">
                  <SelectValue placeholder="选择字体" />
                </SelectTrigger>
                <SelectContent>
                  {FONT_FAMILY_OPTIONS.map((option) => (
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

      {/* 水印设置 */}
      <Card>
        <CardHeader>
          <CardTitle>水印设置</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="enableWatermark">启用水印</Label>
            <Switch
              id="enableWatermark"
              checked={formData.enableWatermark}
              onCheckedChange={(checked) => onChange("enableWatermark", checked)}
            />
          </div>

          {formData.enableWatermark && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="watermarkText">水印文字</Label>
                <Input
                  id="watermarkText"
                  name="watermarkText"
                  value={formData.watermarkText}
                  onChange={(e) => onChange("watermarkText", e.target.value)}
                  placeholder="输入水印文字"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="watermarkColor">水印颜色</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="watermarkColor"
                    name="watermarkColor"
                    type="color"
                    value={formData.watermarkColor}
                    onChange={(e) => onChange("watermarkColor", e.target.value)}
                    className="w-12 h-8 p-1"
                  />
                  <span className="text-sm">{formData.watermarkColor}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="watermarkOpacity">水印透明度 ({formData.watermarkOpacity}%)</Label>
                <Slider
                  id="watermarkOpacity"
                  min={1}
                  max={20}
                  step={1}
                  value={[formData.watermarkOpacity]}
                  onValueChange={(value) => onChange("watermarkOpacity", value[0])}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="watermarkSize">水印大小</Label>
                <Input
                  id="watermarkSize"
                  name="watermarkSize"
                  type="number"
                  value={formData.watermarkSize}
                  onChange={(e) => onChange("watermarkSize", e.target.value)}
                  min="8"
                  max="36"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="watermarkAngle">水印角度</Label>
                <Input
                  id="watermarkAngle"
                  name="watermarkAngle"
                  type="number"
                  value={formData.watermarkAngle}
                  onChange={(e) => onChange("watermarkAngle", e.target.value)}
                  min="-90"
                  max="90"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
