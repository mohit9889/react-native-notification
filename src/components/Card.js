import React from "react";
import { StyleSheet, View, Text, Image, Button } from "react-native";
import { useDispatch, useSelector } from 'react-redux';

import * as productsActions from '../store/actions/products';

const Card = (props) => {
    const dispatch = useDispatch();
    const availableProducts = useSelector(state => state.products.products);
    
    
    const addFoodData = () => {
        const index = props.item.index;
        let action = productsActions.addFood(availableProducts[index]);
        dispatch(action);
    }

    return (
        <View style={styles.card}>
            <Image style={styles.image} source={{ uri: props.item.item.strCategoryThumb }} />
            <View style={styles.group}>
                <View style={{flexDirection: "column"}}>
                    <Text style={styles.title}>{props.item.item.strCategory}</Text>
                    <Text>Price: {100 - props.item.index}</Text>
                </View>
                <Button onPress={addFoodData} color="black" title="ADD TO CART" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 15,
        backgroundColor: "white",
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,  
        marginBottom: 20
    },
    group: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        alignItems: "center"
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
    },
    image: {
        height: 200,
        width: "100%",
        resizeMode: "cover"
    },
});

export default Card;