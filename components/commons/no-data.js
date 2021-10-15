import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { primary, white } from '../../utils/colors'
import { StyleSheet, Text, View } from 'react-native'

const NoData = ({ message }) => {
    return (
        <View style={styles.emptyDeck}>
            <Ionicons style={{ color: primary }} name="alert-circle-outline" size={50} color="black" />
            <Text style={{ color: primary }}>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    emptyDeck: {
        flex: 1,
        backgroundColor: white,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default NoData
