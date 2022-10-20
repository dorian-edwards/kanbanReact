import showSidebar from '../assets/icon-show-sidebar.svg'

export default function ShowSidePanel({ toggle }: { toggle: () => void }) {
  return (
    <button
      className='absolute bottom-0 left-0 bg-main-purple hover:bg-main-purple-hover w-14 h-12 rounded-tr-full rounded-br-full pl-[18px] mb-8'
      onClick={toggle}
    >
      <img src={showSidebar} alt='open eye icon' />
    </button>
  )
}
