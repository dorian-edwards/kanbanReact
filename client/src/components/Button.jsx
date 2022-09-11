export default function Button({ styling, text }) {
  return <button className={`btn ${styling}`}>{text}</button>
}
