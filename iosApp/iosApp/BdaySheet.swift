import SwiftUI
import Shared

struct BdaySheet: View {
    var bday: Birthday
    var onDelete: (_ id: KbsonBsonObjectId) -> Void
    var onToggleNotification: (_ id: KbsonBsonObjectId) -> Void
    var onSaveGift: (_ id: KbsonBsonObjectId, _ idea: String) -> Void
    @Environment(\.presentationMode) var presentationMode
    @State private var showGiftAlert: Bool = true
    @State private var notificationEnabled: Bool
    @State private var giftIdea: String = ""

    init(bday: Birthday, onDelete: @escaping (_ id: KbsonBsonObjectId) -> Void, onToggleNotification: @escaping (_ id: KbsonBsonObjectId) -> Void, onSaveGift: @escaping (_ id: KbsonBsonObjectId, _ idea: String) -> Void) {
        self.bday = bday
        self.onDelete = onDelete
        self.onToggleNotification = onToggleNotification
        self.onSaveGift = onSaveGift
        notificationEnabled = bday.reminderEnabled
    }

    func formatDate(date: String) -> String {
        let formatter = DateFormatter()
        formatter.dateFormat = "MM/dd/yyyy"
        formatter.locale = Locale(identifier: "fr_FR_POSIX")
        let d = formatter.date(from: date)
        formatter.dateFormat = "dd MMMM yyyy"
        return formatter.string(from: d ?? Date.now)
    }

    func toggleNotification() {
        let formatter = DateFormatter()
        formatter.dateFormat = "MM/dd/yyyy"
        formatter.locale = Locale(identifier: "fr_FR_POSIX")
        let d = formatter.date(from: bday.date)
        notificationEnabled ? deleteScheduledNotification(bday.id) : scheduleNotification(name: "\(bday.firstname) \(bday.lastname)", date: d ?? Date.now, id: bday.id)

        onToggleNotification(bday.id)
        notificationEnabled.toggle()
        bday.reminderEnabled.toggle()
    }

    var body: some View {
        VStack {
            VStack {
                Spacer()
                Image(bday.img).resizable().frame(width: 120, height: 120).aspectRatio(contentMode: .fit).padding(.bottom, 8)
                VStack {
                    Text("\(bday.firstname) \(bday.lastname)").font(.system(size: 22, weight: .black)).padding(.bottom, 2)
                    Text("\(formatDate(date: bday.date))").font(.system(size: 20, weight: .black)).foregroundColor(Color("AccentGreen")).padding(.bottom, 8)
                }

                HStack {
                    Button(action: { toggleNotification() }) {
                        Image(systemName: "bell.badge")
                            .font(.system(size: 20, weight: .bold))
                            .frame(width: 70, height: 70)
                            .foregroundColor(Color.white)
                            .background(notificationEnabled ? Color("AccentGreen") : Color(hex: 0xF0EFF0))
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

            if showGiftAlert && bday.showGiftIdeaAlert {
                VStack(alignment: .leading) {
                    HStack {
                        Text("Une idée cadeau ?").font(.system(size: 18, weight: .semibold)).padding(.bottom, 2)
                        Spacer()
                    }
                    HStack {
                        Text("Aidez nous à vous proposer les meilleurs cadeaux dans notre prochaine mise a jour.").font(.system(size: 14, weight: .regular)).padding(.bottom, 4).fixedSize(horizontal: false, vertical: true)
                        Spacer()
                    }

                    TextField("", text: $giftIdea, prompt: Text("Nike air force 1 édition limité").foregroundColor(Color(hex: 0xF0EFF0)), axis: .vertical)
                        .padding()
                        .textFieldStyle(.plain)
                        .font(.system(size: 16, weight: .semibold))
                        .lineLimit(3, reservesSpace: true)
                        .foregroundColor(Color("AccentGreen"))
                        .background(RoundedRectangle(cornerRadius: 8).fill(.white))
                        .accentColor(Color("AccentGreen"))
                        .autocorrectionDisabled()
                        .padding(.bottom, 8)
                        .submitLabel(.send)


                    HStack {
                        Button(action: {
                            onSaveGift(bday.id, giftIdea); withAnimation {
                                showGiftAlert.toggle()
                                bday.showGiftIdeaAlert.toggle()
                            }
                        }) {
                            Text("envoyer")
                                .font(.system(size: 18, weight: .semibold))
                                .frame(maxWidth: .infinity, minHeight: 40, maxHeight: 40)
                                .foregroundColor(Color.white)
                                .background(Color("AccentGreen"))
                                .clipShape(RoundedRectangle(cornerRadius: 70))
                        }
                        Button(action: {
                            withAnimation {
                                showGiftAlert.toggle()
                            }
                        }) {
                            Text("fermer")
                                .font(.system(size: 18, weight: .semibold))
                                .frame(maxWidth: .infinity, minHeight: 40, maxHeight: 40)
                                .foregroundColor(Color.white)
                                .background(Color("AccentRed"))
                                .clipShape(RoundedRectangle(cornerRadius: 70))
                        }
                    }

                }
                .frame(width: UIScreen.main.bounds.width * 0.8)
                .padding()
                .background(RoundedRectangle(cornerRadius: 12).fill(Color(hex: 0xF0EFF0)))
                .transition(.asymmetric(insertion: .move(edge: .trailing), removal: .move(edge: .trailing)))
                .padding(24)
            }
        }
        .presentationDetents([.large])
        .presentationDragIndicator(.visible)
        .onTapGesture {
            self.endEditing()
        }
    }
}