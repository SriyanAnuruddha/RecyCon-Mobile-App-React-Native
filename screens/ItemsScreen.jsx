import BelowStatusBarView from "../components/BelowStatusBarView"
import BottomNavBar from "../components/BottomNavBar"
import { AntDesign } from '@expo/vector-icons';
import { Pressable, Image, FlatList, View, StyleSheet, Text, TextInput, Button } from "react-native"
import { Picker } from '@react-native-picker/picker';
import { useContext, useEffect, useState } from "react";
import marketImage from "../assets/images/icons/market.png"
import axios from "axios";
import { AuthContext } from "../context/AuthContextManager";

const Item = (props) => {
    return (
        <Pressable style={styles.itemContainer}>
            <Image style={styles.itemImage} source={{ uri: `data:image/jpeg;base64,${props.itemImage}` }} />
            <View style={styles.itemTextContainer}>
                <Text style={styles.productNameText}>{props.name}</Text>
                <Text style={styles.itemPriceText}>{props.price}</Text>
                <View style={styles.quantityDetailsContainer}>
                    <Text style={styles.quantityText}> {props.quantity}</Text>
                    <Text>{props.metric}</Text>
                </View>
            </View>
        </Pressable>
    )
}


export default function ItemsScreen() {
    const [category, setCategory] = useState();
    const { authUser } = useContext(AuthContext)
    const [items, setItems] = useState()

    useEffect(() => {
        (async () => {
            try {
                const respose = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/buyers/new-items`, { headers: { "Authorization": `Bearer ${authUser.token}` } })
                setItems(respose.data)
            } catch (e) {
                console.error("cant retrive new items from server")
            }
        })()

    }, [])

    return (
        <BelowStatusBarView>
            <View style={styles.mainContainer}>
                <Text style={styles.headerText}>Recyclable Items</Text>
                <View style={styles.searchBox}>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={category}
                            onValueChange={(itemValue, itemIndex) =>
                                setCategory(itemValue)
                            }>
                            <Picker.Item label="kg" value="kg" />
                            <Picker.Item label="liter" value="liter" />
                            <Picker.Item label="units" value="units" />
                        </Picker>
                    </View>
                    <TextInput style={styles.searchBoxInput} onSubmitEditing={() => console.log("clicked!")} />
                    <AntDesign style={styles.searchIcon} name="search1" size={26} color="black" />
                </View>
                <FlatList
                    data={items}
                    renderItem={({ item }) => (
                        <Item
                            name={item.name}
                            price={item.price}
                            quantity={item.quantity_details.quantity}
                            metric={item.quantity_details.metric}
                            itemImage={item.image_file_name}
                        />
                    )}
                    keyExtractor={item => item._id}
                />
            </View>
            <BottomNavBar />
        </BelowStatusBarView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#009E60",
        alignItems: "center"
    },
    headerText: {
        fontSize: 20,
        fontWeight: "600",
        textAlign: "center",
        margin: 10
    },
    searchBox: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 20
    },
    searchBoxInput: {
        width: "60%",
        fontSize: 18,
        padding: 3,
        borderWidth: 2,
        borderColor: "#fff"
    },
    searchIcon: {
        alignSelf: "center",
        paddingHorizontal: 10
    }, pickerContainer: {
        width: "10%",
        borderColor: "#008000",
        marginLeft: 10,
    },
    itemContainer: {
        flexDirection: "row",
        backgroundColor: "#fff",
        margin: 10,
        padding: 10,
        borderRadius: 8
    },
    itemImage: {
        width: 100,
        height: 100
    },
    itemTextContainer: {
        marginLeft: 10
    },
    productNameText: {
        fontSize: 20,
    },
    itemPriceText: {
        fontSize: 18,
        marginVertical: 5

    }, quantityDetailsContainer: {
        flexDirection: "row",
    }, quantityText: {
        marginRight: 5
    }
})
