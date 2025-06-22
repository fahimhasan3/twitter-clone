import React, { useState, useEffect } from 'react';
import {
    View, Text, Button, StyleSheet, FlatList, Image,
    TouchableOpacity, Platform, ActivityIndicator
} from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import { formatDistanceToNowStrict } from 'date-fns';
import locale from 'date-fns/locale/en-US'
import formatDistance from '../helpers/formatDistanceCustom';

function Home({ navigation }) {
    const [tweets, setTweets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        getAllTweets();
    }, []);

    function getAllTweets() {
        axios.get('https://a063-2a0a-ef40-b9e-1701-289f-5dd6-f306-440e.ngrok-free.app/api/tweets')
            .then(function (response) {
                setTweets(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                setIsLoading(false);
                setIsRefreshing(false);
            });
    }

    function handleRefresh() {
        setIsRefreshing(true);
        getAllTweets();
    }

    function goToProfile() {
        navigation.navigate('Profile');
    }

    function goToTweet() {
        navigation.navigate('Tweet');
    }

    function goToNewTweet() {
        navigation.navigate('New Tweet');
    }

    const renderItem = ({ item }) => {
        const { user, body, created_at } = item;

        return (
            <View style={styles.tweetContainer}>
                <TouchableOpacity onPress={() => goToProfile()}>
                    <Image style={styles.avatar} source={{
                        uri: user.avatar
                    }} />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity style={styles.flexRow} onPress={() => goToTweet()}>
                        <Text numberOfLines={1} style={styles.tweetName}>{user.name}</Text>
                        <Text numberOfLines={1} style={styles.tweetHandle}>@{user.username}</Text>
                        <Text numberOfLines={1} style={styles.tweetHandle}>
                            {formatDistanceToNowStrict(new Date(created_at), {
                                locale: {
                                    ...locale,
                                    formatDistance,
                                },
                            })}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tweetContentContainer}
                        onPress={() => goToTweet()}>
                        <Text style={styles.tweetContent}>
                            {body}
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.tweetEngagement}>
                        <TouchableOpacity style={styles.flexRow}>
                            <EvilIcons name="comment" size={22} color="gray" />
                            <Text style={[styles.textGray, { marginLeft: -10 }]}>100</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.flexRow, styles.ml4]}>
                            <EvilIcons name="retweet" size={22} color="gray" />
                            <Text style={[styles.textGray, { marginLeft: -10 }]}>44</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.flexRow}>
                            <EvilIcons name="heart" size={22} color="gray" />
                            <Text style={[styles.textGray, { marginLeft: -10 }]}>2087</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.flexRow}>
                            <EvilIcons
                                name={Platform.OS === 'ios' ? 'share-apple' : 'share-google'}
                                size={22}
                                color="gray" />
                            <Text style={[styles.textGray, { marginLeft: -10 }]}>2087</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator style={{ marginTop: 8 }} size='large' />
            ) : (
                <FlatList
                    data={tweets}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    ItemSeparatorComponent={() => <View style={styles.tweetSeparator} />}
                    refreshing={isRefreshing}
                    onRefresh={handleRefresh}
                />
            )}
            <TouchableOpacity style={styles.floatingButton}
                onPress={() => goToNewTweet()}>
                <AntDesign name="plus" size={26} color="white" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    avatar: {
        width: 42,
        height: 42,
        marginRight: 8,
        borderRadius: 21
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        gap: 10
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },
    floatingButton: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: '#1d9bf1',
        position: 'absolute',
        bottom: 20,
        right: 15,
    },
    textGray: {
        color: 'gray'
    },
    tweetName: {
        fontWeight: 'bold'
    },
    tweetHandle: {
        color: 'gray'
    },
    tweetContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 12,
    },
    tweetContentContainer: {
        marginTop: 4,
    },
    tweetContent: {
        lineHeight: 20,
    },
    tweetEngagement: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
        gap: 10
    },
    tweetSeparator: {
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb'
    }
});

export default Home;