import { Ingredient } from "./ingredient";
import { Order } from "./order";
import { User, UserInfo } from "./profile";

export interface Response {
    success: boolean;
}

export interface IngredientsResponse extends Response {
    data: Ingredient[];
}

export interface OrderBodyData {
    ingredients: Ingredient["_id"][];
}

export interface OrderResponse extends Order, Response {}

export interface CheckEmailBodyData {
    email: User["email"];
}

export interface PassResetBodyData {
    password: User["password"];
    token: string;
}

export interface PassResetResponse extends Response {
    message: string;
}

export type LoginBodyData = Omit<User, "name">;

export interface RefreshBodyData {
    token: string;
}

export interface AuthResponse extends Response {
    accessToken: string;
    refreshToken: string;
}

export interface AuthResponseWithUser extends AuthResponse {
    user: UserInfo;
}

export interface UserResponse extends Response {
    user: UserInfo;
}