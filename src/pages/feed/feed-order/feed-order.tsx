import { useEffect } from "react";
import type { FC } from 'react';

import styles from "./feed-order.module.css";
import FeedOrderDetails from "../../../components/feed/feed-order-details/feed-order-details";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { deleteOrderDetails } from "../../../services/store/slices/feed-order-details";

const FeedOrder: FC = () => {
    const { details } = useAppSelector(store => store.feedOrderDetails);
    const dispatch = useAppDispatch();

    useEffect(() => {
        return () => {
            if (details) {
                dispatch(deleteOrderDetails());
            }
        }
    }, [dispatch, details]);

    return (
        <main className={styles.content}>
            <FeedOrderDetails />
        </main>
    );
};

export default FeedOrder;
