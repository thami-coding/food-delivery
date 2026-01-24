import { useEffect, useRef, useState } from "react"
import { productSchema } from "../../types/productForm"
import { uploadToCloudinary } from "../../lib/uploadToCloudinary"
import ErrorMessage from "../../components/ErrorMessage"
import { toast } from "react-toastify"
import Loading from "../../components/Loading"
import { useCreateProduct } from "../../hooks/useProducts"

const AddProductsPage = () => {

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
  })

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const productMutation = useCreateProduct()

  useEffect(() => {
    return () => {
      if (imagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview)
      }
    };
  }, [imagePreview])

  const handleImageChange = (file: File | null) => {
    if (!file) return

    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setIsLoading(true)
    const result = productSchema.safeParse({
      ...form,
      price: Number(form.price),
      imageFile,
    })

    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.issues.forEach((err) => {
        fieldErrors[err.path[0] as string] = err.message
      })
      setErrors(fieldErrors)
      setIsLoading(false)
      return
    }

    try {
      const imageUrl = await uploadToCloudinary(imageFile!)

      productMutation.mutate({
        name: result.data.name,
        description: result.data.description,
        category: result.data.category,
        price: result.data.price,
        paymentMethod,
        imageUrl,
      })
      setIsLoading(false)
      toast("Item Added")
      setForm({
        name: "",
        description: "",
        category: "",
        price: ""
      })
      setImageFile(null)
      setImagePreview(null)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <h1 className="text-2xl font-semibold mb-6">Add New Product</h1>

      <div className="grid  justify-center">
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
            {errors.name && <ErrorMessage message={errors.name} />}
          </div>

          <div>
            <input
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-2 bg-[#202020] border border-gray-700 rounded-lg"
            />
            {errors.description && (<ErrorMessage message={errors.description} />
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
              <ErrorMessage message={errors.category} />
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
              <ErrorMessage message={errors.price} />
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
                className="px-4 py-2 rounded bg-gray-800 text-white cursor-pointer"
              >
                Choose File
              </button>
            </div>

            {errors.imageFile && (
              <ErrorMessage message={errors.imageFile} />
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
            disabled={isLoading}
            className="w-full bg-[#ffb900] text-[#202020] py-2 rounded-lg font-semibold hover:bg-yellow-500 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? <Loading text="Adding" /> : "Add Product"}
          </button>
        </form>
      </div>
    </>
  )
}

export default AddProductsPage