import React, { useState } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ActivityIndicator,
    Alert
} from 'react-native';
import axiosConfig from '../helpers/axiosConfig';

function NewTweet({ navigation }) {
    const [tweet, setTweet] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function sendTweet() {
        if (tweet.length === 0) {
            Alert.alert('Please enter a tweet')
            return;
        }

        setIsLoading(true);
        axiosConfig
            .post(`/tweets`, {
                body: tweet
            })
            .then(function (response) {
                navigation.navigate('Tab', {
                    screen: 'Home1',
                    params: { newTweetAdded: response.data }
                });
            })
            .catch(function (error) {
                console.log(error);
            }).finally(function () {
                setIsLoading(false);
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.tweetButtonContainer}>
                <Text style={tweet.length > 250 ? styles.textRed : styles.textGray}>
                    Characters left: {280 - tweet.length}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {isLoading && (
                        <ActivityIndicator
                            size='small'
                            color='gray'
                            style={{ marginRight: 8 }} />
                    )}
                    <TouchableOpacity
                        disabled={isLoading}
                        style={styles.TweetButton}
                        onPress={() => sendTweet()}
                    >
                        <Text style={styles.TweetButtonText}>Tweet</Text>
                    </TouchableOpacity>
                </View>
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