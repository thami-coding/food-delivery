"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressesService = void 0;
const addresses_entity_1 = require("./addresses_entity");
const base_service_1 = require("../../utils/base_service");
const db_1 = require("../../utils/db");
class AddressesService extends base_service_1.BaseService {
    constructor() {
        let addressRepository = null;
        addressRepository = new db_1.DatabaseUtil().getRepository(addresses_entity_1.Addresses);
        super(addressRepository);
    }
}
exports.AddressesService = AddressesService;
