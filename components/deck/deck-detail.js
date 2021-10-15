import React, { useEffect } from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import DeckItem from './deck-item'
import { connect } from 'react-redux'
import { primary, white } from '../../utils/colors'

const DeckDetail = ( props) => {
    const { deck, navigation, route } = props

    useEffect(() => {
        navigation.setOptions({
            title: deck.title,
        });
    }, [])
    return (
        <View>
            <DeckItem title={deck.title} cardCount={deck.questions.length} routeName={route.name}/>

            <View style={styles.insideContainer}>
                <TouchableOpacity style={[styles.btn, { backgroundColor: white, borderColor: primary, borderWidth: 1 }]}>
                    <Text style={[styles.btnText, { color: primary }]}
                          onPress={() => navigation.navigate(
                              'Add Card', { deckTitle: deck.title }
                          )}>
                        Add Card
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}
                                  onPress={() => navigation.navigate(
                                      'Quiz', { title: deck.title}
                                  )}>
                    <Text style={styles.btnText}>
                        Start Quiz
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

function mapStateToProps (state, { route } ){
    return {
        deck: state.DeckReducer.decks[route.params.title]
    }
}

const styles = StyleSheet.create({
    insideContainer: {
        flex: 1,
        marginTop: 50,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    btn:{
        width: 150,
        margin: 5,
        backgroundColor: primary,
        padding: 10,
        borderRadius: 2
    },
    btnText: {
        textAlign: 'center',
        color: white
    }
})
export default connect(mapStateToProps)(DeckDetail)
