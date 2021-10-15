import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
const NOTIFICATION_KEY = 'MobileFlashCard:notification'
import { AsyncStorage } from 'react-native'


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

function scheduleCustomNotification() {
    Notifications.cancelAllScheduledNotificationsAsync().catch((e) => console.error(e));
    let next = new Date()
    next.setDate(next.getDate() + 1)
    next.setHours(20)
    next.setMinutes(0)
    Notifications.scheduleNotificationAsync({
        content: {
            title: "Practice Quiz",
            body: "👋 don't forget to Practice today!",
        },
        trigger : {
            hour: 20,
            minute: 0,
            repeats: true
        }

    }).then(() => {
        console.log(next)
    });
}

export function setCustomNotification() {
    if (Constants.isDevice) {
        AsyncStorage.getItem( NOTIFICATION_KEY )
            .then(JSON.parse)
            .then((data) => {
                if ( !data ){
                    Notifications.requestPermissionsAsync().then(({ status}) => {
                        if (status !== 'granted') {
                            alert('Notifications not granted');
                            return;
                        }
                        scheduleCustomNotification()
                        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                    })
                }
            })
    } else {
        alert('Physical device required for Notifications to work');
    }
}

export function clearLocationNotification (){
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}
