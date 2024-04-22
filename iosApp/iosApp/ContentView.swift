import BackgroundTasks
import SwiftUI
import Shared


struct ContentView: View {
    @State var showPopover: Bool
    var rootComponent: RootComponent

    init(rootComponent: RootComponent) {
        self.showPopover = false
        self.rootComponent = rootComponent
    }

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

            BdayList(rootComponent, onAdd: onAdd)
        }
        .popover(isPresented: $showPopover, content: { AddBdaySheet(showPopover: $showPopover, rootComponent: rootComponent) })
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .center)
        .padding(.horizontal, 24)
    }
}
