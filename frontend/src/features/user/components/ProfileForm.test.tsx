import { expect } from "vitest"
import { render } from "vitest-browser-react"
import { page } from "vitest/browser"
import ProfileForm from "./ProfileForm"
import { test as testMock } from "../../../tests/test-extend"
import { http, HttpResponse } from "msw"
import { QueryTestProvider } from "../../../tests/test-utils"
import { MemoryRouter } from "react-router"

testMock(
  "it shows loading spinner when data is loading",
  async ({ worker }) => {
    worker.use(
      http.patch("/api/v1/users/me", async () => {
        return HttpResponse.json({
          status: "success",
          user: {
            id: "70bb8ea4-6e59-4b1d-b31e-4b3df11586fa",
            email: "test@test.com",
            phoneNumber: "0756922023",
            role: "user",
            streetAddress: "34 Upper Hill place",
            city: "Durban",
            suburb: "Newlands West",
            postalCode: "4052",
          },
        })
      }),
    )

    await render(
      <MemoryRouter>
        <QueryTestProvider>
          <ProfileForm user={null} />
        </QueryTestProvider>
      </MemoryRouter>,
    )

    await page.getByRole("textbox", { name: /Full Name/i }).fill("Bones")
    await page
      .getByRole("textbox", { name: /phone Number/i })
      .fill("0756922023")
    await page
      .getByRole("textbox", { name: /street address/i })
      .fill("34 Upper Hill place")
    await page.getByRole("textbox", { name: /suburb/i }).fill("Newlands West")
    await page.getByRole("textbox", { name: /city/i }).fill("Durban")
    await page.getByRole("textbox", { name: /post code/i }).fill("4056")

    await page.getByRole("button").click()

    await expect
      .element(page.getByRole("heading", { name: "Profile Updated" }))
      .toBeInTheDocument()
  },
)
