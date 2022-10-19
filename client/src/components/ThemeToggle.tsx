import lightTheme from '../assets/icon-light-theme.svg'
import darkTheme from '../assets/icon-dark-theme.svg'
import { useTheme } from '../providers/ThemeProvider'

export default function ThemeToggle() {
  const { toggleDark, isDarkMode } = useTheme()

  return (
    <div className='dark-toggle h-12 w-[95%] max-w-[251px] bg-light-gray-bg dark:bg-v-dark-gray mx-auto rounded-md mb-[22px] flex gap-x-6 justify-center py-[14px]'>
      <img src={lightTheme} alt='sun symbol' />
      <button className='group' onClick={() => toggleDark()}>
        <div className='toggle-wrapper w-10 h-5 bg-main-purple group-hover:bg-main-purple-hover rounded-full relative flex items-center'>
          <div
            className={`toggle h-[14px] w-[14px] rounded-full bg-white absolute ${
              isDarkMode ? 'right-1' : 'left-1'
            }`}
          ></div>
        </div>
      </button>
      <img src={darkTheme} alt='moon and star' />
    </div>
  )
}
