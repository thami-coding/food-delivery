import { render } from "vitest-browser-react"
import { expect, test } from "vitest"
import HeroButton from "./HeroButton"
import { MemoryRouter } from "react-router"

test("it should show call to action menu link ", async () => {
  const { getByRole } = await render(
    <MemoryRouter>
      <HeroButton title="menu" />
    </MemoryRouter>,
  )

  await expect.element(getByRole("link")).toBeInTheDocument()
  await expect.element(getByRole("link")).toHaveTextContent("menu")
})
