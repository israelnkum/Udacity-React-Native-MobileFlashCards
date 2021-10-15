import { Types } from './Types'

export const addDeck = (deck) =>{
    return {
        type: Types.ADD_DECK,
        payload: deck
    }
}

export const addCard = (deck) =>{
    return {
        type: Types.ADD_CARD,
        payload: deck
    }
}
