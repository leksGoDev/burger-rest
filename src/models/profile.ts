export interface User {
    email: string;
    password: string;
    name: string;
}

export type UserInfo = Omit<User, "password">;