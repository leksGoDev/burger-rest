import * as React from 'react';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './burger-constructor.module.css'
import meat02 from '../../images/meat-02.png';
import mineral from '../../images/mineral rings.png';
import sp1 from '../../images/sp 1.png';
import bun2 from '../../images/bun-02.png';
import sauce3 from '../../images/sauce-03.png';

const BurgerConstructor = () => {
    return (
        <article className={styles.article}>
            <section className={`${styles.listSection} mt-25 mb-10 ml-4`}>
                <ul className={styles.list}>
                    <li className={styles.listItem}>
                        <ConstructorElement
                            isLocked
                            type="top"
                            text="Краторная булка N-200i (верх)"
                            thumbnail={bun2}
                            price={20}
                        />
                    </li>

                    <li className={styles.listItem}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text="Соус традиционный галактический"
                            thumbnail={sauce3}
                            price={30}
                        />
                    </li>

                    <li className={styles.listItem}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text="Мясо бессмертных моллюсков Protostomia"
                            thumbnail={meat02}
                            price={300}
                        />
                    </li>

                    <li className={styles.listItem}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text="Плоды Фалленианского дерева"
                            thumbnail={sp1}
                            price={80}
                        />
                    </li>

                    <li className={styles.listItem}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text="Хрустящие минеральные кольца"
                            thumbnail={mineral}
                            price={80}
                        />
                    </li>

                    <li className={styles.listItem}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text="Хрустящие минеральные кольца"
                            thumbnail={mineral}
                            price={80}
                        />
                    </li>

                    <li className={styles.listItem}>
                        <ConstructorElement
                            isLocked
                            type="bottom"
                            text="Краторная булка N-200i (верх)"
                            thumbnail={bun2}
                            price={20}
                        />
                    </li>

                    <li className={styles.listItem}>
                        <ConstructorElement
                            isLocked
                            type="bottom"
                            text="Краторная булка N-200i (верх)"
                            thumbnail={bun2}
                            price={20}
                        />
                    </li>
                </ul>
            </section>

            <section className={`${styles.confirmSection} mr-4`}>
                <p className="text text_type_digits-medium mr-2">610</p>
                <span className={`${styles.svgWrap} mr-10`}>
                    <CurrencyIcon type="primary" />
                </span>
                <Button type="primary" size="large" htmlType="button">Оформить заказ</Button>
            </section>
        </article>
    );
};

export default BurgerConstructor;