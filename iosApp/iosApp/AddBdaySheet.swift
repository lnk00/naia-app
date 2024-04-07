import SwiftUI
import Shared

struct AddBdaySheet: View {
    @Binding var showPopover: Bool
    @State private var selectedTab: Int = 0
    @State private var firstname: String = ""
    @State private var lastname: String = ""
    @State private var date = Date.now
    @FocusState private var focusedField: FocusedField?

    var rootComponent: RootComponent

    enum FocusedField {
        case FIRSTNAME
        case LASTNAME
    }

    func onSubmit() {
        showPopover = false
        let formatter = DateFormatter()
        formatter.dateFormat = "MM/dd/yyyy"
        rootComponent.save(fname: firstname, lname: lastname, d: formatter.string(from: date))
    }

    var body: some View {
        TabView(selection: $selectedTab) {
            VStack {
                Text("Quel est\nson prénom ?").font(.largeTitle.weight(.black)).multilineTextAlignment(.center)
                TextField("", text: $firstname, prompt: Text("John").foregroundColor(Color(hex: 0xF0EFF0)))
                    .font(.largeTitle.weight(.black))
                    .foregroundColor(Color("AccentGreen"))
                    .accentColor(Color("AccentGreen"))
                    .autocorrectionDisabled()
                    .multilineTextAlignment(.center)
                    .focused($focusedField, equals: .FIRSTNAME)
                Spacer()
                Button(action: { withAnimation(.default, { selectedTab += 1 }) }) {
                    Image(systemName: "arrow.right")
                        .font(.system(size: 20, weight: .bold))
                        .frame(width: 70, height: 70)
                        .foregroundColor(Color.white)
                        .background(firstname.isEmpty ? Color(hex: 0xF0EFF0) : Color("AccentGreen"))
                        .clipShape(Circle())
                }
                .disabled(firstname.isEmpty)
                .padding(.bottom, 50)
            }
            .tag(0)

            VStack {
                Text("Quel est le \nnom de \(firstname) ?").font(.largeTitle.weight(.black)).multilineTextAlignment(.center)
                TextField("", text: $lastname, prompt: Text("Doe").foregroundColor(Color(hex: 0xF0EFF0)))
                    .font(.largeTitle.weight(.black))
                    .foregroundColor(Color("AccentRed"))
                    .accentColor(Color("AccentRed"))
                    .autocorrectionDisabled()
                    .multilineTextAlignment(.center)
                    .focused($focusedField, equals: .LASTNAME)
                Spacer()
                Button(action: { withAnimation(.default, { selectedTab += 1; focusedField = nil }) }) {
                    Image(systemName: "arrow.right")
                        .font(.system(size: 20, weight: .bold))
                        .frame(width: 70, height: 70)
                        .foregroundColor(Color.white)
                        .background(lastname.isEmpty ? Color(hex: 0xF0EFF0) : Color("AccentRed"))
                        .clipShape(Circle())
                }
                .disabled(lastname.isEmpty)
                .padding(.bottom, 50)
            }
            .tag(1)
            .onAppear {
                focusedField = .LASTNAME
            }

            VStack {
                Text("Et sa date de\nnaissance ?").font(.largeTitle.weight(.black)).multilineTextAlignment(.center)
                DatePicker("", selection: $date, displayedComponents: [.date]).datePickerStyle(WheelDatePickerStyle()).labelsHidden()
                Spacer()
                Button(action: { withAnimation(.default, { onSubmit() }) }) {
                    Text("Ajouter")
                        .font(.system(size: 20, weight: .black))
                        .frame(maxWidth: .infinity, maxHeight: 70)
                        .foregroundColor(Color.white)
                        .background(Calendar.current.isDateInToday(date) ? Color(hex: 0xF0EFF0) : Color(hex: 0x83f9d6))
                        .clipShape(RoundedRectangle(cornerRadius: 70))
                }
                .disabled(Calendar.current.isDateInToday(date))
                .padding(.bottom, 50)
                .padding(.horizontal)
            }
            .tag(2)

        }
        .padding(.top)
        .animation(.easeInOut(duration: 0.3), value: selectedTab)
        .tabViewStyle(.page)
        .indexViewStyle(.page(backgroundDisplayMode: .always))
        .onAppear {
            focusedField = .FIRSTNAME
        }
        .presentationDragIndicator(.visible)

    }
}