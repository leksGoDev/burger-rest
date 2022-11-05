import type { FC } from 'react';
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./auth-form.module.css";
import FormLinkRow from "./form-link-row/form-link-row";
import { IInputData, ILinkRowData } from "../../../models/auth-form";
import FormInput from "./form-input/form-input";

interface Props {
    title: string;
    submitButton: {
        title: string;
        onClick: () => void;
    };
    inputs: IInputData[];
    linkRows: ILinkRowData[];
}

const AuthForm: FC<Props> = ({ title, submitButton, inputs, linkRows }) => {

    return (
        <main className={styles.layout}>
            <form className={`${styles.form} mb-20`}>
                <p className="text text_type_main-medium">
                    {title}
                </p>

                {inputs.map((data, index) =>
                    <FormInput key={index} {...data} />)}

                <Button
                    htmlType="submit"
                    onClick={submitButton.onClick}
                >
                    {submitButton.title}
                </Button>
            </form>

            <aside className={styles.aside}>
                {linkRows.map((data, index) =>
                    <FormLinkRow key={index} {...data} />)}
            </aside>
        </main>
    );
};

export default AuthForm;