import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//Importing Screens
import Login from "../screens/login";
import Signup from "../screens/signup";
import Home from "../screens/home";
import Cart from "../screens/cart";

//Navigation
const AuthNavigation = createStackNavigator();

const Navigation = () => {

    return(
        <NavigationContainer>
        <AuthNavigation.Navigator>
          <AuthNavigation.Screen name="Login" component={Login} options={{headerShown: false}} />
          <AuthNavigation.Screen name="Signup" component={Signup} options={{headerShown: false}} />
          <AuthNavigation.Screen name="Home" component={Home} />
          <AuthNavigation.Screen name="Cart" component={Cart} />
        </AuthNavigation.Navigator>
      </NavigationContainer>
    );
}

export default Navigation;