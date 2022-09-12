import { useState } from 'react'
// Temporary Build, will adjust later
// to get onChange and set state events from props
export default function Input() {
  const [text, setText] = useState('')

  const handleText = (e) => setText(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim()) {
      console.log('empty')
      return flashError()
    }
  }

  return (
    <form onSubmit={handleSubmit} className='w-full max-w-[600px]'>
      <div className='input-wrapper'>
        <input
          type='text'
          placeholder='Enter Text'
          className='input'
          value={text}
          onChange={handleText}
        />
      </div>
      <button>Submit</button>
    </form>
  )
}

function flashError() {
  document.querySelector('.input-wrapper').classList.add('error')

  const run = setTimeout(() => {
    document.querySelector('.input-wrapper').classList.remove('error')
    clearInterval(run)
  }, 3000)
}
