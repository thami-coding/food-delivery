import "reflect-metadata"
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql"
import { DataSource } from "typeorm"
import { TestEntity } from "./entities/TestEntity"

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
      entities: [TestEntity],
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

  test("basic query works", async () => {
    const result = await dataSource.query("SELECT 1")
    expect(result[0]["?column?"]).toBe(1)
  })
})
