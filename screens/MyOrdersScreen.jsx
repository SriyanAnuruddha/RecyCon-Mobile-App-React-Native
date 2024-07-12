import { useEffect, useContext, useState } from "react";
import BelowStatusBarView from "../components/BelowStatusBarView"
import BottomNavBar from "../components/BottomNavBar"
import AntDesign from '@expo/vector-icons/AntDesign';
import { Image, View, Text, StyleSheet, ActivityIndicator, FlatList, Pressable, Alert } from "react-native"
import { AuthContext } from "../context/AuthContextManager";
import axios from "axios";
import { MaterialIcons } from '@expo/vector-icons';
import messaging from "../assets/images/icons/messaging.png"



const showAlert = (orderID) =>
    Alert.alert(
        "Are you certain you want to cancel the order?", "",
        [
            {
                text: 'Yes',
                onPress: () => Alert.alert('Order is Canceled!'),
                style: 'cancel',
            },
            {
                text: 'no',
                style: 'cancel',
            },
        ],
    );



const Transaction = (props) => {
    const date = new Date(props.created_date);
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JS
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `20${year}/${month}/${day}`;

    return (
        <View style={styles.mainItemContainer}>
            <View style={styles.item}>
                <Image style={styles.image} source={{ uri: `data:image/jpeg;base64,${props.itemImage}` }} />
                <View style={styles.transaction_data_container}>
                    <Text style={styles.item_name}>{props.item_name}</Text>
                    <Text>
                        <Text style={styles.transaction_properties}>quantity: </Text>
                        <Text style={styles.transaction_details}> {props.quantity}</Text>
                    </Text>
                    <Text>
                        <Text style={styles.transaction_properties}>amount:</Text>
                        <Text style={styles.transaction_details}> {props.amount}</Text>
                    </Text>
                    <Text>
                        <Text style={styles.transaction_properties}>status:</Text>
                        <Text style={styles.transaction_details}> {props.status}</Text>
                    </Text>
                    <Text>
                        <Text style={styles.transaction_properties}>date: </Text>
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
                    props.status === "pending" && (<Pressable onPress={showAlert} style={styles.cancelButton}>
                        <MaterialIcons name="cancel" size={30} color="black" />
                        <Text style={styles.messageSellerText}>Cancel Order</Text>
                    </Pressable>)
                }
            </View>
        </View>
    )
}



export default function MyOrders(props) {
    const baseUrl = process.env.EXPO_PUBLIC_API_URL
    const { authUser } = useContext(AuthContext)
    const [transactions, setTransactions] = useState(null)

    function handleGoBackButton() {
        props.navigation.goBack()
    }

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${baseUrl}/buyers/get-all-transactions`,
                    {
                        params: {
                            buyerID: authUser.user_id
                        }, headers: {
                            'Authorization': `Bearer ${authUser.token}`,
                        }
                    }
                )

                setTransactions(response.data)
            } catch (e) {
                console.log("network problem: check internet is working!")
            }
        })()
    }, [])



    return (
        <BelowStatusBarView >
            <View style={styles.mainContainer}>
                <AntDesign onPress={handleGoBackButton} style={styles.goBackButton} name="arrowleft" size={33} color="black" />
                <Text style={styles.headerText}>My Orders</Text>

                {transactions == null ?
                    <ActivityIndicator size="large" color="#00ff00" /> :
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={transactions}
                        renderItem={({ item }) => (
                            <Transaction
                                item_name={item.item_name}
                                quantity={item.quantity}
                                amount={item.amount}
                                status={item.status}
                                created_date={item.created_date}
                                itemImage={item.image}
                            />
                        )}
                        keyExtractor={transaction => transaction._id}
                    />
                }
            </View>
            <BottomNavBar />
        </BelowStatusBarView>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#009E60",
        paddingHorizontal: 20,
        alignItems: "center"
    },
    goBackButton: {
        marginTop: 10,
        marginLeft: 20,
        position: 'absolute',
        left: 0,
    },
    headerText: {
        marginTop: 10,
        fontSize: 22,
        fontWeight: "600"
    },
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
    }, buttonsContainer: {
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

})