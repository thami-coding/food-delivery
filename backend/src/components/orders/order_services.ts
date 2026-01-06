import { Repository } from "typeorm";
import { BaseService } from "../../utils/base_service";
import { DatabaseUtil } from "../../utils/db";
import { Orders } from "./order_entity";

export class OrderServices extends BaseService<Orders> {
 constructor() {
  let orderRepository: Repository<Orders> =
   new DatabaseUtil().getRepository(Orders);
  super(orderRepository);
 }
}
