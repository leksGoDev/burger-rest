import * as React from 'react';
import ReactDOM from "react-dom";

import ModalOverlay from "./modal-overlay/modal-overlay";

interface Props {
    children?: React.ReactNode;
}

const Modal: React.FC<Props> = ({ children }) => {

    return (
        ReactDOM.createPortal((
            <ModalOverlay>
                <article>
                    <header>

                    </header>

                    <main>
                        {children}
                    </main>
                </article>
            </ModalOverlay>
        ), modalRoot!)
    );
};

const modalRoot = document.getElementById("modal");

export default Modal;