import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStack } from './screens/HomeStack';
import { Cart } from './screens/Cart';
import { SearchStack } from './screens/SearchStack';
import { ProfileStack } from './screens/ProfileStack';




const Tab = createBottomTabNavigator();


export const ProductNavigation = (props) => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: () => {
                    if (route.name == "HomeStack") {
                        return <Image source={require('../../assets/images/home.png')} />
                    } else if (route.name == "SearchStack") {
                        return <Image source={require('../../assets/images/search.png')} />
                    } else if (route.name == "Cart") {
                        return <Image source={require('../../assets/images/cart.png')} />
                    } else if (route.name == "ProfileStack") {
                        return <Image source={require('../../assets/images/user.png')} />
                    }
                },
                tabBarLabel: ({ focused }) => {
                    if (route.name == "HomeStack" && focused) {
                        return <Image source={require('../../assets/images/dot.png')} />
                    } else if (route.name == "SearchStack" && focused) {
                        return <Image source={require('../../assets/images/dot.png')} />
                    } else if (route.name == "Cart" && focused) {
                        return <Image source={require('../../assets/images/dot.png')} />
                    } else if (route.name == "ProfileStack" && focused) {
                        return <Image source={require('../../assets/images/dot.png')} />
                    }
                    return null;
                },
                headerShown: false,
            })}

        >
            <Tab.Screen name="HomeStack" component={HomeStack} />
            <Tab.Screen name="SearchStack" component={SearchStack} />
            <Tab.Screen name="Cart" component={Cart} />
            <Tab.Screen name="ProfileStack" component={ProfileStack} />
        </Tab.Navigator>
    )
}




