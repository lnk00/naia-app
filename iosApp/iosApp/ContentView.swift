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
            Rectangle().fill(.white).frame(width: .infinity, height: 24)
            BdayList(rootComponent)
            RoundedButton(actionCallback: onAdd)
        }
        .popover(isPresented: $showPopover, content: { AddBdaySheet(showPopover: $showPopover, rootComponent: rootComponent) })
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .center)
        .padding(.horizontal, 24)
    }
}
