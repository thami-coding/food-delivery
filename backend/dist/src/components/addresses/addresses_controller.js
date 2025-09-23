"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressController = void 0;
const base_controller_1 = require("../../utils/base_controller");
const addresses_service_1 = require("./addresses_service");
class AddressController extends base_controller_1.BaseController {
    async addHandler(req, res) {
        const addressRepo = new addresses_service_1.AddressesService();
        const created = await addressRepo.create(req.body);
        res.status(200).json({ status: "success", created });
    }
    getAllHandler(req, res) {
        throw new Error("Method not implemented.");
    }
    async getOneHandler(req, res) {
        const addressRepo = new addresses_service_1.AddressesService();
        const id = req.params.id;
        const address = await addressRepo.findOne(id);
        res.status(200).json({ status: "success", address });
    }
    async updateHandler(req, res) {
        const addressRepo = new addresses_service_1.AddressesService();
        const id = req.params.id;
        const created = await addressRepo.update(id, req.body);
        res.status(201).json({ status: "success", created });
    }
    async deleteHandler(req, res) {
        const addressRepo = new addresses_service_1.AddressesService();
        const id = req.params.id;
        await addressRepo.delete(id);
        res.status(204).json({ status: "success", message: "Address deleted" });
    }
}
exports.AddressController = AddressController;
