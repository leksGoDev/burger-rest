import type { FC } from 'react';
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./form-link-row.module.css";

interface Props {
    paragraphText: string;
    buttonText: string;
}

const FormLinkRow: FC<Props> = ({ paragraphText, buttonText }) => {

    return (
        <div className={styles.linkWrap}>
            <p className="text text_type_main-default text_color_inactive">
                {paragraphText}
            </p>

            <Button
                type="secondary"
                htmlType="button"
                extraClass={styles.link}
            >
                {buttonText}
            </Button>
        </div>
    );
};

export default FormLinkRow;