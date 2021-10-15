import React, { useEffect, useRef, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { gray, primary, secondary, white } from '../../utils/colors'
import { connect } from 'react-redux'
import NoData from '../commons/no-data'
import { clearLocationNotification, setCustomNotification } from '../../utils/notify'

const Quiz = (props) => {
    const { deck, navigation } = props
    const questions = deck.questions
    const [counter, setCounter] = useState(0)
    const flipAnimation = useRef( new Animated.Value( 0 ) ).current;
    const [btnText, setBtnText] = useState('Answer');
    const [correctAnswers, setCorrectAnswers] = useState(0)
    const [incorrectAnswers, setInCorrectAnswers] = useState(0)
    const [completed, setCompleted] = useState(false)


    let flipRotation = 0;
    flipAnimation.addListener( ( { value } ) => {
        flipRotation = value
    })

    const toggleCard = () => {
        Animated.spring( flipAnimation, {
            toValue: flipRotation >= 90 ? 0 : 180,
            tension: 10,
            friction: 8,
            useNativeDriver: true,
        } ).start();
        setBtnText(flipRotation >= 90 ? 'Answer' : 'Question')
    }
    const restartQuiz = () => {
        setCounter(0)
        setCompleted(false)
        setInCorrectAnswers(0)
        setCorrectAnswers(0)
    }
    const frontStyle = {
        transform: [
            {
                rotateY: flipAnimation.interpolate({
                    inputRange: [ 0, 180 ],
                    outputRange: [ "0deg", "180deg" ]
                })
            }
        ]
    };
    const backStyle = {
        transform: [
            {
                rotateY: flipAnimation.interpolate({
                    inputRange: [ 0, 180 ],
                    outputRange: [ "180deg", "360deg" ]
                } )
            }
        ]
    }

    const chosenOption = (option) => {
        if (option === true){
            setCorrectAnswers(correctAnswers + 1)
        }else{
            setInCorrectAnswers(incorrectAnswers + 1)
        }
        if (counter !== (questions.length - 1)){
            setCounter(counter + 1)
        }else{
            setCompleted(true)
            clearLocationNotification()
            setCustomNotification()
        }
    }
    return (
        questions.length <= 0 ?
            <NoData message={"Oops! No Question found"}/> :
            completed === true ?
                <View style={styles.results}>
                    <Text style={styles.resultTitle}>Quiz Completed</Text>
                    <Text  style={styles.resultScore}>Score: { Math.floor((correctAnswers / questions.length) * 100) }%</Text>
                    <View>
                        <TouchableOpacity onPress={restartQuiz} style={[styles.btnChoices, { backgroundColor: gray }]}>
                            <Text style={styles.btnText}>
                                Restart Quiz
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.navigate('Deck Detail', { title: deck.title }) }} style={[styles.btnChoices, { backgroundColor: primary }]}>
                            <Text style={styles.btnText}>
                                Back to Deck
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View> :
                <View style={styles.container}>
                    <View style={styles.questionNumber}>
                        <Text style={{ fontSize: 20, color: primary }}>{counter + 1}/{questions.length}</Text>
                    </View>
                    <View>
                        <Animated.View style={[styles.question, frontStyle]}>
                            <Text style={{ fontSize: 15,  padding: 20 }}>
                                {questions[counter].question}
                            </Text>
                        </Animated.View>
                        <Animated.View style={[styles.question, styles.answer, backStyle]}>
                            <Text style={{ fontSize: 15,  padding: 20 }}>
                                {questions[counter].answer}
                            </Text>
                        </Animated.View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={toggleCard} style={ styles.answerBtn}>
                                <Text style={{ color: 'green', textAlign: 'center' }}>
                                    {btnText}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.choiceContainer}>
                        <TouchableOpacity onPress={() => { chosenOption(true) }} style={[styles.btnChoices, { backgroundColor: 'green' }]}>
                            <Text style={styles.btnText}>
                                Correct
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { chosenOption(false) }} style={[styles.btnChoices, { backgroundColor: 'red' }]}>
                            <Text style={styles.btnText}>
                                Incorrect
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    questionNumber: {
        marginTop: 20,
        padding: 10,
        backgroundColor: white,
        borderRadius: 50,
    },
    question: {
        backgroundColor: white,
        margin: 10,
        backfaceVisibility: 'hidden',
        width: 300,
    },
    answer: {
        backgroundColor: secondary,
        position: 'absolute',
        // top: 0
    },
    results:{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    resultTitle:{
        fontSize: 20,
        color: "green"
    },
    resultScore:{
        fontSize: 30,
        color: primary,
        marginBottom: 20
    },
    choiceContainer: {
        flex: 1,
        marginTop: 50,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    btnChoices:{
        width: 150,
        margin: 5,
        padding: 10,
        borderRadius: 2
    },
    btnText: {
        textAlign: 'center',
        color: white
    },
    answerBtn: {
        borderWidth: 2,
        padding: 5,
        marginTop: 15,
        width: 150,
        borderColor: 'green',
    }
})

const mapStateToProps = (state, { route }) => {
    return {
        deck: state.DeckReducer.decks[route.params.title]
    }
}

export default connect(mapStateToProps)(Quiz)
