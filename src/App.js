import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    useEffect(() => {
        const initialState = ['Nyapu Lantai', 'Coding Challenge', 'Bersih-bersih'];
        sessionStorage.setItem('todolist', JSON.parse(initialState));
    },[]);
    return (
        <div className="App">
            <ul>
                <li>
                    todo list 1
                </li>
                <li>
                    todo list 2
                </li>
                <li>
                    todo list 3
                </li>
            </ul>
        </div>
    );
};

export default App;
