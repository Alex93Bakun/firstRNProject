import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Badge } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';

import { Navbar } from './src/Navbar';
import { Add } from './src/Add';
import { Todo } from './src/Todo';
import axios from 'axios';

export default function App() {
    const [todoLists, setTodoLists] = useState([]);
    const [todos, setTodos] = useState([]);

    const addTodo = async (title) => {
        setTodos((prev) => [
            ...prev,
            {
                id: Date.now().toString(),
                title,
                completed: false,
            },
        ]);

        try {
            const { data } = await axios.get('/api/todos/');
            console.log('data', data);
        } catch (e) {
            return e.response && e.response.data.message
                ? e.response.data.message
                : e.message;
        }
    };

    const remove = (id) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    const complete = (id) => {
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
                        />
                    )}
                    keyExtractor={(item) => item.id}
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
