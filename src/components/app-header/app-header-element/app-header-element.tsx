import type { FC, ReactNode } from 'react';
import { Link } from "react-router-dom";
import styles from './app-header-element.module.css'

interface Props {
    icon: ReactNode;
    text: string;
    linkRoute: string;
    textInactive?: boolean;
}

const AppHeaderElement: FC<Props> = ({ icon, text, linkRoute, textInactive }) => {

    return (
        <article className="pt-4 pb-4 pr-5 pl-5">
            <Link to={linkRoute} className={styles.placement}>
                {icon}
                <p className={`text text_type_main-default ${textInactive && "text_color_inactive"}`}>
                    {text}
                </p>
            </Link>
        </article>
    );
};

export default AppHeaderElement;