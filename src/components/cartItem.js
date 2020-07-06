import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import HeaderButton from './HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';

import * as productsActions from '../store/actions/products';

const CartItem = (props) => {
    const dispatch = useDispatch();

    const removeFoodData = (index) => {
        let action = productsActions.removeFood(index);
        dispatch(action);
        console.log("Product Removed!");
    }

    return (
        <View style={styles.cartItem}>
            <View style={styles.content}>
                <Image style={styles.image} source={{ uri: props.item.item.strCategoryThumb }} />
                <View style={styles.group}>
                    <Text style={styles.title}>{props.item.item.strCategory}</Text>
                    <Text>Price: {100 - props.item.index}</Text>
                </View>
            </View>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="delete"
                    iconName="delete"
                    onPress={() => { removeFoodData(props.item.item.idCategory) }}
                />
            </HeaderButtons>
        </View>
    );
}

const styles = StyleSheet.create({
    cartItem: {
        width: "100%",
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        justifyContent: 'space-between'
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 70,
        height: 70,
        marginRight: 20
    },
    title: {
        fontSize: 20
    },
});

export default CartItem;