import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import BelowStatusBarView from "../components/BelowStatusBarView"
import BottomNavBar from "../components/BottomNavBar";
import current from "../assets/images/icons/current_listings.png"
import addItem from "../assets/images/icons/add.png"
import messaging from "../assets/images/icons/messaging.png"
import market from "../assets/images/icons/market.png"
import transaction_history from "../assets/images/icons/purchase.png"
import { FontAwesome } from '@expo/vector-icons';

export default function SellerHomeScreen(props) {

    function addItemButtonHandler() {
        props.navigation.navigate('PostItemScreen')
    }

    function messageButtonHandler() {
        props.navigation.navigate("MessageScreen")
    }

    return (

        <BelowStatusBarView>
            <View style={styles.mainContainer}>
                <View style={styles.dummyBlock}></View>
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
                    <Pressable style={styles.featureIcons}>
                        <Image style={styles.image} source={transaction_history} />
                        <Text style={styles.featureIconText}>transactions</Text>
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
    dummyBlock: {
        margin: 20,
        borderColor: "black",
        borderWidth: 2,
        height: 150
    },
    featureIcons: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        width: 120,
        height: 120,
        margin: 20,
        padding: 10
    },
    featureIconText: {
        fontSize: 15,
        marginTop: 10
    },
    image: {
        width: 60,
        height: 60,
    }

})