import React, { useEffect, useRef, useState } from 'react';
import {
    View, Text, StyleSheet, Image, TouchableOpacity,
    Linking, FlatList, ActivityIndicator
} from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { format } from 'date-fns';

import axiosConfig from '../helpers/axiosConfig';
import RenderItem from '../components/RenderItem';

function Profile({ route, navigation }) {
    const [user, setUser] = useState();
    const [userTweets, setUserTweets] = useState();

    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingTweets, setIsLoadingTweets] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [page, setPage] = useState(1);
    const [isAtEndOfScrolling, setIsAtEndOfScrolling] = useState(false);
    const flatListRef = useRef();

    useEffect(() => {
        getUserProfile();
        getUserTweets();
    }, [page]);

    function getUserProfile() {
        axiosConfig
            .get(`/users/${route.params.user_id}`)
            .then(function (response) {
                setUser(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                setIsLoading(false);
            });
    }

    function getUserTweets() {
        axiosConfig
            .get(`/users/${route.params.user_id}/tweets?page=${page}`)
            .then(function (response) {
                if (page > 1) {
                    setUserTweets([...userTweets, ...response.data.data]);
                } else {
                    setUserTweets(response.data.data);
                }

                if (!response.data.next_page_url) {
                    setIsAtEndOfScrolling(true);
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                setIsLoadingTweets(false);
                setIsRefreshing(false);
            });
    }

    function handleRefresh() {
        setPage(1);
        setIsAtEndOfScrolling(false);
        setIsRefreshing(true);
        getUserTweets();
    }

    function handleEnd() {
        setPage(page + 1);
    }

    const ProfileHeader = () => (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator style={{ marginTop: 20 }} size='large' color='gray' />
            ) : (
                <>
                    <Image
                        style={styles.backgroundImage}
                        source={{
                            uri: 'https://images.unsplash.com/photo-1743397015934-3aa9c6199baf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                        }} />
                    <View style={styles.avatarContainer}>
                        <Image style={styles.avatar} source={{
                            uri: user.avatar
                        }} />
                        <TouchableOpacity style={styles.followButton}>
                            <Text style={styles.followButtonText}>Follow</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.profileName}>{user.name}</Text>
                        <Text style={styles.profileHandle}>@{user.username}</Text>
                    </View>
                    <View style={styles.profileContainer}>
                        <Text style={styles.profileContainerText}>
                            {user.profile}
                        </Text>
                    </View>
                    <View style={styles.locationContainer}>
                        <EvilIcons name="location" size={24} color="gray" />
                        <Text style={styles.locationContainerText}>
                            {user.location}
                        </Text>
                    </View>
                    <View style={styles.linkContainer}>
                        <TouchableOpacity style={styles.linkItem}
                            onPress={() => { Linking.openURL(user.link) }}>
                            <EvilIcons name="link" size={24} color="gray" />
                            <Text style={styles.linkColor}>{user.linkText}</Text>
                        </TouchableOpacity>
                        <View style={[styles.linkItem, { marginLeft: 16 }]}>
                            <EvilIcons name="calendar" size={24} color="gray" />
                            <Text style={styles.textColor}>Joined {format(new Date(user.created_at), 'MMM yyyy')}</Text>
                        </View>
                    </View>
                    <View style={styles.followContainer}>
                        <View style={styles.followItem}>
                            <Text style={styles.followItemNumber}>509</Text>
                            <Text style={styles.followItemLabel}>Following</Text>
                        </View>
                        <View style={[styles.followItem, { marginLeft: 16 }]}>
                            <Text style={styles.followItemNumber}>2,354</Text>
                            <Text style={styles.followItemLabel}>Followers</Text>
                        </View>
                    </View>
                    <View style={styles.separator}>
                    </View>
                </>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={userTweets}
                renderItem={props => <RenderItem {...props} />}
                keyExtractor={item => item.id.toString()}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListHeaderComponent={ProfileHeader}
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                onEndReached={handleEnd}
                onEndReachedThreshold={0}
                ListFooterComponent={() => !isAtEndOfScrolling && (<ActivityIndicator size='large' color='gray' />)}
                scrollIndicatorInsets={{ right: 1 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 4,
        borderColor: 'white',
        marginTop: -34
    },
    avatarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 10,
    },
    backgroundImage: {
        width: 800,
        height: 120
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    followButton: {
        backgroundColor: 'black',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 24,
    },
    followButtonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    followContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 12,
        gap: 10
    },
    followItem: {
        flexDirection: 'row',
        gap: 3
    },
    followItemLabel: {

    },
    followItemNumber: {
        fontWeight: 'bold'
    },
    linkContainer: {
        flexDirection: 'row',
        gap: 10,
        paddingHorizontal: 10,
        marginTop: 4,
    },
    linkContainerText: {

    },
    linkItem: {
        flexDirection: 'row'
    },
    linkColor: {
        color: '#1d9bf1'
    },
    locationContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginTop: 12
    },
    locationContainerText: {
        color: 'gray'
    },
    nameContainer: {
        paddingHorizontal: 10,
        paddingVertical: 2
    },
    profileContainer: {
        paddingHorizontal: 10,
        marginTop: 8
    },
    profileContainerText: {
        lineHeight: 22
    },
    profileHandle: {
        color: 'gray',
        marginTop: 1,
    },
    profileName: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb'
    },
    textColor: {
        color: 'gray'
    },
});

export default Profile;