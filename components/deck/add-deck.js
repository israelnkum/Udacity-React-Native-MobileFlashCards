import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { secondary, primary, white } from '../../utils/colors'
import { connect } from 'react-redux'
import { handleAddDeck } from '../../actions/deck/Actions'

const AddDeck = (props) => {
    const { addDeck, navigation } = props

    const [title, setTitle] = useState("");

    const handleSubmit = () => {
        addDeck({
            [title]: {
                title: title,
                questions: []
            }}
        ).then(() => {
            setTitle("")
            navigation.navigate('Deck Detail', { title: title })
        }).catch((error) => console.log(error))
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.inputLabel}>Enter deck title</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setTitle}
                    value={title}
                />
            </View>

            <View style={styles.btnView}>
                <TouchableOpacity onPress={handleSubmit} disabled={title === ""} style={[styles.btnSubmit, { backgroundColor: title === "" ? secondary : primary }]}>
                    <Text style={styles.btnText}>
                        Add Deck
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 50,
        backgroundColor: white,
    },
    input: {
        height: 40,
        borderWidth: 1,
        width: '100%',
        padding: 10,
        borderColor: primary
    },
    btnSubmit: {
        width: 150,
        margin: 5,
        padding: 10,
        borderRadius: 2
    },
    btnView: {
        paddingTop: 20,
        alignItems: 'center'
    },
    btnText: {
        textAlign: 'center',
        color: white
    },
    inputLabel: {
        color: primary
    }
});

const mapStateToProps = state => {
    return {
        decks: state.DeckReducer.decks
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addDeck: (deck) => dispatch(handleAddDeck(deck))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck)
