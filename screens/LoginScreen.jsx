import { TextInput, StyleSheet, View, Text } from "react-native";
import BelowStatusBarView from "../components/BelowStatusBarView";
import AntDesign from '@expo/vector-icons/AntDesign';
import GreenButton from "../components/GreenButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useContext } from "react";
import axios from 'axios'
import { AuthContext } from '../context/AuthContextManager'

export default function LoginScreen(props) {
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    const { login, authUser } = useContext(AuthContext)

    function handleGoBackButton() {
        props.navigation.goBack()
    }


    function onTextHandler(field, text) {
        setLoginData(prevLoginData => {
            return (
                {
                    ...prevLoginData,
                    [field]: text
                }
            )
        })
    }

    async function loginButtonHandler() {
        const response = await axios.post('http://10.0.2.2:3000/users/login', loginData)
        const user = response.data.user
        const token = response.data.JWT_Token
        if (user && token) {
            login(user, token) // set global login state
            console.log("login successfully!")
        }
    }


    return (
        <BelowStatusBarView>
            <View style={styles.container}>
                <AntDesign name="left" size={35} color="#ffff" onPress={handleGoBackButton} style={styles.goBackBtn} />
                <Text style={styles.loginText}>Login</Text>
                <View style={styles.inputTextContainer}>
                    <TextInput style={styles.inputText} placeholder="Email" onChangeText={(text) => onTextHandler('email', text)} />
                    <TextInput style={styles.inputText} placeholder="Password" secureTextEntry={true} onChangeText={(text) => onTextHandler('password', text)} />
                    <GreenButton btnTitle="Login" marginV={15} onPressFunction={loginButtonHandler} />
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
