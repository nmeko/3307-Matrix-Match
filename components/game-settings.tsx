"use client"

import { Settings, Globe, Eye, Volume2, Type } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useGame } from "@/lib/game-context"
import { useState } from "react"
import { useTranslation } from "@/lib/use-translation"

export function GameSettings() {
  const { gameSettings, setGameSettings } = useGame()
  const t = useTranslation()
  const [tempSettings, setTempSettings] = useState(gameSettings)
  const [isOpen, setIsOpen] = useState(false)

  const handleSave = () => {
    setGameSettings(tempSettings)
    setIsOpen(false)
  }

  const handleCancel = () => {
    setTempSettings(gameSettings)
    setIsOpen(false)
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (open) setTempSettings(gameSettings)
        setIsOpen(open)
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 bg-white hover:bg-gray-100 border-4 border-foreground rounded-lg"
          aria-label={t("openSettings")}
        >
          <Settings className="h-6 w-6 text-foreground" aria-hidden="true" />
        </Button>
      </DialogTrigger>
      <DialogContent closeLabel={t("close")} className="border-4 border-foreground shadow-lg max-w-md bg-background sm:rounded-2xl overflow-y-auto max-h-screen">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black flex items-center gap-2">
            <Settings className="w-6 h-6" aria-hidden="true" /> {t("gameSettings")}
          </DialogTitle>
          <DialogDescription>{t("customizeExperience")}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Language Selection */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-1">
              <Globe className="w-5 h-5 text-primary flex-shrink-0" />
              <Label htmlFor="language" className="font-bold text-lg">
                {t("languageLabel")}
              </Label>
            </div>
            <Select
              value={tempSettings.language.toLowerCase()}
              onValueChange={(value) => {
                const languageMap: Record<string, "English" | "Spanish" | "Mandarin" | "Hindi" | "Arabic"> = {
                  english: "English",
                  spanish: "Spanish",
                  mandarin: "Mandarin",
                  hindi: "Hindi",
                  arabic: "Arabic",
                }
                setTempSettings({ ...tempSettings, language: languageMap[value] })
              }}
            >
              <SelectTrigger id="language" className="w-[160px] border-2 border-foreground font-bold text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-2 border-foreground">
                {/* Each language in its own words, so anyone can find theirs */}
                <SelectItem value="english" lang="en">English</SelectItem>
                <SelectItem value="spanish" lang="es">Español</SelectItem>
                <SelectItem value="mandarin" lang="zh">中文</SelectItem>
                <SelectItem value="hindi" lang="hi">हिन्दी</SelectItem>
                <SelectItem value="arabic" lang="ar">العربية</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Text Size */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-1">
              <Type className="w-5 h-5 text-secondary flex-shrink-0" />
              <div className="flex flex-col">
                <Label htmlFor="textsize" className="font-bold text-lg">
                  {t("textSize")}
                </Label>
                <span className="text-xs text-muted-foreground">{t("forReadability")}</span>
              </div>
            </div>
            <Select
              value={tempSettings.textSize}
              onValueChange={(value) =>
                setTempSettings({ ...tempSettings, textSize: value as "normal" | "large" | "larger" | "largest" })
              }
            >
              <SelectTrigger id="textsize" className="w-[140px] border-2 border-foreground font-bold text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-2 border-foreground">
                <SelectItem value="normal">{t("normal")}</SelectItem>
                <SelectItem value="large">{t("large")}</SelectItem>
                <SelectItem value="larger">{t("larger")}</SelectItem>
                <SelectItem value="largest">{t("largest")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* High Contrast */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-1">
              <Eye className="w-5 h-5 text-accent flex-shrink-0" />
              <div className="flex flex-col">
                <Label htmlFor="contrast" className="font-bold text-lg">
                  {t("highContrast")}
                </Label>
                <span className="text-xs text-muted-foreground">{t("betterVisibility")}</span>
              </div>
            </div>
            <Switch
              id="contrast"
              checked={tempSettings.highContrast}
              onCheckedChange={(checked) => setTempSettings({ ...tempSettings, highContrast: checked })}
              className="data-[state=checked]:bg-foreground flex-shrink-0"
            />
          </div>

          {/* Sound Effects */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-1">
              <Volume2 className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              <Label htmlFor="sound" className="font-bold text-lg">
                {t("soundEffects")}
              </Label>
            </div>
            <Switch
              id="sound"
              checked={tempSettings.soundEnabled}
              onCheckedChange={(checked) => setTempSettings({ ...tempSettings, soundEnabled: checked })}
              className="data-[state=checked]:bg-foreground flex-shrink-0"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6 border-t pt-4">
          <Button
            onClick={handleCancel}
            variant="outline"
            className="flex-1 border-2 border-foreground font-bold bg-transparent"
          >
            {t("cancel")}
          </Button>
          <Button onClick={handleSave} className="flex-1 font-bold border-2 border-foreground">
            {t("saveSettings")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
