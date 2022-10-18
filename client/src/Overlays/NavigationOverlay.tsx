export default function NavigationOverlay({
  children,
}: {
  children: JSX.Element
}) {
  return (
    <>
      <header>
        <div>Navigation</div>
      </header>
      <main>{children}</main>
    </>
  )
}
