"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseUtil = void 0;
const server_config_json_1 = __importDefault(require("../../server_config.json"));
const typeorm_1 = require("typeorm");
const users_entity_1 = require("../components/users/users_entity");
const addresses_entity_1 = require("../components/addresses/addresses_entity");
const products_entity_1 = require("../components/products/products_entity");
const cart_item_entity_1 = require("../components/cart/cart_item_entity");
class DatabaseUtil {
    server_config = server_config_json_1.default;
    static connection = null;
    repositories = {};
    constructor() {
        this.connectDatabase();
    }
    async connectDatabase() {
        try {
            if (DatabaseUtil.connection) {
                return DatabaseUtil.connection;
            }
            else {
                const db_config = this.server_config.db_config;
                const AppSource = new typeorm_1.DataSource({
                    type: "postgres",
                    host: db_config.host,
                    port: db_config.port,
                    username: db_config.username,
                    password: db_config.password,
                    database: db_config.dbname,
                    entities: [users_entity_1.Users, addresses_entity_1.Addresses, products_entity_1.Products, cart_item_entity_1.CartItem],
                    synchronize: true,
                    poolSize: 10,
                });
                await AppSource.initialize();
                DatabaseUtil.connection = AppSource;
                console.log("connected to the database");
                return DatabaseUtil.connection;
            }
        }
        catch (error) {
            console.log(error);
            console.log("Error connecting to the database");
        }
    }
    getRepository(entity) {
        try {
            if (DatabaseUtil.connection) {
                const entityName = entity.name;
                if (!this.repositories[entityName]) {
                    this.repositories[entityName] =
                        DatabaseUtil.connection.getRepository(entity);
                }
                return this.repositories[entityName];
            }
            return null;
        }
        catch (error) {
            console.log(`Error while getting repository: ${error.messsage}`);
        }
    }
}
exports.DatabaseUtil = DatabaseUtil;
