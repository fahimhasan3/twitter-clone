import React, { useContext, useEffect, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { AuthContext } from '../../context/AuthProvider';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>This is the login screen</Text>
            <TextInput
                onChangeText={setEmail}
                value={email}
                placeholder='Email'
                placeholderTextColor='gray'
                textContentType='emailAddress'
                keyboardType='email-address'
                autoCapitalize='none'
            />
            <TextInput
                onChangeText={setPassword}
                value={password}
                placeholder='Password'
                placeholderTextColor='gray'
                autoCapitalize='none'
                secureTextEntry={true}
            />
            <Button
                onPress={() => login(email, password)}
                title='Log In' />
            <Button
                onPress={() => navigation.navigate('Register')}
                title='Go To Register Screen' />
        </View>
    );
}