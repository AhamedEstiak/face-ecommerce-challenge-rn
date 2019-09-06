import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from "prop-types";
import formatMoney from '../Utils/FormatMoney';
import Icon from 'react-native-vector-icons/Ionicons';

const ListItem = ({item, isShowAd}) => {
    // console.log('isShowAd', isShowAd);

    let date = new Date(item.date);
    let options = {
        weekday: "long", year: "numeric", month: "short",
        day: "numeric",
        // hour: "2-digit", minute: "2-digit"
    };

    let today = new Date();

    // it is 7 days in the past.
    let pastDate = today.getDate() - 7;

    // console.log('pastdate', pastDate);
    // console.log('date', date.getDate());

    let delta = Math.round((+new Date - date) / 1000);

    let minute = 60,
        hour = minute * 60,
        day = hour * 24,
        week = day * 7;

    let formatTime;

    if (delta < 30) {
        formatTime = 'just then.';
    } else if (delta < minute) {
        formatTime = delta + ' seconds ago.';
    } else if (delta < 2 * minute) {
        formatTime = 'a minute ago.'
    } else if (delta < hour) {
        formatTime = Math.floor(delta / minute) + ' minutes ago.';
    } else if (Math.floor(delta / hour) == 1) {
        formatTime = '1 hour ago.'
    } else if (delta < day) {
        formatTime = Math.floor(delta / hour) + ' hours ago.';
    } else if (delta < day * 2) {
        formatTime = 'yesterday';
    }else if (delta < day * 3) {
        formatTime = '2 days ago';
    }else if (delta < day * 4) {
        formatTime = '3 days ago';
    }else if (delta < day * 5) {
        formatTime = '4 days ago';
    }else if (delta < day * 6) {
        formatTime = '5 days ago';
    }else if (delta < day * 7) {
        formatTime = '6 days ago';
    }

    //Log the date to our web console.


    return (
        <View style={styles.container}>
            <Text style={{fontSize: item.size ? item.size : 20}}>{item.face && item.face}</Text>
            <View style={styles.bottomContainer}>
                <Icon name='ios-time' size={20}/>
                <Text style={{marginLeft: 10, marginRight: 20}}>{pastDate ? date.toLocaleDateString("en-us", options) : formatTime}</Text>
                <Text>{item.price && formatMoney(item.price)}</Text>
            </View>
        </View>
    )
};

ListItem.propTypes = {
    item: PropTypes.object,
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        // width: '90%',
        padding: 20,
        backgroundColor: "#dfdfdf",
        borderRadius: 8,
        height: 100
    },
    fontStyle: {
        // fontSize: 26
    },
    bottomContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default ListItem;
