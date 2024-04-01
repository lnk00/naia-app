import SwiftUI
import Shared

struct ContentView: View {
    @State var showPopover = false
    @State var bdays: [BirthdayModel] = Birthday().get()

    var body: some View {
        VStack {
            Button(action: { showPopover = true }) {
                Text("Ajouter")
            }
            List {
                ForEach(bdays, id: \.id) { bday in
                    Text("\(bday.firstname)")
                }
            }
        }
        .popover(isPresented: $showPopover, content: { AddBdaySheet(showPopover: $showPopover) })
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .center)
        .padding()
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
