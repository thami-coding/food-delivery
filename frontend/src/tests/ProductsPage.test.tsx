import { test, expect } from "vitest"
import { page } from "vitest/browser"
import { render } from "vitest-browser-react"
import ProductsPage from "../pages/ProductsPage"
import { MemoryRouter } from "react-router"
import { TestQueryProvider } from "./test-utils"
import { delay, http, HttpResponse } from "msw"
import { test as testMock } from "./test-extend"
import { userEvent } from "vitest/browser"

test("it shows category filters on ProductsPage", async () => {
  const { getByRole } = await render(
    <MemoryRouter>
      <TestQueryProvider>
        <ProductsPage />
      </TestQueryProvider>
    </MemoryRouter>,
  )

  await expect
    .element(getByRole("button", { name: /all/i }))
    .toBeInTheDocument()
  await expect
    .element(getByRole("button", { name: /pizzas/i }))
    .toBeInTheDocument()
  await expect
    .element(getByRole("button", { name: /wings/i }))
    .toBeInTheDocument()
  await expect
    .element(getByRole("button", { name: /burgers/i }))
    .toBeInTheDocument()
  await expect
    .element(getByRole("button", { name: /combos/i }))
    .toBeInTheDocument()
  await expect
    .element(getByRole("button", { name: /ribs/i }))
    .toBeInTheDocument()
})

testMock(
  "it shows loading spinner when data is loading",
  async ({ worker }) => {
    worker.use(
      http.get("/api/products", async () => {
        await delay(2000)
        return HttpResponse.json({
          status: "success",
          products: [
            {
              id: "aa1eed3d-8560-4584-a6f1-81ab4db316b9",
              category: "pizza",
              name: "pizza",
              price: 120,
              imageUrl: "https://picsum.photos/200/300",
              ingredients: "onions,cheese,chicken",
            },
            {
              id: "c4292a5a-883c-4047-b03d-b12be88eeca2",
              category: "pizza",
              name: "pizza",
              price: 120,
              imageUrl: "https://picsum.photos/200/300",
              ingredients: "onions,cheese,chicken",
            },
          ],
          page: 1,
          totalPages: 3,
          totalProducts: 28,
          code: 200,
        })
      }),
    )
    const { getByTestId } = await render(
      <MemoryRouter>
        <TestQueryProvider>
          <ProductsPage />
        </TestQueryProvider>
      </MemoryRouter>,
    )

    await expect.element(getByTestId("loading-spinner")).toBeInTheDocument()
    await expect.element(getByTestId("loading-spinner")).not.toBeInTheDocument()
  },
)

testMock("it shows product modal when add button is clicked", async ({worker}) => {
  worker.use(
    http.get("/api/products", async () => {
      await delay(2000)
      return HttpResponse.json({
        status: "success",
        products: [
          {
            id: "aa1eed3d-8560-4584-a6f1-81ab4db316b9",
            category: "pizza",
            name: "pizza",
            price: 120,
            imageUrl: "https://picsum.photos/200/300",
            ingredients: "onions,cheese,chicken",
          }
        ],
        page: 1,
        totalPages: 3,
        totalProducts: 28,
        code: 200,
      })
    }),
  )

  const { getByRole } = await render(
    <MemoryRouter>
      <TestQueryProvider>
        <ProductsPage />
      </TestQueryProvider>
    </MemoryRouter>,
  )

  const button = getByRole("button", {name: /add/i})

  await userEvent.click(button)

  await expect.element(page.getByTestId("product-modal")).toBeInTheDocument()
})
