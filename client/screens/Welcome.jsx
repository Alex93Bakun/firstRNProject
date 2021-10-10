import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';

import Main from './Main';

import {
    ButtonText,
    InnerContainer,
    Line,
    PageTitle,
    StyledButton,
    StyledFormArea,
    SubTitle,
    WelcomeContainer,
} from '../components/styles';

// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// credentials context
import { CredentialsContext } from '../components/CredentialsContext';
import { useNavigation } from '@react-navigation/native';

const Welcome = () => {
    const navigation = useNavigation();
    // credentials context
    const { storedCredentials, setStoredCredentials } =
        useContext(CredentialsContext);

    const { name, email, photoUrl } = storedCredentials;

    const clearLogin = () => {
        AsyncStorage.removeItem('flowerCribCredentials')
            .then(() => {
                setStoredCredentials('');
            })
            .catch((error) => console.log(error));
    };

    return (
        <>
            <StatusBar style="light" />
            <InnerContainer>
                <WelcomeContainer>
                    <PageTitle welcome={true}>Welcome! Buddy</PageTitle>
                    <SubTitle welcome={true}>{name}</SubTitle>
                    <SubTitle welcome={true}>{email}</SubTitle>

                    <StyledFormArea>
                        <Line />
                        <StyledButton onPress={clearLogin}>
                            <ButtonText>Logout</ButtonText>
                        </StyledButton>
                        <StyledButton
                            onPress={() => navigation.navigate(Main)}
                        >
                            <ButtonText>Start to work</ButtonText>
                        </StyledButton>
                    </StyledFormArea>
                </WelcomeContainer>
            </InnerContainer>
        </>
    );
};

export default Welcome;
