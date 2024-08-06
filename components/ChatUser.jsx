import { View, Text, StyleSheet, Pressable } from "react-native"
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function ChatUser(props) {

    const styles = StyleSheet.create({
        mainContainer: {
            backgroundColor: "#fff",
            padding: 15,
            flexDirection: 'row',
            marginHorizontal: 20,
            borderRadius: 10,
            marginVertical: 10
        },
        textContainer: {
            paddingLeft: 10
        },
        userNameText: {
            fontSize: 20
        },
        lastMessage: {
            color: props.recivedMessage ? "#0096FF" : "black"
        }
    })

    function handleChatUserIconPress(receiverId, receiverName) {
        props.navigation.navigate('MessageScreen', { receiverId, receiverName })
    }

    return (
        <Pressable onPress={() => handleChatUserIconPress(props.userID, props.userName)} style={styles.mainContainer}>
            <FontAwesome name="user-circle-o" size={50} color="black" />
            <View style={styles.textContainer}>
                <Text style={styles.userNameText}>{props.userName}</Text>
                <Text style={styles.lastMessage}>{props.lastMessage}</Text>
            </View>
        </Pressable>
    )
}   