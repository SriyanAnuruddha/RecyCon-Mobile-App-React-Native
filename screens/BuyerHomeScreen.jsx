import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import BelowStatusBarView from "../components/BelowStatusBarView"
import BottomNavBar from "../components/BottomNavBar";
import itemsIcon from "../assets/images/icons/itemsIcon.png"
import purchase from "../assets/images/icons/purchase.png"
import messaging from "../assets/images/icons/messaging.png"

export default function BuyerHomeScreen() {

    return (

        <BelowStatusBarView>
            <View style={styles.mainContainer}>
                <View style={styles.dummyBlock}></View>
                <View style={styles.featureIconsContainer}>
                    <Pressable style={styles.featureIcons}>
                        <Image style={styles.image} source={itemsIcon} />
                        <Text style={styles.featureIconText}>items</Text>
                    </Pressable>
                    <Pressable style={styles.featureIcons}>
                        <Image style={styles.image} source={purchase} />
                        <Text style={styles.featureIconText}>purchase history</Text>
                    </Pressable>
                    <Pressable style={styles.featureIcons}>
                        <Image style={styles.image} source={messaging} />
                        <Text style={styles.featureIconText}>messaging</Text>
                    </Pressable>
                    <Pressable style={styles.featureIcons}>
                        <Text style={styles.featureIconText}>items</Text>
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
        margin: 20
    },
    featureIconText: {
        fontSize: 15,
        marginTop: 10
    },
    image: {
        width: 60,
        height: 60
    }

})