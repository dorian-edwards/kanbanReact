export default function Checkbox() {
  return (
    <div className='checkbox-wrapper flex items-center rounded-[4px] bg-main-purple-opaque w-full max-w-[416px] h-[40px] hover:bg-main-purple-opaque-hover dark:bg-v-dark-gray'>
      <label
        htmlFor='12342'
        className='w-full flex items-center h-full hover:cursor-pointer pl-3'
      >
        <input type='checkbox' name='test' id='12342' className='hidden peer' />
        <div className='input-checkbox' />
        <span className='label-text'>Completed</span>
      </label>
    </div>
  )
}
