import { Alert, StyleSheet, Text, Pressable, Image, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import axios from "axios";
import { AuthContext } from "../context/AuthContextManager";
import { useContext } from "react";

export default function Item(props) {
    const styles = StyleSheet.create({
        mainContainer: {
            backgroundColor: "grey",
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
            marginRight: 5,
            fontSize: 18
        }
    })

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
                    <Text style={styles.quantityText}>1</Text>
                    <Text style={styles.quantityText}>{props.metric}</Text>
                </View>
            </View>
        </View>
    )
}