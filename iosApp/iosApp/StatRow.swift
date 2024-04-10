import Shared
import SwiftUI

struct StatRow: View {
    var currentMonthBdays: Int32
    var averageAge: Int32

    var body: some View {
        HStack {
            VStack(alignment: .leading) {
                Text("\(currentMonthBdays)").font(.system(size: 42, weight: .black)).foregroundColor(.white)
                Spacer(minLength: 12)
                Text("Anniversaire en Avril").font(.system(size: 18, weight: .black)).foregroundColor(.white)
            }
            .padding()
            .frame(minWidth: 0, maxWidth: .infinity)
            .background(RoundedRectangle(cornerRadius: 12).fill(Color("AccentGreen")))

            VStack(alignment: .leading) {
                Text("\(averageAge)").font(.system(size: 42, weight: .black)).foregroundColor(.white)
                Spacer(minLength: 12)
                Text("Moyenne d'age de tes proches").font(.system(size: 18, weight: .black)).foregroundColor(.white)
            }
            .padding()
            .frame(minWidth: 0, maxWidth: .infinity)
            .background(RoundedRectangle(cornerRadius: 12).fill(Color("AccentRed")))
        }
        .padding(.bottom, 12)
    }
}
