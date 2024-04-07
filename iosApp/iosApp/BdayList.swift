import Shared
import SwiftUI

struct Item: Identifiable {
    let id = UUID()
    let bday: Birthday
}

struct BdayList: View {
    var rootComponent: RootComponent

    @StateValue private var model: RootComponent.Model

    @State private var isShowingSheet = false

    @State var selectedBday: Item?

    init(_ root: RootComponent) {
        self.rootComponent = root
        _model = StateValue(root.model)
    }

    var body: some View {
        ScrollView {
            HStack {
                VStack(alignment: .leading) {
                    Text("\(model.currentMonthBdays)").font(.system(size: 42, weight: .black)).foregroundColor(.white)
                    Spacer(minLength: 12)
                    Text("Anniversaire en Avril").font(.system(size: 18, weight: .black)).foregroundColor(.white)
                }
                .padding()
                .frame(minWidth: 0, maxWidth: .infinity)
                .background(RoundedRectangle(cornerRadius: 12).fill(Color("AccentGreen")))

                VStack(alignment: .leading) {
                    Text("\(model.averageAge)").font(.system(size: 42, weight: .black)).foregroundColor(.white)
                    Spacer(minLength: 12)
                    Text("Moyenne d'age de tes proches").font(.system(size: 18, weight: .black)).foregroundColor(.white)
                }
                .padding()
                .frame(minWidth: 0, maxWidth: .infinity)
                .background(RoundedRectangle(cornerRadius: 12).fill(Color("AccentRed")))
            }
            .padding(.bottom, 12)
            LazyVStack(alignment: .leading, spacing: 0, pinnedViews: [.sectionHeaders]) {
                ForEach(model.birthdaySections, id: \.id) { section in
                    Section {
                        ForEach(section.birthdays, id: \.id) { bday in
                            BdayRow(bday: bday)
                                .contentShape(Rectangle())
                                .onTapGesture {
                                    selectedBday = Item(bday: bday)
                                }
                        }
                        .sheet(item: $selectedBday) { item in
                            Text("\(item.bday.firstname)").font(.system(size: 18, weight: .black)).presentationDetents([.medium])
                        }
                    } header: {
                        BdayListHeader(section: section)
                    }
                }
                Spacer(minLength: 70)
            }
        }
        .scrollIndicators(.hidden)
    }
}