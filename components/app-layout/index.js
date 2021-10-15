import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Store from '../../utils/store'
import { Provider } from 'react-redux'
import { SafeAreaView } from 'react-native'
import AppStackNav from './app-stack-nav'
import AppStatusBar from './app-status-bar'
import { primary } from '../../utils/colors'

const AppLayout = () => {
    return (
        <Provider store={Store}>
            <SafeAreaView style={{flex: 1}}>
                <NavigationContainer>
                    <AppStatusBar backgroundColor={primary}/>
                    <AppStackNav/>
                </NavigationContainer>
            </SafeAreaView>
        </Provider>
    )
}

export default AppLayout
