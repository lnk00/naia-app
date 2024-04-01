import SwiftUI

struct ContentView: View {
    @State var showPopover = false

    var body: some View {
        VStack {
            Button(action: { showPopover = true }) {
                Text("Ajouter")
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
