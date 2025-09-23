import { Repository } from "typeorm";
import { BaseService } from "../../utils/base_service";
import { DatabaseUtil } from "../../utils/db";
import { Products } from "./products_entity";

export class ProductsService extends BaseService<Products> {
  constructor() {
    const productsRepository: Repository<Products> =
      new DatabaseUtil().getRepository(Products);
    super(productsRepository);
  }
}
