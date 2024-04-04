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
                                Text(bday.firstname.prefix(1) + bday.lastname.prefix(1))
                                    .font(.system(size: 16, weight: .bold))
                                    .frame(width: 50, height: 50)
                                    .background(Color(hex: 0xF0EFF0))
                                    .cornerRadius(15)

                                VStack(alignment: .leading) {
                                    Text(bday.firstname + " " + bday.lastname).font(.system(size: 16, weight: .bold))
                                    Text(bday.date).font(.system(size: 16))
                                }
                                .padding(.leading, 12)
                            }
                            .padding(.bottom, 12)

                        }
                    } header: {
                        Text("\(section.sectionTitle)".capitalized).font(.system(size: 18, weight: .black))

                            .frame(maxWidth: .infinity, alignment: .leading)
                            .background(.white.opacity(1.0))
                            .padding(.bottom, 12)
                    }
                }
            }
        }
        .scrollIndicators(.hidden)
    }
}