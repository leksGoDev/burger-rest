import { useCallback } from "react";
import type { FC, FormEvent } from 'react';
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./form.module.css";
import FormLinkRow from "./form-link-row/form-link-row";
import FormInput from "./form-input/form-input";
import { InputData, LinkRowData } from "../../models/form";

interface Props {
    title: string;
    buttonText: string;
    inputs: InputData[];
    linkRows: LinkRowData[];
    onSubmit: () => void;
}

const Form: FC<Props> = ({ title, buttonText, inputs, linkRows, onSubmit }) => {
    const handleSubmit = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            onSubmit();
        },
        [onSubmit]
    );

    return (
        <main className={styles.layout}>
            <article>
                <form
                    className={`${styles.form} mb-20`}
                    onSubmit={handleSubmit}
                >
                    <p className="text text_type_main-medium">
                        {title}
                    </p>

                    {inputs.map((data, index) =>
                        <FormInput key={index} {...data} />)}

                    <Button htmlType="submit">
                        {buttonText}
                    </Button>
                </form>
            </article>

            <aside className={styles.aside}>
                {linkRows.map((data, index) =>
                    <FormLinkRow key={index} {...data} />)}
            </aside>
        </main>
    );
};

export default Form;