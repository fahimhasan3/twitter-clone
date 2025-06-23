import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from '../context/AuthProvider';

function Settings() {
    const { logout } = useContext(AuthContext);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Settings Screen</Text>
            <Button title='Log Out' onPress={logout} />
        </View>
    );
}

export default Settings;