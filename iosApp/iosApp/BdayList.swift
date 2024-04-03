import Shared
import SwiftUI

struct BdayList: View {
    var rootComponent: RootComponent

    @StateValue private var model: RootComponent.Model

    init(_ root: RootComponent) {
        self.rootComponent = root
        _model = StateValue(root.model)
    }

    var body: some View {
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
    }
}