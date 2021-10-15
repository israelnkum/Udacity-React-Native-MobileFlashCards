import { addNewCard, addNewDeck } from '../../utils/api'
import { addDeck, addCard, getDeck } from './ActionCreators'

export const handleAddDeck = (deck) => (dispatch) => {
    return new Promise((resolve, reject) => {
        addNewDeck(deck).then((res) => {
            dispatch(addDeck(deck))
            resolve(res)
        }).catch((err) => reject(err))
    })
}

export const handleAddCard = (card) => (dispatch) => {
    return new Promise((resolve, reject) => {
        addNewCard(card).then((res) => {
            dispatch(addCard(card))
            resolve(res)
        }).catch((err) => reject(err))
    })
}
