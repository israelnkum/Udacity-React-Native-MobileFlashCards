import React from 'react'
import { Text, View, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { primary, white } from '../../utils/colors'

const DeckItem = ({ title, cardCount, navigation, routeName = null }) => {

    const navigate = () => {
        routeName === null && navigation.navigate('Deck Detail', { title: title })
    }

    return (
        <TouchableOpacity onPress={ navigate }>
            <View style={styles.deckItem}>
                <View>
                    <Text style={styles.title}>
                        {title}
                    </Text>
                    <Text style={styles.subtitle}>
                        {cardCount} Cards
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    deckItem: {
        backgroundColor: white,
        borderRadius: Platform.OS === 'ios' ? 16 : 5,
        padding: 15,
        borderLeftWidth: 2,
        borderLeftColor: primary,
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        justifyContent: 'space-between',
    },
    title: {
        color: primary,
        fontSize: 20,
    },
    subtitle: {
        color: 'gray',
        fontSize: 15,
        paddingTop: 5,
    }
})
export default DeckItem
