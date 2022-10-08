import * as React from 'react';

interface Props {
    children: React.ReactNode;
}

const ModalOverlay: React.FC<Props> = ({ children }) => {

    return (
        <section>
            {children}
        </section>
    );
};

export default ModalOverlay;