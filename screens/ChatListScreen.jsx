import BelowStatusBarView from "../components/BelowStatusBarView"
import BottomNavBar from "../components/BottomNavBar"
import { Text, StyleSheet, View, FlatList } from "react-native"
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { AntDesign } from '@expo/vector-icons';
import ChatUser from "../components/ChatUser";
import { useEffect, useContext, useState } from "react";
import axios from 'axios';
import { AuthContext } from "../context/AuthContextManager";

export default function ChatList(props) {
    const baseUrl = process.env.EXPO_PUBLIC_API_URL;
    const { authUser } = useContext(AuthContext);
    const token = authUser.token;
    const [chatListData, setChatListData] = useState(null)

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

    function handleGoBackButton() {
        props.navigation.goBack()
    }

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${baseUrl}/chatlist`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },

                });
                setChatListData(response.data)
            } catch (e) {
                console.error(e);
            }
        })()
    }, [])

    return (
        <BelowStatusBarView>
            <View style={styles.mainContainer}>
                <View style={styles.header}>
                    <AntDesign onPress={handleGoBackButton} style={styles.goBackButton} name="arrowleft" size={33} color="black" />
                    <Text style={styles.headerText}>Chat List</Text>
                    <View></View>
                </View>
                <View style={styles.listContainer}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={chatListData}
                        renderItem={({ item }) => (
                            <ChatUser
                                navigation={props.navigation}
                                userID={item.otherPartyId}
                                userName={item.otherPartyName}
                                recivedMessage={item.lastMessage.receiverId == authUser.user_id}
                                lastMessage={item.lastMessage.content}
                            />
                        )}
                        keyExtractor={item => item._id}
                    />
                </View>
            </View>
            <BottomNavBar navigation={props.navigation} />
        </BelowStatusBarView >
    )
}