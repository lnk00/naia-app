import SwiftUI
import Shared

struct BdayListHeader: View {
    var section: BirthdaySection

    var body: some View {
        HStack {
            Text("\(section.sectionTitle)".capitalized).font(.system(size: 18, weight: .black))
            Spacer()
            Text("\(section.birthdays.count)").font(.system(size: 14, weight: .bold)).frame(width: 40, height: 25).background(RoundedRectangle(cornerRadius: 12).fill(Color(hex: 0xF0EFF0)))
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(.white.opacity(1.0))
        .padding(.bottom, 12)
    }
}