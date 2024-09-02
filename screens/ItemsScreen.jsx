import BelowStatusBarView from "../components/BelowStatusBarView"
import BottomNavBar from "../components/BottomNavBar"
import { AntDesign } from '@expo/vector-icons';
import { Alert, Pressable, Image, FlatList, View, StyleSheet, Text, TextInput, Button } from "react-native"
import { Picker } from '@react-native-picker/picker';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContextManager";
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';

const Item = (props) => {
    const navigation = useNavigation();
    return (
        <Pressable onPress={() => onPressItemHandler(navigation, props.itemID)} style={styles.itemContainer}>
            <Image style={styles.itemImage} source={{ uri: `data:image/jpeg;base64,${props.itemImage}` }} />
            <View style={styles.itemTextContainer}>
                <Text style={styles.productNameText}>{props.name}</Text>

                <View style={styles.quantityDetailsContainer}>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.detailsText}>Price: </Text>
                        <Text style={styles.itemPriceText}>{props.price}</Text>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.detailsText}>Quantity: </Text>
                        <Text style={styles.itemPriceText}> {props.quantity} {props.metric}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

function onPressItemHandler(navigation, itemID) {
    navigation.navigate("SingleItemScreen", { itemID: itemID })
}

export default function ItemsScreen(props) {
    const { authUser } = useContext(AuthContext)
    const [items, setItems] = useState()
    const [category, setCategory] = useState();
    const [itemName, setItemName] = useState()


    async function getLocation() {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission to access location was denied');
                console.log('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            if (!location) {
                Alert.alert('Unable to obtain location');
                return;
            }

            if (location) {
                return ({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                })
            }

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        (async () => {
            try {
                let { latitude, longitude } = await getLocation()

                const respose = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/buyers/new-items`, {
                    headers: {
                        "Authorization": `Bearer ${authUser.token}`
                    },
                    params: {
                        category: category ? category : "",
                        itemName: itemName ? itemName : "",
                        country: authUser.country,
                        coords: {
                            latitude: latitude ? latitude : null,
                            longitude: longitude ? longitude : null,
                        }
                    }
                })
                setItems(respose.data)
            } catch (e) {
                console.error("cant retrive new items from server", e)
            }
        })()

    }, [])



    async function getFilteredItems() {

        if (!itemName && !category) {
            Alert.alert("Please select a category or enter a item name")
        } else {
            try {
                let { latitude, longitude } = await getLocation()

                const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/buyers/filtered-items`, {


                    headers: {
                        "Authorization": `Bearer ${authUser.token}`
                    },
                    params: {
                        category: category ? category : "",
                        itemName: itemName ? itemName : "",
                        country: authUser.country,
                        coords: {
                            latitude: latitude ? latitude : null,
                            longitude: longitude ? longitude : null,
                        }
                    }
                })
                setItems(response.data)
            } catch (e) {
                console.error(e)
            }
        }
    }

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
                    <TextInput style={styles.searchBoxInput} placeholder="Search Items..." onChangeText={text => setItemName(text)} />
                    <AntDesign onPress={getFilteredItems} style={styles.searchIcon} name="search1" size={26} color="black" />
                </View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={items}
                    renderItem={({ item }) => (
                        <Item
                            name={item.name}
                            price={item.price}
                            quantity={item.quantity_details.quantity}
                            metric={item.quantity_details.metric}
                            itemImage={item.image_file_name}
                            itemID={item._id}
                        />
                    )}
                    keyExtractor={item => item._id}
                />
            </View>
            <BottomNavBar navigation={props.navigation} />
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
        margin: 20,
        padding: 10,
        borderRadius: 8
    },
    itemImage: {
        width: 100,
        height: 100
    },
    itemTextContainer: {
        marginLeft: 10,
        flexDirection: "column"
    },
    productNameText: {
        fontSize: 20,
        paddingBottom: 5
    },
    itemPriceText: {
        fontSize: 18,
        marginVertical: 5

    }, quantityDetailsContainer: {
        flexDirection: "column",
    }, quantityText: {
        marginRight: 5
    },
    detailsContainer: {
        flexDirection: "row",
        alignItems: "center"
    }, detailsText: {
        fontSize: 18,
        fontWeight: "600"
    }
})
