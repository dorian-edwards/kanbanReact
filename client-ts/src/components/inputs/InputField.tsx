import React from 'react'

export interface InputProps {
  label?: string
  placeholder: string
  value: string
  optionalStyling?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function InputField(props: InputProps): React.ReactElement {
  const { label, placeholder, value, onChange, optionalStyling } = props

  return (
    <div className={`input-component-wrapper ${optionalStyling}`}>
      {label && (
        <h2 className='body-m text-med-gray mb-2 dark:text-white'>{label}</h2>
      )}
      <div className='input-wrapper'>
        <input
          type='text'
          className={`input ${optionalStyling}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  )
}
