import { Alert, Image, StyleSheet, Text, View, ActivityIndicator, Pressable } from "react-native"
import BelowStatusBarView from "../components/BelowStatusBarView"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { AuthContext } from "../context/AuthContextManager";
import messaging from "../assets/images/icons/messaging.png"
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function SingleItemScreen(props) {
    const [itemObj, setItemObj] = useState(null)
    const baseUrl = process.env.EXPO_PUBLIC_API_URL
    const { authUser } = useContext(AuthContext);
    const token = authUser.token;
    const [customQty, setCustomQty] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)

    function decrementQty() {
        setTotalAmount(prevAmount => prevAmount === 0 ? 0 : prevAmount - itemObj.price)
        setCustomQty(prevQty => prevQty === 0 ? 0 : prevQty - 1)
    }

    function incrementQty() {
        setTotalAmount(prevAmount => customQty === itemObj.quantity_details.quantity ? prevAmount : prevAmount + itemObj.price)
        setCustomQty(prevQty => prevQty === itemObj.quantity_details.quantity ? itemObj.quantity_details.quantity : prevQty + 1)
    }

    function handleGoBackButton() {
        props.navigation.goBack()
    }

    async function handleRequestTransactionButton() {
        const transactionData = {
            sellerID: itemObj.seller_id,
            buyerID: authUser.user_id,
            itemID: itemObj._id,
            requested_quantity: customQty,
            amount: totalAmount
        };

        if (totalAmount !== 0 && customQty !== 0) {
            try {
                const response = await axios.post(`${baseUrl}/buyers/new-transaction`, transactionData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                });

                Alert.alert("The transaction was requested successfully!")
            } catch (e) {
                Alert.alert("Unable to request the transaction now!")
            }
        } else {
            Alert.alert("please select a quantity")
        }
    }



    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${baseUrl}/buyers/get-item`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    params: {
                        itemID: props.route.params.itemID
                    }
                })

                setItemObj(response.data)

            } catch (e) {
                console.error("can't get item details from server")
            }
        })()
    }, [])

    return (
        <BelowStatusBarView>
            <View style={styles.mainContainer}>
                {itemObj ?
                    (
                        <>
                            <View style={styles.itemContainer}>
                                <AntDesign onPress={handleGoBackButton} style={styles.goBackButton} name="arrowleft" size={33} color="#008000" />
                                <View>
                                    <Image style={styles.itemImage} source={{ uri: `data:image/jpeg;base64,${itemObj.image_file_name}` }} />
                                    <Text style={styles.itemNameText}>{itemObj.name}</Text>
                                    <Text style={styles.itemDetailsText}>{itemObj.description}</Text>
                                    <Text style={styles.itemDetailsText}>price of a unit: {itemObj.price}</Text>
                                    <Text style={styles.itemDetailsText}>availability: {itemObj.quantity_details.quantity} {itemObj.quantity_details.metric}</Text>
                                </View>
                            </View>

                            <View style={styles.priceContainer}>
                                <View style={styles.quantiyContainer}>
                                    <Pressable onPress={incrementQty} style={styles.circle}>
                                        <Entypo name="plus" size={28} color="black" />
                                    </Pressable>
                                    <Text style={styles.customQty}>{customQty} {itemObj.quantity_details.metric}</Text>
                                    <Pressable onPress={decrementQty} style={styles.circle}>
                                        <Entypo name="minus" size={28} color="black" />
                                    </Pressable>
                                </View>
                                <Text style={styles.customQty}>Total : {totalAmount}</Text>
                            </View>

                            <View style={styles.decisionsContainer}>
                                <Pressable style={styles.messageContainer}>
                                    <Image style={styles.messageImage} source={messaging} />
                                    <Text style={styles.messageSellerText}>Message Seller</Text>
                                </Pressable>
                                <Pressable onPress={handleRequestTransactionButton} style={styles.transactionButton}>
                                    <MaterialIcons name="currency-exchange" size={50} color="black" />
                                    <Text style={styles.messageSellerText}>Request transaction</Text>
                                </Pressable>
                            </View>
                        </>


                    )
                    : <ActivityIndicator size="large" color="#00ff00" />}


            </View>
        </BelowStatusBarView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#009E60',
        paddingHorizontal: 15,

    },
    itemContainer: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        alignItems: "center",
        marginTop: 20,
    },
    itemImage: {
        height: 200,
        width: 200,
    },
    itemNameText: {
        paddingTop: 5,
        fontSize: 25,
        fontWeight: "600"
    },
    itemDetailsText: {
        fontSize: 19,
        marginTop: 5
    },
    priceContainer: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,

    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: "#008000",
        justifyContent: "center",
        alignItems: "center"
    },
    customQty: {
        fontSize: 20,
        fontWeight: "700",
        margin: 15
    },
    quantiyContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    }, messageImage: {
        width: 50,
        height: 50,
    },
    decisionsContainer: {
        backgroundColor: "#fff",
        marginTop: 20,
        borderRadius: 10,
        padding: 15,
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    messageContainer: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFAE42",
        padding: 10,
        borderRadius: 10
    },
    messageSellerText: {
        fontSize: 15
    },
    transactionButton: {
        backgroundColor: "#008000",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        borderRadius: 10
    },
    goBackButton: {
        alignSelf: "flex-start"
    }


})