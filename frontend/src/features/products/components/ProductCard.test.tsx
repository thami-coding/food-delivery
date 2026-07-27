import { render } from "vitest-browser-react"
import { expect, test, vi } from "vitest"
import { page, userEvent } from "vitest/browser"
import ProductCard from "./ProductCard"
import { useDialog } from "../dialogStore"
import { useProduct } from "../productStore"

vi.mock("../productStore", () => ({
  useProduct: vi.fn(),
}))

vi.mock("../dialogStore", () => ({
  useDialog: vi.fn(),
}))

test("sets product and opens dialog on click", async () => {
  const setProduct = vi.fn()
  const toggleDialog = vi.fn()

  vi.mocked(useProduct).mockImplementation((selector: any) =>
    selector({ setProduct }),
  )

  vi.mocked(useDialog).mockImplementation((selector: any) =>
    selector({ toggleDialog }),
  )

  const defaultProps = {
    id: "70bb8ea4-6e59-4b1d-b31e-4b3df11586fa",
    name: "Cheese Burger",
    ingredients: "cheese,bacon,jalapeño,beef",
    price: "84.90",
    imageUrl:
      "https://res.cloudinary.com/dgdevmfnd/image/upload/w_400,q_auto,f_auto/v1750992030/food-images/burgers/beef/pexels-natan-machado-fotografia-gastronomica-162809799-15010309-removebg-preview_hibqtd.png",
  }

  render(<ProductCard {...defaultProps} />)

  await userEvent.click(page.getByRole("button", { name: /add/i }))

  expect(setProduct).toHaveBeenCalledWith({
    imageUrl: expect.any(String),
    name: expect.any(String),
    price: expect.any(String),
    id: expect.any(String),
  })

  expect(toggleDialog).toHaveBeenCalled()
})
