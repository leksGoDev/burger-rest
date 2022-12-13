import { useMemo, useCallback } from "react";
import type { FC } from 'react';
import { Link, useLocation } from "react-router-dom";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./feed-order-list-card.module.css";
import { IFeedOrder } from "../../../../../models/order";
import { FeedOrderStatus, FeedOrderStatusView } from "../../../../../constants/order";
import IngredientIcon from "../../../ingredient-icon/ingredient-icon";
import CostCounter from "../../../../cost-counter/cost-counter";
import { useAppDispatch, usePrepareIngredientFullInfo } from "../../../../../hooks";
import { setOrderDetails } from "../../../../../services/store/slices/feed-order-details";

type TProps = Omit<IFeedOrder, "updatedAt">;

const FeedOrderListCard: FC<TProps> = ({ _id, status,  name, number, createdAt, ingredients  }) => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { ingredientsInfo, totalCost } = usePrepareIngredientFullInfo(ingredients);

    const ingredientsIcons = useMemo(
        () =>
            ingredientsInfo
                .slice(0, 6)
                .map((ingredient, index) =>
                    <span
                        key={index}
                        className={styles.iconWrap}
                        style={{ zIndex: ingredientsInfo.length - index }}
                    >
                        <IngredientIcon
                            src={ingredient?.image}
                            opacity={index === 5 ? .6 : 1}
                        />

                        {
                            index === 5 &&
                                <p className={`${styles.counter} text text_type_main-default`}>
                                    +{ingredientsInfo.length - 5}
                                </p>
                        }
                    </span>
            )
        , [ingredientsInfo]
    );

    const handleOpenDetails = useCallback(
        () => dispatch(
            setOrderDetails({ status, name, number, createdAt, totalCost, ingredients: ingredientsInfo })
        ),
        [status, name, number, createdAt, totalCost, ingredientsInfo, dispatch]
    );

    return (
        <li className={styles.wrap}>
            <Link to={{
                pathname: `/feed/${_id}`,
                state: { background: location }
            }}>
                <article className={styles.content} onClick={handleOpenDetails}>
                    <div className={styles.placement}>
                        <p className="text text_type_digits-default">
                            {`#${number}`}
                        </p>

                        <FormattedDate
                            className="text text_type_main-default text_color_inactive"
                            date={new Date(createdAt)}
                        />
                    </div>

                    <div>
                        <p className="text text_type_main-medium">
                            {name}
                        </p>

                        {
                            location.pathname.indexOf("profile") !== -1 &&
                                <p
                                    className="text text_type_main-default mt-2"
                                    style={{ color: status === FeedOrderStatus.done ? "#00CCCC" : "FFFFF" }}
                                >
                                    {FeedOrderStatusView[status]}
                                </p>
                        }
                    </div>

                    <div className={styles.placement}>
                        <article className={styles.iconsRow}>
                            {ingredientsIcons}
                        </article>

                        <CostCounter value={totalCost} />
                    </div>
                </article>
            </Link>
        </li>
    );
};

export default FeedOrderListCard;
