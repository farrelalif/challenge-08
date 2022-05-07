import React, { useEffect, useState } from 'react';
import './reset.scss';
import './App.scss';

function App() {
    const [loading, setLoading] = useState(true);
    const [todo, setTodo] = useState('');
    const [list, setList] = useState();

    useEffect(() => {
        const item = sessionStorage.getItem('todolist');
        setList(JSON.parse(item));
        setLoading(false);
    }, [list]);

    // Function Get Todo List
    const getTodoList = () => {
        if (!list) return null;
        return list.map((value, index) => {
            return (
                <div key={index} className={'list-container'}>
                    <p className={'list-paragraph'}>
                        {value}
                    </p>
                    <button onClick={() => deleteTodoList(index)}>
                        {'Delete'}
                    </button>
                </div>
            );
        });
    };

    // Function Tambah Todo List
    const createTodoList = (params) => {
        if (!list) {
            sessionStorage.setItem('todolist', JSON.stringify([params]));
            return setList([params])
        }
        list.push(params);
        sessionStorage.setItem('todolist', JSON.stringify(list));
        return setList(list);
    };

    // Function Update Todo List
    const updateTodoList = (index, value) => {
        list.splice(index, 1, value);
        sessionStorage.setItem('todolist', JSON.stringify(list));
        return setList(list);
    };

    // Function Delete Todo List
    const deleteTodoList = (index) => {
        list.splice(index, 1);
        sessionStorage.setItem('todolist', JSON.stringify(list));
        return setList(list);
    };

    if (loading) return <p>Loading</p>;

    return (
        <div className={'root'}>
            <form onSubmit={() => createTodoList(todo)} >
                <input onChange={(e) => setTodo(e.target.value)} />
                <button type='submit'>
                    {'Add'}
                </button>
            </form>
            {getTodoList()}
        </div>
    );
};

export default App;
