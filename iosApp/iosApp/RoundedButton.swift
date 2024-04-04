import SwiftUI

struct RoundedButton: View {
    var actionCallback: () -> ()

    var body: some View {
        Button(action: { actionCallback() }) {
            Text("Ajouter")
                .font(.system(size: 20, weight: .black))
                .frame(maxWidth: .infinity, maxHeight: 70)
                .foregroundColor(Color.white)
                .background(Color("AccentGreen"))
                .clipShape(RoundedRectangle(cornerRadius: 70))
        }
    }
}