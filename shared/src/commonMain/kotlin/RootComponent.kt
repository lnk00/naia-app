import com.arkivanov.decompose.value.MutableValue
import com.arkivanov.decompose.value.Value
import com.arkivanov.decompose.value.update

import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import io.realm.kotlin.ext.query
import io.realm.kotlin.query.find
import kotlinx.datetime.*
import kotlinx.datetime.format.DateTimeComponents
import kotlinx.datetime.format.char
import models.Birthday
import models.BirthdaySection
import org.mongodb.kbson.ObjectId

class RootComponent {
    private val configuration = RealmConfiguration.create(schema = setOf(Birthday::class))
    private val realm = Realm.open(configuration)
    private val _model = MutableValue(Model(realm.query<Birthday>().find()))
    val model: Value<Model> = _model

    class Model(birthdays: List<Birthday>) {
        var birthdays: List<Birthday> = birthdays.sortedWith(
            compareBy(
                { it.date.split("/").first().toInt() },
                { it.date.split("/")[1].toInt() }
            )
        )

        var birthdaySections: List<BirthdaySection> = getBirthdaySections()
        var averageAge = getAverageAge()
        var currentMonthBdays = getCurrentMonthBdays()

        private fun getBirthdaySections(): List<BirthdaySection> {
            return birthdays.groupBy { it.date.split("/").first() }.map {
                BirthdaySection(
                    id = ObjectId(),
                    sectionTitle =
                    DateTimeComponents.Format { monthNumber() }
                        .parse(it.key)
                        .month?.number.toString(),
                    birthdays = it.value
                )
            }
        }

        private fun getCurrentMonthBdays(): Int {
            return birthdays.count {
                val dateFormat =
                    LocalDate.Format {
                        monthNumber()
                        char('/')
                        dayOfMonth()
                        char('/')
                        year()
                    }
                        .parse(it.date)

                dateFormat.monthNumber ==
                        Clock.System.now().toLocalDateTime(TimeZone.UTC).monthNumber
            }
        }

        private fun getAverageAge(): Int {
            if (birthdays.isEmpty()) return 0

            val ageSum = birthdays.sumOf {
                val dateFormat =
                    LocalDate.Format {
                        monthNumber()
                        char('/')
                        dayOfMonth()
                        char('/')
                        year()
                    }
                        .parse(it.date)

                val instant = dateFormat.atTime(0, 0).toInstant(TimeZone.UTC)
                instant.yearsUntil(Clock.System.now(), TimeZone.UTC)
            }

            return ageSum / birthdays.count()
        }
    }

    fun save(fname: String, lname: String, d: String, image: String): ObjectId {
        val bday =
            Birthday().apply {
                id = ObjectId()
                firstname = fname
                lastname = lname
                date = d
                img = image
            }

        realm.writeBlocking { copyToRealm(bday) }

        _model.update { Model(it.birthdays + bday) }

        return bday.id
    }

    fun delete(id: ObjectId) {
        val bday = realm.query<Birthday>("id == $0", id).find().firstOrNull()
        realm.writeBlocking {
            if (bday != null) {
                findLatest(bday)?.also { delete(it) }
            }
        }

        _model.update {
            Model(it.birthdays.filter { bday -> bday.id != id })
        }
    }
}
