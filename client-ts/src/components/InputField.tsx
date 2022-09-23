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
    <div className='input-component-wrapper mb-6'>
      <h2 className='body-m text-med-gray mb-2 dark:text-white'>{label}</h2>
      <div className='input-wrapper'>
        <input
          type='text'
          className='input'
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  )
}
