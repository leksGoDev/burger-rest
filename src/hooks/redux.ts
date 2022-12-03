import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";

import { TAppDispatch, TRootState } from "../services/store";

export const useAppDispatch = () => useDispatch<TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;