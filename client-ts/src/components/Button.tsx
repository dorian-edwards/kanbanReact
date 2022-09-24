export interface ButtonProps {
  styling: string
  text: string
  disabled: boolean
  type?: string
}

export default function Button(props: ButtonProps) {
  const { styling, text, disabled } = props
  return (
    <button className={`btn ${styling}`} disabled={disabled}>
      {text}
    </button>
  )
}
