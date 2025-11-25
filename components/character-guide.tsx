"use client"

interface CharacterGuideProps {
  message?: string
  mood?: "happy" | "thinking" | "celebrate" | "sad"
}

export function CharacterGuide({ message, mood = "happy" }: CharacterGuideProps) {
  const renderFace = () => {
    switch (mood) {
      case "celebrate":
        return (
          <g>
            <circle cx="30" cy="40" r="5" fill="black" />
            <circle cx="70" cy="40" r="5" fill="black" />
            <path d="M 30 70 Q 50 90 70 70" stroke="black" strokeWidth="3" fill="none" />
            <path d="M 20 20 L 30 10 L 40 20" stroke="gold" strokeWidth="2" fill="none" />
            <path d="M 80 20 L 70 10 L 60 20" stroke="gold" strokeWidth="2" fill="none" />
          </g>
        )
      case "sad":
        return (
          <g>
            <circle cx="30" cy="45" r="5" fill="black" />
            <circle cx="70" cy="45" r="5" fill="black" />
            <path d="M 30 80 Q 50 60 70 80" stroke="black" strokeWidth="3" fill="none" />
          </g>
        )
      default: // Happy
        return (
          <g>
            <circle cx="30" cy="40" r="5" fill="black" />
            <circle cx="70" cy="40" r="5" fill="black" />
            <path d="M 30 70 Q 50 90 70 70" stroke="black" strokeWidth="3" fill="none" />
          </g>
        )
    }
  }

  return (
    <div className="relative flex items-end gap-4">
      {message && (
        <div className="mb-12 relative bg-white border-2 border-foreground rounded-2xl p-4 shadow-md max-w-[200px] animate-fadeIn">
          <p className="text-sm font-bold text-black">{message}</p>
          <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white border-b-2 border-r-2 border-foreground rotate-45 transform" />
        </div>
      )}

      <div className="w-24 h-24 bg-secondary rounded-full border-4 border-foreground relative overflow-hidden shadow-lg animate-bob">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {renderFace()}
        </svg>
      </div>
    </div>
  )
}
