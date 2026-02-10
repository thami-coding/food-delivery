import { create } from "zustand"

interface Product {
  id: string | undefined
  name: string
  price: string
  imageUrl: string
}
interface ProductState {
  product: Product | null
  setProduct: (product: Product) => void
}

export const useProduct = create<ProductState>()((set) => ({
  product: null,
  setProduct: (product) =>
    set(() => ({
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
      },
    })),
}))
