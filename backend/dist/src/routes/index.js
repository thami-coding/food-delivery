"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const users_routes_1 = require("../components/users/users_routes");
const products_routes_1 = require("../components/products/products_routes");
const cart_routes_1 = require("../components/cart/cart_routes");
const addresses_routes_1 = require("../components/addresses/addresses_routes");
class Routes {
    router;
    constructor(app) {
        const routeClasses = [
            users_routes_1.UserRoutes,
            products_routes_1.PoductsRoutes,
            cart_routes_1.CartRoutes,
            addresses_routes_1.AddressesRoutes,
        ];
        for (const routeClass of routeClasses) {
            try {
                new routeClass(app);
                console.log(`Router : ${routeClass.name} - Connected`);
            }
            catch (error) {
                console.log(`Router : ${routeClass.name} - Connected`);
            }
        }
    }
}
exports.Routes = Routes;
