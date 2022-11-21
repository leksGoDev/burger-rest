import { IIngredient } from "./ingredient";
import { IOrder } from "./order";
import { IUser, TUserInfo } from "./profile";

export interface IResponse {
    success: boolean;
}

export interface IIngredientsResponse extends IResponse {
    data: IIngredient[];
}

export interface IOrderResponse extends IOrder, IResponse {}

export interface IPassResetResponse extends IResponse {
    message: string;
}

export interface ILogoutResponse extends IResponse {
    message: string;
}

export interface ITokenResponse extends IResponse {
    accessToken: string;
    refreshToken: string;
}

export interface IAuthResponse extends ITokenResponse {
    user: TUserInfo;
}

export interface IUserResponse extends IResponse {
    user: TUserInfo;
}

export interface IOrderBodyData {
    ingredients: IIngredient["_id"][];
}

export interface ICheckEmailBodyData {
    email: IUser["email"];
}

export interface IPassResetBodyData {
    password: IUser["password"];
    token: string;
}

export interface ILogoutBodyData {
    token: string;
}

export interface IRegisterBodyData extends IUser {}

export interface ILoginBodyData extends Omit<IUser, "name"> {}

export interface ITokenBodyData {
    token: string;
}