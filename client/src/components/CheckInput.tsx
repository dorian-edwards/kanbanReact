import { CheckInputProps } from '../Interfaces/ObjectInterfaces'
import check from '../assets/icon-check.svg'

export default function CheckInput({
  complete,
  toggleComplete,
}: CheckInputProps) {
  return (
    <button
      type='button'
      onClick={toggleComplete}
      className={`w-4 h-4 rounded-sm ${
        complete
          ? 'bg-main-purple'
          : 'bg-white dark:bg-dark-gray border-solid border-[1px] border-input-idle'
      }  text-center`}
    >
      {complete && <img src={check} alt='white check' className='m-auto' />}
    </button>
  )
}
