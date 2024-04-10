import SwiftUI
import Shared

struct BdaySheet: View {
    var bday: Birthday

    func formatDate(date: String) -> String {
        let formatter = DateFormatter()
        formatter.dateFormat = "MM/dd/yyyy"
        let d = formatter.date(from: date)
        formatter.dateFormat = "dd MMMM yyyy"
        return formatter.string(from: d ?? Date.now)
    }

    var body: some View {
        VStack {
            Image(bday.img).resizable().frame(width: 120, height: 120).aspectRatio(contentMode: .fit)
            Text("\(bday.firstname) \(bday.lastname)").font(.system(size: 22, weight: .black))
            Text("\(formatDate(date: bday.date))").font(.system(size: 20, weight: .black)).foregroundColor(Color("AccentGreen"))
        }
        .presentationDetents([.large])
        .presentationDragIndicator(.visible)
    }
}