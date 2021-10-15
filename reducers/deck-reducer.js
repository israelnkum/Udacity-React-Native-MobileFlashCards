import { Types } from '../actions/deck/Types'
const initialState = {
    decks: {
        React: {
            title: 'React',
            questions: [
                {
                    question: 'What is React?',
                    answer: 'A library for managing user interfaces'
                },
                {
                    question: 'Where do you make Ajax requests in React?',
                    answer: 'The componentDidMount lifecycle event'
                }
            ]
        },
        JavaScript: {
            title: 'JavaScript',
            questions: [
                {
                    question: 'What is a closure?',
                    answer: 'The combination of a function and the lexical environment within which that function was declared.'
                }
            ]
        },
    }
}

export default function DeckReducer(state= initialState, action){
    switch (action.type) {
        case Types.ADD_DECK:
            return  {
                ...state,
                decks: {
                    ...state.decks, ...action.payload
                }
            }

        case Types.ADD_CARD:
            const { deck, card } = action.payload
            return  {
                ...state,
                decks: {
                    ...state.decks,
                    [deck]: {
                        ...state.decks[deck],
                        questions: state.decks[deck].questions.concat(card),
                    },
                }
            }
        default:
            return state
    }
}
