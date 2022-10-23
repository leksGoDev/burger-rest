import * as React from 'react';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './burger-ingredients.module.css'
import { IngredientType, IngredientTypeName } from "../../models/ingredient";
import BurgerIngredientsSection from "./burger-ingredients-section/burger-ingredients-section";
import { DataContext, IDataContext } from "../../services/dataContext";

type SectionRef = React.MutableRefObject<HTMLElement>;

const BurgerIngredients: React.FC = () => {
    const [tabValue, setTabValue] = React.useState<IngredientType>(IngredientType.bun);
    const { data } = React.useContext<IDataContext>(DataContext);

    const bunsSectionRef = React.useRef() as SectionRef;
    const saucesSectionRef = React.useRef() as SectionRef;
    const mainSectionRef = React.useRef() as SectionRef;
    const sectionsRefs = React.useMemo(() => ({
        [IngredientType.bun]: bunsSectionRef,
        [IngredientType.sauce]: saucesSectionRef,
        [IngredientType.main]: mainSectionRef
    }), [bunsSectionRef, saucesSectionRef, mainSectionRef]);

    const buns = React.useMemo(() => data.filter(el => el.type === IngredientType.bun), [data]);
    const sauces = React.useMemo(() => data.filter(el => el.type === IngredientType.sauce), [data]);
    const main = React.useMemo(() => data.filter(el => el.type === IngredientType.main), [data]);

    const handleSwitchTab = React.useCallback((type: IngredientType) => {
        sectionsRefs[type].current?.scrollIntoView({ behavior: "smooth" });

        setTabValue(type);
    }, [sectionsRefs]);

    const handleScroll = React.useCallback((e:  React.UIEvent<HTMLElement, UIEvent>) => {
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
            <nav className="mt-10 mb-10">
                <p className="text text_type_main-large mb-5">Соберите бургер</p>

                <div className={styles.tabs}>
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
                </div>
            </nav>

            <section className={styles.content} onScroll={handleScroll}>
                <BurgerIngredientsSection ref={bunsSectionRef} type={IngredientType.bun} data={buns} />

                <BurgerIngredientsSection ref={saucesSectionRef} type={IngredientType.sauce} data={sauces} />

                <BurgerIngredientsSection ref={mainSectionRef} type={IngredientType.main} data={main} />
            </section>
        </article>
    );
};

export default BurgerIngredients;