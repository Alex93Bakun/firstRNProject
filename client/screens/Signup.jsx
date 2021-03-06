import React, { useContext, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { Ionicons, Octicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'

import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { CredentialsContext } from '../components/CredentialsContext';

import {
    ButtonText,
    Colors,
    ExtraText,
    ExtraView,
    InnerContainer,
    LeftIcon,
    Line,
    MsgBox,
    PageTitle,
    RightIcon,
    StyledButton,
    StyledContainer,
    StyledFormArea,
    StyledInputLabel,
    StyledTextInput,
    SubTitle,
    TextLink,
    TextLinkContent,
} from '../components/styles';

const { darkLight, brand, primary } = Colors;

const Signup = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date(2000, 0, 1));
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const [dob, setDob] = useState();

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        setDob(currentDate);
    };

    const showDatePicker = () => {
        setShow('date');
    };

    const { storedCredentials, setStoredCredentials } =
        useContext(CredentialsContext);

    const handleSignup = (credentials, setSubmitting) => {
        handleMessage(null);
        const url =
            'https://first-rn-project.herokuapp.com/api/user/signup/';
        axios
            .post(url, credentials)
            .then((response) => {
                const result = response.data;
                const { status, message, data } = result;

                if (status !== 'SUCCESS') {
                    handleMessage(message, status);
                } else {
                    persistLogin({ ...data }, message, status);
                }
                setSubmitting(false);
            })
            .catch((error) => {
                setSubmitting(false);
                handleMessage(
                    'An error occurred. Check your network and try again'
                );
                console.log(error.toJSON());
            });
    };

    const handleMessage = (message, type = '') => {
        setMessage(message);
        setMessageType(type);
    };

    const persistLogin = (credentials, message, status) => {
        AsyncStorage.setItem(
            'flowerCribCredentials',
            JSON.stringify(credentials)
        )
            .then(() => {
                handleMessage(message, status);
                setStoredCredentials(credentials);
            })
            .catch((error) => {
                handleMessage('Persisting login failed');
                console.log(error);
            });
    };

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>
                    <PageTitle>Flower Crib</PageTitle>
                    <SubTitle>Account Signup</SubTitle>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode="date"
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                            style={{
                                backgroundColor: 'yellow',
                            }}
                        />
                    )}

                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            dateOfBirth: '',
                            password: '',
                            confirmPassword: '',
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            values = { ...values, dateOfBirth: dob };
                            if (
                                values.email === '' ||
                                values.password === '' ||
                                values.name === '' ||
                                values.dateOfBirth === '' ||
                                values.confirmPassword === ''
                            ) {
                                handleMessage('Please fill in all fields');
                                setSubmitting(false);
                            } else if (
                                values.password !== values.confirmPassword
                            ) {
                                handleMessage('Passwords do not match');
                                setSubmitting(false);
                            } else {
                                handleSignup(values, setSubmitting);
                            }
                        }}
                    >
                        {({
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            values,
                            isSubmitting,
                        }) => (
                            <StyledFormArea>
                                <MyTextInput
                                    label="Full Name"
                                    placeholder="Richard Barnes"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                    icon="person"
                                />
                                <MyTextInput
                                    label="Email Address"
                                    placeholder="andyj@gmail.com"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType="email-address"
                                    icon="mail"
                                />
                                <MyTextInput
                                    label="Date of Birth"
                                    placeholder="YYYY - MM - DD"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('dateOfBirth')}
                                    onBlur={handleBlur('dateOfBirth')}
                                    value={dob ? dob.toDateString() : ''}
                                    icon="calendar"
                                    editable={false}
                                    isDate={true}
                                    showDatePicker={showDatePicker}
                                />
                                <MyTextInput
                                    label="Password"
                                    placeholder="* * * * * * * *"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    secureTextEntry={hidePassword}
                                    icon="lock"
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}
                                />
                                <MyTextInput
                                    label="Confirm Password"
                                    placeholder="* * * * * * * *"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange(
                                        'confirmPassword'
                                    )}
                                    onBlur={handleBlur('confirmPassword')}
                                    value={values.confirmPassword}
                                    secureTextEntry={hidePassword}
                                    icon="lock"
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}
                                />
                                <MsgBox type={messageType}>{message}</MsgBox>

                                {!isSubmitting && (
                                    <StyledButton onPress={handleSubmit}>
                                        <ButtonText>Signup</ButtonText>
                                    </StyledButton>
                                )}
                                {isSubmitting && (
                                    <StyledButton disabled={true}>
                                        <ActivityIndicator
                                            size="large"
                                            color={primary}
                                        />
                                    </StyledButton>
                                )}

                                <Line />
                                <ExtraView>
                                    <ExtraText>
                                        Already have an account?{' '}
                                    </ExtraText>
                                    <TextLink
                                        onPress={() =>
                                            navigation.navigate('Login')
                                        }
                                    >
                                        <TextLinkContent>Login</TextLinkContent>
                                    </TextLink>
                                </ExtraView>
                            </StyledFormArea>
                        )}
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
};

const MyTextInput = ({
    label,
    icon,
    isPassword,
    hidePassword,
    setHidePassword,
    isDate,
    showDatePicker,
    ...props
}) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>

            {isDate && (
                <TouchableOpacity onPress={showDatePicker}>
                    <StyledTextInput {...props} />
                </TouchableOpacity>
            )}
            {!isDate && <StyledTextInput {...props} />}

            {isPassword && (
                <RightIcon
                    onPress={() => {
                        setHidePassword(!hidePassword);
                    }}
                >
                    <Ionicons
                        name={hidePassword ? 'md-eye-off' : 'md-eye'}
                        size={30}
                        color={darkLight}
                    />
                </RightIcon>
            )}
        </View>
    );
};

export default Signup;
