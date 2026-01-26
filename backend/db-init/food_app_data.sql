--
-- PostgreSQL database dump
--

\restrict VaNNADqcp1ftidbKx8jBG7wJ2KPCrjmecuo7aGPtWA4Graet6GnW8Ch3h8uSROD

-- Dumped from database version 18.0 (Ubuntu 18.0-1.pgdg24.04+3)
-- Dumped by pg_dump version 18.0 (Ubuntu 18.0-1.pgdg24.04+3)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: products_category_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.products_category_enum AS ENUM (
    'burgers',
    'pizzas',
    'desserts',
    'wings',
    'combos',
    'ribs'
);


ALTER TYPE public.products_category_enum OWNER TO postgres;

--
-- Name: users_role_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.users_role_enum AS ENUM (
    'admin',
    'user'
);


ALTER TYPE public.users_role_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: addresses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.addresses (
    "addressId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    street character varying(60) NOT NULL,
    city character varying(30) NOT NULL,
    province character varying(60) NOT NULL,
    zip_code character varying(4) NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    "userId" uuid
);


ALTER TABLE public.addresses OWNER TO postgres;

--
-- Name: cart_item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart_item (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "userId" uuid,
    "productId" uuid NOT NULL,
    quantity integer NOT NULL
);


ALTER TABLE public.cart_item OWNER TO postgres;

--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    "productId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    ingredients text,
    category public.products_category_enum NOT NULL,
    description character varying NOT NULL,
    price numeric(10,2) NOT NULL,
    "imageUrl" character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    "userId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    fullname character varying(50),
    username character varying(30) NOT NULL,
    email character varying(60) NOT NULL,
    password character varying NOT NULL,
    phone character varying(10) NOT NULL,
    role public.users_role_enum DEFAULT 'user'::public.users_role_enum NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: addresses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.addresses ("addressId", street, city, province, zip_code, created_at, updated_at, "userId") FROM stdin;
\.


--
-- Data for Name: cart_item; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart_item (id, "userId", "productId", quantity) FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products ("productId", name, ingredients, category, description, price, "imageUrl", "createdAt", "updatedAt") FROM stdin;
aa1eed3d-8560-4584-a6f1-81ab4db316b9	Classic Beef Burger	cheese,bacon,jalapeño,beef	burgers	Grilled beef patty with lettuce, tomato, and house sauce on a sesame bun.	79.99	https://res.cloudinary.com/dgdevmfnd/image/upload/v1750992029/food-images/burgers/beef/classic-burger-removebg-preview_xfrow1.png	2025-10-09 15:46:50.450063	2025-10-09 15:46:50.450063
d2d62289-ed27-4fb6-b985-693be775a10d	Cheese Burger	cheese,bacon,jalapeño,beef	burgers	Juicy beef patty topped with cheddar cheese, pickles, and onions.	84.99	https://res.cloudinary.com/dgdevmfnd/image/upload/v1750992030/food-images/burgers/beef/pexels-natan-machado-fotografia-gastronomica-162809799-15010309-removebg-preview_hibqtd.png	2025-10-09 15:46:50.492188	2025-10-09 15:46:50.492188
f2ac134c-7fa6-4342-956a-57e592d3afdd	Spicy jalapeño Burger	bacon,jalapeño,beef	burgers	Beef burger with jalapeños, spicy sauce, and melted cheese.	89.99	https://res.cloudinary.com/dgdevmfnd/image/upload/v1750992029/food-images/burgers/beef/pexels-melaudelo-27600007-removebg-preview_w0euve.png	2025-10-09 15:46:50.500243	2025-10-09 15:46:50.500243
4cfde857-b8d9-4e33-a6ac-7486f9de8dd0	Veggie Burger	veggie	burgers	Grilled plant-based patty with avocado and vegan mayo.	70.99	https://res.cloudinary.com/dgdevmfnd/image/upload/v1750992031/food-images/burgers/veg/pexels-groovelanddesigns-3607284-removebg-preview_mgiqyg.png	2025-10-09 15:46:50.507082	2025-10-09 15:46:50.507082
89434acc-2e8e-4fa4-b9e8-589ecf7ba634	The Double Trouble Melt	cheese,eggs,bacon,jalapeño,beef	burgers	A mouthwatering monster stacked high with two juicy beef patties, smothered in layers of rich, melted cheddar and mozzarella cheese. Topped with tangy pickles, crispy lettuce, grilled onions, and our signature smoky sauce — all nestled in a toasted brioche bun. It’s cheesy, it’s beefy, it’s double the flavor and double the fun.	82.99	https://res.cloudinary.com/dgdevmfnd/image/upload/v1750992029/food-images/burgers/beef/pexels-lucas-porras-1937324539-28828553-removebg-preview_zw8w8t.png	2025-10-09 15:46:50.513526	2025-10-09 15:46:50.513526
e8cb2f44-89e8-4807-ae4a-0ee64151070b	Stack Attack	cheese,beef	burgers	A juicy grilled beef patty layered with melted cheddar cheese, fresh lettuce, and tangy pickles, all tucked inside a toasted bun	90.99	https://res.cloudinary.com/dgdevmfnd/image/upload/v1750992030/food-images/burgers/beef/pexels-k-patel-1100389468-20722031-removebg-preview_fjmm8o.png	2025-10-09 15:46:50.519598	2025-10-09 15:46:50.519598
8fa6bfbf-0007-4200-a276-aa745182f6fd	Cheese Overload	cheese,chicken	burgers	A gooey, melty masterpiece loaded with triple cheese, grilled to perfection and dripping with flavor in every bite.	95.99	https://res.cloudinary.com/dgdevmfnd/image/upload/v1750992030/food-images/burgers/chicken/pexels-enesfilm-8183569-removebg-preview_fben7s.png	2025-10-09 15:46:50.529607	2025-10-09 15:46:50.529607
06f3e056-c1f7-4d9e-b317-14ff57e556fe	Margherita Pizza	\N	pizzas	Classic pizza with mozzarella, fresh basil, and tomato sauce.	99.99	https://res.cloudinary.com/dgdevmfnd/image/upload/v1750992031/food-images/pizza/pexels-fira-ergashevv-1784024088-28272163-removebg-preview_tfkmxf.png	2025-10-09 15:46:50.535647	2025-10-09 15:46:50.535647
ab425d46-0792-4be7-bb87-9fb8a17313d2	BBQ Chicken Pizza	\N	pizzas	Grilled chicken, red onions, and BBQ sauce on a cheesy base.	119.99	https://res.cloudinary.com/dgdevmfnd/image/upload/v1750992031/food-images/pizza/pexels-renestrgar-16890470-removebg-preview_jkvz51.png	2025-10-09 15:46:50.541697	2025-10-09 15:46:50.541697
e4e88217-45c8-46cd-9cfd-68e08fcecb16	Pepperoni Pizza	\N	pizzas	Loaded with pepperoni and melted mozzarella cheese.	114.99	https://res.cloudinary.com/dgdevmfnd/image/upload/v1750992032/food-images/pizza/pexels-mahdi-ahmadi-2149139587-30504707-removebg-preview_g3xcd3.png	2025-10-09 15:46:50.546972	2025-10-09 15:46:50.546972
18bc31ad-a1b5-43d9-ab88-b01280d0daa7	Hawaiian Pizza	\N	pizzas	Ham and pineapple with tangy tomato sauce and mozzarella.	109.99	https://res.cloudinary.com/dgdevmfnd/image/upload/v1750992034/food-images/pizza/pexels-collab-media-173741945-27582703-removebg-preview_xl5oge.png	2025-10-09 15:46:50.553293	2025-10-09 15:46:50.553293
7c7a8eb3-d40b-46a8-a2a3-dd2bd8f0d580	Four Cheese Pizza	\N	pizzas	Mozzarella, cheddar, feta, and parmesan cheese blend.	124.99	https://res.cloudinary.com/dgdevmfnd/image/upload/v1750992035/food-images/pizza/pexels-shameel-mukkath-3421394-5639547-removebg-preview_ah5pkn.png	2025-10-09 15:46:50.558899	2025-10-09 15:46:50.558899
99481000-a945-4414-ad35-17cb0c26fc03	Oreo Cheesecake	\N	desserts	Creamy cheesecake with a crunchy Oreo base and topping.	59.99	https://res.cloudinary.com/dgdevmfnd/image/upload/v1750992034/food-images/dessert/pexels-angela-khebou-259135285-13922386-removebg-preview_i4cfmm.png	2025-10-09 15:46:50.563405	2025-10-09 15:46:50.563405
3fcf06c8-5600-46d9-b9ad-8513d451af96	Double Delight Muffin	\N	desserts	Vanilla muffin with chocolate toppings	54.99	https://res.cloudinary.com/dgdevmfnd/image/upload/v1750992034/food-images/dessert/pexels-andrea-perez-2149019055-30387653-removebg-preview_kk3ixw.png	2025-10-09 15:46:50.567519	2025-10-09 15:46:50.567519
0099ef7e-6da6-47d4-a083-b695fec40159	Velvet Cream Cheesecake Slice	\N	desserts	A luxuriously smooth and creamy cheesecake with a buttery graham cracker crust.	54.99	https://res.cloudinary.com/dgdevmfnd/image/upload/v1750992030/food-images/dessert/pexels-emre-akyol-320381804-17566483-removebg-preview_fqfblx.png	2025-10-09 15:46:50.573514	2025-10-09 15:46:50.573514
d2535faa-04cb-46c8-8b2f-b249b99de655	Beef Burger Combo	beef,chips	combos	Classic beef burger served with crispy chips	99.99	https://res.cloudinary.com/dgdevmfnd/image/upload/v1750992033/food-images/burger_combo/pexels-enginakyurt-7479006-removebg-preview_wh9wtk.png	2025-10-09 15:46:50.577601	2025-10-09 15:46:50.577601
4c89290b-624a-48b2-b8b2-6f7e292a3739	Melt Master Beef Burger	beef,chips	combos	A succulent beef patty smothered in rich, melted cheddar cheese, topped with fresh lettuce and tangy pickles, all stacked inside a toasted bun.	94.99	https://res.cloudinary.com/dgdevmfnd/image/upload/v1750992033/food-images/burger_combo/pexels-jonathanborba-2983101-removebg-preview_kgiwr9.png	2025-10-09 15:46:50.581641	2025-10-09 15:46:50.581641
0d0ba581-59eb-4c4b-9b20-21cc415e6b8a	Cheese Burger Combo	cheese,beef,chips	combos	Cheese burger with seasoned chips and a drink	104.99	https://res.cloudinary.com/dgdevmfnd/image/upload/v1750992032/food-images/burger_combo/pexels-the-castlebar-3902897-9201333-removebg-preview_l1lkpe.png	2025-10-09 15:46:50.587296	2025-10-09 15:46:50.587296
d8d0b1b8-f1b0-4f53-8b62-a1fc133d60a1	Beef Me Up Burger Combo	cheese,beef,chips	combos	Cheese burger with seasoned chips and a drink	104.99	https://res.cloudinary.com/dgdevmfnd/image/upload/v1750992032/food-images/burger_combo/burger-combo-removebg-preview_xfvvz4.png	2025-10-09 15:46:50.59166	2025-10-09 15:46:50.59166
daabff69-46ee-420b-b39f-87c7c6ce1bf1	Cluck & Crunch Combo	cheese,chicken,chips	combos	A crispy golden chicken fillet, topped with fresh lettuce, pickles, and creamy mayo, all nestled in a soft toasted bun.	104.99	https://res.cloudinary.com/dgdevmfnd/image/upload/v1750992032/food-images/burger_combo/pexels-the-castlebar-3902897-5893970-removebg-preview_jirdrd.png	2025-10-09 15:46:50.595528	2025-10-09 15:46:50.595528
660b9c88-5f79-4031-b5c6-c26a56c72c46	Classic Beef Deluxe	cheese,beef,chips	combos	A juicy, flame-grilled beef patty stacked with fresh lettuce and ripe tomatoes, topped with a generous dollop of creamy mayo sauce. 	104.99	https://res.cloudinary.com/dgdevmfnd/image/upload/v1750992032/food-images/burger_combo/pexels-valeriya-11213787-removebg-preview_yekrhz.png	2025-10-09 15:46:50.600446	2025-10-09 15:46:50.600446
38bfb84d-d22d-4280-ba60-83d29da52176	6-Piece Chicken Wings	\N	wings	Crispy fried chicken wings tossed in your choice of BBQ, hot, or lemon pepper sauce.	69.99	https://res.cloudinary.com/dgdevmfnd/image/upload/v1750992034/food-images/chicken/wings/pexels-valeriya-27668695-removebg-preview_gpuxpj.png	2025-10-09 15:46:50.605332	2025-10-09 15:46:50.605332
d03ad902-e1ed-4e1f-bd0b-cd33bc9d0ba4	12-Piece Chicken Wings	\N	wings	Crispy fried chicken wings tossed in your choice of BBQ, hot, or lemon pepper sauce.	69.99	https://res.cloudinary.com/dgdevmfnd/image/upload/v1750992034/food-images/chicken/wings/pexels-christian-moises-pahati-3856199-5724555-removebg-preview_bhavu3.png	2025-10-09 15:46:50.609508	2025-10-09 15:46:50.609508
eaed5c9c-d258-49ba-84ed-e1b1534e3730	Crispy Chicken Wings	\N	wings	crispy wings seasoned with spicy herbs, served with dipping sauce.	74.99	https://res.cloudinary.com/dgdevmfnd/image/upload/v1750992033/food-images/chicken/wings/pexels-introspectivedsgn-4061475-removebg-preview_w46rac.png	2025-10-09 15:46:50.614149	2025-10-09 15:46:50.614149
bb87ee18-b744-4640-85ca-964bb21dcd37	Crunch Blaze Wings	\N	wings	Golden-fried to crispy perfection, these wings deliver a loud crunch with every bite.	65.99	https://res.cloudinary.com/dgdevmfnd/image/upload/v1750992033/food-images/chicken/wings/pexels-pixabay-60616-removebg-preview_rik4jt.png	2025-10-09 15:46:50.621411	2025-10-09 15:46:50.621411
404cd768-d2ee-4352-93b4-96373a7266ad	Fire Sticks	\N	wings	Crispy, juicy chicken wings glazed in a bold, sticky sauce that packs a punch — sweet, smoky, and spicy all at once. 	80.99	https://res.cloudinary.com/dgdevmfnd/image/upload/v1750992033/food-images/chicken/wings/pexels-mohamad-sadek-141949763-10361458-removebg-preview_dupx3c.png	2025-10-09 15:46:50.625961	2025-10-09 15:46:50.625961
160c7441-8b2c-4448-863c-5d9762ba8f0d	Smoke Kissed Wings	\N	wings	Tender, juicy wings grilled over open flame for that smoky charred flavor 	70.99	https://res.cloudinary.com/dgdevmfnd/image/upload/v1750992034/food-images/chicken/wings/pexels-ahmedbhutta11-7169617-removebg-preview_zeykkj.png	2025-10-09 15:46:50.629716	2025-10-09 15:46:50.629716
c0bb446e-ea45-4f67-acf9-841aa8f3e762	Grilled Pork Ribs	\N	ribs	Marinated pork ribs grilled to perfection, served with garlic dip.	84.99	https://res.cloudinary.com/dgdevmfnd/image/upload/v1750992032/food-images/ribs/pexels-iamabdullahsheik-9650087-removebg-preview_atd7nd.png	2025-10-09 15:46:50.63331	2025-10-09 15:46:50.63331
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users ("userId", fullname, username, email, password, phone, role, created_at, updated_at) FROM stdin;
\.


--
-- Name: products PK_7b3b507508cd0f86a5b2e923459; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "PK_7b3b507508cd0f86a5b2e923459" PRIMARY KEY ("productId");


--
-- Name: users PK_8bf09ba754322ab9c22a215c919; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_8bf09ba754322ab9c22a215c919" PRIMARY KEY ("userId");


--
-- Name: cart_item PK_bd94725aa84f8cf37632bcde997; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_item
    ADD CONSTRAINT "PK_bd94725aa84f8cf37632bcde997" PRIMARY KEY (id);


--
-- Name: addresses PK_ff59275f5928941ce06f1d8890c; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT "PK_ff59275f5928941ce06f1d8890c" PRIMARY KEY ("addressId");


--
-- Name: addresses REL_95c93a584de49f0b0e13f75363; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT "REL_95c93a584de49f0b0e13f75363" UNIQUE ("userId");


--
-- Name: users UQ_97672ac88f789774dd47f7c8be3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);


--
-- Name: cart_item UQ_c605dd3a08f85dcb5a656b7299d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_item
    ADD CONSTRAINT "UQ_c605dd3a08f85dcb5a656b7299d" UNIQUE ("userId", "productId");


--
-- Name: users UQ_fe0bb3f6520ee0469504521e710; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE (username);


--
-- Name: addresses FK_95c93a584de49f0b0e13f753630; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT "FK_95c93a584de49f0b0e13f753630" FOREIGN KEY ("userId") REFERENCES public.users("userId");


--
-- PostgreSQL database dump complete
--

\unrestrict VaNNADqcp1ftidbKx8jBG7wJ2KPCrjmecuo7aGPtWA4Graet6GnW8Ch3h8uSROD

