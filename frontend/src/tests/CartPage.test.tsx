import { render } from "vitest-browser-react"
import { test } from "./test-extend"
import { MemoryRouter } from "react-router"
import { TestQueryProvider } from "./test-utils"
import { http, HttpResponse } from "msw"
import { expect } from "vitest"
import CartPage from "../pages/CartPage"

test("it shows empty cart component when thers no cart items", async ({
  worker,
}) => {
  // Prepend overrides to the happy-path handlers
  // on the `worker` object from the test's context.
  worker.use(
    http.get("/api/cart", () => {
      return HttpResponse.json({
        status: "success",
        code: 200,
        cart: [],
      })
    }),
  )

  const { getByRole } = await render(
    <MemoryRouter>
      <TestQueryProvider>
        <CartPage />
      </TestQueryProvider>
    </MemoryRouter>,
  )

  await expect
    .element(getByRole("heading"))
    .toHaveTextContent(/your cart is empty/i)
})

test("it shows correct cart totals", async ({ worker }) => {
  // Prepend overrides to the happy-path handlers
  // on the `worker` object from the test's context.
  worker.use(
    http.get("/api/cart", () => {
      return HttpResponse.json({
        status: "success",
        code: 200,
        cart: [
          {
            productId: "aa1eed3d-8560-4584-a6f1-81ab4db316b9",
            name: "Classic Beef Burger",
            price: "79.99",
            imageUrl:
              "https://res.cloudinary.com/dgdevmfnd/image/upload/v1750992029/food-images/burgers/beef/classic-burger-removebg-preview_xfrow1.png",
            quantity: 2,
          },
          {
            productId: "d2d62289-ed27-4fb6-b985-693be775a10d",
            name: "Cheese Burger",
            price: "84.99",
            imageUrl:
              "https://res.cloudinary.com/dgdevmfnd/image/upload/v1750992030/food-images/burgers/beef/pexels-natan-machado-fotografia-gastronomica-162809799-15010309-removebg-preview_hibqtd.png",
            quantity: 2,
          },
          {
            productId: "f2ac134c-7fa6-4342-956a-57e592d3afdd",
            name: "Spicy jalapeño Burger",
            price: "89.99",
            imageUrl:
              "https://res.cloudinary.com/dgdevmfnd/image/upload/v1750992029/food-images/burgers/beef/pexels-melaudelo-27600007-removebg-preview_w0euve.png",
            quantity: 2,
          },
        ],
      })
    }),
  )

  const { getByTestId, getByText } = await render(
    <MemoryRouter>
      <TestQueryProvider>
        <CartPage />
      </TestQueryProvider>
    </MemoryRouter>,
  )

  await expect.element(getByText(/R169.98/i)).toBeInTheDocument()
  await expect.element(getByText(/R179.98/i)).toBeInTheDocument()
  await expect.element(getByText(/R159.98/i)).toBeInTheDocument()
  await expect.element(getByTestId("cart-total")).toHaveTextContent(/R 529,94/i)
})
