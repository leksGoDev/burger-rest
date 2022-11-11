import { useMemo, useCallback } from "react";
import type { FC, SyntheticEvent } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './burger-constructor.module.css'
import { useAppSelector, useAppDispatch } from "../../hooks";
import BurgerConstructorList from "./burger-constructor-list/burger-constructor-list";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import { closeDetails, makeOrder } from "../../services/store/slices/api/order-details-api";

const BurgerConstructor: FC = () => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { bun, stuffing, data, user } = useAppSelector(store => ({
        ...store.burgerConstructor,
        ...store.orderDetailsApi,
        ...store.authApi
    }));

    const totalPrice = useMemo(() => {
        let sum = (bun?.price ?? 0) * 2;
        sum += stuffing.reduce((sum, el) => sum + el.price, 0);

        return sum;
    }, [bun, stuffing]);

    const handleSubmitButton = useCallback(
        (e: SyntheticEvent) => {
            e.preventDefault();

            if (user) {
                if (bun && !!stuffing.length) {
                    dispatch(
                        makeOrder([bun._id, ...stuffing.map(({ _id }) => _id), bun._id])
                    );
                }
            } else {
                history.push("/login", { from: location });
            }
        }, [dispatch, bun, stuffing, history, location, user]
    );

    const handleCloseDetails = useCallback(
        () => dispatch(closeDetails())
    , [dispatch]);

    return (
        <article className={styles.article}>
            <section className="mt-25 mb-10 ml-4">
                <BurgerConstructorList bun={bun} stuffing={stuffing} />
            </section>

            <section className="mr-4">
                <form className={styles.form}>
                    <p className="text text_type_digits-medium mr-2">
                        {totalPrice}
                    </p>

                    <span className={`${styles.svgWrap} mr-10`}>
                            <CurrencyIcon type="primary" />
                        </span>

                    <Button
                        type="primary"
                        size="large"
                        htmlType="submit"
                        onClick={handleSubmitButton}
                    >
                        Оформить заказ
                    </Button>
                </form>
            </section>

            {data &&
                <Modal onClose={handleCloseDetails}>
                    <OrderDetails />
                </Modal>}
        </article>
    );
};

export default BurgerConstructor;