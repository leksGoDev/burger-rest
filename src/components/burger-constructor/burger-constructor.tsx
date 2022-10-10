import * as React from 'react';
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './burger-constructor.module.css'
import { Ingredient, IngredientType } from "../../models/ingredient";
import BurgerConstructorList from "./burger-constructor-list/burger-constructor-list";
import Modal from "../modal/modal";
import OrderDetails from "../modal/content/order-details/order-details";

interface Props {
    data: Ingredient[];
}

const BurgerConstructor: React.FC<Props> = ({ data }) => {
    const [isModalVisible, setModalVisible] = React.useState(false);

    const bun = React.useMemo(() => data.filter(el => el.type == IngredientType.bun)[1], [data]);
    const ingredients = React.useMemo(() => data.filter(el => el.type != IngredientType.bun), [data]);

    const calculateTotalPrice = () => {
        let sum = bun.price * 2;
        sum += ingredients.reduce((sum, el) => sum + el.price, 0);

        return sum;
    };

    const handleSubmitButton = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setModalVisible(true);
    };

    return (
        <article className={styles.article}>
            <section className="mt-25 mb-10 ml-4">
                {data?.length && <BurgerConstructorList bun={bun} otherIngredients={ingredients} />}
            </section>

            <section className="mr-4">
                <form className={styles.form}>
                    <p className="text text_type_digits-medium mr-2">
                        {data?.length ? calculateTotalPrice() : 0}
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
                    <OrderDetails />
                </Modal>}
        </article>
    );
};

export default BurgerConstructor;