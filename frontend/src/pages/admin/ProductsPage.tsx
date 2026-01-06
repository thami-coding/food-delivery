import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../../lib/apiClient";
import { productSchema } from "../../types/productForm";
import { uploadToCloudinary } from "../../lib/uploadToCloudinary";

const ProductsPage = () => {
 const queryClient = useQueryClient();

 const [form, setForm] = useState({
  name: "",
  description: "",
  category: "",
  price: "",
 });

 const [imageFile, setImageFile] = useState<File | null>(null);
 const [imagePreview, setImagePreview] = useState<string | null>(null);
 const [errors, setErrors] = useState<Record<string, string>>({});

 const productMutation = useMutation({
  mutationFn: createProduct,
  onSuccess: () => {
   queryClient.invalidateQueries({ queryKey: ["products"] });
  },
 });

 const handleImageChange = (file: File | null) => {
  if (!file) return;

  setImageFile(file);
  setImagePreview(URL.createObjectURL(file));
 };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setErrors({});

  // ✅ Zod validation
  const result = productSchema.safeParse({
   ...form,
   price: Number(form.price),
   imageFile,
  });

  if (!result.success) {
   const fieldErrors: Record<string, string> = {};
   result.error.errors.forEach((err) => {
    fieldErrors[err.path[0]] = err.message;
   });
   setErrors(fieldErrors);
   return;
  }

  try {
   // ✅ Upload image
   const imageUrl = await uploadToCloudinary(imageFile!);

   // ✅ Create product
   productMutation.mutate({
    name: result.data.name,
    description: result.data.description,
    category: result.data.category,
    price: result.data.price,
    imageUrl,
   });
  } catch (err) {
   console.error(err);
  }
 };

 return (
  <div className="grid  justify-center ml-50">
   <h1 className="text-2xl font-semibold mb-6">Add New Product</h1>

   <form
    onSubmit={handleSubmit}
    className="max-w-lg space-y-4 bg-[#1a1a1a] p-6 rounded-xl  min-w-lg grid gap-y-4"
   >
    {/* Name */}
    <div>
     <input
      placeholder="Product Name"
      value={form.name}
      onChange={(e) => setForm({ ...form, name: e.target.value })}
      className="w-full px-4 py-2 bg-[#202020] border border-gray-700 rounded-lg"
     />
     {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
    </div>

    {/* Description */}
    <div>
     <input
      placeholder="Description"
      value={form.description}
      onChange={(e) => setForm({ ...form, description: e.target.value })}
      className="w-full px-4 py-2 bg-[#202020] border border-gray-700 rounded-lg"
     />
     {errors.description && (
      <p className="text-red-500 text-sm">{errors.description}</p>
     )}
    </div>

    {/* Category */}
    <div>
     <select
      value={form.category}
      onChange={(e) => setForm({ ...form, category: e.target.value })}
      className="w-full bg-[#202020] border border-gray-700 text-white px-4 py-2.5 rounded-lg"
     >
      <option value="" disabled>
       Select category
      </option>
      <option value="pizzas">Pizzas</option>
      <option value="wings">Wings</option>
      <option value="burgers">Burgers</option>
      <option value="desserts">Desserts</option>
      <option value="combos">Combos</option>
      <option value="ribs">Ribs</option>
     </select>
     {errors.category && (
      <p className="text-red-500 text-sm">{errors.category}</p>
     )}
    </div>

    {/* Price */}
    <div>
     <input
      type="number"
      placeholder="Price"
      value={form.price}
      onChange={(e) => setForm({ ...form, price: e.target.value })}
      className="w-full px-4 py-2 bg-[#202020] border border-gray-700 rounded-lg"
     />
     {errors.price && (
      <p className="text-red-500 text-sm">{errors.price}</p>
     )}
    </div>

    {/* Image Upload */}
    <div>
     <input
      type="file"
      accept="image/*"
      onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
      className="w-full text-gray-400"
     />
     {errors.imageFile && (
      <p className="text-red-500 text-sm">{errors.imageFile}</p>
     )}
    </div>

    {/* Image Preview */}
    {imagePreview && (
     <img
      src={imagePreview}
      alt="Preview"
      className="h-40 w-full object-cover rounded-lg border border-gray-700"
     />
    )}

    {/* Submit */}
    <button
     disabled={productMutation.isPending}
     className="w-full bg-[#ffb900] text-[#202020] py-2 rounded-lg font-semibold hover:bg-yellow-500 disabled:opacity-50"
    >
     {productMutation.isPending ? "Adding..." : "Add Product"}
    </button>

    {productMutation.isSuccess && (
     <p className="text-green-500 text-sm">Product added ✅</p>
    )}
   </form>
  </div>
 );
};

export default ProductsPage;