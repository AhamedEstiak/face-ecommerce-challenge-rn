import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "./colors";

const Container = props => {

    return (
        <View style={[styles.container, {...props.style}]}>
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default Container;
