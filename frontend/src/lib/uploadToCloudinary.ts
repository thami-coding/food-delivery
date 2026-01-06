import axios from "axios";

export const uploadToCloudinary = async (file: File) => {
 console.log(file);

 const formData = new FormData();
 formData.append("file", file);
 formData.append("upload_preset", "uploads");

 const { data } = await axios.post(
  "https://api.cloudinary.com/v1_1/dgdevmfnd/upload", formData
 );

 return data.secure_url as string;
};