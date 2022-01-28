import React, { useReducer } from 'react';
import { Routes, Route } from 'react-router-dom';

import { CreditCardAdd, CreditCardList, CreditCardRegister } from './pages/index';

const initForm = {
    cardNumber: {
        first: '',
        second: '',
        third: '',
        forth: '',
    },
    expireDate: { yy: '', mm: '' },
    name: '',
    cvc: '',
    password: {
        first: '',
        second: '',
    },
    nickName: '',
};

const App = () => {
    const reducer = (state, action) => {
        return {
            ...state,
            ...action,
        };
    };

    const [state, dispatch] = useReducer(reducer, initForm);

    const pages = [
        {
            path: '/',
            component: <CreditCardAdd state={state} dispatch={dispatch} />,
        },
        {
            path: '/creditCardList',
            component: <CreditCardList state={state} dispatch={dispatch} initForm={initForm} />,
        },
        {
            path: '/creditCardRegister',
            component: <CreditCardRegister state={state} dispatch={dispatch} />,
        },
    ];

    return (
        <Routes>
            {pages.map((page) => (
                <Route key={page.path} path={page.path} element={page.component} />
            ))}
        </Routes>
    );
};

export default App;
