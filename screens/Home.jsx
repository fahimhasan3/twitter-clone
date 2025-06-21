import * as React from 'react';
import { View, Text, Button } from 'react-native';

function Home({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <Text>Home Screen</Text>
            <Button title='New Tweet' onPress={() => navigation.navigate('New Tweet')} />
            <Button title='Tweet' onPress={() => navigation.navigate('Tweet')} />
            <Button title='Profile' onPress={() => navigation.navigate('Profile')} />
        </View>
    );
}

export default Home;