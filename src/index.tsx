import { StrictMode }from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';

import './index.css';
import { store } from "./services/store";
import App from './components/app/app';

const root = createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </StrictMode>
    </BrowserRouter>
);
