// HomePage.tsx
// HomeCard.tsx
// HomeHero.tsx
// useInfiniteQuery<ProductsPage, Error, ProductsPage, ["products", string | undefined], number>({
//  queryKey: ["products", category],
//  queryFn: ({ pageParam = 1 }) =>
//    fetchProducts({ page: pageParam, limit: 10, category }),
//  initialPageParam: 1,
//  getNextPageParam: (lastPage) =>
//    lastPage.page < lastPage.totalPages
//      ? lastPage.page + 1
//      : undefined,
// })

// const { data, fetchNextPage, hasNextPage } = useInfiniteQuery<
//   ProductsPage, // ✅ page type
//   HttpError, // ✅ error type
//   ProductsPage, // ✅ select type
//   ["products", string?], // ✅ query key
//   number // ✅ pageParam type
// >({
//   queryKey: ["products", category],
//   queryFn: ({ pageParam = 1 }) =>
//     fetchProducts({ page: pageParam, limit: 10, category }),
//   initialPageParam: 1,
//   getNextPageParam: (lastPage) =>
//     lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
// })

// ✅ ✅ Recommended naming patterns
// 1️⃣ Queries (read / fetch)
// ts
// useProducts()
// useProduct(id)
// useUser()
// useCart()
// useOrders()

// 2️⃣ Infinite queries
// ts
// useInfiniteProducts()
// useInfiniteOrders()

// 3️⃣ Mutations (write / change)
// Use verbs:

// ts
// useCreateProduct()
// useUpdateProduct()
// useDeleteProduct()

// useLogin()
// useLogout()
// useRegister()

// useAddToCart()
// useRemoveFromCart()
// ✅ Action‑oriented
// ✅ Very readable

// What it means
// How much of the element must be visible before isIntersecting becomes true

// Values
// 0 → any pixel visible
// 0.5 → 50% visible
// 1 → 100% visible (entire element)
// Your original code
// ts
// threshold: 1
// ✅ The callback fires only when the sentinel is fully visible
// ✅ Prevents early fetches
// ❌ Can be too strict on short screens

// Common choices
// Threshold	Behavior
// 1	Fire when fully visible (safe, slower)
// 0.5	Fire when half visible
// 0	Fire as soon as it enters viewport (fastest)
// ✅ rootMargin
// What it means
// Expands or shrinks the viewport before intersection is calculated

// It works like CSS margin on the viewport.
// Syntax
// ts
// rootMargin: "top right bottom left"
// Example
// ts
// rootMargin: "0px 0px 200px 0px"
// ✅ Triggers 200px before the element enters the viewport
// ✅ Allows pre‑fetching before user hits the bottom

// const [prevItems, setPrevItems] = useState(items)
// if (items !== prevItems) {
//   setPrevItems(items)
//   setSelection(null)
// }

// TESTING
// ✅ What to test, and at what level
// Think in testing layers, not “either/or”.

// 1️⃣ Component tests (what you’re already doing)
// ✅ Test these

// Reusable UI components (Button, HeroButton, Modal)
// Components with logic (conditional rendering, events)
// Components used in multiple places
// ✅ Focus on:

// What is rendered
// User interactions
// Props → UI behavior
// ❌ Avoid:

// Routing
// Data fetching details
// Full app flows
// 👉 You’re already doing this correctly.

// 2️⃣ Page tests (YES, but lightweight)
// ✅ Test pages, but don’t re-test components

// A page is a composition layer:

// Assembles components
// Wires routing params
// Triggers data loading
// ✅ Page tests should answer:

// “Does this page render the correct sections?”
// “Does it react to route params?”
// “Does it show loading / empty / error states?”
// ✅ Example page test:

// ts
// test("Products page renders hero and product list", () => {
//   render(
//     <MemoryRouter initialEntries={["/products"]}>
//       <ProductsPage />
//     </MemoryRouter>
//   )

//   expect(screen.getByRole("heading", { name: /products/i }))
//   expect(screen.getByText(/add to cart/i))
// })
// ❌ Do NOT:

// Re-test button text
// Re-test component styling
// Re-test component logic already covered elsewhere
// 3️⃣ Integration / flow tests (few, but valuable)
// ✅ These test real user behavior

// Navigation between pages
// Critical flows (checkout, login)