import Shared
import SwiftUI

struct Item: Identifiable {
    let id = UUID()
    let bday: Birthday
}

struct BdayList: View {
    var rootComponent: RootComponent
    var onAdd: () -> Void
    @StateValue private var model: RootComponent.Model
    @State var selectedBday: Item?

    init(_ root: RootComponent, onAdd: @escaping () -> Void) {
        self.rootComponent = root
        _model = StateValue(root.model)
        self.onAdd = onAdd
    }

    var body: some View {
        if !model.birthdays.isEmpty {
            ScrollView {

                StatRow(currentMonthBdays: model.currentMonthBdays, averageAge: model.averageAge)
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
                                BdaySheet(bday: item.bday, onDelete: rootComponent.delete, onSaveGift: rootComponent.saveGiftIdea)
                            }
                        } header: {
                            BdayListHeader(section: section)
                        }
                    }
                    HStack {
                        Spacer()
                        RoundedButton(actionCallback: onAdd)
                        Spacer()
                    }
                    .frame(width: .infinity).padding(.top, 24)
                }

            }
            .scrollIndicators(.hidden)
        } else {
            VStack {
                Spacer()
                Image("empty_list").resizable().frame(width: 120, height: 120).aspectRatio(contentMode: .fit)
                Text("Tu n'as pas encore ajouter d'anniversaire").font(.system(size: 20, weight: .bold)).multilineTextAlignment(.center)
                RoundedButton(actionCallback: onAdd)
                Spacer()
            }
        }
    }
}
