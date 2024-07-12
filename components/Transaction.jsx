import React from 'react';
import { Image, View, Text, StyleSheet, Pressable, Alert, ActivityIndicator } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import messaging from "../assets/images/icons/messaging.png";
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContextManager';
import axios from 'axios';

const Transaction = (props) => {
    const date = new Date(props.created_date);
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JS
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `20${year}/${month}/${day}`;

    const { authUser } = useContext(AuthContext)
    const baseUrl = process.env.EXPO_PUBLIC_API_URL;

    const showAlert = (transactionID) =>
        Alert.alert(
            "Are you sure you want to cancel the order?", "",
            [
                {
                    text: 'Yes',
                    onPress: () => {
                        cancelOrder(transactionID)
                        Alert.alert('Order is Canceled!')
                    },
                    style: 'cancel',
                },
                {
                    text: 'No',
                    style: 'cancel',
                },
            ],
        );

    const cancelOrder = async (transactionID) => {
        try {
            axios.delete(`${baseUrl}/buyers/cancel-order`, {
                params: {
                    transactionID: transactionID
                },
                headers: {
                    'Authorization': `Bearer ${authUser.token}`,
                }
            })
        } catch (e) {
            console.error("can't delete order!")
        }
    }

    return (
        <View style={styles.mainItemContainer}>
            <View style={styles.item}>
                <Image style={styles.image} source={{ uri: `data:image/jpeg;base64,${props.itemImage}` }} />
                <View style={styles.transaction_data_container}>
                    <Text style={styles.item_name}>{props.item_name}</Text>
                    <Text>
                        <Text style={styles.transaction_properties}>Quantity: </Text>
                        <Text style={styles.transaction_details}> {props.quantity}</Text>
                    </Text>
                    <Text>
                        <Text style={styles.transaction_properties}>Amount:</Text>
                        <Text style={styles.transaction_details}> {props.amount}</Text>
                    </Text>
                    <Text>
                        <Text style={styles.transaction_properties}>Status:</Text>
                        <Text style={styles.transaction_details}> {props.status}</Text>
                    </Text>
                    <Text>
                        <Text style={styles.transaction_properties}>Date: </Text>
                        <Text style={styles.transaction_details}>{formattedDate}</Text>
                    </Text>
                </View>
            </View>
            <View style={styles.buttonsContainer}>
                <Pressable style={styles.messageContainer}>
                    <Image style={styles.messageImage} source={messaging} />
                    <Text style={styles.messageSellerText}>Message Seller</Text>
                </Pressable >
                {
                    props.status === "pending" && (<Pressable onPress={() => showAlert(props.transactionID)} style={styles.cancelButton}>
                        <MaterialIcons name="cancel" size={30} color="black" />
                        <Text style={styles.messageSellerText}>Cancel Order</Text>
                    </Pressable>)
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainItemContainer: {
        backgroundColor: "#fff",
        marginVertical: 15,
        borderRadius: 10,
        padding: 15,
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
    },
    image: {
        height: 100,
        width: 100
    },
    transaction_data_container: {
        marginLeft: 10
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10
    },
    messageContainer: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFAE42",
        padding: 5,
        borderRadius: 10
    },
    messageSellerText: {
        fontSize: 15
    },
    cancelButton: {
        backgroundColor: "#FF2400",
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
        borderRadius: 10
    },
    messageImage: {
        width: 30,
        height: 30,
    },
    item_name: {
        fontSize: 18,
        fontWeight: "600"
    },
    transaction_properties: {
        fontSize: 16,
        fontWeight: "600"
    },
    transaction_details: {
        fontSize: 16
    }
});

export default Transaction;