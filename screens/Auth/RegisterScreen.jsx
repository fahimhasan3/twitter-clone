import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


export default function RegisterScreen({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    function register(email, username, password, confirmPassword) {
        Alert.alert('Register logic here');
    }


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
                        onChangeText={setName}
                        value={name}
                        placeholder='Name'
                        placeholderTextColor='gray'
                    />
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
                        onChangeText={setUsername}
                        value={username}
                        placeholder='Username'
                        placeholderTextColor='gray'
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
                    <TextInput
                        style={[styles.inputBox, styles.mt4]}
                        onChangeText={setConfirmPassword}
                        value={confirmPassword}
                        placeholder='Password'
                        placeholderTextColor='gray'
                        autoCapitalize='none'
                        secureTextEntry={true}
                    />
                </View>
                <TouchableOpacity onPress={() => register()}
                    style={[styles.registerButton, styles.mt5]}
                >
                    {isLoading && (
                        <ActivityIndicator style={{ marginRight: 18 }} size='small' color='white' />
                    )}
                    <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 12 }}>
                    <Text style={styles.loginText}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginTextLink}>Login</Text>
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
    registerButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0084b3',
        padding: 12,
        borderRadius: 5
    },
    registerButtonText: {
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
    loginText: {
        fontSize: 12
    },
    loginTextLink: {
        fontSize: 12,
        // color: 'white',
        textDecorationLine: 'underline'
    }
});