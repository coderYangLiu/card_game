// 卡牌点数
export const CARD_POINTS = [3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A', 2]
// 卡牌花色
export const CARD_COLORS = ['heart', 'diamond', 'club', 'spade']

export const CARDS = CARD_COLORS.reduce((cards, color) => {
  return cards.concat(CARD_POINTS.map((point, pIdx) => {
    return {
      color,
      point,
      pointNum: pIdx + 2,
      key: `${color}-${point}`,
    }
  }))
}, [])

export const PLAYERS = 4
