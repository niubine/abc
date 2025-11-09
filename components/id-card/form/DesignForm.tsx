"use client"

import type React from "react"
import type { FormComponentProps } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { CARD_ORIENTATION_OPTIONS, CARD_STYLE_OPTIONS, CODE_TYPE_OPTIONS } from "@/lib/constants"
import { useFormContext } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

/**
 * 卡片设计表单组件
 * 用于配置卡片的样式、颜色、方向等设计相关选项
 */
export const DesignForm: React.FC<FormComponentProps> = ({ formData, onChange, onFileChange }) => {
  // 获取表单上下文
  const form = useFormContext()

  // 处理文本输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    onChange(name, value)
  }

  // 处理选择框变化
  const handleSelectChange = (name: string, value: string) => {
    onChange(name, value)
  }

  // 处理开关变化
  const handleSwitchChange = (name: string, checked: boolean) => {
    onChange(name, checked)
  }

  // 处理滑块变化
  const handleSliderChange = (name: string, value: number[]) => {
    onChange(name, String(value[0]))
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
            <TabsTrigger value="media">媒体设置</TabsTrigger>
            <TabsTrigger value="watermark">水印设置</TabsTrigger>
            <TabsTrigger value="back">背面设置</TabsTrigger>
          </TabsList>

          {/* 基本设置选项卡 */}
          <TabsContent value="basic">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* 卡片方向 */}
              <FormField
                control={form.control}
                name="orientation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>卡片方向</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value)
                        handleSelectChange("orientation", value)
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="选择卡片方向" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CARD_ORIENTATION_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>选择卡片的显示方向（竖向或横向）</FormDescription>
                  </FormItem>
                )}
              />

              {/* 卡片风格 */}
              <FormField
                control={form.control}
                name="cardStyle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>卡片风格</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value)
                        handleSelectChange("cardStyle", value)
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="选择卡片风格" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CARD_STYLE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>选择卡片的视觉风格</FormDescription>
                  </FormItem>
                )}
              />

              {/* 卡片颜色 */}
              <FormField
                control={form.control}
                name="cardColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>卡片颜色</FormLabel>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e)
                          handleInputChange(e)
                        }}
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        type="text"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e)
                          handleInputChange(e)
                        }}
                        className="flex-1"
                      />
                    </div>
                  </FormItem>
                )}
              />

              {/* 文字颜色 */}
              <FormField
                control={form.control}
                name="textColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>文字颜色</FormLabel>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e)
                          handleInputChange(e)
                        }}
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        type="text"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e)
                          handleInputChange(e)
                        }}
                        className="flex-1"
                      />
                    </div>
                  </FormItem>
                )}
              />

              {/* 验证码类型 */}
              <FormField
                control={form.control}
                name="codeType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>验证码类型</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value)
                        handleSelectChange("codeType", value)
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="选择验证码类型" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CODE_TYPE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>选择卡片上显示的验证码类型</FormDescription>
                  </FormItem>
                )}
              />

              {/* 真实质感效果 */}
              <FormField
                control={form.control}
                name="realisticEffect"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>真实质感效果</FormLabel>
                      <FormDescription>启用真实卡片质感效果</FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked)
                          handleSwitchChange("realisticEffect", checked)
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>

          {/* 媒体设置选项卡 */}
          <TabsContent value="media">
            <div className="grid grid-cols-1 gap-4 mt-4">
              {/* 上传照片 */}
              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>上传照片</FormLabel>
                    <div className="grid grid-cols-1 gap-2">
                      <Input
                        type="file"
                        id="photoUpload"
                        accept="image/*"
                        onChange={(e) => onFileChange && onFileChange(e, "photo")}
                        className="hidden"
                      />
                      <div className="flex gap-2">
                        <div className="w-32 h-40 border rounded overflow-hidden">
                          <img
                            src={formData.photo || "/placeholder.svg"}
                            alt="学生照片"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <Label
                            htmlFor="photoUpload"
                            className="cursor-pointer bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded text-center"
                          >
                            选择照片
                          </Label>
                          <FormDescription className="mt-2">请上传标准证件照，尺寸最好为3:4</FormDescription>
                        </div>
                      </div>
                    </div>
                  </FormItem>
                )}
              />

              {/* 上传Logo */}
              <FormField
                control={form.control}
                name="logo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>上传Logo</FormLabel>
                    <div className="grid grid-cols-1 gap-2">
                      <Input
                        type="file"
                        id="logoUpload"
                        accept="image/*"
                        onChange={(e) => onFileChange && onFileChange(e, "logo")}
                        className="hidden"
                      />
                      <div className="flex gap-2">
                        <div className="w-16 h-16 border rounded overflow-hidden">
                          <img
                            src={formData.logo || "/placeholder.svg"}
                            alt="学校Logo"
                            className="w-full h-full object-contain p-1"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <Label
                            htmlFor="logoUpload"
                            className="cursor-pointer bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded text-center"
                          >
                            选择Logo
                          </Label>
                          <FormDescription className="mt-2">上传学校或组织的Logo</FormDescription>
                        </div>
                      </div>
                    </div>
                  </FormItem>
                )}
              />

              {/* 上传背景图片 */}
              <FormField
                control={form.control}
                name="backgroundImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>上传背景图片</FormLabel>
                    <div className="grid grid-cols-1 gap-2">
                      <Input
                        type="file"
                        id="backgroundUpload"
                        accept="image/*"
                        onChange={(e) => onFileChange && onFileChange(e, "backgroundImage")}
                        className="hidden"
                      />
                      <div className="flex gap-2">
                        <div className="h-16 w-24 overflow-hidden rounded border">
                          <img
                            src={formData.backgroundImage || "/placeholder.svg?height=60&width=90"}
                            alt="Background"
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <Label
                            htmlFor="backgroundUpload"
                            className="cursor-pointer bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded text-center"
                          >
                            选择背景
                          </Label>
                          <FormDescription className="mt-2">上传卡片的背景图片</FormDescription>
                        </div>
                      </div>
                    </div>
                  </FormItem>
                )}
              />

              {/* 背景透明度 */}
              <FormField
                control={form.control}
                name="backgroundOpacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>背景透明度：{field.value}%</FormLabel>
                    <FormControl>
                      <Slider
                        min={0}
                        max={100}
                        step={1}
                        value={[Number.parseInt(field.value) || 0]}
                        onValueChange={(value) => {
                          field.onChange(String(value[0]))
                          handleSliderChange("backgroundOpacity", value)
                        }}
                      />
                    </FormControl>
                    <FormDescription>调整背景图片的透明度</FormDescription>
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>

          {/* 水印设置选项卡 */}
          <TabsContent value="watermark">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* 启用水印 */}
              <FormField
                control={form.control}
                name="enableWatermark"
                render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-2 flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>启用水印</FormLabel>
                      <FormDescription>在卡片上显示半透明水印</FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked)
                          handleSwitchChange("enableWatermark", checked)
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* 水印文本 */}
              <FormField
                control={form.control}
                name="watermarkText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>水印文本</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          handleInputChange(e)
                        }}
                        placeholder="输入水印文本"
                        disabled={!formData.enableWatermark}
                      />
                    </FormControl>
                    <FormDescription>显示在卡片上的水印文本</FormDescription>
                  </FormItem>
                )}
              />

              {/* 水印颜色 */}
              <FormField
                control={form.control}
                name="watermarkColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>水印颜色</FormLabel>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e)
                          handleInputChange(e)
                        }}
                        className="w-16 h-10 p-1"
                        disabled={!formData.enableWatermark}
                      />
                      <Input
                        type="text"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e)
                          handleInputChange(e)
                        }}
                        className="flex-1"
                        disabled={!formData.enableWatermark}
                      />
                    </div>
                  </FormItem>
                )}
              />

              {/* 水印大小 */}
              <FormField
                control={form.control}
                name="watermarkSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>水印大小：{field.value}px</FormLabel>
                    <FormControl>
                      <Slider
                        min={8}
                        max={64}
                        step={1}
                        value={[Number.parseInt(field.value) || 32]}
                        onValueChange={(value) => {
                          field.onChange(String(value[0]))
                          handleSliderChange("watermarkSize", value)
                        }}
                        disabled={!formData.enableWatermark}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* 水印角度 */}
              <FormField
                control={form.control}
                name="watermarkAngle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>水印角度：{field.value}°</FormLabel>
                    <FormControl>
                      <Slider
                        min={-90}
                        max={90}
                        step={1}
                        value={[Number.parseInt(field.value) || 45]}
                        onValueChange={(value) => {
                          field.onChange(String(value[0]))
                          handleSliderChange("watermarkAngle", value)
                        }}
                        disabled={!formData.enableWatermark}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* 水印透明度 */}
              <FormField
                control={form.control}
                name="watermarkOpacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>水印透明度：{field.value}%</FormLabel>
                    <FormControl>
                      <Slider
                        min={1}
                        max={50}
                        step={1}
                        value={[Number.parseInt(field.value) || 10]}
                        onValueChange={(value) => {
                          field.onChange(String(value[0]))
                          handleSliderChange("watermarkOpacity", value)
                        }}
                        disabled={!formData.enableWatermark}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>

          {/* 背面设置选项卡 */}
          <TabsContent value="back">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* 启用背面 */}
              <FormField
                control={form.control}
                name="backEnabled"
                render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-2 flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>启用背面</FormLabel>
                      <FormDescription>生成卡片的背面信息</FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked)
                          handleSwitchChange("backEnabled", checked)
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* 背面标题 */}
              <FormField
                control={form.control}
                name="backTitle"
                render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-2">
                    <FormLabel>背面标题</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="输入背面标题"
                        onChange={(e) => {
                          field.onChange(e)
                          handleInputChange(e)
                        }}
                        disabled={!formData.backEnabled}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* 使用条款 */}
              <FormField
                control={form.control}
                name="termsOfUse"
                render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-2">
                    <FormLabel>使用条款</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="输入使用条款"
                        onChange={(e) => {
                          field.onChange(e)
                          handleInputChange(e)
                        }}
                        disabled={!formData.backEnabled}
                        rows={3}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* 丢失卡片信息 */}
              <FormField
                control={form.control}
                name="lostCardInfo"
                render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-2">
                    <FormLabel>丢失卡片信息</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="输入丢失卡片的处理信息"
                        onChange={(e) => {
                          field.onChange(e)
                          handleInputChange(e)
                        }}
                        disabled={!formData.backEnabled}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* 访问权限清单 */}
              <FormField
                control={form.control}
                name="accessList"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>访问权限清单</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="输入访问权限（用逗号分隔）"
                        onChange={(e) => {
                          field.onChange(e)
                          handleInputChange(e)
                        }}
                        disabled={!formData.backEnabled}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* 背面Logo */}
              <FormField
                control={form.control}
                name="backLogo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>背面Logo</FormLabel>
                    <div className="grid grid-cols-1 gap-2">
                      <Input
                        type="file"
                        id="backLogoUpload"
                        accept="image/*"
                        onChange={(e) => onFileChange && onFileChange(e, "backLogo")}
                        className="hidden"
                        disabled={!formData.backEnabled}
                      />
                      <div className="flex gap-2">
                        <div className="w-16 h-16 border rounded overflow-hidden">
                          <img
                            src={formData.backLogo || "/placeholder.svg"}
                            alt="背面Logo"
                            className="w-full h-full object-contain p-1"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <Label
                            htmlFor="backLogoUpload"
                            className={`cursor-pointer bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded text-center ${!formData.backEnabled ? "opacity-50 pointer-events-none" : ""}`}
                          >
                            选择背面Logo
                          </Label>
                        </div>
                      </div>
                    </div>
                  </FormItem>
                )}
              />

              {/* 背面Logo透明度 */}
              <FormField
                control={form.control}
                name="backLogoOpacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo透明度：{field.value}%</FormLabel>
                    <FormControl>
                      <Slider
                        min={0}
                        max={100}
                        step={1}
                        value={[Number.parseInt(field.value) || 70]}
                        onValueChange={(value) => {
                          field.onChange(String(value[0]))
                          handleSliderChange("backLogoOpacity", value)
                        }}
                        disabled={!formData.backEnabled}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default DesignForm
