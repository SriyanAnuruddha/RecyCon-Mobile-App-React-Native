import React, { useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { AuthContext } from "../context/AuthContextManager";
import axios from "axios";
import AntDesign from '@expo/vector-icons/AntDesign';
import Transaction from "../components/Transaction";
import BelowStatusBarView from "../components/BelowStatusBarView";
import BottomNavBar from "../components/BottomNavBar";

export default function MyOrders(props) {
    const baseUrl = process.env.EXPO_PUBLIC_API_URL;
    const { authUser } = useContext(AuthContext);
    const [transactions, setTransactions] = useState(null);
    const [refresh, setRefresh] = useState(false)

    function handleGoBackButton() {
        props.navigation.goBack();
    }


    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${baseUrl}/buyers/get-all-transactions`,
                    {
                        params: {
                            buyerID: authUser.user_id
                        },
                        headers: {
                            'Authorization': `Bearer ${authUser.token}`,
                        }
                    }
                )

                setTransactions(response.data);
            } catch (e) {
                console.log("Network problem: check if the internet is working!");
            }
        })();
    }, [refresh]);

    function refreshList() {
        setRefresh(refresh => !refresh)
    }

    return (
        <BelowStatusBarView>
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
                                sellerName={item.sellerName}
                                sellerID={item.sellerID}
                                amount={item.amount}
                                status={item.status}
                                created_date={item.created_date}
                                itemImage={item.image}
                                transactionID={item.transactionID}
                                refreshList={refreshList}
                                navigation={props.navigation}
                            />
                        )}
                        keyExtractor={item => item.transactionID}
                    />
                }
            </View>
            <BottomNavBar navigation={props.navigation} />
        </BelowStatusBarView>
    );
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
    }
});
