import {StyleSheet} from "react-native";

const mainColor = '#3949ab'

export const welcomeScreenStyles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingVertical: 20,
    },
    wrapper: {
        height: '100%',
    },
});

export const buttonStyles = StyleSheet.create({
    button: {
        fontSize: 18,
        backgroundColor: mainColor,
        marginVertical: 10
    },
})

export const inputStyles = StyleSheet.create({
    input: {
        padding: 10,
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: mainColor,
        marginVertical: 10
    },
})

export const lineStyles = StyleSheet.create({
    line: {
        height: 1,
        backgroundColor: mainColor,
        marginVertical: 5
    }
})
