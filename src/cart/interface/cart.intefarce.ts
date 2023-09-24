import { Customer } from "@prisma/client";
import { Request } from "express";

export interface RequestWithCustomer extends Request {
    user: Customer
}