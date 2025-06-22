import React, { useState, useEffect, useRef } from 'react';
import {
    View, Text, Button, StyleSheet, FlatList, Image,
    TouchableOpacity, Platform, ActivityIndicator
} from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { formatDistanceToNowStrict } from 'date-fns';
import locale from 'date-fns/locale/en-US'

import formatDistance from '../helpers/formatDistanceCustom';
import axiosConfig from '../helpers/axiosConfig';

function Home({ route, navigation }) {
    const [tweets, setTweets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [page, setPage] = useState(1);
    const [isAtEndOfScrolling, setIsAtEndOfScrolling] = useState(false);
    const [isFlatListReady, setIsFlatListReady] = useState(false);
    const flatListRef = useRef();

    useEffect(() => {
        getAllTweets();
    }, [page]);

    useEffect(() => {
        if (route?.params?.newTweetAdded && isFlatListReady) {
            getAllTweetsRefresh();
            flatListRef.current.scrollToOffset({
                offset: 0
            });
        }
    }, [route?.params?.newTweetAdded, isFlatListReady]);

    function getAllTweets() {
        axiosConfig
            .get(`/tweets?page=${page}`)
            .then(function (response) {
                if (page > 1) {
                    setTweets([...tweets, ...response.data.data]);
                } else {
                    setTweets(response.data.data);
                }

                if (!response.data.next_page_url) {
                    setIsAtEndOfScrolling(true);
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                setIsLoading(false);
                setIsRefreshing(false);
            });
    }

    function getAllTweetsRefresh() {
        setPage(1);

        axiosConfig
            .get(`/tweets`)
            .then(function (response) {
                setTweets(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                setIsLoading(false);
                setIsRefreshing(false);
                setIsAtEndOfScrolling(false);
            });
    }

    function handleRefresh() {
        setPage(1);
        setIsAtEndOfScrolling(false);
        setIsRefreshing(true);
        getAllTweets();
    }

    function handleEnd() {
        setPage(page + 1);
    }

    function goToProfile() {
        navigation.navigate('Profile');
    }

    function goToTweet(tweetId) {
        navigation.navigate('Tweet', {
            tweetId: tweetId
        });
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
                    <TouchableOpacity style={styles.flexRow} onPress={() => goToTweet(item.id)}>
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
                        onPress={() => goToTweet(item.id)}>
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
                <ActivityIndicator style={{ marginTop: 20 }} size='large' color='gray' />
            ) : (
                <FlatList
                    ref={flatListRef}
                    onLayout={() => setIsFlatListReady(true)}
                    data={tweets}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    ItemSeparatorComponent={() => <View style={styles.tweetSeparator} />}
                    refreshing={isRefreshing}
                    onRefresh={handleRefresh}
                    onEndReached={handleEnd}
                    onEndReachedThreshold={0}
                    ListFooterComponent={() => !isAtEndOfScrolling && (<ActivityIndicator size='large' color='gray' />)}
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