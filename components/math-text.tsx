// Matrix notation such as 2([[1,2],[3,4]]) + [[5,6],[7,8]] must read left to right even inside
// Arabic sentences; without this the browser's right-to-left layout reorders the brackets and numbers.
const MATH = /[\d(]*\[\[.*\]\][)]*/

export function MathText({ text }: { text: string }) {
  const m = text.match(MATH)
  if (!m || m.index === undefined) return <>{text}</>
  return (
    <>
      {text.slice(0, m.index)}
      <span dir="ltr" className="inline-block">
        {m[0]}
      </span>
      {text.slice(m.index + m[0].length)}
    </>
  )
}
