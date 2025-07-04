import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, ActivityIndicator } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { format } from 'date-fns';

import axiosConfig from '../helpers/axiosConfig';

function Tweet({ route, navigation }) {
    const [tweet, setTweet] = useState();
    const [isLoading, setIsLoading] = useState(true);

    function goToProfile(userId) {
        navigation.navigate('Profile', {
            user_id: userId
        });
    }

    useEffect(() => {
        getTweet();
    }, []);

    function getTweet() {
        axiosConfig
            .get(`/tweets/${route.params.tweetId}`)
            .then(function (response) {
                setTweet(response.data);
                setIsLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator style={{ marginTop: 20 }} size='large' color='gray' />
            ) : (
                <>
                    <View style={styles.profileContainer}>
                        <TouchableOpacity style={styles.flexRow}
                            onPress={() => goToProfile(tweet.user.id)}>
                            <Image style={styles.avatar} source={{
                                uri: tweet.user.avatar
                            }} />
                            <View>
                                <Text style={styles.tweetName}>{tweet.user.name}</Text>
                                <Text style={styles.tweetHandle}>@{tweet.user.username}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Entypo name="dots-three-vertical" size={24} color="gray" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.tweetContentContainer}>
                        <Text style={styles.tweetContent}>
                            {tweet.body}
                        </Text>
                        <View style={styles.tweetTimestampContainer}>
                            <Text style={styles.tweetTimestampText}>
                                {format(new Date(tweet.created_at), 'h:mm a')}
                            </Text>
                            <Text style={styles.tweetTimestampText}>&middot;</Text>
                            <Text style={styles.tweetTimestampText}>
                                {format(new Date(tweet.created_at), 'd MMM.yy')}
                            </Text>
                            <Text style={styles.tweetTimestampText}>&middot;</Text>
                            <Text style={[styles.tweetTimestampText, styles.linkColor]}>
                                Twitter for Samsung
                            </Text>
                        </View>
                    </View>
                    <View style={styles.tweetEngagement}>
                        <View style={[styles.flexRow, { gap: 3 }]}>
                            <Text style={styles.tweetEngagementNumber}>628</Text>
                            <Text style={styles.tweetEngagementLabel}>Retweets</Text>
                        </View>
                        <View style={[styles.flexRow, { gap: 3 }]}>
                            <Text style={styles.tweetEngagementNumber}>38</Text>
                            <Text style={styles.tweetEngagementLabel}>Quote Tweets</Text>
                        </View>
                        <View style={[styles.flexRow, { gap: 3 }]}>
                            <Text style={styles.tweetEngagementNumber}>2934</Text>
                            <Text style={styles.tweetEngagementLabel}>Likes</Text>
                        </View>
                    </View>
                    <View style={[styles.tweetEngagement, styles.spaceAround]}>
                        <TouchableOpacity>
                            <EvilIcons name="comment" size={32} color="gray" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <EvilIcons name="retweet" size={32} color="gray" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <EvilIcons name="heart" size={32} color="gray" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <EvilIcons
                                name={Platform.OS === 'ios' ? 'share-apple' : 'share-google'}
                                size={32} color="gray" />
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    avatar: {
        width: 50,
        height: 50,
        marginRight: 8,
        borderRadius: 25
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },
    profileContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 10
    },
    spaceAround: {
        justifyContent: 'space-around'
    },
    tweetContentContainer: {
        paddingHorizontal: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb'
    },
    tweetContent: {
        fontSize: 20,
        lineHeight: 30
    },
    tweetTimestampContainer: {
        flexDirection: 'row',
        marginTop: 12,
    },
    tweetTimestampText: {
        color: 'gray',
        marginRight: 6,
    },
    linkColor: {
        color: '#1d9bf1'
    },
    tweetEngagement: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 12,
        gap: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb'
    },
    tweetEngagementNumber: {
        fontWeight: 'bold',
    },
    tweetEngagementLabel: {
        color: 'gray',
    },
    tweetHandle: {
        fontWeight: 'bold',
        color: 'gray',
    },
    tweetName: {
        fontWeight: 'bold',
        color: '#222222'
    },
});

export default Tweet;