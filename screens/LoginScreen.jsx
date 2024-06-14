import { TextInput, StyleSheet, View, Text } from "react-native";
import BelowStatusBarView from "../components/BelowStatusBarView";
import AntDesign from '@expo/vector-icons/AntDesign';
import GreenButton from "../components/GreenButton";

export default function LoginScreen(props) {

    function handleGoBackButton() {
        props.navigation.goBack()
    }

    return (
        <BelowStatusBarView>
            <View style={styles.container}>
                <AntDesign name="left" size={35} color="#ffff" onPress={handleGoBackButton} style={styles.goBackBtn} />
                <Text style={styles.loginText}>Login</Text>
                <View style={styles.inputTextContainer}>
                    <TextInput style={styles.inputText} placeholder="Email" />
                    <TextInput style={styles.inputText} placeholder="Password" secureTextEntry={true} />
                    <GreenButton btnTitle="Login" marginV={15} />
                </View>
            </View>
        </BelowStatusBarView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009E60',
        padding: 10,
    },
    loginText: {
        textAlign: "center",
        fontSize: 45,
        fontWeight: "600"
    },
    inputText: {
        fontSize: 18,
        borderWidth: 1,
        width: 250,
        margin: 10,
        padding: 3,
        borderColor: "#008000",
        borderRadius: 5
    },
    inputTextContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#ffff",
        maxHeight: "40%",
        marginHorizontal: 15,
        borderRadius: 10
    },
    goBackBtn: {
        marginTop: 10
    }
});
