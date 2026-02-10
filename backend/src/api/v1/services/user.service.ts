import { User } from "../../../entities/user.entity"
import { userRepository } from "../../../repositories/repos"

export const update = async (data: Partial<User>) => {
  const userRepo = userRepository()
  return await userRepo.update(data.id, data)
}

export const remove = async (userId: string) => {
  const userRepo = userRepository()
  return await userRepo.delete(userId)
}
export const findAllUsers = async () => {
  const userRepo = userRepository()
  return await userRepo.find()
}

export const findUserById = async (id: string) => {
  if (!id) {
    return null
  }
  const userRepo = userRepository()
  return await userRepo.findOne({
    where: { id },
    select: [
      "id",
      "email",
      "role",
      "fullName",
      "phoneNumber",
      "streetAddress",
      "city",
      "suburb",
      "city",
      "postalCode",
    ],
  })
}
