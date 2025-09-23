import { Repository } from "typeorm";
import { DatabaseUtil } from "../../utils/db";
import { BaseService } from "../../utils/base_service";
import { Users } from "./users_entity";

export class UsersService extends BaseService<Users> {
  constructor() {
    let userRepository: Repository<Users> | null = null;
    userRepository = new DatabaseUtil().getRepository(Users);
    super(userRepository);
  }
}

