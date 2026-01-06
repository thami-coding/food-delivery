import { Repository } from "typeorm";
import { DatabaseUtil } from "../../utils/db";
import { BaseService } from "../../utils/base_service";
import { Users } from "./user_entity";

export class UserServices extends BaseService<Users> {
  constructor() {
    let userRepository: Repository<Users> | null = null;
    userRepository = new DatabaseUtil().getRepository(Users);
    super(userRepository);
  }
}

