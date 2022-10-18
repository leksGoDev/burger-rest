import { createContext } from 'react';
import { Ingredient } from "../models/ingredient";

export interface IDataContext {
    data: Ingredient[];
}

export const DataContext = createContext({} as IDataContext);