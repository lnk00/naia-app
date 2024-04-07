import SwiftUI

struct RoundedButton: View {
    var actionCallback: () -> ()

    var body: some View {
        Button(action: { actionCallback() }) {
            HStack {
                Image(systemName: "plus")
                    .font(.system(size: 20, weight: .bold))
                    .foregroundColor(Color.white)

                Text("Ajouter")
                    .font(.system(size: 20, weight: .black))
                    .foregroundColor(Color.white)

            }
            .padding(.horizontal, 24)
            .frame(maxHeight: 70)
            .background(Color("AccentGreen"))
            .clipShape(RoundedRectangle(cornerRadius: 70))
        }
    }
}