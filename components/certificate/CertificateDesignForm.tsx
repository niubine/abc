"use client"

import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { FormComponentProps } from "@/lib/types"
import type { CertificateFormData } from "@/lib/types"
import {
  EXPORT_QUALITY_OPTIONS,
  FONT_FAMILY_OPTIONS,
  BORDER_STYLE_OPTIONS,
  PATTERN_TYPE_OPTIONS,
  PATTERN_POSITION_OPTIONS,
} from "@/lib/constants"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const CertificateDesignForm: React.FC<FormComponentProps> = ({ formData, onChange }) => {
  const data = formData as CertificateFormData

  const handleChange = (name: string, value: string | boolean) => {
    onChange(name, value)
  }

  // 处理滑块值的变化，它返回的是数字
  const handleSliderChange = (name: string, value: number) => {
    onChange(name, value.toString())
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>设计选项</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">基本设置</TabsTrigger>
            <TabsTrigger value="watermark">水印设置</TabsTrigger>
            <TabsTrigger value="pattern">花纹设置</TabsTrigger>
            <TabsTrigger value="border">边框设置</TabsTrigger>
          </TabsList>

          {/* 基本设计选项 */}
          <TabsContent value="basic" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="paperColor">纸张颜色</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="paperColor"
                    name="paperColor"
                    type="color"
                    value={data.paperColor}
                    onChange={(e) => handleChange("paperColor", e.target.value)}
                    className="w-12 h-8 p-1"
                  />
                  <span className="text-sm">{data.paperColor}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="headerColor">标题颜色</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="headerColor"
                    name="headerColor"
                    type="color"
                    value={data.headerColor}
                    onChange={(e) => handleChange("headerColor", e.target.value)}
                    className="w-12 h-8 p-1"
                  />
                  <span className="text-sm">{data.headerColor}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="textColor">正文文字颜色</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="textColor"
                    name="textColor"
                    type="color"
                    value={data.textColor}
                    onChange={(e) => handleChange("textColor", e.target.value)}
                    className="w-12 h-8 p-1"
                  />
                  <span className="text-sm">{data.textColor}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fontFamily">字体</Label>
                <Select value={data.fontFamily} onValueChange={(value) => handleChange("fontFamily", value)}>
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

              {/* 导出选项 */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="pngQuality">导出质量</Label>
                <Select value={data.pngQuality} onValueChange={(value) => handleChange("pngQuality", value)}>
                  <SelectTrigger id="pngQuality">
                    <SelectValue placeholder="选择导出质量" />
                  </SelectTrigger>
                  <SelectContent>
                    {EXPORT_QUALITY_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          {/* 水印设置 */}
          <TabsContent value="watermark" className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="enableWatermark"
                checked={data.enableWatermark}
                onCheckedChange={(checked) => handleChange("enableWatermark", checked)}
              />
              <h3 className="text-lg font-medium">启用水印</h3>
            </div>

            {data.enableWatermark && (
              <div>
                <div className="mt-4 p-3 bg-blue-50 rounded-md text-sm text-blue-700 mb-4">
                  <p>水印可以增强证书的安全性和正式性。您可以同时启用斜线水印和文字水印。</p>
                </div>

                {/* 斜线水印开关和设置 */}
                <div className="border rounded-md p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-medium">斜线水印</h3>
                      <p className="text-xs text-gray-500 mt-1">添加斜线背景水印，不干扰主要内容</p>
                    </div>
                    <Switch
                      id="enableLineWatermark"
                      checked={data.enableWatermark && !data.watermarkText.includes("LINE_DISABLED")}
                      onCheckedChange={(checked) => {
                        // 如果启用斜线水印，确保watermarkText不包含LINE_DISABLED标记
                        // 如果禁用斜线水印，添加LINE_DISABLED标记
                        const currentText = data.watermarkText || ""
                        const newText = checked
                          ? currentText.replace("LINE_DISABLED", "").trim()
                          : (currentText + " LINE_DISABLED").trim()
                        handleChange("watermarkText", newText)
                      }}
                    />
                  </div>

                  {/* 斜线水印特有设置 - 仅当斜线水印启用时显示 */}
                  {!data.watermarkText.includes("LINE_DISABLED") && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-gray-100 mt-2">
                      <div className="space-y-2">
                        <Label htmlFor="watermarkLineWidth">线条宽度 ({data.watermarkLineWidth}px)</Label>
                        <Slider
                          id="watermarkLineWidth"
                          min={1}
                          max={50}
                          step={1}
                          value={[Number.parseInt(data.watermarkLineWidth) || 20]}
                          onValueChange={(values) => handleSliderChange("watermarkLineWidth", values[0])}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lineWatermarkSpacing">
                          线条间距 ({Number.parseInt(data.watermarkLineWidth) * 2 || 40}px)
                        </Label>
                        <p className="text-xs text-gray-500">线条间距由线条宽度自动计算得出</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lineWatermarkColor">斜线颜色</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id="lineWatermarkColor"
                            name="watermarkColor"
                            type="color"
                            value={data.watermarkColor}
                            onChange={(e) => handleChange("watermarkColor", e.target.value)}
                            className="w-12 h-8 p-1"
                          />
                          <span className="text-sm">{data.watermarkColor}</span>
                        </div>
                        <p className="text-xs text-gray-500">推荐使用浅色或与纸张颜色相近的颜色</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lineWatermarkOpacity">斜线不透明度 ({data.watermarkOpacity}%)</Label>
                        <Slider
                          id="lineWatermarkOpacity"
                          min={1}
                          max={30}
                          step={1}
                          value={[data.watermarkOpacity]}
                          onValueChange={(values) => handleSliderChange("watermarkOpacity", values[0])}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lineWatermarkAngle">斜线角度 ({data.watermarkAngle}°)</Label>
                        <Slider
                          id="lineWatermarkAngle"
                          min={-90}
                          max={90}
                          step={1}
                          value={[Number.parseInt(data.watermarkAngle) || -30]}
                          onValueChange={(values) => handleSliderChange("watermarkAngle", values[0])}
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>左倾</span>
                          <span>垂直</span>
                          <span>右倾</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 文字水印开关和设置 */}
                <div className="border rounded-md p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-medium">文字水印</h3>
                      <p className="text-xs text-gray-500 mt-1">添加重复文字水印，增强权威性</p>
                    </div>
                    <Switch
                      id="enableTextWatermark"
                      checked={!!data.watermarkText && !data.watermarkText.match(/^\s*LINE_DISABLED\s*$/)}
                      onCheckedChange={(checked) => {
                        // 启用文字水印时，保留之前设置的文字或使用默认值
                        // 禁用文字水印时，清空文字内容
                        const isLineDisabled = data.watermarkText.includes("LINE_DISABLED")
                        if (checked) {
                          const textValue =
                            data.watermarkText.replace("LINE_DISABLED", "").trim() || "OFFICIAL DOCUMENT"
                          handleChange("watermarkText", isLineDisabled ? textValue + " LINE_DISABLED" : textValue)
                        } else {
                          handleChange("watermarkText", isLineDisabled ? "LINE_DISABLED" : "")
                        }
                      }}
                    />
                  </div>

                  {/* 文字水印特有设置 - 仅当文字水印启用时显示 */}
                  {data.watermarkText && !data.watermarkText.match(/^\s*LINE_DISABLED\s*$/) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-gray-100 mt-2">
                      <div className="space-y-2">
                        <Label htmlFor="watermarkText">水印文字</Label>
                        <Input
                          id="watermarkText"
                          name="watermarkText"
                          value={data.watermarkText.replace("LINE_DISABLED", "").trim()}
                          onChange={(e) => {
                            const isLineDisabled = data.watermarkText.includes("LINE_DISABLED")
                            handleChange(
                              "watermarkText",
                              isLineDisabled ? e.target.value + " LINE_DISABLED" : e.target.value,
                            )
                          }}
                          placeholder="例如: VERIFIED, AUTHENTIC, 官方文件"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="watermarkSize">文字大小 ({data.watermarkSize}px)</Label>
                        <Slider
                          id="watermarkSize"
                          min={8}
                          max={64}
                          step={1}
                          value={[Number.parseInt(data.watermarkSize) || 14]}
                          onValueChange={(values) => handleSliderChange("watermarkSize", values[0])}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="textWatermarkColor">文字颜色</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id="textWatermarkColor"
                            name="watermarkColor"
                            type="color"
                            value={data.watermarkColor}
                            onChange={(e) => handleChange("watermarkColor", e.target.value)}
                            className="w-12 h-8 p-1"
                          />
                          <span className="text-sm">{data.watermarkColor}</span>
                        </div>
                        <p className="text-xs text-gray-500">推荐使用浅色或与纸张颜色相近的颜色</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="textWatermarkOpacity">文字不透明度 ({data.watermarkOpacity}%)</Label>
                        <Slider
                          id="textWatermarkOpacity"
                          min={1}
                          max={30}
                          step={1}
                          value={[data.watermarkOpacity]}
                          onValueChange={(values) => handleSliderChange("watermarkOpacity", values[0])}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="textWatermarkAngle">文字角度 ({data.watermarkAngle}°)</Label>
                        <Slider
                          id="textWatermarkAngle"
                          min={-90}
                          max={90}
                          step={1}
                          value={[Number.parseInt(data.watermarkAngle) || -30]}
                          onValueChange={(values) => handleSliderChange("watermarkAngle", values[0])}
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>左倾</span>
                          <span>垂直</span>
                          <span>右倾</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-2 border-t pt-4">
                  <h3 className="text-lg font-medium mb-4">水印应用提示:</h3>
                  <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                    <li>文字水印适合在较重要的证书上使用，增加权威性</li>
                    <li>斜线水印适合作为背景元素，不干扰主要内容</li>
                    <li>水印颜色建议选择与背景相近的颜色，不透明度保持在5-15%效果最佳</li>
                    <li>调整水印角度可以使水印看起来更自然，一般建议使用-30°至-45°</li>
                    <li>两种水印可以同时使用，但注意不要让水印遮挡正文内容</li>
                  </ul>
                </div>
              </div>
            )}
          </TabsContent>

          {/* 花纹设置 */}
          <TabsContent value="pattern" className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="enablePattern"
                checked={data.enablePattern}
                onCheckedChange={(checked) => handleChange("enablePattern", checked)}
              />
              <h3 className="text-lg font-medium">启用装饰花纹</h3>
            </div>

            {data.enablePattern && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="patternType">花纹类型</Label>
                  <Select value={data.patternType} onValueChange={(value) => handleChange("patternType", value)}>
                    <SelectTrigger id="patternType">
                      <SelectValue placeholder="选择花纹类型" />
                    </SelectTrigger>
                    <SelectContent>
                      {PATTERN_TYPE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="patternPosition">花纹位置</Label>
                  <Select
                    value={data.patternPosition}
                    onValueChange={(value) => handleChange("patternPosition", value)}
                  >
                    <SelectTrigger id="patternPosition">
                      <SelectValue placeholder="选择花纹位置" />
                    </SelectTrigger>
                    <SelectContent>
                      {PATTERN_POSITION_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="patternColor">花纹颜色</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="patternColor"
                      name="patternColor"
                      type="color"
                      value={data.patternColor}
                      onChange={(e) => handleChange("patternColor", e.target.value)}
                      className="w-12 h-8 p-1"
                    />
                    <span className="text-sm">{data.patternColor}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="patternOpacity">花纹不透明度 ({data.patternOpacity}%)</Label>
                  <Slider
                    id="patternOpacity"
                    min={5}
                    max={50}
                    step={1}
                    value={[data.patternOpacity]}
                    onValueChange={(values) => handleSliderChange("patternOpacity", values[0])}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="patternSize">花纹大小 ({data.patternSize}px)</Label>
                  <Slider
                    id="patternSize"
                    min={10}
                    max={100}
                    step={1}
                    value={[Number.parseInt(data.patternSize) || 30]}
                    onValueChange={(values) => handleSliderChange("patternSize", values[0])}
                  />
                </div>
              </div>
            )}
          </TabsContent>

          {/* 边框设置 */}
          <TabsContent value="border" className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="enableBorder"
                checked={data.enableBorder}
                onCheckedChange={(checked) => handleChange("enableBorder", checked)}
              />
              <h3 className="text-lg font-medium">启用边框</h3>
            </div>

            {data.enableBorder && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="borderColor">边框颜色</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="borderColor"
                      name="borderColor"
                      type="color"
                      value={data.borderColor}
                      onChange={(e) => handleChange("borderColor", e.target.value)}
                      className="w-12 h-8 p-1"
                    />
                    <span className="text-sm">{data.borderColor}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="borderStyle">边框样式</Label>
                  <Select value={data.borderStyle} onValueChange={(value) => handleChange("borderStyle", value)}>
                    <SelectTrigger id="borderStyle">
                      <SelectValue placeholder="选择边框样式" />
                    </SelectTrigger>
                    <SelectContent>
                      {BORDER_STYLE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default CertificateDesignForm
