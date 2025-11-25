import { cn } from "@/lib/utils"

interface MatrixDisplayProps {
  data: number[][]
  highlight?: { row: number; col: number }
  className?: string
}

export function MatrixDisplay({ data, highlight, className }: MatrixDisplayProps) {
  return (
    <div className={cn("inline-flex items-center gap-2 font-mono text-2xl md:text-4xl", className)}>
      {/* Left Bracket */}
      <div className="w-4 border-2 border-r-0 border-foreground self-stretch rounded-l-xl" />

      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${data[0].length}, minmax(0, 1fr))` }}>
        {data.map((row, rIndex) =>
          row.map((val, cIndex) => (
            <div
              key={`${rIndex}-${cIndex}`}
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-lg border-2 border-transparent transition-all",
                highlight?.row === rIndex &&
                  highlight?.col === cIndex &&
                  "border-accent bg-accent/20 scale-110 font-bold",
              )}
            >
              {val}
            </div>
          )),
        )}
      </div>

      {/* Right Bracket */}
      <div className="w-4 border-2 border-l-0 border-foreground self-stretch rounded-r-xl" />
    </div>
  )
}
