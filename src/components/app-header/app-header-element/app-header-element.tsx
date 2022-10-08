import * as React from 'react';

import styles from './app-header-element.module.css'

interface Props {
    icon: React.ReactNode;
    text: string;
    textInactive?: boolean;
}

const AppHeaderElement: React.FC<Props> = ({ icon, text, textInactive }) => {

    return (
        <div className="pt-4 pb-4 pr-5 pl-5">
            <a href="#" className={styles.placement}>
                {icon}
                <p className={`text text_type_main-default ${textInactive && "text_color_inactive"}`}>
                    {text}
                </p>
            </a>
        </div>
    );
};

export default AppHeaderElement;