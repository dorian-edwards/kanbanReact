export interface ButtonProps {
  styling: string
  text: string
  disabled: boolean
  onClick?: (e: React.SyntheticEvent<HTMLButtonElement>) => void
  type?: 'button' | 'submit' | 'reset' | undefined
}

export default function Button(props: ButtonProps) {
  const { styling, text, disabled, type, onClick } = props
  return (
    <button
      className={`btn ${styling}`}
      disabled={disabled}
      onClick={onClick}
      type={type || 'button'}
    >
      {text}
    </button>
  )
}
