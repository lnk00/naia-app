import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import io.realm.kotlin.ext.query
import io.realm.kotlin.query.RealmResults
import io.realm.kotlin.types.RealmObject
import io.realm.kotlin.types.annotations.PrimaryKey
import org.mongodb.kbson.ObjectId

class BirthdayModel : RealmObject {
    @PrimaryKey
    var id: ObjectId = ObjectId()
    var firstname: String = ""
    var lastname: String = ""
    var date: String = ""
}

class Birthday {
    private val configuration = RealmConfiguration.create(schema = setOf(BirthdayModel::class))
    private val realm = Realm.open(configuration)

    fun get(): RealmResults<BirthdayModel> {
        val all = realm.query<BirthdayModel>().find()
        return all
    }

    fun save(fname: String, lname: String, d: String): String {
        val bday = BirthdayModel().apply {
            firstname = fname
            lastname = lname
            date = d
        }

        realm.writeBlocking {
            copyToRealm(bday)
        }

        return "saved!"
    }
}