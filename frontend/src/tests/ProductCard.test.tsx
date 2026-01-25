import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'
import ProductCard from '../components/ProductCard'
import { MemoryRouter } from 'react-router'
import { TestQueryProvider } from './test-utils'


test("renders proudct", async () => {
 const product = {
  id: "1",
  category: "pizza",
  name: "pizza", price: 120, imageUrl: "https://picsum.photos/200/300", ingredients: "onions,cheese,chicken"
 }

 const { getByText, getByRole } = await render(
  <MemoryRouter>
   <TestQueryProvider>
    <ProductCard {...product} />
   </TestQueryProvider>
  </MemoryRouter>
 )
 await expect.element(getByText(/r120/i)).toBeVisible()
 await expect.element(getByRole('img', { name: /food/i })).toBeVisible()
 await expect.element(getByRole('button')).toBeVisible()
 await expect.element(getByRole('heading', {
  name: /pizza/i
 })).toBeVisible()

})