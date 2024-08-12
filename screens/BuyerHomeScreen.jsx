import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import BelowStatusBarView from "../components/BelowStatusBarView"
import BottomNavBar from "../components/BottomNavBar";
import itemsIcon from "../assets/images/icons/itemsIcon.png"
import purchase from "../assets/images/icons/purchase.png"
import messaging from "../assets/images/icons/messaging.png"
import exchange_banner_img from "../assets/exchange_banner.jpg"
import { FontAwesome } from '@expo/vector-icons';

export default function BuyerHomeScreen(props) {

    function itemsButtonHandler() {
        props.navigation.navigate("ItemsScreen")
    }

    function messageButtonHandler() {
        props.navigation.navigate("ChatListScreen")
    }

    function myOrderButtonHandler() {
        props.navigation.navigate("MyOrdersScreen")

    }

    return (

        <BelowStatusBarView>
            <View style={styles.mainContainer}>
                <Image source={exchange_banner_img} style={styles.banner_image} />
                <View style={styles.featureIconsContainer}>
                    <Pressable onPress={itemsButtonHandler} style={styles.featureIcons}>
                        <Image style={styles.image} source={itemsIcon} />
                        <Text style={styles.featureIconText}>Items</Text>
                    </Pressable>
                    <Pressable onPress={myOrderButtonHandler} style={styles.featureIcons}>
                        <Image style={styles.image} source={purchase} />
                        <Text style={styles.featureIconText}>My Orders</Text>
                    </Pressable>
                    <Pressable onPress={messageButtonHandler} style={styles.featureIcons}>
                        <Image style={styles.image} source={messaging} />
                        <Text style={styles.featureIconText}>Messaging</Text>
                    </Pressable>
                    <Pressable style={styles.featureIcons}>
                        <FontAwesome style={styles.icon} name="user-circle-o" size={60} color="black" />
                        <Text style={styles.featureIconText}>Profile</Text>
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
        margin: 20
    },
    featureIconText: {
        fontSize: 15,
        marginTop: 10
    },
    image: {
        width: 60,
        height: 60
    },
    banner_image: {
        alignSelf: "center",
        height: 200,
        width: 300,
        margin: 30
    }

})