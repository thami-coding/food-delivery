import { Repository } from "typeorm";
import { BaseService } from "../../utils/base_service";
import { DatabaseUtil } from "../../utils/db";
import { CartItem } from "./cart_item_entity";

export class CartServices extends BaseService<CartItem> {
  constructor() {
    let cartItemRepository: Repository<CartItem> =
      new DatabaseUtil().getRepository(CartItem);
    super(cartItemRepository);
  }
}
