import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../../context/AuthProvider';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <View style={{ marginTop: 130, width: 260 }}>
                <View style={{ alignItems: 'center' }}>
                    <Image style={styles.logo} source={require('../../assets/logo.png')} />
                </View>
                <View style={{ marginTop: 40 }}>
                    {error && <Text style={{ color: 'red' }}>{error}</Text>}
                    <TextInput
                        style={[styles.inputBox, styles.mt4]}
                        onChangeText={setEmail}
                        value={email}
                        placeholder='Email'
                        placeholderTextColor='gray'
                        textContentType='emailAddress'
                        keyboardType='email-address'
                        autoCapitalize='none'
                    />
                    <TextInput
                        style={[styles.inputBox, styles.mt4]}
                        onChangeText={setPassword}
                        value={password}
                        placeholder='Password'
                        placeholderTextColor='gray'
                        autoCapitalize='none'
                        secureTextEntry={true}
                    />
                </View>
                <TouchableOpacity onPress={() => login(email, password)}
                    style={[styles.loginButton, styles.mt5]}
                >
                    {isLoading && (
                        <ActivityIndicator style={{ marginRight: 18 }} size='small' color='white' />
                    )}
                    <Text style={styles.loginButtonText}>Log In</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 12 }}>
                    <Text style={styles.registerText}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.registerTextLink}>Register</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#1d9bf1',
        alignItems: 'center',
    },
    inputBox: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10
    },
    loginButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0084b3',
        padding: 12,
        borderRadius: 5
    },
    loginButtonText: {
        color: 'white'
    },
    logo: {
        height: 120,
        width: 150,
    },
    mt4: {
        marginTop: 16
    },
    mt5: {
        marginTop: 22
    },
    registerText: {
        fontSize: 12
    },
    registerTextLink: {
        fontSize: 12,
        // color: 'white',
        textDecorationLine: 'underline'
    }
});