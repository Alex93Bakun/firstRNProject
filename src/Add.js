import React, { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";

const Toast = ({ visible, message }) => {
  if (visible) {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
      25,
      50
    );
    return null;
  }
  return null;
};

export const Add = ({ onSubmit }) => {
  const [value, setValue] = useState("");
  const [visibleToast, setVisibleToast] = useState(false);

  useEffect(() => setVisibleToast(false), [visibleToast]);

  const pressHandler = () => {
    if (!value.trim()) {
      return setVisibleToast(true);
    }
    onSubmit(value);
    setValue("");
  };

  return (
    <View style={styles.block}>
      <Toast visible={visibleToast} message="Введіть назву, будь ласка." />
      <TextInput
        style={styles.input}
        onChangeText={setValue}
        value={value}
        placeholder="Введіть назву..."
      />
      <Button title="Додати" onPress={pressHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  input: {
    width: "70%",
    padding: 10,
    borderStyle: "solid",
    borderBottomWidth: 2,
    borderBottomColor: "#3949ab",
  },
});
