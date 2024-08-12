import { View, Text, StyleSheet, Image, Button, TextInput, Alert } from "react-native"
import BelowStatusBarView from "../components/BelowStatusBarView"
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useContext, useState } from "react";
import GreenButton from "../components/GreenButton";
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from "../context/AuthContextManager";
import axios from "axios";

export default function EditItemDetailsScreen(props) {
    const styles = StyleSheet.create({
        mainContainer: {
            flex: 1
        },
        header: {
            backgroundColor: "#009E60",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 10,
            paddingVertical: 10,
        },
        headerText: {
            textAlign: "center",
            fontSize: 20,
            fontWeight: "600"
        },
        fieldsContainer: {
            paddingHorizontal: 20,
            flex: 1,
            alignItems: "flex-start"
        },
        imageContainer: {
            marginTop: 2,
            flexDirection: "row",
            alignItems: "center",
        },
        image: {
            marginRight: 10,
            width: 110,
            height: 110
        }, textBoxContainer: {
            width: "100%",
            justifyContent: "flex-start"
        }
        , fieldName: {
            marginVertical: 2,
            fontSize: 17,
            fontWeight: "600"
        }, textInput: {
            fontSize: 17,
            borderColor: "grey",
            padding: 5,
            borderWidth: 1,
            borderRadius: 5
        }, pickerContainer: {
            width: "100%",
            borderColor: "grey",
            borderWidth: 1,
            borderRadius: 5,
            marginVertical: 5
        }, textBox: {
            marginVertical: 2
        }, buttonContainer: {
            margin: 10,
            width: "100%",
            alignItems: "center"
        }
    })

    const [image, setImage] = useState(null);

    const [itemDetails, setItemDetails] = useState(new Object({
        itemID,
        itemName,
        itemDescription,
        price,
        quantity,
        metric,
        itemImage
    } = props.route.params))

    function handleGoBackButton() {
        props.navigation.goBack()
    }

    function handleTextChange(field, text) {
        setItemDetails(prevItemDetails => {
            return ({
                ...prevItemDetails, [field]: text
            })
        })
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });



            if (!result.canceled) {
                setImage(result.assets[0].uri);
            }
        } catch (e) {
            console.log("cant get the image", e);
        }
    };

    const imageURI = image ? { uri: image } : { uri: `data:image/jpeg;base64,${itemImage}` }
    const baseUrl = process.env.EXPO_PUBLIC_API_URL;
    const { authUser } = useContext(AuthContext)

    const onSubmitHandler = async () => {
        const url = `${baseUrl}/sellers/update-item`;

        try {
            const form = new FormData();
            form.append('itemID', itemDetails.itemID)
            form.append('name', itemDetails.itemName);
            form.append('description', itemDetails.itemDescription);
            form.append('category', itemDetails.category);
            form.append('metric', itemDetails.metric);
            form.append('quantity', itemDetails.quantity);
            form.append('price', itemDetails.price);
            if (image) {
                const filename = image.split('/').pop();
                const match = /\.(\w+)$/.exec(filename);
                const type = match ? `image/${match[1]}` : `image`;
                form.append('file', { uri: image, name: filename, type });
            }

            const response = await axios.put(url, form, {
                headers: {
                    "Authorization": `Bearer ${authUser.token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                Alert.alert(
                    "item details updated successfully!", "",
                    [
                        {
                            text: 'ok',
                            style: 'cancel',
                        },
                    ],
                );
            }
        } catch (err) {
            console.error("Error response:", err);
        }
    };

    const updateDetailsBtnOnPressHandler = () => {
        if (itemDetails.quantity % 1 != 0) {
            Alert.alert(
                "Please Enter Whole number for quantity", "",
                [
                    {
                        text: 'ok',
                        style: 'cancel',
                    },
                ],
            );
        } else {
            Alert.alert(
                "Are you sure you want delete this item?", "",
                [
                    {
                        text: 'Yes',
                        onPress: () => {
                            onSubmitHandler()
                        },
                        style: 'cancel',
                    },
                    {
                        text: 'No',
                        style: 'cancel',
                    },
                ],
            );
        }
    }


    return (
        <BelowStatusBarView>
            <View style={styles.mainContainer}>
                <View style={styles.header}>
                    <AntDesign onPress={handleGoBackButton} style={styles.goBackButton} name="arrowleft" size={33} color="black" />
                    <Text style={styles.headerText}>Edit Item Details</Text>
                    <View></View>
                </View>
                <View style={styles.fieldsContainer}>
                    <View style={styles.imageContainer}>
                        {itemImage && <Image source={imageURI} style={styles.image} />}
                        <Button title="chagne item image" onPress={pickImage} />
                    </View>
                    <View style={styles.textBoxContainer}>
                        <View style={styles.textBox}>
                            <Text style={styles.fieldName}>Item Name</Text>
                            <TextInput style={styles.textInput} onChangeText={(text) => handleTextChange("itemName", text)} value={itemDetails.itemName} />
                        </View>
                        <View style={styles.textBox}>
                            <Text style={styles.fieldName}>Item Description</Text>
                            <TextInput style={styles.textInput} onChangeText={(text) => handleTextChange("itemDescription", text)} multiline={true} numberOfLines={2} value={itemDetails.itemDescription} />
                        </View>
                        <View style={styles.textBox}>
                            <Text style={styles.fieldName}>Item Category</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={itemDetails.category}
                                    onValueChange={(itemValue, itemIndex) =>
                                        handleTextChange('category', itemValue)
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
                        </View>
                        <View style={styles.textBox}>
                            <Text style={styles.fieldName}>Metric</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={itemDetails.metric}
                                    onValueChange={(itemValue, itemIndex) =>
                                        handleTextChange('metric', itemValue)
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
                        </View>
                        <View style={styles.textBox}>
                            <Text style={styles.fieldName}>Quantity</Text>
                            <TextInput style={styles.textInput} onChangeText={(text) => handleTextChange("quantity", text)} value={String(itemDetails.quantity)} />
                        </View>
                        <View style={styles.textBox}>
                            <Text style={styles.fieldName}>Price</Text>
                            <TextInput style={styles.textInput} onChangeText={(text) => handleTextChange("price", text)} value={String(itemDetails.price)} />
                        </View>
                        <View style={styles.buttonContainer}>
                            <GreenButton paddingV={10} marginV={5} btnTitle="update details" onPressFunction={updateDetailsBtnOnPressHandler} />
                        </View>
                    </View>
                </View>
            </View>
        </BelowStatusBarView>
    )
}