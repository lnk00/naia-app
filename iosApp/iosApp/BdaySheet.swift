import SwiftUI
import Shared

struct BdaySheet: View {
    var bday: Birthday
    var onDelete: (_ id: KbsonBsonObjectId) -> Void
    @Environment(\.presentationMode) var presentationMode

    func formatDate(date: String) -> String {
        let formatter = DateFormatter()
        formatter.dateFormat = "MM/dd/yyyy"
        formatter.locale = Locale(identifier: "fr_FR_POSIX")
        let d = formatter.date(from: date)
        formatter.dateFormat = "dd MMMM yyyy"
        return formatter.string(from: d ?? Date.now)
    }

    var body: some View {
        VStack {
            Image(bday.img).resizable().frame(width: 120, height: 120).aspectRatio(contentMode: .fit).padding(.bottom, 8)
            Text("\(bday.firstname) \(bday.lastname)").font(.system(size: 22, weight: .black)).padding(.bottom, 2)
            Text("\(formatDate(date: bday.date))").font(.system(size: 20, weight: .black)).foregroundColor(Color("AccentGreen")).padding(.bottom, 8)
            HStack {
                Button(action: {}) {
                    Image(systemName: "bell.badge")
                        .font(.system(size: 20, weight: .bold))
                        .frame(width: 70, height: 70)
                        .foregroundColor(Color.white)
                        .background(Color("AccentGreen"))
                        .clipShape(Circle())
                }
                .disabled(false)
                Button(action: { onDelete(bday.id); deleteScheduledNotification(bday.id); presentationMode.wrappedValue.dismiss() }) {
                    Image(systemName: "trash")
                        .font(.system(size: 20, weight: .bold))
                        .frame(width: 70, height: 70)
                        .foregroundColor(Color.white)
                        .background(Color("AccentRed"))
                        .clipShape(Circle())
                }
                .disabled(false)

            }
        }
        .presentationDetents([.large])
        .presentationDragIndicator(.visible)
    }
}