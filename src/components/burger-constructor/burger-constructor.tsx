import * as React from 'react';
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './burger-constructor.module.css'
import { Ingredient, IngredientType } from "../../models/ingredient";
import BurgerConstructorList from "./burger-constructor-list/burger-constructor-list";

interface Props {
    data: Ingredient[];
}

const BurgerConstructor: React.FC<Props> = ({ data }) => {
    const bun = data.filter(el => el.type == IngredientType.bun)[1]
    const ingredients = data.filter(el => el.type != IngredientType.bun);

    const calculateTotalPrice = () => {
        let sum = bun.price * 2;
        sum += ingredients.reduce((sum, el) => sum + el.price, 0);

        return sum;
    };

    return (
        <article className={styles.article}>
            <form>
                <section className="mt-25 mb-10 ml-4">
                    <BurgerConstructorList bun={bun} otherIngredients={ingredients} />
                </section>

                <section className={`${styles.confirmSection} mr-4`}>
                    <p className="text text_type_digits-medium mr-2">
                        {calculateTotalPrice()}
                    </p>
                    <span className={`${styles.svgWrap} mr-10`}>
                        <CurrencyIcon type="primary" />
                    </span>
                    <Button type="primary" size="large" htmlType="submit">Оформить заказ</Button>
                </section>
            </form>
        </article>
    );
};

export default BurgerConstructor;