import { IServerConfig } from "./config";
import config from "../../server_config.json";
import { DataSource, Repository } from "typeorm";
import { Users } from "../components/users/users_entity";
import { Addresses } from "../components/addresses/addresses_entity";
import { Products } from "../components/products/products_entity";
import { CartItem } from "../components/cart/cart_item_entity";

export class DatabaseUtil {
  private server_config: IServerConfig = config;
  private static connection: DataSource | null = null;
  private repositories: Record<string, Repository<any>> = {};

  constructor() {
    this.connectDatabase();
  }

  public async connectDatabase() {
    try {
      if (DatabaseUtil.connection) {
        return DatabaseUtil.connection;
      } else {
        const db_config = this.server_config.db_config;
        const AppSource = new DataSource({
          type: "postgres",
          host: db_config.host,
          port: db_config.port,
          username: db_config.username,
          password: db_config.password,
          database: db_config.dbname,
          entities: [Users, Addresses, Products, CartItem],
          synchronize: true,
          poolSize: 10,
        });
        await AppSource.initialize();
        DatabaseUtil.connection = AppSource;
        console.log("connected to the database");
        return DatabaseUtil.connection;
      }
    } catch (error) {
      console.log(error);

      console.log("Error connecting to the database");
    }
  }

  public getRepository(entity) {
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
    } catch (error) {
      console.log(`Error while getting repository: ${error.messsage}`);
    }
  }
}
