import React, { useEffect } from 'react'
import { FlatList } from 'react-native'
import DeckItem from './deck-item'
import { connect } from 'react-redux'
import NoData from '../commons/no-data'

const DeckList = (props) => {
    const { navigation, decks } = props
    const renderItem = ({ item }) => (
        <DeckItem title={item.title} cardCount={item.questions.length } navigation={navigation}/>

    );

    // useEffect(() => {
    //     console.log(Object.values(decks))
    // }, [])
    return (
        Object.keys(decks).length <= 0 ?
            <NoData message={"Oops! You've not added any deck"}/> :
            <FlatList
                data={Object.values(decks)}
                renderItem={renderItem}
                keyExtractor={(item) => (item.title)}
            />
    )
}

const mapStateToProps = state => {
    return {
        decks: state.DeckReducer.decks
    }
}
export default connect(mapStateToProps)(DeckList)
