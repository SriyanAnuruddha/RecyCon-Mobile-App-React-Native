import { ScrollView, TextInput, StyleSheet, View, Text, Alert } from "react-native";
import BelowStatusBarView from '../components/BelowStatusBarView'
import { FontAwesome } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import { useContext, useEffect, useState } from "react";
import GreenButton from "../components/GreenButton";
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from "axios";
import { AuthContext } from "../context/AuthContextManager"
import { Picker } from '@react-native-picker/picker';
import CheckBox from 'react-native-check-box'
import * as Location from 'expo-location';

export default function CreateAccountScreen(props) {
    // drop down picker
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Item seller', value: 'seller' },
        { label: 'Item Buyer', value: 'buyer' }
    ]);
    const [isSelected, setSelection] = useState(false);

    const { login } = useContext(AuthContext)

    function handleGoBackButton() {
        props.navigation.goBack()
    }

    let [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        accountType: '',
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
        } else if (!isSelected) {
            showAlertMessage(`Please select share location`)
        } else {

            if (formData.confirmPassword !== formData.password) {
                showAlertMessage("passwords don't match!")
            } else {
                try {
                    let { status } = await Location.requestForegroundPermissionsAsync();
                    if (status !== 'granted') {
                        Alert.alert('Permission to access location was denied');
                        console.log('Permission to access location was denied');
                        return;
                    }

                    let location = await Location.getCurrentPositionAsync({});
                    if (!location) {
                        Alert.alert('Unable to obtain location');
                        return;
                    }

                    if (location) {
                        formData = {
                            ...formData, coords: {
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude
                            }
                        }
                    }

                    const response = await axios.post("http://10.0.2.2:3000/users/register", formData)
                    if (response.status === 200) {
                        const { user, JWT_Token } = response.data
                        if (user && JWT_Token) {
                            login(user, JWT_Token)
                            resetValues()
                            showAlertMessage("You have successfully registered!", "")
                        }
                    }
                } catch (e) {
                    if (e.response && e.response.data) {
                        showAlertMessage("Error", e.response.data.error); // Show server error message
                    } else {
                        console.error(e)
                        showAlertMessage("Error", "Failed to register. Please try again later.");
                    }
                }

            }
        }

    }

    function resetValues() {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            accountType: '',
            country: '',
            password: '',
            confirmPassword: ''
        })

        setValue(null)
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
                        <TextInput value={formData.firstName} style={styles.inputText} placeholder="First Name" onChangeText={(text) => onChangeTextHandler("firstName", text)} />
                        <TextInput value={formData.lastName} style={styles.inputText} placeholder="Last Name" onChangeText={(text) => onChangeTextHandler("lastName", text)} />
                        <TextInput value={formData.email} style={styles.inputText} placeholder="Email" onChangeText={(text) => onChangeTextHandler("email", text)} />
                        <View style={styles.textBox}>
                            <Text style={styles.fieldName}>Country</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={formData.country}
                                    onValueChange={(itemValue, itemIndex) =>
                                        onChangeTextHandler('country', itemValue)
                                    }>
                                    <Picker.Item label="---" value="---" />
                                    <Picker.Item label="Afghanistan" value="Afghanistan" />
                                    <Picker.Item label="Albania" value="Albania" />
                                    <Picker.Item label="Algeria" value="Algeria" />
                                    <Picker.Item label="Andorra" value="Andorra" />
                                    <Picker.Item label="Angola" value="Angola" />
                                    <Picker.Item label="Antigua and Barbuda" value="Antigua and Barbuda" />
                                    <Picker.Item label="Argentina" value="Argentina" />
                                    <Picker.Item label="Armenia" value="Armenia" />
                                    <Picker.Item label="Australia" value="Australia" />
                                    <Picker.Item label="Austria" value="Austria" />
                                    <Picker.Item label="Azerbaijan" value="Azerbaijan" />
                                    <Picker.Item label="Bahamas" value="Bahamas" />
                                    <Picker.Item label="Bahrain" value="Bahrain" />
                                    <Picker.Item label="Bangladesh" value="Bangladesh" />
                                    <Picker.Item label="Barbados" value="Barbados" />
                                    <Picker.Item label="Belarus" value="Belarus" />
                                    <Picker.Item label="Belgium" value="Belgium" />
                                    <Picker.Item label="Belize" value="Belize" />
                                    <Picker.Item label="Benin" value="Benin" />
                                    <Picker.Item label="Bhutan" value="Bhutan" />
                                    <Picker.Item label="Bolivia" value="Bolivia" />
                                    <Picker.Item label="Bosnia and Herzegovina" value="Bosnia and Herzegovina" />
                                    <Picker.Item label="Botswana" value="Botswana" />
                                    <Picker.Item label="Brazil" value="Brazil" />
                                    <Picker.Item label="Brunei" value="Brunei" />
                                    <Picker.Item label="Bulgaria" value="Bulgaria" />
                                    <Picker.Item label="Burkina Faso" value="Burkina Faso" />
                                    <Picker.Item label="Burundi" value="Burundi" />
                                    <Picker.Item label="Cabo Verde" value="Cabo Verde" />
                                    <Picker.Item label="Cambodia" value="Cambodia" />
                                    <Picker.Item label="Cameroon" value="Cameroon" />
                                    <Picker.Item label="Canada" value="Canada" />
                                    <Picker.Item label="Central African Republic" value="Central African Republic" />
                                    <Picker.Item label="Chad" value="Chad" />
                                    <Picker.Item label="Chile" value="Chile" />
                                    <Picker.Item label="China" value="China" />
                                    <Picker.Item label="Colombia" value="Colombia" />
                                    <Picker.Item label="Comoros" value="Comoros" />
                                    <Picker.Item label="Congo, Democratic Republic of the" value="Congo, Democratic Republic of the" />
                                    <Picker.Item label="Congo, Republic of the" value="Congo, Republic of the" />
                                    <Picker.Item label="Costa Rica" value="Costa Rica" />
                                    <Picker.Item label="Croatia" value="Croatia" />
                                    <Picker.Item label="Cuba" value="Cuba" />
                                    <Picker.Item label="Cyprus" value="Cyprus" />
                                    <Picker.Item label="Czech Republic" value="Czech Republic" />
                                    <Picker.Item label="Denmark" value="Denmark" />
                                    <Picker.Item label="Djibouti" value="Djibouti" />
                                    <Picker.Item label="Dominica" value="Dominica" />
                                    <Picker.Item label="Dominican Republic" value="Dominican Republic" />
                                    <Picker.Item label="East Timor" value="East Timor" />
                                    <Picker.Item label="Ecuador" value="Ecuador" />
                                    <Picker.Item label="Egypt" value="Egypt" />
                                    <Picker.Item label="El Salvador" value="El Salvador" />
                                    <Picker.Item label="Equatorial Guinea" value="Equatorial Guinea" />
                                    <Picker.Item label="Eritrea" value="Eritrea" />
                                    <Picker.Item label="Estonia" value="Estonia" />
                                    <Picker.Item label="Eswatini" value="Eswatini" />
                                    <Picker.Item label="Ethiopia" value="Ethiopia" />
                                    <Picker.Item label="Fiji" value="Fiji" />
                                    <Picker.Item label="Finland" value="Finland" />
                                    <Picker.Item label="France" value="France" />
                                    <Picker.Item label="Gabon" value="Gabon" />
                                    <Picker.Item label="Gambia" value="Gambia" />
                                    <Picker.Item label="Georgia" value="Georgia" />
                                    <Picker.Item label="Germany" value="Germany" />
                                    <Picker.Item label="Ghana" value="Ghana" />
                                    <Picker.Item label="Greece" value="Greece" />
                                    <Picker.Item label="Grenada" value="Grenada" />
                                    <Picker.Item label="Guatemala" value="Guatemala" />
                                    <Picker.Item label="Guinea" value="Guinea" />
                                    <Picker.Item label="Guinea-Bissau" value="Guinea-Bissau" />
                                    <Picker.Item label="Guyana" value="Guyana" />
                                    <Picker.Item label="Haiti" value="Haiti" />
                                    <Picker.Item label="Honduras" value="Honduras" />
                                    <Picker.Item label="Hungary" value="Hungary" />
                                    <Picker.Item label="Iceland" value="Iceland" />
                                    <Picker.Item label="India" value="India" />
                                    <Picker.Item label="Indonesia" value="Indonesia" />
                                    <Picker.Item label="Iran" value="Iran" />
                                    <Picker.Item label="Iraq" value="Iraq" />
                                    <Picker.Item label="Ireland" value="Ireland" />
                                    <Picker.Item label="Israel" value="Israel" />
                                    <Picker.Item label="Italy" value="Italy" />
                                    <Picker.Item label="Ivory Coast" value="Ivory Coast" />
                                    <Picker.Item label="Jamaica" value="Jamaica" />
                                    <Picker.Item label="Japan" value="Japan" />
                                    <Picker.Item label="Jordan" value="Jordan" />
                                    <Picker.Item label="Kazakhstan" value="Kazakhstan" />
                                    <Picker.Item label="Kenya" value="Kenya" />
                                    <Picker.Item label="Kiribati" value="Kiribati" />
                                    <Picker.Item label="Kuwait" value="Kuwait" />
                                    <Picker.Item label="Kyrgyzstan" value="Kyrgyzstan" />
                                    <Picker.Item label="Laos" value="Laos" />
                                    <Picker.Item label="Latvia" value="Latvia" />
                                    <Picker.Item label="Lebanon" value="Lebanon" />
                                    <Picker.Item label="Lesotho" value="Lesotho" />
                                    <Picker.Item label="Liberia" value="Liberia" />
                                    <Picker.Item label="Libya" value="Libya" />
                                    <Picker.Item label="Liechtenstein" value="Liechtenstein" />
                                    <Picker.Item label="Lithuania" value="Lithuania" />
                                    <Picker.Item label="Luxembourg" value="Luxembourg" />
                                    <Picker.Item label="Madagascar" value="Madagascar" />
                                    <Picker.Item label="Malawi" value="Malawi" />
                                    <Picker.Item label="Malaysia" value="Malaysia" />
                                    <Picker.Item label="Maldives" value="Maldives" />
                                    <Picker.Item label="Mali" value="Mali" />
                                    <Picker.Item label="Malta" value="Malta" />
                                    <Picker.Item label="Marshall Islands" value="Marshall Islands" />
                                    <Picker.Item label="Mauritania" value="Mauritania" />
                                    <Picker.Item label="Mauritius" value="Mauritius" />
                                    <Picker.Item label="Mexico" value="Mexico" />
                                    <Picker.Item label="Micronesia" value="Micronesia" />
                                    <Picker.Item label="Moldova" value="Moldova" />
                                    <Picker.Item label="Monaco" value="Monaco" />
                                    <Picker.Item label="Mongolia" value="Mongolia" />
                                    <Picker.Item label="Montenegro" value="Montenegro" />
                                    <Picker.Item label="Morocco" value="Morocco" />
                                    <Picker.Item label="Mozambique" value="Mozambique" />
                                    <Picker.Item label="Myanmar" value="Myanmar" />
                                    <Picker.Item label="Namibia" value="Namibia" />
                                    <Picker.Item label="Nauru" value="Nauru" />
                                    <Picker.Item label="Nepal" value="Nepal" />
                                    <Picker.Item label="Netherlands" value="Netherlands" />
                                    <Picker.Item label="New Zealand" value="New Zealand" />
                                    <Picker.Item label="Nicaragua" value="Nicaragua" />
                                    <Picker.Item label="Niger" value="Niger" />
                                    <Picker.Item label="Nigeria" value="Nigeria" />
                                    <Picker.Item label="North Korea" value="North Korea" />
                                    <Picker.Item label="North Macedonia" value="North Macedonia" />
                                    <Picker.Item label="Norway" value="Norway" />
                                    <Picker.Item label="Oman" value="Oman" />
                                    <Picker.Item label="Pakistan" value="Pakistan" />
                                    <Picker.Item label="Palau" value="Palau" />
                                    <Picker.Item label="Panama" value="Panama" />
                                    <Picker.Item label="Papua New Guinea" value="Papua New Guinea" />
                                    <Picker.Item label="Paraguay" value="Paraguay" />
                                    <Picker.Item label="Peru" value="Peru" />
                                    <Picker.Item label="Philippines" value="Philippines" />
                                    <Picker.Item label="Poland" value="Poland" />
                                    <Picker.Item label="Portugal" value="Portugal" />
                                    <Picker.Item label="Qatar" value="Qatar" />
                                    <Picker.Item label="Romania" value="Romania" />
                                    <Picker.Item label="Russia" value="Russia" />
                                    <Picker.Item label="Rwanda" value="Rwanda" />
                                    <Picker.Item label="Saint Kitts and Nevis" value="Saint Kitts and Nevis" />
                                    <Picker.Item label="Saint Lucia" value="Saint Lucia" />
                                    <Picker.Item label="Saint Vincent and the Grenadines" value="Saint Vincent and the Grenadines" />
                                    <Picker.Item label="Samoa" value="Samoa" />
                                    <Picker.Item label="San Marino" value="San Marino" />
                                    <Picker.Item label="Sao Tome and Principe" value="Sao Tome and Principe" />
                                    <Picker.Item label="Saudi Arabia" value="Saudi Arabia" />
                                    <Picker.Item label="Senegal" value="Senegal" />
                                    <Picker.Item label="Serbia" value="Serbia" />
                                    <Picker.Item label="Seychelles" value="Seychelles" />
                                    <Picker.Item label="Sierra Leone" value="Sierra Leone" />
                                    <Picker.Item label="Singapore" value="Singapore" />
                                    <Picker.Item label="Slovakia" value="Slovakia" />
                                    <Picker.Item label="Slovenia" value="Slovenia" />
                                    <Picker.Item label="Solomon Islands" value="Solomon Islands" />
                                    <Picker.Item label="Somalia" value="Somalia" />
                                    <Picker.Item label="South Africa" value="South Africa" />
                                    <Picker.Item label="South Korea" value="South Korea" />
                                    <Picker.Item label="South Sudan" value="South Sudan" />
                                    <Picker.Item label="Spain" value="Spain" />
                                    <Picker.Item label="Sri Lanka" value="Sri Lanka" />
                                    <Picker.Item label="Sudan" value="Sudan" />
                                    <Picker.Item label="Suriname" value="Suriname" />
                                    <Picker.Item label="Sweden" value="Sweden" />
                                    <Picker.Item label="Switzerland" value="Switzerland" />
                                    <Picker.Item label="Syria" value="Syria" />
                                    <Picker.Item label="Taiwan" value="Taiwan" />
                                    <Picker.Item label="Tajikistan" value="Tajikistan" />
                                    <Picker.Item label="Tanzania" value="Tanzania" />
                                    <Picker.Item label="Thailand" value="Thailand" />
                                    <Picker.Item label="Togo" value="Togo" />
                                    <Picker.Item label="Tonga" value="Tonga" />
                                    <Picker.Item label="Trinidad and Tobago" value="Trinidad and Tobago" />
                                    <Picker.Item label="Tunisia" value="Tunisia" />
                                    <Picker.Item label="Turkey" value="Turkey" />
                                    <Picker.Item label="Turkmenistan" value="Turkmenistan" />
                                    <Picker.Item label="Tuvalu" value="Tuvalu" />
                                    <Picker.Item label="Uganda" value="Uganda" />
                                    <Picker.Item label="Ukraine" value="Ukraine" />
                                    <Picker.Item label="United Arab Emirates" value="United Arab Emirates" />
                                    <Picker.Item label="United Kingdom" value="United Kingdom" />
                                    <Picker.Item label="United States" value="United States" />
                                    <Picker.Item label="Uruguay" value="Uruguay" />
                                    <Picker.Item label="Uzbekistan" value="Uzbekistan" />
                                    <Picker.Item label="Vanuatu" value="Vanuatu" />
                                    <Picker.Item label="Vatican City" value="Vatican City" />
                                    <Picker.Item label="Venezuela" value="Venezuela" />
                                    <Picker.Item label="Vietnam" value="Vietnam" />
                                    <Picker.Item label="Yemen" value="Yemen" />
                                    <Picker.Item label="Zambia" value="Zambia" />
                                    <Picker.Item label="Zimbabwe" value="Zimbabwe" />

                                </Picker>
                            </View>
                        </View>
                        <View style={styles.checkboxContainer}>
                            <CheckBox
                                value={isSelected}
                                onClick={() => setSelection(prev => !prev)}
                                style={styles.checkbox}
                                isChecked={isSelected}
                            />
                            <Text style={styles.label}>Share your current location</Text>
                        </View>
                        <TextInput value={formData.password} style={styles.inputText} placeholder="Password" onChangeText={(text) => onChangeTextHandler("password", text)} />
                        <TextInput value={formData.confirmPassword} style={styles.inputText} placeholder="Confirm password" onChangeText={(text) => onChangeTextHandler("confirmPassword", text)} />
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
    }, textInput: {
        fontSize: 18,
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 5
    }, pickerContainer: {
        width: 250,
        borderColor: "#008000",
        borderWidth: 1,
        borderRadius: 5
    }, checkboxContainer: {
        flexDirection: 'row',
        margin: 5,
    },
    checkbox: {
        alignSelf: "center"
    },
    label: {
        margin: 2,
        fontSize: 18
    },
})