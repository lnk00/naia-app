import SwiftUI

struct RoundedButton: View {
    var actionCallback: () -> ()

    var body: some View {
        Button(action: { actionCallback() }) {
            HStack {
                Image(systemName: "plus")
                    .font(.system(size: 14, weight: .bold))
                    .foregroundColor(Color.white)

                Text("Ajouter")
                    .font(.system(size: 14, weight: .black))
                    .foregroundColor(Color.white)

            }
            .padding(12)
            .background(Color("AccentGreen"))
            .clipShape(RoundedRectangle(cornerRadius: 100))
        }
    }
}