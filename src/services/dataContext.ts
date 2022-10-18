import { createContext, Dispatch, SetStateAction } from 'react';
import { Ingredient } from "../models/ingredient";

export interface IDataContext {
    data: Ingredient[];
    setData: Dispatch<SetStateAction<Ingredient[]>>;
    orderNum: number | null;
    setOrderNum: Dispatch<SetStateAction<number | null>>;
}

export const DataContext = createContext({} as IDataContext);