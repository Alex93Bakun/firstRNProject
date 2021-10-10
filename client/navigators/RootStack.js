import React from 'react';

import { Colors } from '../components/styles';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Welcome from '../screens/Welcome';
import Main from '../screens/Main';
import { CredentialsContext } from '../components/CredentialsContext';

const { darkLight, brand, primary, tertiary, secondary } = Colors;

const Stack = createStackNavigator();

const RootStack = () => {
    return (
        <CredentialsContext.Consumer>
            {({ storedCredentials }) => (
                <NavigationContainer style={{ backgroundColor: 'red' }}>
                    <Stack.Navigator
                        screenOptions={{
                            headerStyle: {
                                backgroundColor: 'transparent',
                            },
                            headerTintColor: tertiary,
                            headerTransparent: true,
                            headerTitle: '',
                            headerLeftContainerStyle: {
                                paddingLeft: 20,
                            },
                        }}
                    >
                        {storedCredentials ? (
                            <Stack.Screen
                                options={{
                                    headerTintColor: primary,
                                }}
                                name="Welcome"
                                component={Welcome}
                            />
                        ) : (
                            <>
                                <Stack.Screen name="Login" component={Login} />
                                <Stack.Screen
                                    name="Signup"
                                    component={Signup}
                                />
                            </>
                        )}
                        <Stack.Screen name="Main" component={Main} />
                    </Stack.Navigator>
                </NavigationContainer>
            )}
        </CredentialsContext.Consumer>
    );
};

export default RootStack;
