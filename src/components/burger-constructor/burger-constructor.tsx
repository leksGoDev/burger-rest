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
import { clearConstructor } from "../../services/store/slices/constructor";

const BurgerConstructor: FC = memo(() => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { bun, stuffing, user } = useAppSelector(store => ({ ...store.burgerConstructor, ...store.authApi }));
    const { orderNumber, isLoading, hasDeallocated } = useAppSelector(store => store.orderDetailsApi);

    useEffect(() => {
        if (orderNumber && !isLoading && !hasDeallocated) {
            const url = `/orders/${orderNumber}`;
            if (history.location.pathname !== url) {
                history.push(url, { background: location });
                dispatch(clearConstructor());
            }
        }
    }, [orderNumber, isLoading, hasDeallocated, history, location, dispatch]);

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

                <div className="ml-10">
                    {
                        isLoading ?
                            <div className={styles.loaderWrap}>
                                <span className={styles.timerLoader} />

                                <p className="text text_type_main-default ml-2">Загрузка</p>
                            </div>
                            :
                            <Button
                                type="primary"
                                size="large"
                                htmlType="submit"
                                onClick={handleSubmitButton}
                            >
                                Оформить заказ
                            </Button>
                    }
                </div>

            </form>
        </article>
    );
});

export default BurgerConstructor;