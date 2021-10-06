import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from "axios";

export const Todo = ({ todo, onRemove, onComplete }) => {
    const [todoStyle, setTodoStyle] = useState(true);

    useEffect(() => {
        setTodoStyle(todo.completed);
    }, [todo]);

    const onPressHandler = async (id, isCompleted) => {
        onComplete(id, isCompleted);
        setTodoStyle(todo.completed);
    };

    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => onPressHandler(todo._id, todo.completed)}
            onLongPress={() => onRemove(todo._id)}
        >
            <View style={todoStyle ? styles.complete : styles.todo}>
                <Text
                    style={todoStyle ? styles.completeText : styles.commonText}
                >
                    {todo.title}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    todo: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 5,
        marginBottom: 10,
    },
    complete: {
        backgroundColor: '#eee',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor: '#1bfc1b',
        borderRadius: 5,
        marginBottom: 10,
    },
    completeText: {
        color: '#aaa9a9',
        textDecorationLine: 'line-through',
        fontSize: 18,
    },
    commonText: {
        color: '#000',
        fontSize: 18,
    },
});
