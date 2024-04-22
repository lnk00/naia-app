import Foundation
import Shared
import UserNotifications

func scheduleNotification(name: String, date: Date, id: KbsonBsonObjectId) {
    let content = UNMutableNotificationContent()
    content.title = "Naïa"
    content.body = "Soyez le premier à souhaiter un joyeux anniversaire à \(name)"
    content.sound = UNNotificationSound.default

    var datComp = DateComponents()
    datComp.month = date.get(.month)
    datComp.day = date.get(.day)
    datComp.hour = 8
    datComp.minute = 36

    let trigger = UNCalendarNotificationTrigger(dateMatching: datComp, repeats: true)

    let request = UNNotificationRequest(identifier: id.toHexString(), content: content, trigger: trigger)

    UNUserNotificationCenter.current().add(request) { error in
        if let error = error {
            print("Error scheduling notification: \(error.localizedDescription)")
        } else {
            print("Notification scheduled successfully")
        }
    }
}

func deleteScheduledNotification(_ id: KbsonBsonObjectId) {
    let center = UNUserNotificationCenter.current()
    center.removePendingNotificationRequests(withIdentifiers: [id.toHexString()])
    center.removeDeliveredNotifications(withIdentifiers: [id.toHexString()])
}