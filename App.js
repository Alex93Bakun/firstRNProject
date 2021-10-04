import React, {useState} from "react";
import {FlatList, StyleSheet, View} from "react-native";
import {StatusBar} from "expo-status-bar";

import {Navbar} from "./src/Navbar";
import {Add} from "./src/Add";
import {Todo} from "./src/Todo";

export default function App() {
    const [todos, setTodos] = useState([]);

    const addTodo = (title) => {
        setTodos((prev) => [
            ...prev,
            {
                id: Date.now().toString(),
                title,
            },
        ]);
    };

    const remove = (id) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    return (
        <View style={styles.wrapper}>
            <Navbar title="Список покупок"/>
            <View style={styles.container}>
                <Add onSubmit={addTodo}/>
                <FlatList
                    data={todos}
                    renderItem={({item}) => <Todo todo={item} onRemove={remove} />}
                    keyExtractor={(item) => item.id}
                />
            </View>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingVertical: 20,
    },
    wrapper: {
        height: '100%'
    }
});
