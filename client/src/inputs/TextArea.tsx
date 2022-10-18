import React from 'react'

export interface TextAreaProps {
  label: string
  placeholder: string
  value: string
  optionalStyling?: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export default function TextArea(props: TextAreaProps) {
  const { label, placeholder, value, optionalStyling, onChange } = props
  return (
    <div className='text-area-component-wrapper mb-6'>
      <h2 className='body-m text-med-gray mb-2 dark:text-white'>{label}</h2>
      <textarea
        className={`text-area ${optionalStyling}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      ></textarea>
    </div>
  )
}
