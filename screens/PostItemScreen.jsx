import { View, Text, StyleSheet } from "react-native";
import BelowStatusBarView from "../components/BelowStatusBarView"
import BottomNavBar from "../components/BottomNavBar";
import AntDesign from '@expo/vector-icons/AntDesign';


export default function PostItemScreen(props) {
    return (
        <BelowStatusBarView>
            <View style={styles.mainContainer}>
                <View style={styles.formContainer}>
                    <View style={styles.headerContainer}>
                        <AntDesign name="left" size={35} color="black" style={styles.goBackBtn} />

                        <Text style={styles.postItemText}>Post New Item</Text>
                    </View>
                </View>
            </View>
            <BottomNavBar></BottomNavBar>
        </BelowStatusBarView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#009E60",
        padding: 25
    },
    formContainer: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginTop: 15
    },
    postItemText: {
        textAlign: "center",
        fontSize: 20,
        marginVertical: 5,
        fontWeight: "700"
    }, goBackBtn: {
        marginTop: 5,
        marginLeft: 5,
        position: 'absolute',
        left: 0,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    }
})