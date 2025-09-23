import { Repository } from "typeorm";
import { BaseService } from "../../utils/base_service";
import { DatabaseUtil } from "../../utils/db";
import { CartItem } from "./cart_item_entity";

export class CartService extends BaseService<CartItem> {
  constructor() {
    let cartItemRepositpry: Repository<CartItem> =
      new DatabaseUtil().getRepository(CartItem);
    super(cartItemRepositpry);
  }
}
