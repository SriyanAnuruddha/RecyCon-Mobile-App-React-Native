import BelowStatusBarView from "../components/BelowStatusBarView"
import { Text, View, StyleSheet, FlatList } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContextManager";
import axios from "axios";
import RealTimePrice from "../components/RealTimePrice"
import { Picker } from '@react-native-picker/picker';

export default function CurrentPricesScreen(props) {
    const { authUser } = useContext(AuthContext);
    const token = authUser.token;
    const baseUrl = process.env.EXPO_PUBLIC_API_URL;
    const [currentPrices, setCurrentPrices] = useState(null)
    const [category, setCategory] = useState(null)

    function handleGoBackButton() {
        props.navigation.goBack()
    }

    async function getCurrentPrices(category) {
        let metaData = {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        }

        if (category) {
            metaData = {
                ...metaData, params: {
                    category: category
                }
            }
        }

        try {
            const response = await axios.get(`${baseUrl}/sellers/get-current-prices`, metaData);
            setCurrentPrices(response.data);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getCurrentPrices(category)
    }, [category])



    return (
        <BelowStatusBarView>
            <View style={styles.mainContainer}>
                <View style={styles.header}>
                    <View style={styles.headerNav}>
                        <AntDesign onPress={handleGoBackButton} style={styles.goBackButton} name="arrowleft" size={33} color="black" />
                        <Text style={styles.headerText}>Current Market Prices</Text>
                        <View></View>
                    </View>
                    <View style={styles.filterContainer}>
                        <Text style={styles.categoryText}>Select Category</Text>
                        <View style={styles.pickerContainer}>

                            <Picker
                                selectedValue={category}
                                onValueChange={(itemValue, itemIndex) =>
                                    setCategory(itemValue)
                                }>
                                <Picker.Item label="--" value={null} />
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
                </View>

                <View style={styles.itemsContainer}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={currentPrices}
                        renderItem={({ item }) => (
                            <RealTimePrice
                                itemName={item.name}
                                price={item.price}
                                quantity={item.quantity_details.quantity}
                                metric={item.quantity_details.metric}
                                itemImage={item.image}
                                itemID={item._id}
                            />
                        )}
                        keyExtractor={item => item.transaction_id}
                    />
                </View>
            </View>
        </BelowStatusBarView>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    headerNav: {
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
    }, pickerContainer: {
        width: "60%",
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 5
    }, filterContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#009E60",
    }, categoryText: {
        fontSize: 17,
        marginRight: 10,
        fontWeight: "600"
    }

})