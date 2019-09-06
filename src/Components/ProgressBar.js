import React from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet,
    Platform
} from 'react-native';
import colors from "./colors";

const ProgressBar = () => (
    <View style={styles.container}>
        <View style={styles.progressBar}>
            <ActivityIndicator size="large" color={Platform.OS === "ios" ? "white" : colors.primary.btnGreen} />
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    progressBar: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default ProgressBar;
