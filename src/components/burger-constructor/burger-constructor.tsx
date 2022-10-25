import * as React from 'react';
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './burger-constructor.module.css'
import { OrderResponse } from "../../models/api";
import { request } from "../../services/request";
import { useAppSelector } from "../../hooks/redux";
import BurgerConstructorList from "./burger-constructor-list/burger-constructor-list";
import Modal from "../modal/modal";
import OrderDetails from "../modal/content/order-details/order-details";

const BurgerConstructor: React.FC = () => {
    const { bun, ingredients } = useAppSelector(store => store.burgerConstructor);

    const [isLoading, setIsLoading] = React.useState(false);
    const [hasError, setHasError] = React.useState(false);
    const [isModalVisible, setModalVisible] = React.useState(false);
    const [orderNum, setOrderNum] = React.useState<number | null>(null);

    const totalPrice = React.useMemo(() => {
        let sum = (bun?.price ?? 0) * 2;
        sum += ingredients.reduce((sum, el) => sum + el.price, 0);

        return sum;
    }, [bun, ingredients]);

    React.useEffect(() => {
        if (orderNum) {
            setModalVisible(true);
        }
    }, [orderNum]);

    const handleSubmitButton = (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (bun && !!ingredients.length) {
            setIsLoading(true);
            const requestBody = {
                ingredients:  [bun._id, ...ingredients.map(({ _id }) => _id)]
            };
            request<OrderResponse>('orders', requestBody)
                .then(({ order, success }) => {
                    if (success) setOrderNum(order.number);
                    else setHasError(true);
                })
                .catch(err => {
                    console.log(err.message)
                    setHasError(true);
                })
                .finally(() => setIsLoading(false))
        }
    };

    return (
        <article className={styles.article}>
            <section className="mt-25 mb-10 ml-4">
                <BurgerConstructorList bun={bun} otherIngredients={ingredients} />
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

            {isModalVisible &&
                <Modal onClose={() => setModalVisible(false)}>
                    <OrderDetails orderNum={orderNum!} />
                </Modal>}
        </article>
    );
};

export default BurgerConstructor;