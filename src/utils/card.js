// 洗牌算法
export function shuffle(cards) {
  const copy = [...cards]
  for (let i = 0; i < copy.length; i++) {
    const j = Math.floor(Math.random() * (i + 1))
    const t = copy[i]
    copy[i] = copy[j]
    copy[j] = t
  }
  return copy
}

// 根据人数发牌
export function deal(cards, players) {
  if (cards.length % players !== 0)
    throw new Error('发牌失败，牌数不能被人数整除')

  const copy = [...cards]
  const result = []
  for (let i = 0; i < players; i++)
    result.push([])

  while (copy.length) {
    for (let i = 0; i < players; i++) {
      const card = copy.shift()
      if (card)
        result[i].push(card)
    }
  }
  return result
}

export function sort(cards, reverse = false) {
  return [...cards].sort((a, b) => {
    if (reverse)
      return b.pointNum - a.pointNum
    else
      return a.pointNum - b.pointNum
  })
}

// 计算赢家
export function getWinner(players) {
  const colorOrder = {
    heart: 4, // ♥ @
    diamond: 3, // ♦ #
    club: 2, // ♣ ^
    spade: 1, // ♠ *
  }

  players.forEach(cards => sort(cards, true))

  for (let pointNum = 14; pointNum >= 2; pointNum--) {
    const counts = players.map(player => player.filter(card => card.pointNum === pointNum).length)
    const maxCount = Math.max(...counts)

    const maxCountIndex = counts.filter(count => count === maxCount).length
    if (maxCountIndex === 1) { return counts.indexOf(maxCount) + 1 }
    else if (maxCountIndex === 2) {
      const firstIndex = counts.indexOf(maxCount)
      if (players[firstIndex].find(card => card.pointNum === pointNum && card.color === 'heart'))
        return firstIndex + 1
      else
        return counts.indexOf(maxCount, firstIndex + 1) + 1
    }
  }

  // 如果所有点数的数量都相同，比较最大点数的花色
  for (const player of players)
    player.sort((a, b) => colorOrder[b.color] - colorOrder[a.color])

  return players.map(player => colorOrder[player[0].color]).reduce((maxPlayer, currValue, currIndex, array) => currValue > array[maxPlayer] ? currIndex : maxPlayer, 0) + 1
}
