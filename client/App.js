import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { Navbar } from './src/Navbar';
import { Add } from './src/Add';
import { Todo } from './src/Todo';
import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.0.170:5000/api';

export default function App() {
    const [todoLists, setTodoLists] = useState([]);
    const [todos, setTodos] = useState([]);
    const [fetch, setFetch] = useState(false);

    useEffect(() => {
        let clean = false;

        const fetchTodos = async () => {
            try {
                const { data } = await axios.get('/todos');

                setTodos(data);
            } catch (error) {
                console.log(
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message
                );
            }
        };

        fetchTodos();

        return () => {
            clean = true;
        };
    }, [fetch]);

    const addTodo = async (title) => {
        try {
            setFetch(true);
            const { data } = await axios.post('/todos', { title });

            if (data) {
                setTodos((prev) => [
                    ...prev,
                    {
                        id: Date.now().toString(),
                        title,
                        completed: false,
                    },
                ]);
            }
            setFetch(false);
        } catch (error) {
            console.log(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
        }
    };

    const remove = async (id) => {
        setFetch(true);
        await axios.delete(`/todos/${id}`);
        setFetch(false);
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    const complete = async (id, isCompleted) => {
        try {
            setFetch(true);
            const { data } = await axios.put(`/todos/${id}`, {
                completed: !isCompleted,
            });
            setFetch(false);
        } catch (error) {
            console.log(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
        }

        const switchComplete = todos.find((todo) => todo.id === id);
        todos.forEach((todo) => {
            if (todo.id === id) {
                todo.completed = !switchComplete.completed;
            }
        });
    };

    return (
        <View style={styles.wrapper}>
            <Navbar title="Список покупок" />
            <View style={styles.container}>
                <Add onSubmit={addTodo} />
                <FlatList
                    data={todos}
                    renderItem={({ item }) => (
                        <Todo
                            todo={item}
                            onRemove={remove}
                            onComplete={complete}
                            key={item.id}
                        />
                    )}
                    keyExtractor={(item, index) => {
                        return index.toString();
                    }}
                />
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingVertical: 20,
    },
    wrapper: {
        height: '100%',
    },
});
