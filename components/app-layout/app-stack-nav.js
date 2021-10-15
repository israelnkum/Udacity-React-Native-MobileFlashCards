import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AppTabNav from './app-tab-nav'
import DeckDetail from '../deck/deck-detail'
import Quiz from '../quiz'
import AddCard from '../card/add-card'

const Stack = createStackNavigator();
const AppStackNav = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={AppTabNav} options={{ headerShown: false }}/>
            <Stack.Screen name="Deck Detail" component={DeckDetail}/>
            <Stack.Screen name="Quiz" component={Quiz}/>
            <Stack.Screen name="Add Card" component={AddCard}/>
        </Stack.Navigator>
    )
}

export default AppStackNav
