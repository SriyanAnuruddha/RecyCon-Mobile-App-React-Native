import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import BelowStatusBarView from "../components/BelowStatusBarView"
import BottomNavBar from "../components/BottomNavBar";
import current from "../assets/images/icons/current_listings.png"
import addItem from "../assets/images/icons/add.png"
import messaging from "../assets/images/icons/messaging.png"
import market from "../assets/images/icons/market.png"
import transaction_history from "../assets/images/icons/purchase.png"
import { FontAwesome } from '@expo/vector-icons';
import exchange_banner_img from "../assets/exchange_banner.jpg"

export default function SellerHomeScreen(props) {

    function addItemButtonHandler() {
        props.navigation.navigate('PostItemScreen')
    }

    function messageButtonHandler() {
        props.navigation.navigate("MessageScreen")
    }

    function manageOrdersButtonHandler() {
        props.navigation.navigate("OrderManagementScreen")
    }

    return (

        <BelowStatusBarView>
            <View style={styles.mainContainer}>
                <Image source={exchange_banner_img} style={styles.banner_image} />
                <View style={styles.featureIconsContainer}>
                    <Pressable style={styles.featureIcons}>
                        <Image style={styles.image} source={market} />
                        <Text style={styles.featureIconText}>current market prices</Text>
                    </Pressable>
                    <Pressable style={styles.featureIcons} onPress={addItemButtonHandler}>
                        <Image style={styles.image} source={addItem} />
                        <Text style={styles.featureIconText}>post item</Text>
                    </Pressable>
                    <Pressable onPress={messageButtonHandler} style={styles.featureIcons}>
                        <Image style={styles.image} source={messaging} />
                        <Text style={styles.featureIconText}>messaging</Text>
                    </Pressable>
                    <Pressable onPress={manageOrdersButtonHandler} style={styles.featureIcons}>
                        <Image style={styles.image} source={transaction_history} />
                        <Text style={styles.featureIconText}>Manage Orders</Text>
                    </Pressable>
                    <Pressable style={styles.featureIcons}>
                        <Image style={styles.image} source={current} />
                        <Text style={styles.featureIconText}>current listings</Text>
                    </Pressable>
                    <Pressable style={styles.featureIcons}>
                        <FontAwesome style={styles.icon} name="user-circle-o" size={60} color="black" />
                        <Text style={styles.featureIconText}>profile</Text>
                    </Pressable>
                </View>

                <BottomNavBar />
            </View>
        </BelowStatusBarView >
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: "#009E60"
    },
    featureIconsContainer: {
        flex: 1,
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    featureIcons: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        width: 120,
        height: 120,
        margin: 13,
        padding: 10
    },
    featureIconText: {
        fontSize: 15,
        marginTop: 10
    },
    image: {
        width: 60,
        height: 60,
    },
    banner_image: {
        alignSelf: "center",
        height: 200,
        width: 300,
        margin: 20
    }


})