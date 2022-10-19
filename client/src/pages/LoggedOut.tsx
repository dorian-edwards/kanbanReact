import NavigationBoiler from '../components/NavigationBoiler'

export default function LoggedOut({ children }: { children: JSX.Element }) {
  return (
    <>
      <header>
        <NavigationBoiler />
      </header>
      <main className='main'>{children}</main>
    </>
  )
}
