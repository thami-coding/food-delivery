"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const products_service_1 = require("./products_service");
const http_status_codes_1 = require("http-status-codes");
const dummy_data_1 = require("../../dummy-data");
class ProductsController {
    addHandler(req, res) {
        const { name, description, price, images, category } = req.body;
    }
    async getAllHandler(req, res) {
        try {
            const service = new products_service_1.ProductsService();
            const queryParams = {};
            const page = parseInt(req.query.page) || 1;
            const category = req.query.category || "all";
            queryParams.limit = parseInt(req.query.limit) || 10;
            queryParams.offset = (page - 1) * queryParams.limit;
            queryParams.category = category;
            const { total, data } = await service.findAll(queryParams);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                status: "success",
                products: data,
                page,
                totalProducts: total,
            });
        }
        catch (error) {
            console.log(error);
            res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ status: "error", message: "Failed to fetch all users" });
        }
    }
    getOneHandler(req, res) {
        throw new Error("Method not implemented.");
    }
    updateHandler(req, res) {
        throw new Error("Method not implemented.");
    }
    async seedHandler(req, res) {
        const service = new products_service_1.ProductsService();
        try {
            for (const product of dummy_data_1.products) {
                const result = await service.create(product);
            }
            res
                .status(http_status_codes_1.StatusCodes.OK)
                .json({ status: "success", message: "Products successfully seeded" });
        }
        catch (error) {
            console.log(error.message);
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: "error",
                message: "Something went wrong while seeding database",
            });
        }
    }
    deleteHandler(req, res) {
        throw new Error("Method not implemented.");
    }
}
exports.ProductsController = ProductsController;
