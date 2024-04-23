import SwiftUI

struct AvatarPicker: View {
    var firstname: String
    var onSubmit: () -> Void

    @State private var currentIndex: Int = 0
    @Binding var img: String


    let cards: [Card] = [
        Card(id: 0, img: "avatar1", gender: .MALE),
        Card(id: 1, img: "avatar2", gender: .FEMALE),
        Card(id: 2, img: "avatar3", gender: .MALE),
        Card(id: 3, img: "avatar4", gender: .FEMALE),
        Card(id: 4, img: "avatar5", gender: .MALE),
        Card(id: 5, img: "avatar6", gender: .FEMALE),
        Card(id: 6, img: "avatar7", gender: .FEMALE),
        Card(id: 7, img: "avatar8", gender: .FEMALE),
        Card(id: 8, img: "avatar9", gender: .FEMALE),
        Card(id: 9, img: "avatar10", gender: .MALE),
        Card(id: 10, img: "avatar11", gender: .FEMALE),
        Card(id: 11, img: "avatar12", gender: .MALE),
        Card(id: 12, img: "avatar13", gender: .MALE),
        Card(id: 13, img: "avatar14", gender: .MALE),
        Card(id: 14, img: "avatar15", gender: .MALE),
        Card(id: 15, img: "avatar16", gender: .MALE),
        Card(id: 16, img: "avatar17", gender: .MALE),
        Card(id: 17, img: "avatar18", gender: .FEMALE),
        Card(id: 18, img: "avatar19", gender: .FEMALE),
        Card(id: 19, img: "avatar20", gender: .FEMALE),
        Card(id: 20, img: "avatar21", gender: .MALE),
        Card(id: 21, img: "avatar22", gender: .MALE),
        Card(id: 22, img: "avatar23", gender: .MALE),
        Card(id: 23, img: "avatar24", gender: .MALE),
        Card(id: 24, img: "avatar25", gender: .FEMALE),
        Card(id: 25, img: "avatar26", gender: .FEMALE),
        Card(id: 26, img: "avatar27", gender: .FEMALE),
        Card(id: 27, img: "avatar28", gender: .FEMALE),
        Card(id: 28, img: "avatar29", gender: .FEMALE),
        Card(id: 29, img: "avatar30", gender: .MALE),
        Card(id: 30, img: "avatar31", gender: .FEMALE),
        Card(id: 31, img: "avatar32", gender: .FEMALE),
        Card(id: 32, img: "avatar33", gender: .FEMALE),
        Card(id: 33, img: "avatar34", gender: .MALE),
        Card(id: 34, img: "avatar35", gender: .FEMALE),
        Card(id: 35, img: "avatar36", gender: .FEMALE),
        Card(id: 36, img: "avatar37", gender: .FEMALE),
        Card(id: 37, img: "avatar38", gender: .MALE),
        Card(id: 38, img: "avatar39", gender: .FEMALE),
        Card(id: 39, img: "avatar40", gender: .FEMALE),
        Card(id: 40, img: "avatar41", gender: .MALE),
        Card(id: 41, img: "avatar42", gender: .MALE),
        Card(id: 42, img: "avatar43", gender: .MALE),
        Card(id: 43, img: "avatar44", gender: .FEMALE),
        Card(id: 44, img: "avatar45", gender: .FEMALE),
        Card(id: 45, img: "avatar46", gender: .MALE),
        Card(id: 46, img: "avatar47", gender: .MALE),
        Card(id: 47, img: "avatar48", gender: .MALE),
        Card(id: 48, img: "avatar49", gender: .FEMALE),
        Card(id: 49, img: "avatar50", gender: .MALE),
        Card(id: 50, img: "avatar51", gender: .MALE),
        Card(id: 51, img: "avatar52", gender: .FEMALE),
        Card(id: 52, img: "avatar53", gender: .MALE),
        Card(id: 53, img: "avatar54", gender: .FEMALE),
        Card(id: 54, img: "avatar55", gender: .MALE),
        Card(id: 55, img: "avatar56", gender: .FEMALE),
        Card(id: 56, img: "avatar57", gender: .MALE),
        Card(id: 57, img: "avatar58", gender: .FEMALE),
        Card(id: 58, img: "avatar59", gender: .MALE),
        Card(id: 59, img: "avatar60", gender: .MALE),
    ]

    var body: some View {
        GeometryReader { geometry in
            VStack(alignment: .leading) {
                HStack {
                    Spacer()
                    Text("A quoi ressemble \(firstname) ?").font(.largeTitle.weight(.black)).multilineTextAlignment(.center)
                    Spacer()
                }

                Spacer()
                ZStack {
                    ForEach(cards) { card in
                        CarouselCardView(card: card, currentIndex: $currentIndex, geometry: geometry)
                    }
                }
                .gesture(
                    DragGesture()
                        .onEnded { value in
                            let cardWidth = geometry.size.width * 0.3
                            let offset = value.translation.width / cardWidth

                            withAnimation(Animation.spring()) {
                                if value.translation.width < -offset {
                                    currentIndex = min(currentIndex + 1, cards.count - 1)
                                } else if value.translation.width > offset {
                                    currentIndex = max(currentIndex - 1, 0)
                                }
                                img = cards[currentIndex].img
                            }
                        }
                )
                Spacer()
                HStack {
                    Spacer()
                    Button(action: { onSubmit() }) {
                        Text("Ajouter")
                            .font(.system(size: 20, weight: .black))
                            .frame(maxWidth: 140, maxHeight: 70)
                            .foregroundColor(Color.white)
                            .background(Color("AccentGreen"))
                            .clipShape(RoundedRectangle(cornerRadius: 70))
                    }
                    .padding(.bottom, 50)
                    .padding(.horizontal, 24)
                    Spacer()
                }

            }
            .padding(.top, 24)
        }
    }
}

enum Gender {
    case MALE
    case FEMALE
}

struct Card: Identifiable {
    var id: Int
    var img: String
    var gender: Gender
}

struct CarouselCardView: View {
    let card: Card
    @Binding var currentIndex: Int
    let geometry: GeometryProxy

    var body: some View {
        let cardWidth = geometry.size.width * 0.8
        let cardHeight = cardWidth

        return VStack {
            Image(card.img).resizable().frame(width: cardWidth, height: cardHeight)
                .opacity(card.id <= currentIndex + 1 ? 1.0 : 0.0)
                .scaleEffect(card.id == currentIndex ? 1.0 : 0.75)

        }
        .frame(width: cardWidth, height: cardHeight)
        .offset(x: CGFloat(card.id - currentIndex) * (cardWidth * 0.9) + (UIScreen.main.bounds.width / 2) - (cardWidth / 2))
    }
}