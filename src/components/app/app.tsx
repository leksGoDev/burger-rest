import * as React from 'react';

import styles from './app.module.css'
import AppHeader  from "../app-header/app-header";

const App = () => {

    return (
        <section className={styles.content}>
            <AppHeader />
        </section>
    );
};

export default App;