import BelowStatusBarView from "../components/BelowStatusBarView";
import BottomNavBar from "../components/BottomNavBar";
import { View, StyleSheet, Text, FlatList, ActivityIndicator } from "react-native";
import { AuthContext } from "../context/AuthContextManager";
import axios from "axios";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useContext, useEffect, useState } from "react";
import TransactionRequest from "../components/TransactionRequest";

export default function OrderManagementScreen(props) {
    const baseUrl = process.env.EXPO_PUBLIC_API_URL;
    const { authUser } = useContext(AuthContext)
    const [transactions, setTransactions] = useState(null)
    const [refresh, setRefresh] = useState(false)

    function handleGoBackButton() {
        props.navigation.goBack();
    }

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${baseUrl}/sellers/get-all-transactions`,
                    {
                        params: {
                            sellerID: authUser.user_id
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
        })()
    }, [refresh])

    function refreshList() {
        setRefresh(refresh => !refresh)
    }

    return (
        <BelowStatusBarView>
            <View style={styles.main_container}>
                <AntDesign onPress={handleGoBackButton} style={styles.goBackButton} name="arrowleft" size={33} color="black" />
                <Text style={styles.headerText}>Order Management</Text>
                {transactions == null ?
                    <ActivityIndicator size="large" color="#00ff00" /> :
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={transactions}
                        renderItem={({ item }) => (
                            <TransactionRequest
                                item_name={item.item_name}
                                quantity={item.quantity}
                                amount={item.amount}
                                status={item.status}
                                created_date={item.created_date}
                                itemImage={item.image}
                                transactionID={item.transactionID}
                                refreshList={refreshList}
                            />
                        )}
                        keyExtractor={item => item.transactionID}
                    />
                }
            </View>
            <BottomNavBar />
        </BelowStatusBarView>
    )
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: "#009E60",
        paddingHorizontal: 20,
        alignItems: "center"
    }, goBackButton: {
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
})