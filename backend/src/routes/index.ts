import { Router, Express } from "express";
import { UserRoutes } from "../components/users/user_routes";
import { PoductRoutes } from "../components/products/product_routes";
import { CartRoutes } from "../components/cart/cart_routes";
import { OrderRoutes } from "../components/orders/order_routes";

export class Routes {
  public router: Router;

  constructor(app: Express) {
    const routeClasses = [
      UserRoutes,
      PoductRoutes,
      CartRoutes,
      OrderRoutes,
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
