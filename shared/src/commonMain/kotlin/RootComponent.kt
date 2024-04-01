import com.arkivanov.decompose.value.MutableValue
import com.arkivanov.decompose.value.Value
import com.arkivanov.decompose.value.update
import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import io.realm.kotlin.ext.query
import io.realm.kotlin.types.RealmObject
import io.realm.kotlin.types.annotations.PrimaryKey
import org.mongodb.kbson.ObjectId

class Birthday : RealmObject {
    @PrimaryKey
    var id: ObjectId = ObjectId()
    var firstname: String = ""
    var lastname: String = ""
    var date: String = ""
}

class RootComponent {
    private val configuration = RealmConfiguration.create(schema = setOf(Birthday::class))
    private val realm = Realm.open(configuration)
    private val _model = MutableValue(Model(realm.query<Birthday>().find()))
    val model: Value<Model> = _model

    class Model(birthdays: List<Birthday>) {
        var items: List<Birthday> = birthdays
    }

    fun save(fname: String, lname: String, d: String) {
        val bday = Birthday().apply {
            id = ObjectId()
            firstname = fname
            lastname = lname
            date = d
        }

        realm.writeBlocking { // this : MutableRealm
            copyToRealm(bday)
        }

        _model.update {
            Model(it.items + bday)
        }
    }
}