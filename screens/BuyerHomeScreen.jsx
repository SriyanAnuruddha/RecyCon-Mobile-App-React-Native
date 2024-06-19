import { Button, Text, View } from "react-native";
import BelowStatusBarView from "../components/BelowStatusBarView"
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextManager"

export default function BuyerHomeScreen() {
    const { logout } = useContext(AuthContext)

    return (
        <BelowStatusBarView>
            <View>
                <Text>Buyer Home Screen</Text>
                <Button title="Logout" onPress={() => logout()} />
            </View>
        </BelowStatusBarView>

    )
}