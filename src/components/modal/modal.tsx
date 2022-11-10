import { useEffect, useState } from "react";
import type { FC, ReactNode } from 'react';
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import ModalOverlay from "./modal-overlay/modal-overlay";
import styles from "./modal.module.css";

interface Props {
    children: ReactNode;
    onClose: () => void;
}

enum ModalType {
    Ingredient= "ingredient",
    Order = "order"
}

const modalRoot = document.getElementById("modal");

const Modal: FC<Props> = ({ children, onClose }) => {
    const [type, setType] = useState<ModalType | null>(null);
    const { pathname } = useLocation();

    useEffect(() => {
        const close = (e: KeyboardEvent) => {
            if (e.code === "Escape"){
                onClose();
            }
        };
        window.addEventListener('keydown', close);

        return () => window.removeEventListener('keydown', close);
    },[onClose])

    useEffect(() => {
        if (pathname.includes(ModalType.Ingredient)) setType(ModalType.Ingredient);
        else if (pathname.includes(ModalType.Order)) setType(ModalType.Order)
    }, [pathname]);

    return (
        createPortal((
            <section>
                <ModalOverlay onClick={onClose} />

                <article
                    className={type == ModalType.Ingredient
                        ? styles.ingredientStyles
                        : styles.orderStyles}
                >
                    <button className={styles.button} onClick={onClose}>
                        <CloseIcon type="primary" />
                    </button>

                    {children}
                </article>
            </section>
        ), modalRoot!)
    );
};

export default Modal;