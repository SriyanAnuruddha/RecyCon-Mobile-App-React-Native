import { ScrollView, TextInput, StyleSheet, View, Text, Alert } from "react-native";
import BelowStatusBarView from '../components/BelowStatusBarView'
import { FontAwesome } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import { useContext, useEffect, useState } from "react";
import GreenButton from "../components/GreenButton";
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from "axios";
import { AuthContext } from "../context/AuthContextManager"


export default function CreateAccountScreen(props) {
    // drop down picker
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Item seller', value: 'seller' },
        { label: 'Item Buyer', value: 'buyer' }
    ]);

    const { login } = useContext(AuthContext)

    function handleGoBackButton() {
        props.navigation.goBack()
    }

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        accountType: '',
        city: '',
        country: '',
        password: '',
        confirmPassword: ''
    })

    useEffect(() => {
        // Use a flag to prevent state update when called from useEffect
        let isMounted = true;
        if (isMounted) {
            onChangeTextHandler('accountType', value);
        }
        return () => {
            isMounted = false;
        };
    }, [value]);


    function onChangeTextHandler(field, text) {
        setFormData(prevFormData => ({
            ...prevFormData,
            [field]: text
        }));
    }

    const showAlertMessage = (title, message) =>
        Alert.alert(title, message, [
            { text: 'OK' },
        ]);

    async function onSubmitHandler() {
        function checkAllValues(obj) {
            for (let key in obj) {
                if (!obj[key]) {

                    return key; // Returns false if any key has a falsy value (null, undefined, false, 0, "", etc.)
                }
            }
        }

        const missingField = checkAllValues(formData)

        if (missingField) {
            showAlertMessage(`${missingField.toLowerCase()} is missing!`)
        } else {

            if (formData.confirmPassword !== formData.password) {
                showAlertMessage("passwords don't match!")
            } else {
                try {
                    const response = await axios.post("http://10.0.2.2:3000/users/register", formData)
                    if (response.status == 200) {
                        const { user, token } = response.data
                        login(user, token)

                        showAlertMessage("You have successfully registered!", "")
                    }
                } catch (e) {
                    if (e.response && e.response.data) {
                        showAlertMessage("Error", e.response.data.error); // Show server error message
                    } else {
                        showAlertMessage("Error", "Failed to register. Please try again later.");
                    }
                }

            }
        }

    }



    return (
        <BelowStatusBarView >
            <View style={styles.mainContainer}>
                <AntDesign name="left" size={35} color="#ffff" onPress={handleGoBackButton} style={styles.goBackBtn} />
                <FontAwesome name="user-circle-o" size={50} color="black" style={styles.icon} />
                <Text style={styles.titleText}>create an account</Text>
                <View style={styles.inputTextContainer}>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        style={styles.dropDown}
                        dropDownContainerStyle={styles.dropDownContainer}
                        textStyle={styles.dropDownText}
                        placeholder="Select account type"
                    />
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <TextInput style={styles.inputText} placeholder="First Name" onChangeText={(text) => onChangeTextHandler("firstName", text)} />
                        <TextInput style={styles.inputText} placeholder="Last Name" onChangeText={(text) => onChangeTextHandler("lastName", text)} />
                        <TextInput style={styles.inputText} placeholder="Email" onChangeText={(text) => onChangeTextHandler("email", text)} />
                        <TextInput style={styles.inputText} placeholder="City" onChangeText={(text) => onChangeTextHandler("city", text)} />
                        <TextInput style={styles.inputText} placeholder="Country" onChangeText={(text) => onChangeTextHandler("country", text)} />
                        <TextInput style={styles.inputText} placeholder="Password" onChangeText={(text) => onChangeTextHandler("password", text)} />
                        <TextInput style={styles.inputText} placeholder="Confirm password" onChangeText={(text) => onChangeTextHandler("confirmPassword", text)} />
                        <GreenButton btnTitle="create account" width={250} marginV={15} onPressFunction={onSubmitHandler} />
                    </ScrollView>

                </View>
            </View>
        </BelowStatusBarView>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: "center",
        backgroundColor: '#009E60',
        maxHeight: "100%"
    },
    goBackBtn: {
        marginTop: 10,
        marginLeft: 25,
        marginRight: "auto"
    },
    icon: {
        textAlign: "center"
    },
    titleText: {
        fontSize: 23,
        marginVertical: 10
    }, inputText: {
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
        backgroundColor: "#ffff",
        borderRadius: 10,
        padding: 20,
        marginBottom: 20
    },
    dropDown: {
        maxWidth: 250,
        margin: 10,
        borderColor: "#008000",
    },
    dropDownContainer: {
        margin: 10,
        maxWidth: 250, // Set the maximum height of the drop-down container
    },
    dropDownText: {
        fontSize: 18
    },
    scrollContainer: {
        alignItems: "center"
    }
})