import { ScrollView, TextInput, StyleSheet, View, Text } from "react-native";
import BelowStatusBarView from '../components/BelowStatusBarView'
import { FontAwesome } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from "react";
import GreenButton from "../components/GreenButton";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function CreateAccountScreen(props) {
    // drop down picker
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' }
    ]);

    function handleGoBackButton() {
        props.navigation.goBack()
    }
    return (
        <BelowStatusBarView >
            <View style={styles.mainContainer}>
                <AntDesign name="left" size={35} color="#ffff" onPress={handleGoBackButton} style={styles.goBackBtn} />
                <FontAwesome name="user-circle-o" size={50} color="black" style={styles.icon} />
                <Text style={styles.titleText}>create an account</Text>
                <View style={styles.inputTextContainer}>
                    <Text style={styles.selectAccountText}>Select account type:</Text>
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
                    />
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <TextInput style={styles.inputText} placeholder="First Name" />
                        <TextInput style={styles.inputText} placeholder="Last Name" />
                        <TextInput style={styles.inputText} placeholder="Email" />
                        <TextInput style={styles.inputText} placeholder="City" />
                        <TextInput style={styles.inputText} placeholder="Country" />
                        <TextInput style={styles.inputText} placeholder="Password" />
                        <TextInput style={styles.inputText} placeholder="Confirm password" />
                        <GreenButton btnTitle="create account" width={250} marginV={5} />
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
        marginBottom: 15
    },
    selectAccountText: {
        marginHorizontal: 10,
        fontSize: 16
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