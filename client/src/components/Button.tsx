import { ButtonProps } from '../Interfaces/ObjectInterfaces'

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
