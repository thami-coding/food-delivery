import { Repository } from "typeorm";
import { Addresses } from "./addresses_entity";
import { BaseService } from "../../utils/base_service";
import { DatabaseUtil } from "../../utils/db";

export class AddressesService extends BaseService<Addresses> {
  constructor() {
    let addressRepository: Repository<Addresses> | null = null;
    addressRepository = new DatabaseUtil().getRepository(Addresses);
    super(addressRepository);
  }
}