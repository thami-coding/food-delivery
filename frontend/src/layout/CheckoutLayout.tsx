import { Outlet } from 'react-router'
import CheckoutProgress from '../components/CheckoutProgress'

export default function CheckoutLayout() {
  return (
    <main>
      <CheckoutProgress  />
      <Outlet />
    </main>
  )
}
