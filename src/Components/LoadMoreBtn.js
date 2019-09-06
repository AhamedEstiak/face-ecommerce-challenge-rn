import React, {Component} from 'react';
import {Text, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Container from "./Container";

const {width, height} = Dimensions.get('window');

const LoadMoreBtn = props => (
    <Container>
        <TouchableOpacity activeOpacity={0.8} style={styles.sortBtnStyle}
            onPress={props.onPressHandler}
        >
            <Text>Load more...</Text>
            <MaterialIcons name='sort' size={20} color='#fff'/>
        </TouchableOpacity>
    </Container>
);

const styles = StyleSheet.create({
    sortBtnStyle: {
        // justifyContent: 'flex-end',
        // marginLeft: 30
    }
});

export default LoadMoreBtn;
