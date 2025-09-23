import { Router, Express } from "express";
import { UserRoutes } from "../components/users/users_routes";
import { PoductsRoutes } from "../components/products/products_routes";
import { CartRoutes } from "../components/cart/cart_routes";
import { AddressesRoutes } from "../components/addresses/addresses_routes";

export class Routes {
  public router: Router;

  constructor(app: Express) {
    const routeClasses = [
      UserRoutes,
      PoductsRoutes,
      CartRoutes,
      AddressesRoutes,
    ];

    for (const routeClass of routeClasses) {
      try {
        new routeClass(app);
        console.log(`Router : ${routeClass.name} - Connected`);
      } catch (error) {
        console.log(`Router : ${routeClass.name} - Connected`);
      }
    }
  }
}
