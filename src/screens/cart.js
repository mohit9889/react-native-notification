import React, { useEffect, useState } from "react";
import { StyleSheet, View, Button, FlatList, AsyncStorage, TouchableOpacity, Text } from "react-native";
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
        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            return;
        }
        try {
            let token = await Notifications.getExpoPushTokenAsync();
            console.log("[NOTIFICATION TOKEN]", token.data);
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
                to: 'ExponentPushToken[SSP6YxATpVmdtb-cNJBcWL]',
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
            <TouchableOpacity onPress={sendPushNotification} style={styles.button}>
                <Text style={styles.buttonText}>Payment</Text>
            </TouchableOpacity>
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
    },
    button: {
        height: 50,
        backgroundColor: "#212121",
        justifyContent: "center",
        alignContent: "center",
    },
    buttonText: {
        color: "white",
        textAlign: "center",
    },
});

export default Cart;


