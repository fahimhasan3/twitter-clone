import * as React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';

function NewTweet({ navigation }) {
    const [tweet, setTweet] = useState('');

    function sendTweet() {
        navigation.navigate('Tab');
    }

    return (
        <View style={styles.container}>
            <View style={styles.tweetButtonContainer}>
                <Text style={tweet.length > 250 ? styles.textRed : styles.textGray}>
                    Characters left: {280 - tweet.length}
                </Text>
                <TouchableOpacity
                    style={styles.TweetButton}
                    onPress={() => sendTweet()}
                >
                    <Text style={styles.TweetButtonText}>Tweet</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.tweetBoxContainer}>
                <Image style={styles.avatar} source={{
                    uri: 'https://reactnative.dev/img/tiny_logo.png'
                }} />
                <TextInput
                    style={styles.input}
                    onChangeText={setTweet}
                    value={tweet}
                    placeholder="What's happening"
                    placeholderTextColor='gray'
                    multiline
                    maxLength={280}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    textGray: {
        color: 'gray'
    },
    textRed: {
        color: 'red'
    },
    ml4: {
        marginLeft: 16,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 10,
    },
    tweetButtonContainer: {
        flexDirection: 'row',
        paddingHorizontal: 6,
        paddingVertical: 6,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    TweetButton: {
        backgroundColor: '#1d9bf1',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 24,
    },
    TweetButtonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    tweetBoxContainer: {
        flexDirection: 'row',
        paddingTop: 10,
    },
    avatar: {
        width: 42,
        height: 42,
        marginRight: 8,
        marginTop: 10,
        borderRadius: 21
    },
    input: {
        fontSize: 18,
        lineHeight: 28,
        padding: 10,
    }
});

export default NewTweet;