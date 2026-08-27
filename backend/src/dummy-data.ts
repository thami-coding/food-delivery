import { Categories } from "./entities/product.entity"

const { BURGERS, WINGS, DESSERTS, PIZZAS, COMBOS, RIBS } = Categories

export const products = [
  {
    id: "aa1eed3d-8560-4584-a6f1-81ab4db316b9",
    name: "Classic Beef Burger",
    description:
      "Grilled beef patty with lettuce, tomato, and house sauce on a sesame bun.",
    price: 79.9,
    category: BURGERS,
    ingredients: "cheese,bacon,jalapeño,beef",
    imageUrl:
      "https://res.cloudinary.com/dgdevmfnd/image/upload/w_400,q_auto,f_auto/v1750992029/food-images/burgers/beef/classic-burger-removebg-preview_xfrow1.png",
  },
  {
    id: "d2d62289-ed27-4fb6-b985-693be775a10d",
    name: "Cheese Burger",
    description:
      "Juicy beef patty topped with cheddar cheese, pickles, and onions.",
    price: 84.9,
    category: BURGERS,
    ingredients: "cheese,bacon,jalapeño,beef",
    imageUrl:
      "https://res.cloudinary.com/dgdevmfnd/image/upload/w_400,q_auto,f_auto/v1750992030/food-images/burgers/beef/pexels-natan-machado-fotografia-gastronomica-162809799-15010309-removebg-preview_hibqtd.png",
  },
  {
    id: "f2ac134c-7fa6-4342-956a-57e592d3afdd",
    name: "Spicy jalapeño Burger",
    description: "Beef burger with jalapeños, spicy sauce, and melted cheese.",
    price: 89.9,
    category: BURGERS,
    ingredients: "bacon,jalapeño,beef",
    imageUrl:
      "https://res.cloudinary.com/dgdevmfnd/image/upload/w_400,q_auto,f_auto/v1750992029/food-images/burgers/beef/pexels-melaudelo-27600007-removebg-preview_w0euve.png",
  },
  {
    id: "4cfde857-b8d9-4e33-a6ac-7486f9de8dd0",
    name: "Veggie Burger",
    description: "Grilled plant-based patty with avocado and vegan mayo.",
    price: 70.9,
    category: BURGERS,
    ingredients: "veggie",
    imageUrl:
      "https://res.cloudinary.com/dgdevmfnd/image/upload/w_400,q_auto,f_auto/v1750992031/food-images/burgers/veg/pexels-groovelanddesigns-3607284-removebg-preview_mgiqyg.png",
  },
  {
    id: "89434acc-2e8e-4fa4-b9e8-589ecf7ba634",
    name: "The Double Trouble Melt",
    description:
      "A mouthwatering monster stacked high with two juicy beef patties, smothered in layers of rich, melted cheddar and mozzarella cheese. Topped with tangy pickles, crispy lettuce, grilled onions, and our signature smoky sauce — all nestled in a toasted brioche bun. It’s cheesy, it’s beefy, it’s double the flavor and double the fun.",
    price: 82.9,
    category: BURGERS,
    ingredients: "cheese,eggs,bacon,jalapeño,beef",
    imageUrl:
      "https://res.cloudinary.com/dgdevmfnd/image/upload/w_400,q_auto,f_auto/v1750992029/food-images/burgers/beef/pexels-lucas-porras-1937324539-28828553-removebg-preview_zw8w8t.png",
  },
  {
    id: "e8cb2f44-89e8-4807-ae4a-0ee64151070b",
    name: "Stack Attack",
    description:
      "A juicy grilled beef patty layered with melted cheddar cheese, fresh lettuce, and tangy pickles, all tucked inside a toasted bun",
    price: 90.9,
    category: BURGERS,
    ingredients: "cheese,beef",
    imageUrl:
      "https://res.cloudinary.com/dgdevmfnd/image/upload/w_400,q_auto,f_auto/v1750992030/food-images/burgers/beef/pexels-k-patel-1100389468-20722031-removebg-preview_fjmm8o.png",
  },
  {
    id: "8fa6bfbf-0007-4200-a276-aa745182f6fd",
    name: "Cheese Overload",
    description:
      "A gooey, melty masterpiece loaded with triple cheese, grilled to perfection and dripping with flavor in every bite.",
    price: 95.9,
    category: BURGERS,
    ingredients: "cheese,chicken",
    imageUrl:
      "https://res.cloudinary.com/dgdevmfnd/image/upload/w_400,q_auto,f_auto/v1750992030/food-images/burgers/chicken/pexels-enesfilm-8183569-removebg-preview_fben7s.png",
  },
  {
    id: "06f3e056-c1f7-4d9e-b317-14ff57e556fe",
    name: "Margherita Pizza",
    description:
      "Classic pizza with mozzarella, fresh basil, and tomato sauce.",
    price: 99.9,
    category: PIZZAS,
    imageUrl:
      "https://res.cloudinary.com/dgdevmfnd/image/upload/w_400,q_auto,f_auto/v1750992031/food-images/pizza/pexels-fira-ergashevv-1784024088-28272163-removebg-preview_tfkmxf.png",
  },
  {
    id: "ab425d46-0792-4be7-bb87-9fb8a17313d2",
    name: "BBQ Chicken Pizza",
    description: "Grilled chicken, red onions, and BBQ sauce on a cheesy base.",
    price: 119.9,
    category: PIZZAS,
    imageUrl:
      "https://res.cloudinary.com/dgdevmfnd/image/upload/w_400,q_auto,f_auto/v1750992031/food-images/pizza/pexels-renestrgar-16890470-removebg-preview_jkvz51.png",
  },
  {
    id: "c0bb446e-ea45-4f67-acf9-841aa8f3e762",
    name: "Pepperoni Pizza",
    description: "Loaded with pepperoni and melted mozzarella cheese.",
    price: 114.9,
    category: PIZZAS,
    imageUrl:
      "https://res.cloudinary.com/dgdevmfnd/image/upload/w_400,q_auto,f_auto/v1750992032/food-images/pizza/pexels-mahdi-ahmadi-2149139587-30504707-removebg-preview_g3xcd3.png",
  },
  {
    id: "e4e88217-45c8-46cd-9cfd-68e08fcecb16",
    name: "Hawaiian Pizza",
    description: "Ham and pineapple with tangy tomato sauce and mozzarella.",
    price: 109.9,
    category: PIZZAS,
    imageUrl:
      "https://res.cloudinary.com/dgdevmfnd/image/upload/w_400,q_auto,f_auto/v1750992034/food-images/pizza/pexels-collab-media-173741945-27582703-removebg-preview_xl5oge.png",
  },
  {
    id: "18bc31ad-a1b5-43d9-ab88-b01280d0daa7",
    name: "Four Cheese Pizza",
    description: "Mozzarella, cheddar, feta, and parmesan cheese blend.",
    price: 124.9,
    category: PIZZAS,
    imageUrl:
      "https://res.cloudinary.com/dgdevmfnd/image/upload/w_400,q_auto,f_auto/v1750992035/food-images/pizza/pexels-shameel-mukkath-3421394-5639547-removebg-preview_ah5pkn.png",
  },
  {
    id: "7c7a8eb3-d40b-46a8-a2a3-dd2bd8f0d580",
    name: "Oreo Cheesecake",
    description: "Creamy cheesecake with a crunchy Oreo base and topping.",
    price: 59.9,
    category: DESSERTS,
    imageUrl:
      "https://res.cloudinary.com/dgdevmfnd/image/upload/w_400,q_auto,f_auto/v1750992034/food-images/dessert/pexels-angela-khebou-259135285-13922386-removebg-preview_i4cfmm.png",
  },
  {
    id: "99481000-a945-4414-ad35-17cb0c26fc03",
    name: "Double Delight Muffin",
    description: "Vanilla muffin with chocolate toppings",
    price: 54.9,
    category: DESSERTS,
    imageUrl:
      "https://res.cloudinary.com/dgdevmfnd/image/upload/w_400,q_auto,f_auto/v1750992034/food-images/dessert/pexels-andrea-perez-2149019055-30387653-removebg-preview_kk3ixw.png",
  },
  {
    id: "3fcf06c8-5600-46d9-b9ad-8513d451af96",
    name: "Velvet Cream Cheesecake Slice",
    description:
      "A luxuriously smooth and creamy cheesecake with a buttery graham cracker crust.",
    price: 54.9,
    category: DESSERTS,
    imageUrl:
      "https://res.cloudinary.com/dgdevmfnd/image/upload/w_400,q_auto,f_auto/v1750992030/food-images/dessert/pexels-emre-akyol-320381804-17566483-removebg-preview_fqfblx.png",
  },
  {
    id: "0099ef7e-6da6-47d4-a083-b695fec40159",
    name: "Beef Burger Combo",
    description: "Classic beef burger served with crispy chips",
    price: 99.9,
    category: COMBOS,
    ingredients: "beef,chips",
    imageUrl:
      "https://res.cloudinary.com/dgdevmfnd/image/upload/w_400,q_auto,f_auto/v1750992033/food-images/burger_combo/pexels-enginakyurt-7479006-removebg-preview_wh9wtk.png",
  },
  {
    id: "d2535faa-04cb-46c8-8b2f-b249b99de655",
    name: "Melt Master Beef Burger",
    description:
      "A succulent beef patty smothered in rich, melted cheddar cheese, topped with fresh lettuce and tangy pickles, all stacked inside a toasted bun.",
    price: 94.9,
    category: COMBOS,
    ingredients: "beef,chips",
    imageUrl:
      "https://res.cloudinary.com/dgdevmfnd/image/upload/w_400,q_auto,f_auto/v1750992033/food-images/burger_combo/pexels-jonathanborba-2983101-removebg-preview_kgiwr9.png",
  },
  {
    id: "4c89290b-624a-48b2-b8b2-6f7e292a3739",
    name: "Cheese Burger Combo",
    description: "Cheese burger with seasoned chips and a drink",
    price: 104.9,
    category: COMBOS,
    ingredients: "cheese,beef,chips",
    imageUrl:
      "https://res.cloudinary.com/dgdevmfnd/image/upload/w_400,q_auto,f_auto/v1750992032/food-images/burger_combo/pexels-the-castlebar-3902897-9201333-removebg-preview_l1lkpe.png",
  },
  {
    id: "0d0ba581-59eb-4c4b-9b20-21cc415e6b8a",
    name: "Beef Me Up Burger Combo",
    description: "Cheese burger with seasoned chips and a drink",
    price: 104.9,
    category: COMBOS,
    ingredients: "cheese,beef,chips",
    imageUrl:
      "https://res.cloudinary.com/dgdevmfnd/image/upload/w_400,q_auto,f_auto/v1750992032/food-images/burger_combo/burger-combo-removebg-preview_xfvvz4.png",
  },
  {
    id: "d8d0b1b8-f1b0-4f53-8b62-a1fc133d60a1",
    name: "Cluck & Crunch Combo",
    description:
      "A crispy golden chicken fillet, topped with fresh lettuce, pickles, and creamy mayo, all nestled in a soft toasted bun.",
    price: 104.9,
    category: COMBOS,
    ingredients: "cheese,chicken,chips",
    imageUrl:
      "https://res.cloudinary.com/dgdevmfnd/image/upload/w_400,q_auto,f_auto/v1750992032/food-images/burger_combo/pexels-the-castlebar-3902897-5893970-removebg-preview_jirdrd.png",
  },
  {
    id: "daabff69-46ee-420b-b39f-87c7c6ce1bf1",
    name: "Classic Beef Deluxe",
    description:
      "A juicy, flame-grilled beef patty stacked with fresh lettuce and ripe tomatoes, topped with a generous dollop of creamy mayo sauce. ",
    price: 104.9,
    category: COMBOS,
    ingredients: "cheese,beef,chips",
    imageUrl:
      "https://res.cloudinary.com/dgdevmfnd/image/upload/w_400,q_auto,f_auto/v1750992032/food-images/burger_combo/pexels-valeriya-11213787-removebg-preview_yekrhz.png",
  },
  {
    id: "660b9c88-5f79-4031-b5c6-c26a56c72c46",
    name: "6-Piece Chicken Wings",
    description:
      "Crispy fried chicken wings tossed in your choice of BBQ, hot, or lemon pepper sauce.",
    price: 69.9,
    category: WINGS,
    imageUrl:
      "https://res.cloudinary.com/dgdevmfnd/image/upload/w_400,q_auto,f_auto/v1750992034/food-images/chicken/wings/pexels-valeriya-27668695-removebg-preview_gpuxpj.png",
  },
  {
    id: "38bfb84d-d22d-4280-ba60-83d29da52176",
    name: "12-Piece Chicken Wings",
    description:
      "Crispy fried chicken wings tossed in your choice of BBQ, hot, or lemon pepper sauce.",
    price: 69.9,
    category: WINGS,
    imageUrl:
      "https://res.cloudinary.com/dgdevmfnd/image/upload/w_400,q_auto,f_auto/v1750992034/food-images/chicken/wings/pexels-christian-moises-pahati-3856199-5724555-removebg-preview_bhavu3.png",
  },
  {
    id: "d03ad902-e1ed-4e1f-bd0b-cd33bc9d0ba4",
    name: "Crispy Chicken Wings",
    description:
      "crispy wings seasoned with spicy herbs, served with dipping sauce.",
    price: 74.9,
    category: WINGS,
    imageUrl:
      "https://res.cloudinary.com/dgdevmfnd/image/upload/w_400,q_auto,f_auto/v1750992033/food-images/chicken/wings/pexels-introspectivedsgn-4061475-removebg-preview_w46rac.png",
  },
  {
    id: "eaed5c9c-d258-49ba-84ed-e1b1534e3730",
    name: "Crunch Blaze Wings",
    description:
      "Golden-fried to crispy perfection, these wings deliver a loud crunch with every bite.",
    price: 65.9,
    category: WINGS,
    imageUrl:
      "https://res.cloudinary.com/dgdevmfnd/image/upload/w_400,q_auto,f_auto/v1750992033/food-images/chicken/wings/pexels-pixabay-60616-removebg-preview_rik4jt.png",
  },
  {
    id: "bb87ee18-b744-4640-85ca-964bb21dcd37",
    name: "Fire Sticks",
    description:
      "Crispy, juicy chicken wings glazed in a bold, sticky sauce that packs a punch — sweet, smoky, and spicy all at once. ",
    price: 80.9,
    category: WINGS,
    imageUrl:
      "https://res.cloudinary.com/dgdevmfnd/image/upload/w_400,q_auto,f_auto/v1750992033/food-images/chicken/wings/pexels-mohamad-sadek-141949763-10361458-removebg-preview_dupx3c.png",
  },
  {
    id: "404cd768-d2ee-4352-93b4-96373a7266ad",
    name: "Smoke Kissed Wings",
    description:
      "Tender, juicy wings grilled over open flame for that smoky charred flavor ",
    price: 70.9,
    category: WINGS,
    imageUrl:
      "https://res.cloudinary.com/dgdevmfnd/image/upload/w_400,q_auto,f_auto/v1750992034/food-images/chicken/wings/pexels-ahmedbhutta11-7169617-removebg-preview_zeykkj.png",
  },
  {
    id: "160c7441-8b2c-4448-863c-5d9762ba8f0d",
    name: "Grilled Pork Ribs",
    description:
      "Marinated pork ribs grilled to perfection, served with garlic dip.",
    price: 84.9,
    category: RIBS,
    imageUrl:
      "https://res.cloudinary.com/dgdevmfnd/image/upload/w_400,q_auto,f_auto/v1750992032/food-images/ribs/pexels-iamabdullahsheik-9650087-removebg-preview_atd7nd.png",
  },
]

export const users = [
  {
    fullName: "Ava Patel",
    email: "ava.patel@example.com",
    password: "AvaP@tel#2026!",
    phoneNumber: "0821234567",
    role: "user",
    streetAddress: "1420 Maple Ave",
    city: "Seattle",
    suburb: "Capitol Hill",
    postalCode: "4037",
  },
  {
    fullName: "Noah Kim",
    email: "noah.kim@example.com",
    password: "N0ahK!m_2026",
    phoneNumber: "0832345678",
    role: "user",
    streetAddress: "88 Pine Street",
    city: "San Francisco",
    suburb: "SoMa",
    postalCode: "9410",
  },
  {
    fullName: "Sophia Nguyen",
    email: "sophia.nguyen@example.com",
    password: "S0ph!aNg#26",
    phoneNumber: "0843456789",
    role: "user",
    streetAddress: "501 Lakeview Dr",
    city: "Chicago",
    suburb: "Lincoln Park",
    postalCode: "6061",
  },
  {
    fullName: "Ethan Johnson",
    email: "ethan.johnson@example.com",
    password: "Eth@nJ0hnson26!",
    phoneNumber: "0724567890",
    role: "user",
    streetAddress: "27 Crescent Rd",
    city: "Austin",
    suburb: "South Congress",
    postalCode: "7870",
  },
  {
    fullName: "Mia Rodriguez",
    email: "mia.rodriguez@example.com",
    password: "MiaR0d#2026!!",
    phoneNumber: "0735678901",
    role: "user",
    streetAddress: "910 Orchard Blvd",
    city: "Denver",
    suburb: "Capitol Hill",
    postalCode: "8020",
  },
  {
    fullName: "Liam O'Connor",
    email: "liam.oconnor@example.com",
    password: "LiamO'C0nn0r@26",
    phoneNumber: "0746789012",
    role: "user",
    streetAddress: "63 Harbor Way",
    city: "Boston",
    suburb: "Seaport",
    postalCode: "0221",
  },
  {
    fullName: "Isabella Chen",
    email: "isabella.chen@example.com",
    password: "Is@bellA_Ch3n26",
    phoneNumber: "0767890123",
    role: "user",
    streetAddress: "155 Sunrise Terrace",
    city: "Miami",
    suburb: "Brickell",
    postalCode: "3313",
  },
  {
    fullName: "Jackson Smith",
    email: "jackson.smith@example.com",
    password: "Jacks0nSm!th#26",
    phoneNumber: "0788901234",
    role: "user",
    streetAddress: "402 Forest Lane",
    city: "Portland",
    suburb: "Pearl District",
    postalCode: "9720",
  },
  {
    fullName: "Olivia Brown",
    email: "olivia.brown@example.com",
    password: "0liviaBr0wn@2026",
    phoneNumber: "0799012345",
    role: "user",
    streetAddress: "770 Riverbend St",
    city: "Phoenix",
    suburb: "Downtown",
    postalCode: "8500",
  },
  {
    fullName: "William Davis",
    email: "william.davis@example.com",
    password: "W!lliamDav1s_26",
    phoneNumber: "0810123456",
    role: "user",
    streetAddress: "19 Meadowbrook Ct",
    city: "Los Angeles",
    suburb: "Culver City",
    postalCode: "9023",
  },
]
