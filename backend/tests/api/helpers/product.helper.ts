import { randomUUID } from "crypto"
import { Categories } from "../../../src/entities/product.entity"
import { productRepository } from "../../../src/repositories/repos"
import request from "supertest"
import { app } from "../../../src/server"

export const getPaginatedProducts = () => {
  return request(app).get("/api/v1/products")
}

export const createProduct = async (tokens) => {
  const { refreshToken, accessToken } = tokens

  return request(app)
    .post("/api/v1/products")
    .set("Cookie", refreshToken)
    .set("Authorization", `Bearer ${accessToken}`)
    .send({
      id: randomUUID(),
      name: "crispy chicken",
      ingredients: null,
      category: "wings" as Categories,
      description: "This is a description of the product",
      price: 120,
      imageUrl:
        "https://res.cloudinary.com/dgdevmfnd/image/upload/v1750992035/food-images/chicken/karlo-king-WqylFQacnqE-unsplash-removebg-preview_ff5ftd.png",
    })
}

export const updateProduct = async (tokens, productId: string) => {
  const { refreshToken, accessToken } = tokens
  return request(app)
    .put(`/api/v1/products/${productId}`)
    .set("Cookie", refreshToken)
    .set("Authorization", `Bearer ${accessToken}`)
    .send({
      name: "Hot wings",
      ingredients: "chicken",
      category: "wings" as Categories,
      description: "Spicy hot wings will leave you craving for more,peri peri",
      price: 70.9,
      imageUrl:
        "https://res.cloudinary.com/dgdevmfnd/image/upload/v1750992035/food-images/chicken/karlo-king-WqylFQacnqE-unsplash-removebg-preview_ff5ftd.png",
    })
}

export const deleteProduct = async (tokens, productId: string) => {
  const { refreshToken, accessToken } = tokens
  return request(app)
    .delete(`/api/v1/products/${productId}`)
    .set("Cookie", refreshToken)
    .set("Authorization", `Bearer ${accessToken}`)
    .send()
}

export const seedProducts = async () => {
  return productRepository().insert([
    {
      id: randomUUID(),
      name: "6-Piece Chicken Wings",
      ingredients: null,
      category: "wings" as Categories,
      description:
        "Crispy fried chicken wings tossed in your choice of BBQ, hot, or lemon pepper sauce.",
      price: 69.9,
      imageUrl:
        "https://res.cloudinary.com/dgdevmfnd/image/upload/w_400,q_auto,f_auto/v1750992034/food-images/chicken/wings/pexels-valeriya-27668695-removebg-preview_gpuxpj.png",
      createdAt: "2026-01-30T16:28:42.408Z",
      updatedAt: "2026-01-30T16:28:42.408Z",
    },
    {
      id: randomUUID(),
      name: "12-Piece Chicken Wings",
      ingredients: null,
      category: "wings" as Categories,
      description:
        "Crispy fried chicken wings tossed in your choice of BBQ, hot, or lemon pepper sauce.",
      price: 69.9,
      imageUrl:
        "https://res.cloudinary.com/dgdevmfnd/image/upload/w_400,q_auto,f_auto/v1750992034/food-images/chicken/wings/pexels-christian-moises-pahati-3856199-5724555-removebg-preview_bhavu3.png",
      createdAt: "2026-01-30T16:28:42.408Z",
      updatedAt: "2026-01-30T16:28:42.408Z",
    },
    {
      id: randomUUID(),
      name: "Crispy Chicken Wings",
      ingredients: null,
      category: "wings" as Categories as Categories,
      description:
        "crispy wings seasoned with spicy herbs, served with dipping sauce.",
      price: 74.9,
      imageUrl:
        "https://res.cloudinary.com/dgdevmfnd/image/upload/w_400,q_auto,f_auto/v1750992033/food-images/chicken/wings/pexels-introspectivedsgn-4061475-removebg-preview_w46rac.png",
      createdAt: "2026-01-30T16:28:42.408Z",
      updatedAt: "2026-01-30T16:28:42.408Z",
    },
    {
      id: randomUUID(),
      name: "Crunch Blaze Wings",
      ingredients: null,
      category: "wings" as Categories as Categories,
      description:
        "Golden-fried to crispy perfection, these wings deliver a loud crunch with every bite.",
      price: 65.9,
      imageUrl:
        "https://res.cloudinary.com/dgdevmfnd/image/upload/w_400,q_auto,f_auto/v1750992033/food-images/chicken/wings/pexels-pixabay-60616-removebg-preview_rik4jt.png",
      createdAt: "2026-01-30T16:28:42.408Z",
      updatedAt: "2026-01-30T16:28:42.408Z",
    },
    {
      id: randomUUID(),
      name: "Fire Sticks",
      ingredients: null,
      category: "wings" as Categories as Categories,
      description:
        "Crispy, juicy chicken wings glazed in a bold, sticky sauce that packs a punch — sweet, smoky, and spicy all at once. ",
      price: 80.9,
      imageUrl:
        "https://res.cloudinary.com/dgdevmfnd/image/upload/w_400,q_auto,f_auto/v1750992033/food-images/chicken/wings/pexels-mohamad-sadek-141949763-10361458-removebg-preview_dupx3c.png",
      createdAt: "2026-01-30T16:28:42.408Z",
      updatedAt: "2026-01-30T16:28:42.408Z",
    },
    {
      id: randomUUID(),
      name: "Smoke Kissed Wings",
      ingredients: null,
      category: "wings" as Categories as Categories,
      description:
        "Tender, juicy wings grilled over open flame for that smoky charred flavor ",
      price: 70.9,
      imageUrl:
        "https://res.cloudinary.com/dgdevmfnd/image/upload/w_400,q_auto,f_auto/v1750992034/food-images/chicken/wings/pexels-ahmedbhutta11-7169617-removebg-preview_zeykkj.png",
      createdAt: "2026-01-30T16:28:42.408Z",
      updatedAt: "2026-01-30T16:28:42.408Z",
    },
  ])
}

export const seedProduct = async () => {
  return await productRepository().save(newProduct)
}

export const newProduct = {
  name: "6-Piece Chicken Wings",
  ingredients: null,
  category: "wings" as Categories,
  description:
    "Crispy fried chicken wings tossed in your choice of BBQ, hot, or lemon pepper sauce.",
  price: 69.9,
  imageUrl:
    "https://res.cloudinary.com/dgdevmfnd/image/upload/w_400,q_auto,f_auto/v1750992034/food-images/chicken/wings/pexels-valeriya-27668695-removebg-preview_gpuxpj.png",
}
