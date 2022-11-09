import { Ingredient } from "./ingredient";
import { Order } from "./order";
import { User } from "./profile";

export interface IngredientsResponse {
    data: Ingredient[];
    success: boolean;
}

export interface OrderBodyData {
    ingredients: Ingredient["_id"][];
}

export interface OrderResponse extends Order {
    success: boolean;
}

export interface CheckEmailBodyData {
    email: User["email"];
}

export interface PassResetBodyData {
    password: User["password"];
    token: string;
}

export interface PassResetResponse {
    success: boolean;
    message: string;
}

export type LoginBodyData = Omit<User, "name">;

export interface RefreshBodyData {
    token: string;
}

export interface AuthResponse {
    success: boolean;
    accessToken: string;
    refreshToken: string;
}

export interface AuthResponseWithUser extends AuthResponse {
    user: Omit<User, "password">;
}