import { StyleSheet, Pressable, Text } from "react-native";

export default function GreenButton(props) {
    const styles = StyleSheet.create({
        button: {
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: props.paddingV ? props.paddingV : 10,
            paddingHorizontal: props.paddingH ? props.paddingH : 20,
            backgroundColor: "#008000",
            borderRadius: 6,
            width: "auto", // Ensure the button does not take full width
            maxWidth: 200, // Set a maximum width for the button
        },
        text: {
            color: "white",
            fontSize: props.fontSize ? props.fontSize : 20,
        },
    });

    return (
        <Pressable onPress={props.onPressFunction} style={styles.button}>
            <Text style={styles.text}>{props.btnTitle}</Text>
        </Pressable>
    );
}
