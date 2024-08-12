import { Alert, StyleSheet, Text, Pressable, Image, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import axios from "axios";
import { AuthContext } from "../context/AuthContextManager";
import { useContext } from "react";

export default function Item(props) {
    const styles = StyleSheet.create({
        mainContainer: {
            backgroundColor: "#fff",
            flexDirection: "row",
            margin: 20,
            borderRadius: 10,
            padding: 10,
        },
        itemImage: {
            width: 100,
            height: 100
        },
        itemTextContainer: {
            marginLeft: 10,
            width: 130
        },
        productNameText: {
            fontSize: 20,
        },
        itemPriceText: {
            fontSize: 18,
            marginVertical: 5,
            fontWeight: "600"
        },
        itemPriceValue: {
            fontSize: 18,
            marginVertical: 5

        },
        quantityDetailsContainer: {
            flexDirection: "row",
        }, quantityText: {
            marginRight: 5
        }, optionsContainer: {
            justifyContent: "center",
            padding: 5
        }, optionsTextsEdit: {
            color: "blue",
            fontSize: 15,
            textAlign: "right",
            paddingLeft: 5
        }, optionsTextsDelete: {
            color: "red",
            fontSize: 15,
            textAlign: "right",
            paddingLeft: 5
        },
        options: {
            flexDirection: "row",
            marginVertical: 10
        }
    })

    const { authUser } = useContext(AuthContext)
    const baseUrl = process.env.EXPO_PUBLIC_API_URL;

    const handleDeleteItemButtonPress = (itemID) => {
        Alert.alert(
            "Are you sure you want delete this item?", "",
            [
                {
                    text: 'Yes',
                    onPress: () => {
                        delteItem(itemID)
                        Alert.alert('Item is Deleted!')
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

    const delteItem = async (itemID) => {
        try {
            axios.delete(`${baseUrl}/sellers/delete-item`, {
                params: {
                    itemID: itemID
                },
                headers: {
                    'Authorization': `Bearer ${authUser.token}`,
                }
            })

            props.removeItem(itemID) // remove item from the array
        } catch (e) {
            console.error("can't delete item!")
        }
    }

    const handleOnPressEditItemDetailsButton = () => {
        props.navigation.navigate('EditItemDetailsScreen',
            {
                itemID: props.itemID,
                itemName: props.itemName,
                itemDescription: props.itemDescription,
                price: props.price,
                quantity: props.quantity,
                metric: props.metric,
                itemImage: props.itemImage,
                category: props.category
            })
    }


    return (
        <View style={styles.mainContainer}>
            <Image style={styles.itemImage} source={{ uri: `data:image/jpeg;base64,${props.itemImage}` }} />
            <View style={styles.itemTextContainer}>
                <Text style={styles.productNameText}>{props.itemName}</Text>
                <View style={styles.quantityDetailsContainer}>
                    <Text style={styles.itemPriceText}>price: </Text>
                    <Text style={styles.itemPriceValue}>{props.price}</Text>
                </View>
                <View style={styles.quantityDetailsContainer}>
                    <Text style={styles.quantityText}>{props.quantity}</Text>
                    <Text>{props.metric}</Text>
                </View>
            </View>
            <View style={styles.optionsContainer}>
                <Pressable onPress={handleOnPressEditItemDetailsButton} style={styles.options}>
                    <AntDesign name="edit" size={24} color="blue" />
                    <Text style={styles.optionsTextsEdit}>Edit </Text>
                </Pressable>
                <Pressable onPress={() => handleDeleteItemButtonPress(props.itemID)} style={styles.options}>
                    <MaterialIcons name="delete-outline" size={24} color="red" />
                    <Text style={styles.optionsTextsDelete}>Delete</Text>
                </Pressable>
            </View>
        </View>
    )
}