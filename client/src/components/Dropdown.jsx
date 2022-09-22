import { useState } from 'react'
import chevronDown from '../assets/icon-chevron-down.svg'

export default function DropDown() {
  const [active, setActive] = useState(false)
  const [status, setStatus] = useState('Doing')

  const statuses = [
    {
      title: 'Todo',
      id: '123',
    },
    {
      title: 'Doing',
      id: '456',
    },
    {
      title: 'Done',
      id: '789',
    },
  ]

  function handleSelection(e) {
    const { value } = e.target
    setStatus(value)
    setActive(!active)
  }

  return (
    <div className='dropdown w-full max-w-[416px]'>
      <p className='dropdown_label mb-2 text-med-gray dark:text-white body-m'>
        Current Status
      </p>
      <div className={`dropdown_current ${active ? 'border-main-purple' : ''}`}>
        <p className='text-black dark:text-white'>{status}</p>
        <button onClick={() => setActive(!active)}>
          <img src={chevronDown} alt='downward chevron' />
        </button>
      </div>
      {active && (
        <ul className='dropdown_options p-4 body-l rounded-lg dark:bg-v-dark-gray'>
          {statuses.map((status) => (
            <li className='mb-2' key={status.id}>
              <button
                value={status.title}
                className='text-med-gray text-left w-full'
                onClick={handleSelection}
              >
                {status.title}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
