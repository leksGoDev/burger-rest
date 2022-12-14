import { useEffect } from "react";
import type { FC } from 'react';

import styles from "./order.module.css";
import OrderDetails from "../../components/order-details/order-details";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { clearDetails } from "../../services/store/slices/api/order-details-api";

const Order:FC = () => {
    const { orderNumber } = useAppSelector(store => store.orderDetailsApi);
    const dispatch = useAppDispatch();

    useEffect(() => {
        return () => {
            if (orderNumber) {
                dispatch(clearDetails());
            }
        }
    }, [dispatch, orderNumber]);

    return (
        <main className={styles.content}>
            <OrderDetails />
        </main>
    );
};

export default Order;
