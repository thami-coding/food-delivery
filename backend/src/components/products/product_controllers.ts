// import { Request, Response } from "express"
// import { BaseController } from "../../utils/base_controller"
// import { ProductServices } from "./product_services"
// import { StatusCodes } from "http-status-codes"
// import { products } from "../../dummy-data"

// import { Products } from "./product_entity"
// import { DatabaseUtil } from "../../db/database"

// export class ProductControllers implements BaseController {
//   public async seedHandler(req: Request, res: Response): Promise<void> {
//     const productRepository = new DatabaseUtil().getRepository(Products)
//     await productRepository.insert(products)
//     res
//       .status(StatusCodes.OK)
//       .json({ status: "success", message: "Products successfully seeded" })
//   }

//   public async addHandler(req: Request, res: Response): Promise<void> {
//     const productRepo = new DatabaseUtil().getRepository(Products)
//     const saveProduct = await productRepo.create(req.body)
//     const product = await productRepo.save(saveProduct)
//     res.status(StatusCodes.CREATED).json({ status: "success", product })
//   }

//   public async getAllHandler(req: Request, res: Response): Promise<void> {
//     const productRepo = new DatabaseUtil().getRepository(Products)

//     const page = parseInt(req.query.page as string) || 1
//     const category =
//       (req.query.category as string) === "all"
//         ? null
//         : (req.query.category as string) //TODO: fix
//     const take = parseInt(req.query.limit as string) || 10
//     const skip = (page - 1) * take

//     const [products, total] = await productRepo.findAndCount({
//       where: { category },
//       skip,
//       take,
//     })

//     const totalPages = Math.ceil(total / take)
//     res.status(StatusCodes.OK).json({
//       status: "success",
//       products,
//       page,
//       totalPages,
//       totalProducts: total,
//     })
//   }

//   public async getOneHandler(req: Request, res: Response): Promise<void> {
//     const productsService = new ProductServices()
//     const { id } = req.params
//     const product = await productsService.findOne(id as string)
//     res.status(StatusCodes.OK).json({ status: "success", product })
//   }

//   public async updateHandler(req: Request, res: Response): Promise<void> {
//     const productRepo = new DatabaseUtil().getRepository(Products)
//     const { name, description, category, price, imageUrl, ingredients } =
//       req.body
//     const id = req.params.id as string
//     // TODO fix image not being null
//     if (!imageUrl) {
//       await productRepo.update(id, {
//         name,
//         description,
//         category,
//         price,
//         ingredients,
//       })
//       const product = await productRepo.findOne({ where: { id } })
//       res.status(StatusCodes.OK).json({ status: "success", product })
//       return
//     }

//     await productRepo.update(id, {
//       name,
//       description,
//       category,
//       price,
//       ingredients,
//       imageUrl,
//     })
//     const product = await productRepo.findOne({ where: { id } })
//     res.status(StatusCodes.OK).json({ status: "success", product })
//   }

//   public async deleteHandler(req: Request, res: Response): Promise<void> {
//     const productRepository = new DatabaseUtil().getRepository(Products)
//     await productRepository.delete(req.params.id)
//     res.status(StatusCodes.NO_CONTENT).json(null)
//   }
// }
