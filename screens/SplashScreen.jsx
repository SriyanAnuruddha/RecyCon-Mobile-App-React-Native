import { StyleSheet, View, Text, Image } from "react-native";
import GreenButton from "../components/GreenButton";
import RecyConLogo from "../assets/images/recycon.png";
import BelowStatusBarView from "../components/BelowStatusBarView";


export default function SplashScreen(props) {
    function handleSigninOnPress() {
        props.navigation.navigate('Login')
    }

    function handleCreateAccountOnPress() {
        props.navigation.navigate('CreateAccount')
    }

    return (
        <BelowStatusBarView>
            <View style={styles.backgroundView}>
                <Text style={styles.logoText}>RecyCon</Text>
                <Image style={styles.image} source={RecyConLogo} />
                <View style={styles.foregroundView}>
                    <Text style={styles.welcomeText}>Welcome</Text>
                    <Text style={styles.leadText}>Let's Revolutionize Recycling Together.</Text>

                    <View style={styles.buttonContainer}>
                        <GreenButton btnTitle="Sign in" paddingH={60} paddingV={6} onPressFunction={handleSigninOnPress} />
                        <Text onPress={handleCreateAccountOnPress} style={styles.createAccountText}>Create an account</Text>
                    </View>
                </View>
            </View>
        </BelowStatusBarView>
    );
}

const styles = StyleSheet.create({
    logoText: {
        marginTop: 100,
        fontSize: 60,
        textAlign: "center",
        fontWeight: "800",
        color: "white",
    },
    image: {
        height: 200,
        width: 400,
        alignSelf: "center",
    },
    backgroundView: {
        flex: 1,
        backgroundColor: "#009E60",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    foregroundView: {
        flex: 1,
        backgroundColor: "white",
        borderTopRightRadius: 28,
        borderTopLeftRadius: 28,
        width: "100%",
        alignItems: "center",
    },
    welcomeText: {
        marginTop: 25,
        fontSize: 55,
        textAlign: "center",
        fontWeight: "700",
        color: "#008000",
    },
    leadText: {
        marginTop: 10,
        textAlign: "center",
        fontSize: 13,
    },
    buttonContainer: {
        marginTop: 60,
        alignItems: "center",
    },
    createAccountText: {
        marginTop: 15,
        color: "#008000",
        fontSize: 20
    }
});
