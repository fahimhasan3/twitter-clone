import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, FlatList } from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Platform } from 'react-native';

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
    {
        id: '7',
        title: 'Fourth Item',
    },
    {
        id: '8',
        title: 'Sixth Item',
    },
    {
        id: '9',
        title: 'Seventh Item',
    },
];

function Profile() {
    const renderItem = ({ item }) => {
        const { title } = item;
        return (
            <View style={{ marginVertical: 20 }}>
                <Text>{title}</Text>
            </View>
        );
    }

    const ProfileHeader = () => (
        <View style={styles.container}>
            <Image
                style={styles.backgroundImage}
                source={{
                    uri: 'https://images.unsplash.com/photo-1749838065282-32db54bed154?q=80&w=1529&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                }} />
            <View style={styles.avatarContainer}>
                <Image style={styles.avatar} source={{
                    uri: 'https://reactnative.dev/img/tiny_logo.png'
                }} />
                <TouchableOpacity style={styles.followButton}>
                    <Text style={styles.followButtonText}>Follow</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.nameContainer}>
                <Text style={styles.profileName}>Fahim Hasan</Text>
                <Text style={styles.profileHandle}>@fahimhasan</Text>
            </View>
            <View style={styles.profileContainer}>
                <Text style={styles.profileContainerText}>
                    Ceo of Ceos. pd, csc, SEO, html, css, js, expert
                </Text>
            </View>
            <View style={styles.locationContainer}>
                <EvilIcons name="location" size={24} color="gray" />
                <Text style={styles.locationContainerText}>
                    Birmingham, United Kingdom
                </Text>
            </View>
            <View style={styles.linkContainer}>
                <TouchableOpacity style={styles.linkItem}
                    onPress={() => { Linking.openURL('https://laracasts.com') }}>
                    <EvilIcons name="link" size={24} color="gray" />
                    <Text style={styles.linkColor}>Laracast.com</Text>
                </TouchableOpacity>
                <View style={[styles.linkItem, { marginLeft: 4 }]}>
                    <EvilIcons name="calendar" size={24} color="gray" />
                    <Text style={styles.textColor}>Joined May 2023</Text>
                </View>
            </View>
            <View style={styles.followContainer}>
                <View style={styles.followItem}>
                    <Text style={styles.followItemNumber}>509</Text>
                    <Text style={styles.followItemLabel}>Following</Text>
                </View>
                <View style={[styles.followItem, { marginLeft: 4 }]}>
                    <Text style={styles.followItemNumber}>2,354</Text>
                    <Text style={styles.followItemLabel}>Followers</Text>
                </View>
            </View>
            <View style={styles.separator}>
            </View>
        </View>
    );

    return (
        <FlatList
            style={styles.container}
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListHeaderComponent={ProfileHeader}
        />
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