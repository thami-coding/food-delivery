import React, { useEffect, useRef, useState } from "react"
import LoadingSpinner from "../../../components/LoadingSpinner"
import { uploadToCloudinary } from "../../../lib/uploadToCloudinary"
import { useParams } from "react-router"
import log from "loglevel"
import { useProduct, useUpdateProduct } from "../hooks"
import { productSchema } from "../schemas"

export default function EditProductPage() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "0",
  })

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const params = useParams()
  const { isError, isPending, data } = useProduct(params.id!)
  const productMutation = useUpdateProduct()
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setForm({
      name: data?.name || "",
      description: data?.description || "",
      category: data?.category || "all",
      price: data?.price || "0",
    })
    setImagePreview(data?.imageUrl || "")
  }, [data])

  useEffect(() => {
    return () => {
      if (imagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview)
      }
    }
  }, [imagePreview])

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
    console.log(result);
    
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      setErrors(fieldErrors)
      return
    }
    
    console.log("pressed");
    try {
      let imageUrl = null
      if (imageFile) {
        imageUrl = await uploadToCloudinary(imageFile!)
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

  if (isPending) {
    return (
      <div className="grid h-full place-content-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <>
      <div className="grid  justify-center">
        <h1 className="text-2xl font-semibold mb-6">Edit Product</h1>
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
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
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
          <div>
            <textarea
              placeholder="Description"
              rows={5}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
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
            {productMutation.isPending ? "Loading..." : "Edit Product"}
          </button>
        </form>
      </div>
    </>
  )
}
