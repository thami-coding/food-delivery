

type Burgers = {
  name: string;
  price: number;
  image: string;
  category: Category;
  sides: string;
  details: string;
  ingredients: string[];
};

type Category = "burger" | "pizza" | "dessert" | "chicken" | "special";


export const burgers: Burgers[] = [
  {
    name: "The Triple Threat",
    price: 60,
    image: "",
    category: "burger",
    sides: "chips",
    details:
      "Three layers of flame-grilled beef, crispy bacon, and melted cheese topped with spicy jalapeños and a fried egg.",
    ingredients: ["bacon", "eggs", "Jalapeño", "tomatoes", "cheese", "lettuce"],
  },
  {
    name: "Smokey BBQ Crunch",
    price: 55,
    image: "",
    category: "burger",
    sides: "chips",
    details:
      "A juicy beef patty glazed with smokey BBQ sauce, topped with crispy onion rings, cheddar, and crunchy slaw.",
    ingredients: ["bacon", "eggs", "tomatoes", "lettuce"],
  },
  {
    name: "Spicy Chick Stack",
    price: 58,
    image: "",
    category: "burger",
    sides: "chips",
    details:
      "Tender chicken fillet marinated in peri-peri sauce, layered with spicy mayo, fresh lettuce, and red onions.",
    ingredients: ["tomatoes", "lettuce"],
  },
  {
    name: "Veggie Deluxe",
    price: 52,
    image: "",
    category: "burger",
    sides: "chips",
    details:
      "A hearty plant-based patty with grilled mushrooms, avo slices, vegan cheese, and fresh greens.",
    ingredients: ["bacon", "eggs", "Jalapeño", "tomatoes", "cheese", "lettuce"],
  },
  {
    name: "Cheesy Overload",
    price: 57,
    image: "",
    category: "burger",
    sides: "chips",
    details:
      "Beef patty smothered in three types of cheese—cheddar, gouda, and mozzarella—with caramelized onions.",
    ingredients: ["bacon", "eggs", "Jalapeño", "tomatoes", "cheese", "lettuce"],
  },
  {
    name: "The Big Brunch",
    price: 62,
    image: "",
    category: "burger",
    sides: "chips",
    details:
      "All your breakfast favourites—fried egg, bacon, hash brown, and melted cheese on a toasted bun.",
    ingredients: ["bacon", "eggs", "Jalapeño", "tomatoes", "cheese", "lettuce"],
  },
  {
    name: "Blue Flame Burger",
    price: 59,
    image: "",
    category: "burger",
    sides: "chips",
    details:
      "Flame-grilled beef with tangy blue cheese, rocket leaves, caramelized onions, and chipotle sauce.",
    ingredients: ["bacon", "eggs", "Jalapeño", "tomatoes", "cheese", "lettuce"],
  },
  {
    name: "Hawaiian Heatwave",
    price: 56,
    image: "",
    category: "burger",
    sides: "chips",
    details:
      "A tropical twist with grilled pineapple, smoky ham, spicy jalapeños, and Swiss cheese on a juicy beef patty.",
    ingredients: ["bacon", "eggs", "Jalapeño", "tomatoes", "cheese", "lettuce"],
  },
];

export const chicken= [
  {
    name: "Crispy Chicken Strips",
    price: 65,
    image: "",
    category: "chicken",
    sides: "chips",
    details:
      "Golden fried chicken strips seasoned with herbs and spices, served with a tangy dipping sauce.",
    ingredients: [
      "chicken breast",
      "breadcrumbs",
      "paprika",
      "garlic powder",
      "salt",
      "pepper",
    ],
  },
  {
    name: "Spicy Wings Bucket",
    price: 70,
    image: "",
    category: "chicken",
    sides: "chips",
    details:
      "A fiery mix of chicken wings tossed in a spicy buffalo sauce, served hot and crispy.",
    ingredients: [
      "chicken wings",
      "buffalo sauce",
      "chili flakes",
      "butter",
      "garlic",
      "vinegar",
    ],
  },
  {
    name: "Lemon Herb Grilled Chicken",
    price: 75,
    image: "",
    category: "chicken",
    sides: "salad",
    details:
      "Tender grilled chicken marinated in lemon juice, garlic, and fresh herbs for a zesty, healthy meal.",
    ingredients: [
      "chicken thighs",
      "lemon juice",
      "garlic",
      "rosemary",
      "thyme",
      "olive oil",
    ],
  },
  {
    name: "Peri-Peri Chicken Quarters",
    price: 78,
    image: "",
    category: "chicken",
    sides: "chips",
    details:
      "Juicy chicken leg quarters flame-grilled in a spicy peri-peri sauce with a smoky finish.",
    ingredients: [
      "chicken quarters",
      "peri-peri sauce",
      "smoked paprika",
      "lemon",
      "garlic",
      "olive oil",
    ],
  },
  {
    name: "Creamy Chicken Pasta Bowl",
    price: 85,
    image: "",
    category: "chicken",
    sides: "garlic bread",
    details:
      "Grilled chicken breast served over pasta in a rich, creamy Alfredo sauce with herbs and parmesan.",
    ingredients: [
      "chicken breast",
      "cream",
      "parmesan",
      "garlic",
      "pasta",
      "parsley",
    ],
  },
  {
    name: "Honey Garlic Chicken Bites",
    price: 68,
    image: "",
    category: "chicken",
    sides: "chips",
    details:
      "Bite-sized crispy chicken tossed in a sweet and savory honey garlic glaze with sesame seeds.",
    ingredients: [
      "chicken cubes",
      "honey",
      "soy sauce",
      "garlic",
      "ginger",
      "sesame seeds",
    ],
  },
];
export const pizza = [
  {
    name: "Pepperoni Passion",
    price: 75,
    image: "",
    category: "pizza",
    sides: "none",
    details:
      "A classic favorite topped with spicy pepperoni slices, mozzarella cheese, and rich tomato sauce on a thin crispy base.",
    ingredients: [
      "pepperoni",
      "mozzarella",
      "tomato sauce",
      "oregano",
      "olive oil",
    ],
  },
  {
    name: "Veggie Supreme",
    price: 70,
    image: "",
    category: "pizza",
    sides: "none",
    details:
      "Packed with colorful bell peppers, red onions, mushrooms, sweetcorn, and olives on a tomato base with melted cheese.",
    ingredients: [
      "bell peppers",
      "red onions",
      "mushrooms",
      "sweetcorn",
      "olives",
      "mozzarella",
    ],
  },
  {
    name: "Meat Feast",
    price: 85,
    image: "",
    category: "pizza",
    sides: "none",
    details:
      "A carnivore's dream with beef mince, bacon strips, ham, pepperoni, and melted cheese over a herbed tomato base.",
    ingredients: [
      "beef mince",
      "bacon",
      "ham",
      "pepperoni",
      "mozzarella",
      "tomato sauce",
    ],
  },
  {
    name: "Chicken Tikka Deluxe",
    price: 78,
    image: "",
    category: "pizza",
    sides: "none",
    details:
      "Tandoori-spiced chicken chunks with red onions, green peppers, and a drizzle of garlic sauce on a cheesy base.",
    ingredients: [
      "tikka chicken",
      "red onions",
      "green peppers",
      "garlic sauce",
      "mozzarella",
      "tomato sauce",
    ],
  },
  {
    name: "Four Cheese Melt",
    price: 80,
    image: "",
    category: "pizza",
    sides: "none",
    details:
      "A rich mix of melted mozzarella, gorgonzola, cheddar, and parmesan layered over a garlic-butter crust.",
    ingredients: [
      "mozzarella",
      "gorgonzola",
      "cheddar",
      "parmesan",
      "garlic butter",
      "oregano",
    ],
  },
  {
    name: "Tropical Blaze",
    price: 72,
    image: "",
    category: "pizza",
    sides: "none",
    details:
      "A bold mix of sweet pineapple, smoky ham, jalapeños, and mozzarella for that perfect sweet-heat combo.",
    ingredients: [
      "pineapple",
      "ham",
      "jalapeños",
      "mozzarella",
      "tomato sauce",
      "basil",
    ],
  },
];
export const dessert = [
  {
    name: "Chocolate Lava Cake",
    price: 45,
    image: "",
    category: "dessert",
    sides: "ice cream",
    details:
      "A rich, warm chocolate cake with a gooey molten center, served with vanilla ice cream.",
    ingredients: [
      "dark chocolate",
      "butter",
      "eggs",
      "sugar",
      "flour",
      "vanilla",
    ],
  },
  {
    name: "Classic Cheesecake",
    price: 50,
    image: "",
    category: "dessert",
    sides: "strawberry sauce",
    details:
      "Creamy New York-style cheesecake on a graham cracker crust, topped with a sweet strawberry glaze.",
    ingredients: [
      "cream cheese",
      "sugar",
      "eggs",
      "graham crackers",
      "butter",
      "strawberries",
    ],
  },
  {
    name: "Cinnamon Churros",
    price: 40,
    image: "",
    category: "dessert",
    sides: "chocolate sauce",
    details:
      "Crispy fried churros coated in cinnamon sugar and served with a side of warm chocolate sauce.",
    ingredients: ["flour", "butter", "eggs", "cinnamon", "sugar", "chocolate"],
  },
  {
    name: "Banoffee Pie",
    price: 48,
    image: "",
    category: "dessert",
    sides: "none",
    details:
      "A layered dessert of crushed biscuits, creamy toffee, sliced bananas, and whipped cream.",
    ingredients: [
      "bananas",
      "toffee",
      "whipped cream",
      "digestive biscuits",
      "butter",
      "sugar",
    ],
  },
  {
    name: "Lemon Meringue Tart",
    price: 46,
    image: "",
    category: "dessert",
    sides: "none",
    details:
      "Tangy lemon curd in a buttery tart shell, topped with fluffy toasted meringue.",
    ingredients: [
      "lemon juice",
      "eggs",
      "sugar",
      "flour",
      "butter",
      "egg whites",
    ],
  },
  {
    name: "Cookies & Cream Sundae",
    price: 42,
    image: "",
    category: "dessert",
    sides: "wafer stick",
    details:
      "Vanilla ice cream layered with crushed cookies, whipped cream, and chocolate drizzle.",
    ingredients: [
      "vanilla ice cream",
      "chocolate cookies",
      "whipped cream",
      "chocolate syrup",
      "wafer",
    ],
  },
];