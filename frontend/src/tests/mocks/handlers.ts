import { http, HttpResponse, delay } from 'msw'

export const handlers = [
 // http.all('*', ({ request }) => {
 //  console.log('[MSW] Intercepted request:', request.method, request.url);
 // }),
 http.get('/api/products', async () => {
  return HttpResponse.json({
   status: "success",
   products:
    [
     {
      id: "0099ef7e-6da6-47d4-a083-b695fec40159",
      name: "Velvet Cream Cheesecake Slice",
      ingrdients: null,
      category: "desserts",
      description: "A luxuriously smooth and creamy cheesecake with a buttery graham cracker crust.",
      price: "54.90",
      imageUrl: "https://res.cloudinary.com/dgdevmfnd/image/upload/v1750992030/food-images/dessert/pexels-emre-akyol-320381804-17566483-removebg-preview_fqfblx.png",

     },
     {
      id: "06f3e056-c1f7-4d9e-b317-14ff57e556fe",
      name: "Margherita Pizza",
      ingrdients: null,
      category: "pizzas",
      description: "Classic pizza with mozzarella, fresh basil, and tomato sauce.",
      price: "99.90",
      imageUrl: "https://res.cloudinary.com/dgdevmfnd/image/upload/v1750992031/food-images/pizza/pexels-fira-ergashevv-1784024088-28272163-removebg-preview_tfkmxf.png",
      "createdAt": "2025-10-09T13:46:50.535Z",
      "updatedAt": "2025-10-09T13:46:50.535Z"
     },
     {
      id: "0d0ba581-59eb-4c4b-9b20-21cc415e6b8a",
      name: "Cheese Burger Combo",
      ingrdients: "cheese,beef,chips",
      category: "combos",
      description: "Cheese burger with seasoned chips and a drink",
      price: "104.90",
      imageUrl: "https://res.cloudinary.com/dgdevmfnd/image/upload/v1750992032/food-images/burger_combo/pexels-the-castlebar-3902897-9201333-removebg-preview_l1lkpe.png",
      "createdAt": "2025-10-09T13:46:50.587Z",
      "updatedAt": "2025-10-09T13:46:50.587Z"
     },
     {
      id: "160c7441-8b2c-4448-863c-5d9762ba8f0d",
      name: "Smoke Kissed Wings",
      ingrdients: null,
      category: "wings",
      description: "Tender, juicy wings grilled over open flame for that smoky charred flavor ",
      price: "70.90",
      imageUrl: "https://res.cloudinary.com/dgdevmfnd/image/upload/v1750992034/food-images/chicken/wings/pexels-ahmedbhutta11-7169617-removebg-preview_zeykkj.png",
      "createdAt": "2025-10-09T13:46:50.629Z",
      "updatedAt": "2025-10-09T13:46:50.629Z"
     },
     {
      id: "18bc31ad-a1b5-43d9-ab88-b01280d0daa7",
      name: "Hawaiian Pizza",
      ingrdients: null,
      category: "pizzas",
      description: "Ham and pineapple with tangy tomato sauce and mozzarella.",
      price: "109.90",
      imageUrl: "https://res.cloudinary.com/dgdevmfnd/image/upload/v1750992034/food-images/pizza/pexels-collab-media-173741945-27582703-removebg-preview_xl5oge.png",
      "createdAt": "2025-10-09T13:46:50.553Z",
      "updatedAt": "2025-10-09T13:46:50.553Z"
     },
     {
      id: "38bfb84d-d22d-4280-ba60-83d29da52176",
      name: "6-Piece Chicken Wings",
      ingrdients: null,
      category: "wings",
      description: "Crispy fried chicken wings tossed in your choice of BBQ, hot, or lemon pepper sauce.",
      price: "69.90",
      imageUrl: "https://res.cloudinary.com/dgdevmfnd/image/upload/v1750992034/food-images/chicken/wings/pexels-valeriya-27668695-removebg-preview_gpuxpj.png",
      "createdAt": "2025-10-09T13:46:50.605Z",
      "updatedAt": "2025-10-09T13:46:50.605Z"
     },
     {
      id: "3fcf06c8-5600-46d9-b9ad-8513d451af96",
      name: "Double Delight Muffin",
      ingrdients: null,
      category: "desserts",
      description: "Vanilla muffin with chocolate toppings",
      price: "54.90",
      imageUrl: "https://res.cloudinary.com/dgdevmfnd/image/upload/v1750992034/food-images/dessert/pexels-andrea-perez-2149019055-30387653-removebg-preview_kk3ixw.png",
      "createdAt": "2025-10-09T13:46:50.567Z",
      "updatedAt": "2025-10-09T13:46:50.567Z"
     },
     {
      id: "404cd768-d2ee-4352-93b4-96373a7266ad",
      name: "Fire Sticks",
      ingrdients: null,
      category: "wings",
      description: "Crispy, juicy chicken wings glazed in a bold, sticky sauce that packs a punch — sweet, smoky, and spicy all at once. ",
      price: "80.90",
      imageUrl: "https://res.cloudinary.com/dgdevmfnd/image/upload/v1750992033/food-images/chicken/wings/pexels-mohamad-sadek-141949763-10361458-removebg-preview_dupx3c.png",
      "createdAt": "2025-10-09T13:46:50.625Z",
      "updatedAt": "2025-10-09T13:46:50.625Z"
     },
     {
      id: "4c89290b-624a-48b2-b8b2-6f7e292a3739",
      name: "Melt Master Beef Burger",
      ingrdients: "beef,chips",
      category: "combos",
      description: "A succulent beef patty smothered in rich, melted cheddar cheese, topped with fresh lettuce and tangy pickles, all stacked inside a toasted bun.",
      price: "94.90",
      imageUrl: "https://res.cloudinary.com/dgdevmfnd/image/upload/v1750992033/food-images/burger_combo/pexels-jonathanborba-2983101-removebg-preview_kgiwr9.png",
      "createdAt": "2025-10-09T13:46:50.581Z",
      "updatedAt": "2025-10-09T13:46:50.581Z"
     },
     {
      id: "4cfde857-b8d9-4e33-a6ac-7486f9de8dd0",
      name: "Veggie Burger",
      ingrdients: "veggie",
      category: "burgers",
      description: "Grilled plant-based patty with avocado and vegan mayo.",
      price: "70.90",
      imageUrl: "https://res.cloudinary.com/dgdevmfnd/image/upload/v1750992031/food-images/burgers/veg/pexels-groovelanddesigns-3607284-removebg-preview_mgiqyg.png",
      "createdAt": "2025-10-09T13:46:50.507Z",
      "updatedAt": "2025-10-09T13:46:50.507Z"
     }
    ],
   "page": 1,
   "totalPages": 3,
   "totalProducts": 29,
   "code": 200
  })
 }),
 
 http.get('/api/products', async() => {
  await delay("infinite")
  return HttpResponse.json([{
   id: "0099ef7e-6da6-47d4-a083-b695fec40159",
   name: "Velvet Cream Cheesecake Slice",
   ingrdients: null,
   category: "desserts",
   description: "A luxuriously smooth and creamy cheesecake with a buttery graham cracker crust.",
   price: "54.90",
   imageUrl: "https://res.cloudinary.com/dgdevmfnd/image/upload/v1750992030/food-images/dessert/pexels-emre-akyol-320381804-17566483-removebg-preview_fqfblx.png",

  }]);
 })
]