import SwiftUI
import Shared

public class ObservableValue<T: AnyObject>: ObservableObject {
    @Published
    var value: T

    private var cancellation: Cancellation?

    init(_ value: Value<T>) {
        self.value = value.value
        self.cancellation = value.observe { [weak self] value in
            self?.value = value
        }
    }

    deinit {
        cancellation?.cancel()
    }
}

@propertyWrapper struct StateValue<T: AnyObject>: DynamicProperty {
    @ObservedObject
    private var obj: ObservableValue<T>

    var wrappedValue: T {
        obj.value
    }

    init(_ value: Value<T>) {
        obj = ObservableValue(value)
    }
}

struct ContentView: View {
    @State var showPopover = false

    private var rootComponent: RootComponent

    @StateValue
    private var model: RootComponent.Model

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
                    ForEach(model.birthdays, id: \.id) { bday in
                        Text("\(bday.firstname)")
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
