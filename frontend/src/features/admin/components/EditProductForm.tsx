import { useEffect, useRef, useState } from "react"
import { useUpdateProduct } from "../hooks"
import { productSchema, type ProductDb } from "../schemas"
import { uploadToCloudinary } from "../../../lib/uploadToCloudinary"
import log from "loglevel"
import type { Category } from "../../products/types"


export default function EditProductForm({data}:{data:ProductDb}) {
 const [errors, setErrors] = useState<Record<string, string>>({})
 const [imageFile, setImageFile] = useState<File | string>(data?.imageUrl)
 const [imagePreview, setImagePreview] = useState<string | null>(data?.imageUrl)
 const fileInputRef = useRef<HTMLInputElement>(null)
 const productMutation = useUpdateProduct()
   const [form, setForm] = useState({
     name: data?.name || "",
     description: data?.description || "",
     category: data?.category || "all",
     price: data?.price || "0",
   })
 
   const handleImageChange = (file: File | null) => {
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
   }
   
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault()
     setErrors({})
     const result = productSchema.safeParse({
       ...form,
       price: form.price,
       imageFile,
     })
 
     if (!result.success) {
       const fieldErrors: Record<string, string> = {}
       setErrors(fieldErrors)
       return
     }
 
     try {
      let imageUrl = ""
      if (imageFile instanceof File) {
        imageUrl = await uploadToCloudinary(imageFile)
      }
      
       productMutation.mutate({
         id: data?.id,
         name: result.data.name,
         description: result.data.description,
         category: result.data.category,
         price: result.data.price,
         imageUrl,
       })
      } catch (err) {
       log.warn(err)
      }
     }

     useEffect(() => {
      // setImagePreview(data?.imageUrl || "")
       return () => {
         if (imagePreview?.startsWith("blob:")) {
           URL.revokeObjectURL(imagePreview)
         }
       }
     }, [imagePreview])

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg space-y-4 bg-[#1a1a1a] p-6 rounded-xl  min-w-lg grid gap-y-4"
    >
      <div>
        <input
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-2 bg-[#202020] border border-gray-700 rounded-lg"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>
      <div>
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
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

      <div>
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="w-full px-4 py-2 bg-[#202020] border border-gray-700 rounded-lg"
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
      </div>
      <div>
        <textarea
          placeholder="Description"
          rows={5}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full px-4 py-2 bg-[#202020] border border-gray-700 rounded-lg"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description}</p>
        )}
      </div>

      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0] ?? null
            handleImageChange(file)
          }}
          className="hidden"
        />

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 rounded bg-gray-800 text-white"
          >
            Change File
          </button>
        </div>

        {errors.imageFile && (
          <p className="text-red-500 text-sm mt-1">{errors.imageFile}</p>
        )}
      </div>

      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          className="h-60 w-60 block mx-auto object-cover rounded-lg"
        />
      )}

      <button
        disabled={productMutation.isPending}
        className="w-full bg-[#ffb900] text-[#202020] py-2 rounded-lg font-semibold cursor-pointer hover:bg-yellow-500 disabled:opacity-50"
      >
        {productMutation.isPending ? "Loading..." : "Save"}
      </button>
    </form>
  )
}
