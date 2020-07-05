import React, {useEffect} from "react";
import { View, StyleSheet, YellowBox, FlatList } from "react-native";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { useDispatch, useSelector } from 'react-redux';

import * as productsActions from '../store/actions/products';
import * as authActions from '../store/actions/auth';
import Card from "../components/Card";

const Home = (props) => {
    YellowBox.ignoreWarnings(['Setting a timer']);
    const dispatch = useDispatch();

    const availableProducts = useSelector(state => state.products.products);

    useEffect(() => {
        setFoodData();
    }, [])

    const setFoodData = async () => {
        let action = productsActions.setFood();
        try {
            await dispatch(action);
        } catch (err) {
            console.log("[ERROR]", err);
        }
    }

    const userLogoutHandler = async () => {
        let action = authActions.logout();
        try {
            await dispatch(action);
            props.navigation.replace("Login");
        } catch (err) {
            console.log("[ERROR]", err);
        }
    }

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title="Cart"
                        iconName="shoppingcart"
                        onPress={() => {props.navigation.navigate("Cart")}}
                    />
                    <Item
                        title="Favorite"
                        iconName="logout"
                        onPress={userLogoutHandler}
                    />
                </HeaderButtons>
            )
        });
    }, [props.navigation]);

    return (
        <View style={styles.container}>
            {
                (availableProducts) ?
                <FlatList 
                    style={styles.list}
                    data={availableProducts}
                    renderItem={(item) => <Card item={item} /> }
                    keyExtractor={(item, index) => index.toString()}
                />
                :
                null
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5"
    },
    list: {
        margin: 20,
        backgroundColor: "#F5F5F5"
    }
});

export default Home;