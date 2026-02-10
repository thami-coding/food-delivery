import "reflect-metadata"
import { DataSource } from "typeorm"
import { Database } from "../../src/db/database"

export const TestDataSource = new DataSource({
  type: "better-sqlite3",
  database: ":memory:",
  entities: [__dirname + "/../../src/entities/**/*.entity.{ts,js}"],
  synchronize: true,
  logging: false,
})

export const setupTestDB = async () => {
  if (!TestDataSource.isInitialized) {
    await TestDataSource.initialize()
    Database.setDataSource(TestDataSource)
  }
}

export const teardownTestDB = async () => {
  if (TestDataSource.isInitialized) {
    await TestDataSource.destroy()
  }
}

export const clearTestDB = async () => {
  for (const entity of TestDataSource.entityMetadatas) {
    const repo = TestDataSource.getRepository(entity.name)
    await repo.clear()
  }
}
