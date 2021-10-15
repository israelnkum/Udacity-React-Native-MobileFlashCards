import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { secondary, primary, white } from '../../utils/colors'
import { connect } from 'react-redux'
import { handleAddCard } from '../../actions/deck/Actions'
const AddCard = (props) => {
    const { addCard, route, navigation } = props
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const handleSubmit = () => {
        addCard({
            deck : route.params.deckTitle,
            card: {
                question: question,
                answer: answer
            }
        }).then(() => {
            setQuestion("")
            setAnswer("")
            navigation.navigate('Deck Detail', { title: route.params.deckTitle })
        }).catch((e) => console.log(e))
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.inputLabel}>Enter Question</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setQuestion}
                    value={question}
                />
            </View>
            <View style={{ marginTop: 20 }}>
                <Text style={styles.inputLabel}>Enter answer</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setAnswer}
                    value={answer}
                />
            </View>
            <View style={styles.btnView}>
                <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={question === "" || answer === ""} style={[styles.btnSubmit, { backgroundColor: question === "" || answer === "" ? secondary : primary }]}>
                    <Text style={styles.btnText}>
                        Submit
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        margin: 12,
        padding: 10,
        paddingTop: 20,
        backgroundColor: white,
    },
    btnView: {
        alignItems: 'center',
        marginTop: 20
    },
    input: {
        height: 40,
        borderWidth: 1,
        width: '100%',
        padding: 10,
        borderColor: primary,
    },
    btnSubmit: {
        width: 150,
        margin: 5,
        padding: 10,
        borderRadius: 2
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

    }
}

const mapDispatchToProps = dispatch => {
    return {
        addCard: (card) => dispatch(handleAddCard(card))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddCard)
