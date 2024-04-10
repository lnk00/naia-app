import SwiftUI

struct AvatarPicker: View {
    @State private var currentIndex: Int = 0

    let cards: [Card] = [
        Card(id: 0, img: "avatar_1"),
        Card(id: 1, img: "avatar_2"),
        Card(id: 2, img: "avatar_3"),
        Card(id: 3, img: "avatar_4"),
        Card(id: 4, img: "avatar_5"),
        Card(id: 5, img: "avatar_6"),
        Card(id: 6, img: "avatar_7"),
        Card(id: 7, img: "avatar_8"),
        Card(id: 8, img: "avatar_9"),
        Card(id: 9, img: "avatar_10"),
    ]

    var body: some View {
        GeometryReader { geometry in
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
                        }

                    }
            )
        }
        .padding(.top, 132)
    }
}

struct Card: Identifiable {
    var id: Int
    var img: String
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
        .offset(x: CGFloat(card.id - currentIndex) * (cardWidth * 0.9) + (UIScreen.main.bounds.width / 2 - cardWidth / 2))
    }
}