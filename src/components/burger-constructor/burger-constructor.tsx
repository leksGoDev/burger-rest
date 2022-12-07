import { useMemo, useCallback } from "react";
import type { FC, SyntheticEvent } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './burger-constructor.module.css';
import { useAppSelector, useAppDispatch } from "../../hooks";
import BurgerConstructorList from "./burger-constructor-list/burger-constructor-list";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import { closeDetails, makeOrder } from "../../services/store/slices/api/order-details-api";
import { checkAuth } from "../../services/store/slices/api/auth-api";

const BurgerConstructor: FC = () => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { bun, stuffing, user } = useAppSelector(store => ({ ...store.burgerConstructor, ...store.authApi }));
    const { data, isLoading } = useAppSelector(store => store.orderDetailsApi);

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
                    const ingredientsArr = [
                        bun._id,
                        ...stuffing.map(({ _id }) => _id),
                        bun._id
                    ];
                    dispatch(makeOrder({
                        ingredients: ingredientsArr
                    })).catch(() => {
                        dispatch(checkAuth())
                    });
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
            <section className="mb-10 ml-4">
                <BurgerConstructorList bun={bun} stuffing={stuffing} />
            </section>

            <form className={`${styles.form} mr-4`}>
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
                    disabled={isLoading}
                    onClick={handleSubmitButton}
                >
                    Оформить заказ
                </Button>
            </form>

            {data &&
                <Modal onClose={handleCloseDetails}>
                    <OrderDetails />
                </Modal>}
        </article>
    );
};

export default BurgerConstructor;