import React from 'react'

export interface InputProps {
  label: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function InputField(props: InputProps): React.ReactElement {
  const { label, placeholder, value, onChange } = props

  return (
    <div className='input-wrapper'>
      <input
        type='text'
        className='input'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
