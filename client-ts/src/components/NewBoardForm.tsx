import React, { useState } from 'react'
import InputField from './inputs/InputField'
import Button from './Button'

export default function NewBoardForm() {
  const [columnInputs, setColumnInputs] = useState<string[]>([])

  const handleColumnInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const data = [...columnInputs]
    data[index] = e.target.value
    setColumnInputs(data)
  }

  const createNewColumnInput = (): void => {
    setColumnInputs([...columnInputs, ''])
  }

  return (
    <div className='new-board-form bg-white w-full max-w-[343px] min-h-[413px] mx-auto relative top-[279px]'>
      <form>
        <h2 className='heading-l mb-6 text-black'>Add New Board</h2>
        <InputField
          label='Name'
          placeholder='e.g. Web Design'
          value=''
          onChange={() => console.log('hey')}
        />
        <h2 className='body-m text-med-gray mb-2'>Columns</h2>
        {columnInputs.map((column: string, index: number) => {
          return (
            <InputField
              key={index}
              placeholder='e.g Done'
              value={columnInputs[index]}
              onChange={(e) => handleColumnInputChange(e, index)}
            />
          )
        })}
        <Button
          styling='secondary mb-6'
          text='+ Add New Column'
          disabled={false}
          onClick={createNewColumnInput}
          type='button'
        />
        <Button
          styling='primary-s'
          text='Create New Board'
          disabled={false}
          type='submit'
          onClick={(e) => console.log(e)}
        />
      </form>
    </div>
  )
}
