import SwiftUI
import Shared

struct BdaySheet: View {
    var bday: Birthday
    var onDelete: (_ id: KbsonBsonObjectId) -> Void
    @Environment(\.presentationMode) var presentationMode
    @State private var showGiftAlert: Bool = false
    @State private var giftIdea: String = ""

    func formatDate(date: String) -> String {
        let formatter = DateFormatter()
        formatter.dateFormat = "MM/dd/yyyy"
        formatter.locale = Locale(identifier: "fr_FR_POSIX")
        let d = formatter.date(from: date)
        formatter.dateFormat = "dd MMMM yyyy"
        return formatter.string(from: d ?? Date.now)
    }

    var body: some View {
        VStack {
            if showGiftAlert {
                VStack(alignment: .leading) {
                    HStack {
                        Text("Une idée cadeau ?").font(.system(size: 20, weight: .bold)).padding(.bottom, 2)
                        Spacer()
                    }
                    HStack {
                        Text("Aidez nous à vous proposer les meilleurs cadeaux dans notre prochaine mise a jour.").font(.system(size: 16, weight: .medium)).padding(.bottom, 4)
                        Spacer()
                    }

                    TextField("", text: $giftIdea, prompt: Text("Nike air force 1 édition limité").foregroundColor(Color(hex: 0xF0EFF0)), axis: .vertical)
                        .padding()
                        .textFieldStyle(.plain)
                        .font(.system(size: 16, weight: .semibold))
                        .lineLimit(3, reservesSpace: true)
                        .foregroundColor(Color("AccentGreen"))
                        .background(RoundedRectangle(cornerRadius: 8).fill(.white))
                        .accentColor(Color("AccentRed"))
                        .autocorrectionDisabled()
                    HStack {
                        Button(action: {}) {
                            Text("envoyer")
                                .font(.system(size: 20, weight: .bold))
                                .frame(maxWidth: 140, maxHeight: 40)
                                .foregroundColor(Color.white)
                                .background(Color("AccentGreen"))
                                .clipShape(RoundedRectangle(cornerRadius: 70))
                        }
                        Spacer()
                    }

                }
                .ignoresSafeArea()
                .frame(width: UIScreen.main.bounds.width * 0.85)
                .padding()
                .background(RoundedRectangle(cornerRadius: 12).fill(Color(hex: 0xF0EFF0)))
                .transition(.asymmetric(insertion: .move(edge: .trailing), removal: .move(edge: .trailing)))
                .padding()
            }
            Spacer()
            Image(bday.img).resizable().frame(width: 120, height: 120).aspectRatio(contentMode: .fit).padding(.bottom, 8)
            VStack {
                Text("\(bday.firstname) \(bday.lastname)").font(.system(size: 22, weight: .black)).padding(.bottom, 2)
                Text("\(formatDate(date: bday.date))").font(.system(size: 20, weight: .black)).foregroundColor(Color("AccentGreen")).padding(.bottom, 8)
            }

            HStack {
                Button(action: {}) {
                    Image(systemName: "bell.badge")
                        .font(.system(size: 20, weight: .bold))
                        .frame(width: 70, height: 70)
                        .foregroundColor(Color.white)
                        .background(Color("AccentGreen"))
                        .clipShape(Circle())
                }
                .disabled(false)
                Button(action: { onDelete(bday.id); deleteScheduledNotification(bday.id); presentationMode.wrappedValue.dismiss() }) {
                    Image(systemName: "trash")
                        .font(.system(size: 20, weight: .bold))
                        .frame(width: 70, height: 70)
                        .foregroundColor(Color.white)
                        .background(Color("AccentRed"))
                        .clipShape(Circle())
                }
                .disabled(false)

            }
            Spacer()
        }
        .presentationDetents([.large])
        .presentationDragIndicator(.visible)
        .ignoresSafeArea(.keyboard)

    }
}