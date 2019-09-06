import React, {Component} from 'react';
import {View, Text, Dimensions, StyleSheet, TouchableOpacity, Picker} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from "./colors";

const {width, height} = Dimensions.get('window');
const LogoHeight = Math.round(height / 20), LogoWidth = Math.round(LogoHeight * 2.8);

const Header = props => (
    <View style={styles.container}>
        <Text style={styles.textStyle}>Product List</Text>
        <View style={styles.sortBtnStyle}>

            <Picker
                mode="dropdown"
                selectedValue={props.sortBy}
                style={{height: 50, width: 120,}}
                itemStyle={styles.itemStyle}
                onValueChange={(itemValue, itemIndex) =>
                    props.sortingHandler(itemValue)
                }>
                <Picker.Item label="Ascending" value="ascending" />
                <Picker.Item label="Size" value="size" />
                <Picker.Item label="Price" value="price" />
                <Picker.Item label="Id" value="id" />
            </Picker>
        </View>

    </View>
);

const styles = StyleSheet.create({
    container: {
        height: '10%',
        flexDirection: 'row',
        // backgroundColor: '#dfdfdf',
        alignItems: 'center',
        // justifyContent: 'center',
        zIndex: 5,
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.primary.borderColor
    },
    textStyle: {
        color: '#000',
        fontSize: 24,
        alignSelf: 'flex-start'
    },
    itemStyle: {
      color: '#fff'
    },
    sortBtnStyle: {
        // justifyContent: 'flex-end',
        marginLeft: 30,
        // alignSelf: 'flex-end'
    }
});

export default Header;
