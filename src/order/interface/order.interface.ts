import { Customer } from "@prisma/client";
import { Request } from "express";

export interface User {
    id: number,
    email: string,
    password: string,
    point: number,
    type: string,
}

export interface RequestWithUser extends Request{
    user: User,
}

export interface RequestWithCustomer extends Request {
    user: Customer
}