import { products as allProducts } from "../../../dummy-data"
import { productRepository } from "../../../repositories/repos"

export const createProducts = async () => {
  const productRepo = productRepository()
  const products = await productRepo.insert(allProducts)
  return products
}

export const getProduct = async (id) => {
  const productRepo = productRepository()
  const product = await productRepo.findOneBy({ id })
  return product
}
export const getPaginatedProducts = async (query) => {
  const productRepo = productRepository()
  let category = query.category ?? "all"
  category = category !== "all" ? query.category : null

  const page = parseInt(query.page as string) || 1
  const take = parseInt(query.limit as string) || 10
  const skip = (page - 1) * take

  const [products, total] = await productRepo.findAndCount({
    where: { category },
    skip,
    take,
  })

  const totalPages = Math.ceil(total / take)
  return {
    products,
    page,
    totalPages,
    totalProducts: total,
  }
}

export const addProduct = async (body) => {
  const productRepo = productRepository()
  const product = productRepo.create(body)
  const createdProduct = await productRepo.save(product)
  return createdProduct
}

export const removeProduct = async (productId: string) => {
  const productRepo = productRepository()
  await productRepo.delete(productId)
}

export const editProduct = async (productId: string, body) => {
  const productRepo = productRepository()
  const product = await productRepo.findOneBy({ id: productId })

  product.name = body.name
  product.description = body.description
  product.category = body.category
  product.price = body.price
  if (body.imageUrl) {
    product.imageUrl = body.imageUrl
  }
  return await productRepo.save(product)
}
