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
    @State var bdays: [Birthday.BirthdayModel] = Birthday().get()

    private var birthdayComponent: Birthday

    @StateValue
    private var model: Birthday.BirthdayModel

    init(_ bday: Birthday) {
        self.birthdayComponent = bday
        _model = StateValue(bday.model)
    }

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
