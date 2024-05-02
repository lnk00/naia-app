package models

import io.realm.kotlin.types.RealmObject
import io.realm.kotlin.types.annotations.PrimaryKey
import org.mongodb.kbson.ObjectId

class Birthday : RealmObject {
    @PrimaryKey
    var id: ObjectId = ObjectId()
    var firstname: String = ""
    var lastname: String = ""
    var date: String = ""
    var img: String = ""
    var showGiftIdeaAlert: Boolean = true
}

class BirthdaySection(var id: ObjectId, var sectionTitle: String, var birthdays: List<Birthday>)
