import { useContext, useState, useEffect } from 'react';
import BelowStatusBarView from '../components/BelowStatusBarView';
import { AuthContext } from "../context/AuthContextManager";
import { Button, Text, TextInput, StyleSheet } from 'react-native';
import io from 'socket.io-client';
import axios from 'axios';

export default function MessageScreen() {
    const { authUser } = useContext(AuthContext);
    const token = authUser.token;
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState("");// Change this hard-coded value
    const baseUrl = process.env.EXPO_PUBLIC_API_URL

    const [receiverId, setReceiverId] = useState(null)

    useEffect(() => {
        const initSocket = async () => {
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
        };

        initSocket();

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, []);


    useEffect(() => {
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
                const chatHistory = response.data
                setMessages(chatHistory);
                console.log(chatHistory)
            } catch (e) {
                console.error(e)
            }
        };

        if (receiverId) {
            fetchChatHistory();
        }
    }, [receiverId]);


    const sendMessage = () => {
        if (socket) {
            socket.emit('sendMessage', { receiverId, content: messageText });
            setMessageText(""); // Clear the text input after sending
        }
    };

    return (
        <BelowStatusBarView>
            <Text>enter reciverID Screen</Text>
            <TextInput
                style={styles.textBox}
                value={receiverId}
                onChangeText={text => setReceiverId(text)}
            />
            {
                messages.map(message => <Text>{message.content}</Text>)
            }
            <TextInput
                style={styles.textBox}
                value={messageText}
                onChangeText={(text) => setMessageText(text)}
            />
            <Button onPress={sendMessage} title="Send Message" />
        </BelowStatusBarView>
    );
}

const styles = StyleSheet.create({
    textBox: {
        fontSize: 18,
        borderWidth: 2,
    }
});
