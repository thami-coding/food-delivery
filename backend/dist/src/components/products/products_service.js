"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const base_service_1 = require("../../utils/base_service");
const db_1 = require("../../utils/db");
const products_entity_1 = require("./products_entity");
class ProductsService extends base_service_1.BaseService {
    constructor() {
        const productsRepository = new db_1.DatabaseUtil().getRepository(products_entity_1.Products);
        super(productsRepository);
    }
}
exports.ProductsService = ProductsService;
