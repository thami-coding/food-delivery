import { render } from 'vitest-browser-react'
import { expect, test } from 'vitest'
import HomePage from '../pages/HomePage'
import { MemoryRouter } from "react-router"


test('it shows two links on home page', async () => {
 const { getByText } = await render(
  <MemoryRouter>
   <HomePage />
  </MemoryRouter>
 )

 await expect.element(getByText("specials")).toBeInTheDocument()
 await expect.element(getByText("menu")).toBeInTheDocument()

})