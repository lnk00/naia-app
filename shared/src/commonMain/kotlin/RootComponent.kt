import com.arkivanov.decompose.value.MutableValue
import com.arkivanov.decompose.value.Value
import com.arkivanov.decompose.value.update
import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import io.realm.kotlin.ext.query
import models.Birthday
import models.BirthdaySection
import org.mongodb.kbson.ObjectId

class RootComponent {
    private val configuration = RealmConfiguration.create(schema = setOf(Birthday::class))
    private val realm = Realm.open(configuration)
    private val _model = MutableValue(Model(realm.query<Birthday>().find()))
    val model: Value<Model> = _model

    class Model(birthdays: List<Birthday>) {
        var birthdays: List<Birthday> =
            birthdays.sortedWith(compareBy({ it.date.split("/").first().toInt() }, { it.date.split("/")[1].toInt() }))

        var birthdaySections: List<BirthdaySection> = this.birthdays.groupBy { it.date.split("/").first() }
            .map { BirthdaySection(id = ObjectId(), sectionTitle = it.key, birthdays = it.value) }
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
            Model(it.birthdays + bday)
        }
    }
}