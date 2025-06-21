import * as React from 'react';
import { View, Text, Button, StyleSheet, FlatList, Image, TouchableOpacity, Platform } from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

function Home({ navigation }) {
    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'First Item',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
        },
        {
            id: '4',
            title: 'Fourth Item',
        },
        {
            id: '5',
            title: 'Sixth Item',
        },
        {
            id: '6',
            title: 'Seventh Item',
        },
    ];

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
        const { title } = item;
        return (
            <View style={styles.tweetContainer}>
                <TouchableOpacity onPress={() => goToProfile()}>
                    <Image style={styles.avatar} source={{
                        uri: 'https://reactnative.dev/img/tiny_logo.png'
                    }} />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity style={styles.flexRow} onPress={() => goToTweet()}>
                        <Text numberOfLines={1} style={styles.tweetName}>{title}</Text>
                        <Text numberOfLines={1} style={styles.tweetHandle}>@fahimhasan</Text>
                        <Text numberOfLines={1} style={styles.tweetHandle}>9m</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tweetContentContainer}
                        onPress={() => goToTweet()}>
                        <Text style={styles.tweetContent}>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                            Soluta magnam quibusdam eaque repudiandae quasi dignissimos
                            optio praesentium dolores, error quos deleniti similique
                            cupiditate id cum. Veritatis error id et nisi.
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
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={() => <View style={styles.tweetSeparator} />}
            />
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