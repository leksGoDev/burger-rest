export interface IUser {
    email: string;
    password: string;
    name: string;
}

export type TUserInfo = Omit<IUser, "password">;