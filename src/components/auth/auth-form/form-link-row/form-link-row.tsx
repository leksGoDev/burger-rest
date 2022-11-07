import type { FC } from 'react';
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./form-link-row.module.css";
import { ILinkRowData } from "../../../../models/auth-form";

interface Props extends ILinkRowData {}

const FormLinkRow: FC<Props> = ({ paragraphText, buttonText, onClick }) => {

    return (
        <article className={styles.linkWrap}>
            <p className="text text_type_main-default text_color_inactive">
                {paragraphText}
            </p>

            <Button
                type="secondary"
                htmlType="button"
                extraClass={styles.link}
                onClick={onClick}
            >
                {buttonText}
            </Button>
        </article>
    );
};

export default FormLinkRow;