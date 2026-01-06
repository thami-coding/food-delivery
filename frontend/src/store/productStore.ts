import { create } from 'zustand'
import type { TProduct } from '../types/product'

interface ProductState {
 product: TProduct,
 setProduct: (product: TProduct) => void
}
export const useProduct = create<ProductState>()((set) => ({
 product: {
  id: "",
  name: "",
  description: "",
  price: 0,
  category: "",
  imageUrl: "",
  ingredients: "",
  createdAt: "",
 },
 setProduct: (product) => set((state) => ({
  product: {
   id: product.id,
   name: product.name,
   description: product.description,
   price: product.price,
   category: product.category,
   imageUrl: product.imageUrl,
   ingredients: product.ingredients,
   createdAt: product.createdAt
  }
 })),
}))