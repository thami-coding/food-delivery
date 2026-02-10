import { render } from "vitest-browser-react"
import { expect, test, vi } from "vitest"
import { page, userEvent } from "vitest/browser"
import Product from "./Product"

vi.mock("../../cart/hooks", () => ({
  useAddCartItem: () => ({
    mutate: () => {},
    isPending: false,
  }),
}))

vi.mock("../productStore", () => ({
  useProduct: (selector: any) =>
    selector({
      product: {
        id: "70bb8ea4-6e59-4b1d-b31e-4b3df11586fa",
        name: "Cheese Burger",
        ingredients: "cheese,bacon,jalapeño,beef",
        category: "burgers",
        description:
          "Juicy beef patty topped with cheddar cheese, pickles, and onions.",
        price: "84.90",
        imageUrl:
          "https://res.cloudinary.com/dgdevmfnd/image/upload/w_400,q_auto,f_auto/v1750992030/food-images/burgers/beef/pexels-natan-machado-fotografia-gastronomica-162809799-15010309-removebg-preview_hibqtd.png",
      },
      setProduct: () => {},
    }),
}))

test("it should increase quantity and total when plus button is clicked ", async () => {
  await render(<Product />)

  const increaseButton = page.getByTestId("increase")
  const quantity = page.getByTestId("quantity")
  const total = page.getByRole("button", { name: "ADD ITEM-R" })

  await userEvent.click(increaseButton)

  await expect.element(quantity).toBeInTheDocument()
  await expect.element(quantity).toHaveTextContent("2")
  await expect.element(total).toHaveTextContent("ADD ITEM-R 169.80")
})

test("it should decrease price by one when minus button is clicked ", async () => {
  await render(<Product />)

  const increaseButton = page.getByTestId("increase")
  const decreaseButton = page.getByTestId("decrease")
  const quantity = page.getByTestId("quantity")
  const total = page.getByRole("button", { name: "ADD ITEM-R" })
 
  await userEvent.click(increaseButton)
  await userEvent.click(decreaseButton)

  await expect.element(quantity).toBeInTheDocument()
  await expect.element(quantity).toHaveTextContent("1")
  await expect.element(total).toHaveTextContent("ADD ITEM-R 84.90")
})
