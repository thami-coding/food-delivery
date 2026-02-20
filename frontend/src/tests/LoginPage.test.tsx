import { MemoryRouter } from "react-router"
import { expect, test } from "vitest"
import { render } from "vitest-browser-react"
import { page, userEvent } from "vitest/browser"
import { TestQueryProvider } from "./test-utils"
import { http, HttpResponse, delay } from "msw"
import { test as testMock } from "./test-extend"
import LoginPage from "../pages/LoginPage"

testMock(
  "it does not show validation errors when the correct values are entered",
  async ({ worker }) => {
    worker.use(
      http.post("/api/auth/login", () => {
        return HttpResponse.json({
          status: "success",
          user: { id: "aa1eed3d-8560-4584-a6f1-81ab4db316b9", role: "user" },
        })
      }),
    )

    const { getByRole } = await render(
      <MemoryRouter>
        <TestQueryProvider>
          <LoginPage />
        </TestQueryProvider>
      </MemoryRouter>,
    )

    const emailInput = getByRole("textbox", { name: /email/i })
    const passwordInput = getByRole("textbox", { name: /passwor/i })
    const LoginButton = getByRole("button", { name: /login/i })

    await userEvent.click(emailInput)
    await userEvent.type(emailInput, "test@test.com")

    await userEvent.click(passwordInput)
    await userEvent.type(passwordInput, "test@test")

    await userEvent.click(LoginButton)

    await expect
      .element(getByRole("textbox", { name: /email/i }))
      .toHaveValue("")
    await expect
      .element(getByRole("textbox", { name: /password/i }))
      .toHaveValue("")
  },
)

testMock(
  "it shows loading text in buton when loading and button is disabled",
  async ({ worker }) => {
    worker.use(
      http.post("/api/auth/login", async () => {
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
          <LoginPage />
        </TestQueryProvider>
      </MemoryRouter>,
    )

    const emailInput = getByRole("textbox", { name: /email/i })
    const passwordInput = getByRole("textbox", { name: /passwor/i })
    const LoginButton = getByRole("button", { name: /login/i })

    await userEvent.click(emailInput)
    await userEvent.type(emailInput, "test@test.com")

    await userEvent.click(passwordInput)
    await userEvent.type(passwordInput, "test@test")

    await userEvent.click(LoginButton)
    await expect
      .element(getByRole("button", { name: /Loading/i }))
      .toBeVisible()
  },
)

test("it shows email validation error when invalid email is entered", async () => {
  const { getByRole } = await render(
    <MemoryRouter>
      <TestQueryProvider>
        <LoginPage />
      </TestQueryProvider>
    </MemoryRouter>,
  )

  const emailInput = getByRole("textbox", { name: /email/i })
  const passwordInput = getByRole("textbox", { name: /password/i })

  await userEvent.click(emailInput, {})
  await userEvent.type(emailInput, "test")

  await userEvent.click(passwordInput, {})
  await userEvent.type(passwordInput, "test@test")

  const loginButton = getByRole("button", { name: /login/i })
  await userEvent.click(loginButton)

  await expect.element(page.getByText(/Email is invalid/i)).toBeVisible()
})

test("it shows password validation error when password length is less than 8", async () => {
  const { getByRole, getByText } = await render(
    <MemoryRouter>
      <TestQueryProvider>
        <LoginPage />
      </TestQueryProvider>
    </MemoryRouter>,
  )

  const emailInput = getByRole("textbox", { name: /email/i })

  await userEvent.click(emailInput)
  await userEvent.type(emailInput, "test@test.com")

  const passwordInput = getByRole("textbox", { name: /password/i })
  await userEvent.click(passwordInput)
  await userEvent.type(passwordInput, "test@te")

  const loginButton = getByRole("button", { name: /login/i })
  await userEvent.click(loginButton)

  await expect
    .element(getByText(/Password must be at least 8 characters long./i))
    .toBeVisible()
})
