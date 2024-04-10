import SwiftUI
import Shared

struct BdaySheet: View {
    var bday: Birthday

    var body: some View {
        HStack {
            Text("\(bday.firstname)").font(.system(size: 18, weight: .black))
        }
        .presentationDetents([.medium])
        .presentationDragIndicator(.visible)
    }
}