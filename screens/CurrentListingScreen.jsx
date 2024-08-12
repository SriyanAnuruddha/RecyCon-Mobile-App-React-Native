import { View, Text, StyleSheet, FlatList } from "react-native";
import { AuthContext } from "../context/AuthContextManager";
import BelowStatusBarView from "../components/BelowStatusBarView"
import BottomNavBar from "../components/BottomNavBar"
import { AntDesign } from '@expo/vector-icons';
import Item from "../components/Item";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useIsFocused } from '@react-navigation/native'

export default function CurrentListingsScreen(props) {
    const { authUser } = useContext(AuthContext)
    const [items, setItems] = useState(null)
    const baseUrl = process.env.EXPO_PUBLIC_API_URL;

    function handleGoBackButton() {
        props.navigation.goBack()
    }


    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            (async () => {
                try {
                    const response = await axios.get(`${baseUrl}/sellers/get-items`,
                        {
                            headers: {
                                'Authorization': `Bearer ${authUser.token}`,
                            }
                        }
                    )

                    setItems(response.data);
                } catch (e) {
                    console.log(`can't get items from server`);
                }
            })();
        }
    }, [isFocused])


    function removeItem(itemID) {
        setItems(prevItems => {
            return (
                prevItems.filter(item => item._id === itemID)
            )
        })
    }



    return (
        <BelowStatusBarView>
            <View style={styles.mainContainer}>
                <View style={styles.header}>
                    <AntDesign onPress={handleGoBackButton} style={styles.goBackButton} name="arrowleft" size={33} color="black" />
                    <Text style={styles.headerText}>Your Items</Text>
                    <View></View>
                </View>
                <View style={styles.listContainer}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={items}
                        renderItem={({ item }) => (
                            <Item
                                itemName={item.name}
                                itemDescription={item.description}
                                price={item.price}
                                quantity={item.quantity_details.quantity}
                                metric={item.quantity_details.metric}
                                itemImage={item.image}
                                itemID={item._id}
                                removeItem={removeItem}
                                navigation={props.navigation}
                                category={item.category}
                            />
                        )}
                        keyExtractor={item => item._id}
                    />
                </View>
            </View>
            <BottomNavBar />
        </BelowStatusBarView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    header: {
        backgroundColor: "#009E60",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    headerText: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "600"
    },
    listContainer: {
        backgroundColor: "#009E60",
        flex: 1
    }
})