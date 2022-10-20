export default function NewColumnButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      type='button'
      className='self-stretch max-h-[75vh] min-w-[280px] w-[280px] flex items-center justify-center bg-gradient-to-l from-[#E9EFFA] to-[rgba(233,239,250,0.5)] rounded-md relative top-[39px] dark:bg-gradient-to-l dark:from-[rgba(43,44,55,0.25)] dark:to-[rgba(43,44,55,0.125)] text-med-gray'
    >
      + New Column
    </button>
  )
}
