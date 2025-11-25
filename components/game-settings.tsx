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

export function GameSettings() {
  const { gameSettings, setGameSettings } = useGame()
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 bg-white hover:bg-gray-100 border-4 border-foreground rounded-lg"
          aria-label="Open game settings"
        >
          <Settings className="h-6 w-6 text-foreground" />
          <span className="sr-only">Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="border-4 border-foreground shadow-lg max-w-md bg-background sm:rounded-2xl overflow-y-auto max-h-screen">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black flex items-center gap-2">
            <Settings className="w-6 h-6" /> Game Settings
          </DialogTitle>
          <DialogDescription>Customize your experience!</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Language Selection */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-1">
              <Globe className="w-5 h-5 text-primary flex-shrink-0" />
              <Label htmlFor="language" className="font-bold text-lg">
                Language
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
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent className="border-2 border-foreground">
                <SelectItem value="english">🇺🇸 English</SelectItem>
                <SelectItem value="spanish">🇪🇸 Spanish</SelectItem>
                <SelectItem value="mandarin">🇨🇳 Mandarin</SelectItem>
                <SelectItem value="hindi">🇮🇳 Hindi</SelectItem>
                <SelectItem value="arabic">🇸🇦 Arabic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Text Size */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-1">
              <Type className="w-5 h-5 text-secondary flex-shrink-0" />
              <div className="flex flex-col">
                <Label htmlFor="textsize" className="font-bold text-lg">
                  Text Size
                </Label>
                <span className="text-xs text-muted-foreground">For better readability</span>
              </div>
            </div>
            <Select
              value={tempSettings.textSize}
              onValueChange={(value) =>
                setTempSettings({ ...tempSettings, textSize: value as "normal" | "large" | "larger" | "largest" })
              }
            >
              <SelectTrigger id="textsize" className="w-[140px] border-2 border-foreground font-bold text-sm">
                <SelectValue placeholder="Select Size" />
              </SelectTrigger>
              <SelectContent className="border-2 border-foreground">
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="large">Large</SelectItem>
                <SelectItem value="larger">Larger</SelectItem>
                <SelectItem value="largest">Largest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* High Contrast */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-1">
              <Eye className="w-5 h-5 text-accent flex-shrink-0" />
              <div className="flex flex-col">
                <Label htmlFor="contrast" className="font-bold text-lg">
                  High Contrast
                </Label>
                <span className="text-xs text-muted-foreground">Better for color blindness</span>
              </div>
            </div>
            <Switch
              id="contrast"
              checked={tempSettings.highContrast}
              onCheckedChange={(checked) => setTempSettings({ ...tempSettings, highContrast: checked })}
              className="data-[state=checked]:bg-foreground flex-shrink-0"
              aria-label="Toggle high contrast mode"
            />
          </div>

          {/* Sound Effects */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-1">
              <Volume2 className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              <Label htmlFor="sound" className="font-bold text-lg">
                Sound Effects
              </Label>
            </div>
            <Switch
              id="sound"
              checked={tempSettings.soundEnabled}
              onCheckedChange={(checked) => setTempSettings({ ...tempSettings, soundEnabled: checked })}
              className="data-[state=checked]:bg-foreground flex-shrink-0"
              aria-label="Toggle sound effects"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6 border-t pt-4">
          <Button
            onClick={handleCancel}
            variant="outline"
            className="flex-1 border-2 border-foreground font-bold bg-transparent"
          >
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex-1 game-btn font-bold">
            Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
