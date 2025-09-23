import { Request, Response } from "express";
import { BaseController } from "../../utils/base_controller";
import { AddressesService } from "./addresses_service";

export class AddressController extends BaseController {
  public async addHandler(req: Request, res: Response): Promise<void> {
    const addressRepo = new AddressesService();
    const created = await addressRepo.create(req.body);
    res.status(200).json({ status: "success", created });
  }

  public getAllHandler(req: Request, res: Response): void {
    throw new Error("Method not implemented.");
  }

  public async getOneHandler(req: Request, res: Response): Promise<void> {
    const addressRepo = new AddressesService();
    const id = req.params.id;
    const address = await addressRepo.findOne(id);
    res.status(200).json({ status: "success", address });
  }

  public async updateHandler(req: Request, res: Response): Promise<void> {
    const addressRepo = new AddressesService();
    const id = req.params.id;
    const created = await addressRepo.update(id, req.body);
    res.status(201).json({ status: "success", created });
  }
  
  public async deleteHandler(req: Request, res: Response): Promise<void> {
    const addressRepo = new AddressesService();
    const id = req.params.id;
    await addressRepo.delete(id);
    res.status(204).json({ status: "success", message: "Address deleted" });
  }
}
