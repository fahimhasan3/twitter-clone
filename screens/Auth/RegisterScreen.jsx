import React, { useContext, useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';

export default function RegisterScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>This is the register screen</Text>
            <Button
                onPress={() => navigation.navigate('Login')}
                title='Go To Login Screen' />
        </View>
    );
}