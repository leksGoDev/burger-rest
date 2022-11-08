import * as React from 'react';
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './burger-constructor.module.css'
import { useAppSelector, useAppDispatch } from "../../hooks";
import BurgerConstructorList from "./burger-constructor-list/burger-constructor-list";
import Modal from "../modal/modal";
import OrderDetails from "../modal/content/order-details/order-details";
import { closeDetails, makeOrder } from "../../services/store/slices/api/order-details-api";

const BurgerConstructor: React.FC = () => {
    const dispatch = useAppDispatch();
    const { bun, stuffing, data } = useAppSelector(
        store => ({ ...store.burgerConstructor, ...store.orderDetailsApi })
    );

    const totalPrice = React.useMemo(() => {
        let sum = (bun?.price ?? 0) * 2;
        sum += stuffing.reduce((sum, el) => sum + el.price, 0);

        return sum;
    }, [bun, stuffing]);

    const handleSubmitButton = React.useCallback(
        (e: React.SyntheticEvent) => {
            e.preventDefault();

            if (bun && !!stuffing.length) {
                dispatch(
                    makeOrder([bun._id, ...stuffing.map(({ _id }) => _id), bun._id])
                );
            }
        }, [dispatch, bun, stuffing]
    );

    const handleCloseDetails = React.useCallback(
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