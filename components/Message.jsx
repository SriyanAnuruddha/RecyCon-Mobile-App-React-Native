import { View, StyleSheet, Text } from "react-native";

export default function Message(props) {
    const styles = StyleSheet.create({
        messageBox: {
            padding: 8,
            backgroundColor: props.isReceiver ? "#fff" : "#0096FF",
            alignSelf: props.isReceiver ? "flex-end" : "flex-start",
            margin: 10,
            borderRadius: 5,
        }
    });

    return (
        <View style={styles.messageBox}>
            <Text>{props.message}</Text>
        </View>
    );
}