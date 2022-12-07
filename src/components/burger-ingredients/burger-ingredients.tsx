import { useState, useRef, useMemo, useCallback } from "react";
import type { FC, UIEvent as ReactUIEvent } from 'react';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './burger-ingredients.module.css'
import { useAppSelector } from "../../hooks";
import { IngredientType, IngredientTypeName } from "../../models/ingredient";
import BurgerIngredientsSection from "./burger-ingredients-section/burger-ingredients-section";

const BurgerIngredients: FC = () => {
    const { data } = useAppSelector(store => store.ingredientsApi);

    const [tabValue, setTabValue] = useState<IngredientType>(IngredientType.bun);

    const parentRef = useRef<HTMLDivElement>(null);
    const bunsSectionRef = useRef<HTMLElement>(null);
    const saucesSectionRef = useRef<HTMLElement>(null);
    const mainSectionRef = useRef<HTMLElement>(null);
    const sectionsRefs = useMemo(() => ({
        [IngredientType.bun]: bunsSectionRef,
        [IngredientType.sauce]: saucesSectionRef,
        [IngredientType.main]: mainSectionRef
    }), [bunsSectionRef, saucesSectionRef, mainSectionRef]);

    const buns = useMemo(() => data.filter(el => el.type === IngredientType.bun), [data]);
    const sauces = useMemo(() => data.filter(el => el.type === IngredientType.sauce), [data]);
    const main = useMemo(() => data.filter(el => el.type === IngredientType.main), [data]);

    const handleSwitchTab = useCallback((type: IngredientType) => {
        const parent = parentRef.current;
        const section = sectionsRefs[type].current;
        const parentOffset = parent?.offsetTop ?? 0;
        const sectionOffset = section?.offsetTop ?? 0;
        const scrollY = Math.abs(parentOffset - sectionOffset);
        parent?.scroll({ top: scrollY, behavior: "smooth" })

        setTabValue(type);
    }, [sectionsRefs]);

    const handleScroll = useCallback((e: ReactUIEvent<HTMLElement, UIEvent>) => {
        let offset = 0;
        if (e.target instanceof HTMLElement) {
            offset = e.target.offsetTop;
        }
        const positions = Object.values(sectionsRefs).map(value => Math.abs((value.current?.getBoundingClientRect().top ?? 0) - offset));
        const index = positions.indexOf(Math.min(...positions));
        setTabValue(Object.keys(sectionsRefs)[index] as IngredientType);
    }, [sectionsRefs]);

    return (
        <article className={styles.article}>
            <nav className={`${styles.tabs} mb-10`}>
                <Tab
                    value={IngredientTypeName[IngredientType.bun]}
                    active={tabValue === IngredientType.bun}
                    onClick={handleSwitchTab.bind(null, IngredientType.bun)}
                >
                    {IngredientTypeName[IngredientType.bun]}
                </Tab>
                <Tab
                    value={IngredientTypeName[IngredientType.sauce]}
                    active={tabValue === IngredientType.sauce}
                    onClick={handleSwitchTab.bind(null, IngredientType.sauce)}
                >
                    {IngredientTypeName[IngredientType.sauce]}
                </Tab>
                <Tab
                    value={IngredientTypeName[IngredientType.main]}
                    active={tabValue === IngredientType.main}
                    onClick={handleSwitchTab.bind(null, IngredientType.main)}
                >
                    {IngredientTypeName[IngredientType.main]}
                </Tab>
            </nav>

            <div ref={parentRef} className={styles.content} onScroll={handleScroll}>
                <BurgerIngredientsSection ref={bunsSectionRef} type={IngredientType.bun} data={buns} />

                <BurgerIngredientsSection ref={saucesSectionRef} type={IngredientType.sauce} data={sauces} />

                <BurgerIngredientsSection ref={mainSectionRef} type={IngredientType.main} data={main} />
            </div>
        </article>
    );
};

export default BurgerIngredients;