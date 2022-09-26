import React, { useState } from 'react'
import InputField from './inputs/InputField'
import Button from './Button'

export default function NewBoardForm() {
  return (
    <div className='new-board-form bg-white w-full max-w-[343px] h-[413px] mx-auto relative top-[279px]'>
      <form>
        <h2 className='heading-l mb-6 text-black'>Add New Board</h2>
        <InputField
          label='Name'
          placeholder='e.g. Web Design'
          value=''
          onChange={() => console.log('hey')}
        />
        <h2 className='body-m text-med-gray mb-2'>Columns</h2>
        <Button
          styling='secondary mb-6'
          text='+ Add New Column'
          disabled={false}
          onClick={(e) => console.log(e)}
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
