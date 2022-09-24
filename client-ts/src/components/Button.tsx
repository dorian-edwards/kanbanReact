export interface ButtonProps {
  styling: string
  text: string
  type?: string
}

export default function Button(props: ButtonProps) {
  const { styling, text } = props
  return <button className={`btn ${styling}`}>{text}</button>
}
