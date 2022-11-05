import type { FC } from 'react';
import { EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import { IInputData, InputType } from "../../../../models/auth-form";

interface Props extends IInputData {}

const FormInput: FC<Props> = ({ type , inputProps }) => {

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