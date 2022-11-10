import { Ingredient } from "./ingredient";
import { Order } from "./order";
import { User, UserInfo } from "./profile";

export interface Response {
    success: boolean;
}

export interface IngredientsResponse extends Response {
    data: Ingredient[];
}

export interface OrderResponse extends Order, Response {}

export interface PassResetResponse extends Response {
    message: string;
}

export interface LogoutResponse extends Response {
    message: string;
}

export interface TokenResponse extends Response {
    accessToken: string;
    refreshToken: string;
}

export interface AuthResponse extends TokenResponse {
    user: UserInfo;
}

export interface UserResponse extends Response {
    user: UserInfo;
}

export interface OrderBodyData {
    ingredients: Ingredient["_id"][];
}

export interface CheckEmailBodyData {
    email: User["email"];
}

export interface PassResetBodyData {
    password: User["password"];
    token: string;
}

export interface LogoutBodyData {
    token: string;
}

export interface RegisterBodyData extends User {}

export interface LoginBodyData extends Omit<User, "name"> {}

export interface TokenBodyData {
    token: string;
}