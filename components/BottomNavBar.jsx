import { Button, View, Text, StyleSheet, Pressable } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextManager"
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function BottomNavBar(props) {
    const { logout, authUser } = useContext(AuthContext)

    function HomeButtonPressHandler() {
        if (authUser.accountType === "seller") {
            props.navigation.navigate("SellerHome")
        } else if (authUser.accountType === "buyer") {
            props.navigation.navigate("SellerHome")
        }
    }

    return (
        <View style={styles.linkContainer}>
            <Pressable>
                <Ionicons style={styles.icon} name="notifications" size={25} color="black" />
                <Text>notifications</Text>
            </Pressable>
            <Pressable onPress={HomeButtonPressHandler}>
                <FontAwesome style={styles.icon} name="home" size={25} color="black" />
                <Text>Home</Text>
            </Pressable>
            <Pressable onPress={() => logout()}>
                <MaterialCommunityIcons style={styles.icon} name="logout" size={25} color="black" />
                <Text>logout</Text>
            </Pressable>
        </View>

    )
}

const styles = StyleSheet.create({
    linkContainer: {
        borderTopColor: "grey",
        borderTopWidth: 2,
        flexDirection: "row",
        backgroundColor: "#fff",
        justifyContent: "space-around",
        paddingVertical: 5
    },
    link: {
        flex: 1
    },
    icon: {
        textAlign: "center"
    }
})
