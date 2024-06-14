import { StatusBar, StyleSheet, View } from "react-native";

export default function BelowStatusBarView({ children }) {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#ffff',
    },
});
