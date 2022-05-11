import React, { useEffect, useState } from 'react';
import './reset.scss';
import './App.scss';

function App() {
    const [loading, setLoading] = useState(true);
    const [todo, setTodo] = useState('');
    const [todoUpdate, setTodoUpdate] = useState('');
    const [list, setList] = useState();
    const [update, setUpdate] = useState(false);
    const [updateIndex, setUpdateIndex] = useState(null);

    useEffect(() => {
        const item = sessionStorage.getItem('todolist');
        setList(JSON.parse(item));
        setLoading(false);
    }, [list]);

    const handleUpdate = (index, value) => {
        updateTodoList(index, value);
        setUpdate(null);
        setUpdate(false);
    };

    // Function Get Todo List
    const getTodoList = () => {
        if (!list) return null;
        return list.map((value, index) => {
            return (
                <div key={index} className={'list-container'}>
                    {(update && index === updateIndex)? (
                        <div className={'list-paragraph'}>
                            <input placeholder={value} onChange={(e) => setTodoUpdate(e.target.value)} />
                        </div>
                    ) : (
                        <p className={'list-paragraph'}>
                            {value}
                        </p>
                    )}
                    {(update && index === updateIndex) ? (
                        <button onClick={() => handleUpdate(index, todoUpdate)}>
                            {'Save'}
                        </button>
                    ) : (
                        <button onClick={() => {
                            setUpdateIndex(index);
                            setUpdate(true);
                        }}>
                            {'Update'}
                        </button>
                    )}
                    <button id='delete' onClick={() => deleteTodoList(index)}>
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
            <div className={'container'}>
                <h1>Todo List Kelompok 3</h1>
                <form id='newTask' onSubmit={() => createTodoList(todo)} >
                    <input id='taskInput' placeholder='Task to do ...' onChange={(e) => setTodo(e.target.value)} />
                    <button id='add' type='submit'>
                        {'Add'}
                    </button>
                </form>
                {getTodoList()}
            </div>
        </div>
    );
};

export default App;
