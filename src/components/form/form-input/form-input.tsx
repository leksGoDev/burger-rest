import type { FC } from 'react';
import { EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import { InputType } from "../../../constants/form";
import { IInputData } from "../../../models/form";

const FormInput: FC<IInputData> = ({ type , inputProps }) => {

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
