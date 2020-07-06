import React, { useEffect, useState } from "react";
import { StyleSheet, View, Button, FlatList, AsyncStorage } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import firebase from 'firebase';

import CartItem from "../components/cartItem";


const Cart = () => {
    const dispatch = useDispatch();
    const cartData = useSelector(state => state.products.cart);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        retrieveData();
        registerForPushNotificationsAsync();
    })

    const registerForPushNotificationsAsync = async () => {
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;

        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
            // Android remote notification permissions are granted during the app
            // install, so this will only ask on iOS
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
            return;
        }

        try {
            // Get the token that uniquely identifies this device
            let token = await Notifications.getExpoPushTokenAsync();
            console.log("[NOTIFICATION TOKEN]",token.data);
            // POST the token to your backend server from where you can retrieve it to send push notifications.
            firebase
        .database()
        .ref('users/' + userId + '/push_token')
        .set(token.data);
        } catch (error) {
            console.log(error);
        }
    };

    const sendPushNotification = () => {
        let response = fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                to: 'ExponentPushToken[vUA9RfPK_RPLFOIiDFOIYs]',
                sound: 'default',
                title: 'Order',
                body: 'Here your new order.'
            })
        });
    };

    const retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('userData');
            if (value !== null) {
                setUserId(JSON.parse(value).userId);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={cartData}
                renderItem={(item) => <CartItem item={item} />}
                keyExtractor={(item, index) => index.toString()}
            />

            <Button onPress={sendPushNotification} color="#212121" title={"Payment"} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
    },
    list: {
        padding: 20
    }
});

export default Cart;


