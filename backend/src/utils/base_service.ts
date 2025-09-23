import { DeepPartial, FindOneOptions, Repository } from "typeorm";
import { QueryParams } from "./queryParamsType";

export type UpdateDataKeys<T> = keyof T & keyof DeepPartial<T>;

export class BaseService<T> {
  constructor(private readonly repository: Repository<T>) {}

  async create(entity: DeepPartial<T>) {
    const createdEntity = await this.repository.create(entity);
    const savedEntity = await this.repository.save(createdEntity);

    return savedEntity;
  }

  async customQuery(query: string): Promise<T[]> {
    try {
      const data = await this.repository
        .createQueryBuilder()
        .where(query)
        .getMany();
      return data;
    } catch (error) {
      console.error(`Error while executing custom query: ${query}`, error);
      return [];
    }
  }

  async findAll(queryParams: QueryParams) {
    const query = this.repository.createQueryBuilder();
    const { offset, limit } = queryParams;
    const allColumns = this.repository.metadata.columns.map(
      (column) => column.propertyName
    );
    if (Object.keys(queryParams).length > 0) {
      for (const field in queryParams) {
        if (allColumns.includes(field)) {
          const value = queryParams[field];
          if (value !== "all") {
            query.andWhere(`${field} = '${value}'`);
          }
        }
      }
    }
    const [data, total] = await query
      .skip(offset)
      .take(limit)
      .getManyAndCount();
    return { data, total };
  }
  async findOne(id: string) {
    try {
      const where = {};
      const primaryKey: string =
        this.repository.metadata.primaryColumns[0].databaseName;
      where[primaryKey] = id;

      const options: FindOneOptions<T> = { where };
      const data = await this.repository.findOne(options);

      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async update(id: string, updateData: DeepPartial<T>) {
    try {
      const exists = await this.findOne(id);
      if (!exists) {
        return null;
      }

      const where = {};
      const primaryKey: string =
        this.repository.metadata.primaryColumns[0].databaseName;
      where[primaryKey] = id;

      const validColumns = this.repository.metadata.columns.map(
        (column) => column.propertyName
      );

      const updateQuery: any = {};
      const keys = Object.keys(updateData) as UpdateDataKeys<T>[];

      for (const key of keys) {
        if (
          updateData.hasOwnProperty(key) &&
          validColumns.includes(key as string)
        ) {
          updateQuery[key] = updateData[key];
        }
      }

      const result = await this.repository
        .createQueryBuilder()
        .update()
        .set(updateQuery)
        .where(where)
        .returning("*")
        .execute();

      if (result.affected > 0) {
        return result.raw[0];
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  }

  async delete(id: string) {
    try {
      const exists = await this.findOne(id);
      if (!exists) {
        return false;
      }

      await this.repository.delete(id);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
