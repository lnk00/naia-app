import SwiftUI
import Shared

struct ContentView: View {
    @State var showPopover = false
    var rootComponent: RootComponent

    func onAdd() {
        showPopover = true
    }

    var body: some View {
        VStack {
            HStack {
                Text("Naia").font(.system(size: 24, weight: .black))
                Spacer()
                RoundedButton(actionCallback: onAdd)
            }
            .background(.white)
            .frame(width: .infinity, height: 72)
            BdayList(rootComponent)
        }
        .popover(isPresented: $showPopover, content: { AddBdaySheet(showPopover: $showPopover, rootComponent: rootComponent) })
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .center)
        .padding(.horizontal, 24)
    }
}
