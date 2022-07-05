import React, {useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ProductNavigation } from '../product/ProductNavigation';
import { UserNavigation } from '../user/UserNavigation';
import { UserContext } from '../user/UserContext';

export const Navigation = () => {
    const {isLoggedIn} = useContext(UserContext);
    return (
        <NavigationContainer>
            {
                isLoggedIn == true ?
                    <ProductNavigation /> :
                    <UserNavigation />

            }
        </NavigationContainer>
    )
}



