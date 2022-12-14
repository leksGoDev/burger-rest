import { memo, useMemo, useCallback, useEffect } from "react";
import type { FC, SyntheticEvent } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './burger-constructor.module.css';
import { useAppSelector, useAppDispatch } from "../../hooks";
import BurgerConstructorList from "./burger-constructor-list/burger-constructor-list";
import CostCounter from "../cost-counter/cost-counter";
import { makeOrder } from "../../services/store/slices/api/order-details-api";
import { checkAuth } from "../../services/store/slices/api/auth-api";

const BurgerConstructor: FC = memo(() => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { bun, stuffing, user } = useAppSelector(store => ({ ...store.burgerConstructor, ...store.authApi }));
    const { orderNumber, isLoading } = useAppSelector(store => store.orderDetailsApi);

    useEffect(() => {
        if (orderNumber && !isLoading) {
            history.push(
                `/orders/${orderNumber}`,
                { background: location }
            );
        }
    }, [orderNumber, isLoading]);

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

    return (
        <article className={styles.article}>
            <section className="mb-10 ml-4">
                <BurgerConstructorList bun={bun} stuffing={stuffing} />
            </section>

            <form className={`${styles.form} mr-4`}>
                <CostCounter large value={totalPrice} />

                <Button
                    extraClass="ml-10"
                    type="primary"
                    size="large"
                    htmlType="submit"
                    disabled={isLoading}
                    onClick={handleSubmitButton}
                >
                    Оформить заказ
                </Button>
            </form>
        </article>
    );
});

export default BurgerConstructor;