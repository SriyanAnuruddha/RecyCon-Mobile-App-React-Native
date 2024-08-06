import { useContext, useState, useEffect } from 'react';
import { Button, Text, TextInput, StyleSheet, View, FlatList } from 'react-native';
import io from 'socket.io-client';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import BelowStatusBarView from '../components/BelowStatusBarView';
import { AuthContext } from "../context/AuthContextManager";
import Message from "../components/Message";

export default function MessageScreen(props) {
    const { authUser } = useContext(AuthContext);
    const token = authUser.token;
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState("");
    const baseUrl = process.env.EXPO_PUBLIC_API_URL;
    const receiverId = props.route.params.receiverId;
    const receiverName = props.route.params.receiverName;

    useEffect(() => {
        const initSocket = () => {
            const socket = io(baseUrl, {
                query: { token }
            });

            socket.on('connect', () => {
                console.log('Connected to socket server');
            });

            socket.on('connect_error', (err) => {
                console.error('Connection error:', err.message);
            });

            socket.on('disconnect', () => {
                console.log('Disconnected from socket server');
            });

            socket.on('receiveMessage', message => {
                console.log('Message received:', message);
                setMessages(prevMessages => [...prevMessages, message]);
            });

            setSocket(socket);

            return () => {
                if (socket) {
                    socket.disconnect();
                }
            };
        };

        initSocket();
    }, [baseUrl, token]);

    const fetchChatHistory = async () => {
        try {
            const response = await axios.get(`${baseUrl}/messages`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    receiverId: receiverId
                }
            });
            const chatHistory = response.data;
            setMessages(chatHistory.reverse());
        } catch (e) {
            console.error(e);
        }
    };
    useEffect(() => {
        if (receiverId) {
            fetchChatHistory();
        }
    }, [receiverId, baseUrl, token]);


    function handleGoBackButton() {
        props.navigation.goBack()
    }


    const sendMessage = () => {
        if (socket && messageText.trim() !== "") {
            socket.emit('sendMessage', { receiverId, content: messageText });
            setMessageText(""); // Clear the text input after sending
            fetchChatHistory()
        }
    };

    return (
        <BelowStatusBarView>
            <View style={styles.mainContainer}>
                <View style={styles.messagesContainer}>
                    <View style={styles.header}>
                        <AntDesign onPress={handleGoBackButton} style={styles.goBackButton} name="arrowleft" size={33} color="black" />
                        <View style={styles.receiverContainer}>
                            <FontAwesome name="user-circle-o" size={30} color="black" />
                            <Text style={styles.receiverHeaderName}>{receiverName}</Text>
                        </View>
                        <View></View>
                    </View>
                    <View style={styles.messages}>
                        <FlatList
                            inverted
                            showsVerticalScrollIndicator={false}
                            data={messages}
                            renderItem={({ item }) => (
                                <Message
                                    message={item.content}
                                    isReceiver={item.receiverId !== authUser.user_id}
                                />
                            )}
                            keyExtractor={item => item._id}
                        />
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textBox}
                        value={messageText}
                        onChangeText={setMessageText}
                        placeholder="Type a message"

                    />
                    <Button title="Send" onPress={sendMessage} />
                </View>
            </View>
        </BelowStatusBarView>
    );
}

const styles = StyleSheet.create({
    textBox: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        flex: 1,
    },
    mainContainer: {
        flex: 1,
    },
    messagesContainer: {
        backgroundColor: "#36454F",
        flex: 1,
    },
    messages: {
        backgroundColor: "#36454F",
        flex: 1,
        paddingBottom: 10
    },
    header: {
        backgroundColor: "#009E60",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 20,
        justifyContent: "space-between"
    },
    receiverContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    receiverHeaderName: {
        textAlign: "center",
        fontSize: 20,
        paddingLeft: 5,
    },
    goBackButton: {
        marginRight: 15,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ccc',
    },
});


