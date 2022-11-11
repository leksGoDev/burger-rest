import type { FC } from 'react';
import { EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import { InputData, InputType } from "../../../models/form";

const FormInput: FC<InputData> = ({ type , inputProps }) => {

    return (
        <>
            {
                type === InputType.Email ?
                    <EmailInput {...inputProps} />
                    : type === InputType.Password ?
                        <PasswordInput {...inputProps} />
                            : <Input {...inputProps} />
            }
        </>
    );
};

export default FormInput;
