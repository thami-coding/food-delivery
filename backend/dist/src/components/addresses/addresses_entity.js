"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Addresses = void 0;
const typeorm_1 = require("typeorm");
const users_entity_1 = require("../users/users_entity");
let Addresses = class Addresses {
    addressId;
    street;
    city;
    province;
    zip_code;
    userId;
    created_at;
    updated_at;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Addresses.prototype, "addressId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, length: 60 }),
    __metadata("design:type", String)
], Addresses.prototype, "street", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, length: 30 }),
    __metadata("design:type", String)
], Addresses.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, length: 60 }),
    __metadata("design:type", String)
], Addresses.prototype, "province", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, length: 4 }),
    __metadata("design:type", String)
], Addresses.prototype, "zip_code", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => users_entity_1.Users, (users) => users.userId),
    (0, typeorm_1.JoinColumn)({ name: "userId" }),
    __metadata("design:type", String)
], Addresses.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Addresses.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Addresses.prototype, "updated_at", void 0);
Addresses = __decorate([
    (0, typeorm_1.Entity)()
], Addresses);
exports.Addresses = Addresses;
