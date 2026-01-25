import { render } from "vitest-browser-react"
import { test as testMock } from "./test-extend"
import { test, expect } from "vitest"
import { MemoryRouter } from "react-router"
import SignupPage from "../pages/SignupPage"
import { TestQueryProvider } from "./test-utils"
import { userEvent, page } from "vitest/browser"
import { delay, http, HttpResponse } from "msw"

test("it shows validation error when passwords don't match", async () => {
  const { getByRole } = await render(
    <MemoryRouter>
      <TestQueryProvider>
        <SignupPage />
      </TestQueryProvider>
    </MemoryRouter>,
  )

  const emailInput = getByRole("textbox", { name: /email/i })
  const passwordInput = getByRole("textbox", { name: /^password$/i })
  const confirmPasswordInput = getByRole("textbox", {
    name: /^re-enter password$/i,
  })
  const signupButton = getByRole("button", { name: /register/i })

  await userEvent.click(emailInput)
  await userEvent.type(emailInput, "test@test.com")

  await userEvent.click(passwordInput)
  await userEvent.type(passwordInput, "test@test")

  await userEvent.click(confirmPasswordInput)
  await userEvent.type(confirmPasswordInput, "test@test25")

  await userEvent.click(signupButton)

  await expect
    .element(page.getByText(/passwords don't match/i))
    .toBeInTheDocument()
})

test("it shows validation errors when email and password entered is invalid", async () => {
  const { getByRole } = await render(
    <MemoryRouter>
      <TestQueryProvider>
        <SignupPage />
      </TestQueryProvider>
    </MemoryRouter>,
  )

  const emailInput = getByRole("textbox", { name: /email/i })
  const passwordInput = getByRole("textbox", { name: /^password$/i })
  const confirmPasswordInput = getByRole("textbox", {
    name: /^re-enter password$/i,
  })
  const signupButton = getByRole("button", { name: /register/i })

  await userEvent.click(emailInput)
  await userEvent.type(emailInput, "test")

  await userEvent.click(passwordInput)
  await userEvent.type(passwordInput, "test@test")

  await userEvent.click(confirmPasswordInput)
  await userEvent.type(confirmPasswordInput, "test")

  await userEvent.click(signupButton)

  await expect
    .element(page.getByText(/Password must be at least 8 characters long./i))
    .toBeVisible()
  await expect
    .element(page.getByText(/invalid email/i))
    .toBeVisible()
})

test("it shows link to login page", async () => {
  const { getByRole } = await render(
    <MemoryRouter>
      <TestQueryProvider>
        <SignupPage />
      </TestQueryProvider>
    </MemoryRouter>,
  )

  const link = getByRole("link", { name: /login/i })
  await expect.element(link).toBeInTheDocument()
})

testMock(
  "it shows loading text when loading and button is disabled",
  async ({ worker }) => {
    worker.use(
      http.post("/api/users", async () => {
        await delay(2000)
        return HttpResponse.json({
          status: "success",
          user: { id: "aa1eed3d-8560-4584-a6f1-81ab4db316b9", role: "user" },
        })
      }),
    )

    const { getByRole } = await render(
      <MemoryRouter>
        <TestQueryProvider>
          <SignupPage />
        </TestQueryProvider>
      </MemoryRouter>,
    )

    const emailInput = getByRole("textbox", { name: /email/i })
    const passwordInput = getByRole("textbox", { name: /^password$/i })
    const confirmPasswordInput = getByRole("textbox", {
      name: /^re-enter password$/i,
    })

    const signupButton = getByRole("button", { name: /register/i })

    await userEvent.click(emailInput)
    await userEvent.type(emailInput, "test@test.com")

    await userEvent.click(passwordInput)
    await userEvent.type(passwordInput, "test@test")

    await userEvent.click(confirmPasswordInput)
    await userEvent.type(confirmPasswordInput, "test@test")

    await userEvent.click(signupButton)
    await expect
      .element(getByRole("button", { name: /Loading/i }))
      .toBeVisible()
    await expect
      .element(getByRole("button", { name: /Loading/i }))
      .toBeDisabled()
  },
)
