import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import EvilIcons from '@expo/vector-icons/EvilIcons';

function Tweet() {
    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <TouchableOpacity style={styles.flexRow}>
                    <Image style={styles.avatar} source={{
                        uri: 'https://reactnative.dev/img/tiny_logo.png'
                    }} />
                    <View>
                        <Text style={styles.tweetName}>Andre Galvao</Text>
                        <Text style={styles.tweetHandle}>@andreGalvaio</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Entypo name="dots-three-vertical" size={24} color="gray" />
                </TouchableOpacity>
            </View>
            <View style={styles.tweetContentContainer}>
                <Text style={styles.tweetContent}>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Sit porro corporis corrupti earum aperiam quod, necessitatibus dolor.
                    Fuga rerum atque dicta dolor veniam veritatis enim, accusamus iure,
                    adipisci vero ipsa?
                </Text>
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