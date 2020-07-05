import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

const CartItem = (props) => {
    return (
        <View style={styles.cartItem}>
            <Image style={styles.image} source={{ uri: props.item.item.strCategoryThumb }} />
            <View style={styles.group}>
                <Text style={styles.title}>{props.item.item.strCategory}</Text>
                <Text>Price: {100 - props.item.index}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cartItem: {
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10
    },
    image: {
        width: 70,
        height: 70,
        marginRight: 20
    },
    title: {
        fontSize: 20
    }
});

export default CartItem;