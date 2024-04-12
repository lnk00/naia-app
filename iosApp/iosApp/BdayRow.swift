import SwiftUI
import Shared

struct BdayRow: View {
    var bday: Birthday

    func formatDate(date: String) -> String {
        let formatter = DateFormatter()
        formatter.dateFormat = "MM/dd/yyyy"
        formatter.locale = Locale(identifier: "fr_FR_POSIX")
        let d = formatter.date(from: date)
        formatter.dateFormat = "dd MMMM yyyy"
        return formatter.string(from: d ?? Date.now)
    }

    var body: some View {
        HStack {
            Image(bday.img).resizable().frame(width: 50, height: 50).aspectRatio(contentMode: .fit)
            VStack(alignment: .leading) {
                Text(bday.firstname + " " + bday.lastname).font(.system(size: 16, weight: .bold))
                Text(formatDate(date: bday.date)).font(.system(size: 16, weight: .bold)).opacity(0.2)
            }
            .padding(.leading, 12)
            Spacer()
            Image(systemName: "chevron.forward").font(.system(size: 18,
                                                              weight: .bold))

        }
        .padding(.bottom, 12)
    }
}