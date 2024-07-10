import { View, Text, StyleSheet, Button, Image, TextInput, ScrollView } from "react-native";
import BelowStatusBarView from "../components/BelowStatusBarView"
import BottomNavBar from "../components/BottomNavBar";
import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { useContext, useState } from "react";
import GreenButton from "../components/GreenButton"
import { AuthContext } from "../context/AuthContextManager";
import axios from "axios";


export default function PostItemScreen(props) {
    const [image, setImage] = useState(null);
    const { authUser } = useContext(AuthContext)

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "Electronics",
        metric: "kg",
        quantity: 0,
        price: 0
    })

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    function goBackBtnhandler() {
        props.navigation.goBack()
    }

    function textChangeHandler(field, text) {
        setFormData(prevData => {
            return (
                { ...prevData, [field]: text }
            )
        })
    }

    const onSubmitHandler = async () => {
        const url = "http://10.0.2.2:3000/sellers/addItems";

        const form = new FormData();
        form.append('name', formData.name);
        form.append('description', formData.description);
        form.append('category', formData.category);
        form.append('metric', formData.metric);
        form.append('quantity', formData.quantity);
        form.append('price', formData.price);
        if (image) {
            const filename = image.split('/').pop();
            const match = /\.(\w+)$/.exec(filename);
            const type = match ? `image/${match[1]}` : `image`;
            form.append('file', { uri: image, name: filename, type });
        }

        try {
            const response = await axios.post(url, form, {
                headers: {
                    "Authorization": `Bearer ${authUser.token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                // set default values
                setFormData({
                    name: "",
                    description: "",
                    category: "Electronics",
                    metric: "Kilograms (kg)",
                    quantity: 0,
                    price: 0
                })
                console.log("item added successfully");
            }
        } catch (err) {
            console.error("Error response:", err.response.data);
        }
    };


    return (
        <BelowStatusBarView>
            <View style={styles.mainContainer}>
                <View style={styles.formContainer}>
                    <View style={styles.headerContainer}>
                        <AntDesign name="left" size={35} onPress={goBackBtnhandler} color="black" style={styles.goBackBtn} />
                        <Text style={styles.postItemText}>Post New Item</Text>
                    </View>
                    <View style={styles.imageContainer}>
                        {image && <Image source={{ uri: image }} style={styles.image} />}
                        <Button title="upload item image" onPress={pickImage} />
                    </View>
                    <View style={styles.textInputsContainer}>
                        <TextInput value={formData.name} style={styles.inputText} placeholder="item name" onChangeText={(text) => textChangeHandler('name', text)} />
                        <TextInput value={formData.description} multiline={true} numberOfLines={2} style={styles.inputText} placeholder="item description" onChangeText={(text) => textChangeHandler('description', text)} />
                        <View style={styles.fieldNameContainer}>
                            <Text style={styles.fieldName}>Select category</Text>
                        </View>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={formData.category}
                                onValueChange={(itemValue, itemIndex) =>
                                    textChangeHandler('category', itemValue)
                                }>
                                <Picker.Item label="Electronics" value="Electronics" />
                                <Picker.Item label="E-Waste" value="E-Waste" />
                                <Picker.Item label="Glass" value="Glass" />
                                <Picker.Item label="Hazardous Materials" value="Hazardous Materials" />
                                <Picker.Item label="Metals" value="Metals" />
                                <Picker.Item label="Miscellaneous" value="Miscellaneous" />
                                <Picker.Item label="Organic Waste" value="Organic Waste" />
                                <Picker.Item label="Paper" value="Paper" />
                                <Picker.Item label="Plastics Waste" value="Plastics" />
                                <Picker.Item label="Textiles" value="Textiles" />
                                <Picker.Item label="Wood" value="Wood" />
                            </Picker>
                        </View>
                        <View style={styles.fieldNameContainer}>
                            <Text style={styles.fieldName}>Select Metric</Text>
                        </View>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={formData.metric}
                                onValueChange={(itemValue, itemIndex) =>
                                    textChangeHandler('metric', itemValue)
                                }>
                                <Picker.Item label="Kilograms (kg)" value="Kilograms (kg)" />
                                <Picker.Item label="Grams (g)" value="Grams (g)" />
                                <Picker.Item label="Pounds (lbs)" value="Pounds (lbs)" />
                                <Picker.Item label="Ounces (oz)" value="Ounces (oz)" />
                                <Picker.Item label="Kilometers (km)" value="Kilometers (km)" />
                                <Picker.Item label="Meters (m)" value="Meters (m)" />
                                <Picker.Item label="Inches (in)" value="Inches (in)" />
                                <Picker.Item label="centimeters (cm)" value="centimeters (cm)" />
                                <Picker.Item label="Liters (L)" value="Liters (L)" />
                                <Picker.Item label="Milliliters (mL)" value="Milliliters (mL)" />
                                <Picker.Item label="units" value="units" />
                            </Picker>
                        </View>

                        <TextInput value={formData.quantity} onChangeText={(text) => textChangeHandler('quantity', text)} style={styles.inputText} placeholder="quantity" />
                        <TextInput value={formData.price} onChangeText={(text) => textChangeHandler('price', text)} style={styles.inputText} placeholder="price of a unit" />
                        <GreenButton paddingV={10} marginV={5} btnTitle="post item" onPressFunction={onSubmitHandler} />
                    </View>
                </View>
            </View>
            <BottomNavBar />
        </BelowStatusBarView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#009E60",
        padding: 10
    },
    formContainer: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginTop: 10
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
    }, imageContainer: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: "dotted",
        borderWidth: 2,
        marginHorizontal: 30,
        padding: 5,
        marginTop: 5
    },
    image: {
        width: 120,
        height: 120,
        marginHorizontal: 5
    }, inputText: {
        fontSize: 18,
        borderWidth: 1,
        width: 280,
        margin: 10,
        padding: 3,
        borderColor: "#008000",
        borderRadius: 5
    }, textInputsContainer: {
        flex: 1,
        alignItems: "center"
    }, pickerContainer: {
        width: 280,
        borderColor: "#008000",
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 5
    },
    fieldNameContainer: {
        alignItems: "flex-start",
        width: 280
    },
    fieldName: {
        fontSize: 17,
        fontWeight: "600"
    }
})