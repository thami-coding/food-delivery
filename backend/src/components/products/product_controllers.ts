import { Request, Response } from "express";
import { BaseController } from "../../utils/base_controller";
import { ProductServices } from "./product_services";
import { StatusCodes } from "http-status-codes";
import { products } from "../../dummy-data";

import { QueryParams } from "../../utils/queryParamsType";
import { Categories } from "./product_entity";

export class ProductControllers implements BaseController {
  public async addHandler(req: Request, res: Response): Promise<void> {
    const service = new ProductServices();
    const product = await service.create(req.body);
    res.status(StatusCodes.CREATED).json({ product })
  }

  public async getAllHandler(req: Request, res: Response): Promise<void> {
    try {
      const service = new ProductServices();
      const queryParams: QueryParams = {};

      const page = parseInt(req.query.page as string) || 1;
      const category = (req.query.category as string) || "all";

      queryParams.limit = parseInt(req.query.limit as string) || 10;
      queryParams.offset = (page - 1) * queryParams.limit;
      queryParams.category = category as Categories;

      const { total, data } = await service.findAll(queryParams);
      res.status(StatusCodes.OK).json({
        status: "success",
        products: data,
        page,
        totalProducts: total,
      });
    } catch (error) {
      console.log(error);

      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ status: "error", message: "Failed to fetch all users" });
    }
  }

  public getOneHandler(req: Request, res: Response): void {
    throw new Error("Method not implemented.");
  }

  public updateHandler(req: Request, res: Response): void {
    throw new Error("Method not implemented.");
  }

  public async seedHandler(req: Request, res: Response): Promise<void> {
    const service = new ProductServices();
    try {
      for (const product of products) {
        const result = await service.create(product);
      }

      res
        .status(StatusCodes.OK)
        .json({ status: "success", message: "Products successfully seeded" });
    } catch (error) {
      console.log(error.message);

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: "error",
        message: "Something went wrong while seeding database",
      });
    }
  }

  public deleteHandler(req: Request, res: Response): void {
    throw new Error("Method not implemented.");
  }
}
