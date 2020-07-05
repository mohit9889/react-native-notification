import React from "react";
import {StyleSheet, View, Text, Image, Button, FlatList} from "react-native";
import { useDispatch, useSelector } from 'react-redux';

import CartItem from "../components/cartItem";

const Cart = () => {
    const dispatch = useDispatch();
    const cartData = useSelector(state => state.products.cart);
    console.log(cartData);

    return(
        <View style={styles.container}>
            <FlatList 
                    style={styles.list}
                    data={cartData}
                    renderItem={(item) =>  <CartItem item={item} /> }
                    keyExtractor={(item, index) => index.toString()}
            />
            
            <Button color="#212121" title={"Payment"} />
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


