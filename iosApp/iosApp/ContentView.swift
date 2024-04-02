import SwiftUI
import Shared

struct ContentView: View {
    @State var showPopover = false
    private var rootComponent: RootComponent
    @StateValue private var model: RootComponent.Model

    init(_ root: RootComponent) {
        self.rootComponent = root
        _model = StateValue(root.model)
    }

    func onAdd() {
        showPopover = true
    }

    var body: some View {
        VStack {
            ScrollView {
                LazyVStack(alignment: .leading, spacing: 0, pinnedViews: [.sectionHeaders]) {
                    ForEach(model.birthdaySections, id: \.id) { section in
                        Section {
                            ForEach(section.birthdays, id: \.id) { bday in
                                HStack {
                                    Text("\(bday.firstname)")
                                    Text("\(bday.date)")
                                }

                            }
                        } header: {
                            Text("\(section.sectionTitle)")
                        }

                    }
                }
            }
            Button(action: { onAdd() }) {
                Text("Ajouter")
            }
        }
        .popover(isPresented: $showPopover, content: { AddBdaySheet(showPopover: $showPopover, rootComponent: rootComponent) })
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .center)
        .padding()
    }
}
