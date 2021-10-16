import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddDeck from '../deck/add-deck'
import DeckList from '../deck/deck-list'
import { Ionicons } from '@expo/vector-icons'
import { gray, primary, white } from '../../utils/colors'

const Tab = createBottomTabNavigator();
const AppTabNav = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let iconName;

                    if (route.name === 'Deck List') {
                        iconName = 'ios-list';
                    } else if (route.name === 'Add Deck') {
                        iconName = 'add';
                    }

                    return <Ionicons name={iconName} size={15} color={ focused ? primary : gray } />;
                },
                tabBarActiveTintColor: primary,
                tabBarsecondaryTintColor: gray,
                tabBarStyle: {
                    height: 50,
                    padding: 10,
                    backgroundColor: white,
                }
            })}>
            <Tab.Screen name="Deck List" component={DeckList} />
            <Tab.Screen name="Add Deck" component={AddDeck} />
        </Tab.Navigator>
    )
}

export default AppTabNav
