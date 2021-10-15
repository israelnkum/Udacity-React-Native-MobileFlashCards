import { AsyncStorage } from 'react-native'
export const DB_KEY = 'UdacityMobile:flashcards'


export const addNewDeck = async (deck) => {
    return  AsyncStorage.mergeItem(
        DB_KEY,
        JSON.stringify(deck)
    );
};

export const addNewCard = async (cardData) => {
    const { deck, card } = cardData
    return  AsyncStorage.getItem(DB_KEY).then((res) => {
        const allDecks = JSON.parse(res)
        allDecks[deck].questions = allDecks[deck].questions.concat(card)
        return  AsyncStorage.setItem(DB_KEY, JSON.stringify(allDecks));
    });
};
