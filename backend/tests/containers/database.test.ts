import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql"
import { DataSource } from "typeorm"
import * as Entities from "../../src/entities"
import {} from "../api/helpers/user.helper"
import { products as dummyProducts } from "../../src/dummy-data"
import { detailedUser, newUser } from "../api/helpers/dummy-users"
const IMAGE = "postgres:18-alpine"

describe("PostgreSQL Testcontainer with TypeORM", () => {
  let container: StartedPostgreSqlContainer
  let dataSource: DataSource

  const createDataSource = () =>
    new DataSource({
      type: "postgres",
      host: container.getHost(),
      port: container.getPort(),
      username: container.getUsername(),
      password: container.getPassword(),
      database: container.getDatabase(),
      entities: Object.values(Entities),
      synchronize: true,
    })

  beforeAll(async () => {
    container = await new PostgreSqlContainer(IMAGE).start()
    dataSource = createDataSource()
    await dataSource.initialize()
  })

  afterAll(async () => {
    if (dataSource.isInitialized) {
      await dataSource.destroy()
    }
    await container.stop()
  })

  describe("UserRepository", () => {
    it("persists and retrieves a user", async () => {
      const repo = dataSource.getRepository(Entities.User)

      const entity = repo.create(detailedUser)
      await repo.save(entity)

      const found = await repo.findOneBy({ fullName: "Bones" })

      expect(found).toBeDefined()
      expect(found?.fullName).toBe("Bones")
    })
  })

  describe("ProductRepository (pagination)", () => {
    it("returns a page of products with total count", async () => {
      const repo = dataSource.getRepository(Entities.Product)

      await repo.insert(dummyProducts)

      const page = 1
      const take = 10
      const skip = (page - 1) * take

      const [products, total] = await repo.findAndCount({
        skip,
        take,
        order: {
          createdAt: "ASC",
        },
      })

      expect(total).toBe(dummyProducts.length)
      expect(products).toHaveLength(take)
    })
    // it('returns empty array when page exceeds total', async () => {  })
  })
})
