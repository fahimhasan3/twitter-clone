import React from 'react';
import {
    View, Text, Image,
    TouchableOpacity, Platform,
    StyleSheet
} from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { formatDistanceToNowStrict } from 'date-fns';
import locale from 'date-fns/locale/en-US';

import formatDistance from '../helpers/formatDistanceCustom';
import { useNavigation } from '@react-navigation/native';

const RenderItem = ({ item }) => {
    const { user, body, created_at } = item;
    const navigation = useNavigation();

    function goToProfile(userId) {
        navigation.navigate('Profile', {
            user_id: userId
        });
    }

    function goToTweet(tweetId) {
        navigation.navigate('Tweet', {
            tweetId: tweetId
        });
    }

    return (
        <View style={styles.tweetContainer}>
            <TouchableOpacity onPress={() => goToProfile(user.id)}>
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
});

export default RenderItem;