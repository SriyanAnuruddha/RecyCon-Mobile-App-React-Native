import { View, StyleSheet, Text, Pressable } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Platform, Linking } from 'react-native';

export default function Message(props) {
    const styles = StyleSheet.create({
        messageBox: {
            padding: 8,
            backgroundColor: props.isReceiver ? "#fff" : "#0096FF",
            alignSelf: props.isReceiver ? "flex-end" : "flex-start",
            margin: 10,
            borderRadius: 5,
        }, openLocationText: {
            color: "blue",
            fontWeight: "600",
            textDecorationLine: 'underline',
        },
        locationIcon: {
            alignSelf: "center"
        }
    });

    function handleOnPressLocation() {
        const scheme = Platform.select({ ios: 'maps://0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${props.location?.latitude},${props.location?.longitude}`;
        const label = 'Custom Label';
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
        });

        Linking.openURL(url);
    }

    if (props.location?.latitude && props.location?.longitude) {
        return (
            <Pressable onPress={handleOnPressLocation} style={styles.messageBox}>
                <FontAwesome6 style={styles.locationIcon} name="map-location-dot" size={26} color="black" />
                <Text style={styles.openLocationText}>Open Location</Text>
            </Pressable>
        )
    } else {
        return (
            <View style={styles.messageBox}>
                <Text>{props.message}</Text>
            </View>
        )
    }

}