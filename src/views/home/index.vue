<script setup>
import { ref } from 'vue'
import Player from './cpns/Player.vue'
import { CARDS, PLAYERS } from '@/global/config'
import { deal, getWinner, shuffle } from '@/utils/card'

const dealCards = ref(deal(shuffle(CARDS), PLAYERS))

const result = ref('')
function handlePlay() {
  result.value = ''
  dealCards.value = deal(shuffle(CARDS), PLAYERS)
}

function handleResult() {
  result.value = `玩家 ${getWinner(dealCards.value)} 获胜`
}
</script>

<template>
  <main class="card-game">
    <div class="result">
      <div class="name">
        {{ result }}
      </div>
      <div class="btns">
        <button class="btn" @click="handlePlay">
          开始游戏
        </button>
        <button class="btn" @click="handleResult">
          计算结果
        </button>
      </div>
    </div>
    <div class="wrapper">
      <template v-for="player in PLAYERS" :key="player">
        <div class="player">
          <Player :player="player" :deal-cards="dealCards[player - 1]" />
        </div>
      </template>
    </div>
  </main>
</template>

<style lang="less">
.card-game {
  width: 120vmin;
  height: 100vmin;
  margin: 0 auto;
  border-radius: 50%;
  position: relative;

  .result {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 50px;

    .name {
      font-size: 20px;
      padding: 10px 0;
      text-align: center;
    }

    .btns {
      .btn {
        padding: 10px 20px;
        border-radius: 5px;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        margin-left: 10px;
      }
    }
  }

  .wrapper {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    overflow: hidden;
  }

  .player {
    &:nth-child(1) {
      transform: rotate(180deg) translateY(36%) translateX(-48%);
    }

    &:nth-child(2) {
      transform: rotate(270deg) translateY(40%) translateX(-36%);
    }

    &:nth-child(3) {
      transform: translateY(36%) translateX(52%);
    }

    &:nth-child(4) {
      transform: rotate(90deg) translateY(160%) translateX(-36%);
    }
  }
}

@media screen and (max-width: 960px) {
  .card-game {
    width: 100vmin;
    height: 100vmax;
    background-color: transparent;

    .result {
      z-index: 99;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-60%, -50%);
      height: 50px;

      .name {
        font-size: 20px;
        padding: 5px 0;
        text-align: center;
      }

      .btns {
        .btn {
          border-radius: 5px;
          background-color: #fff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          margin-left: 10px;
        }
      }
    }

    .wrapper {
      height: 100%;
      width: 100%;
      position: relative;
    }

    .player {
      &:nth-child(1) {
        transform: translate(-50%, 0) rotate(180deg);
        position: absolute;
        top: 20%;
        left: 50%;
      }

      &:nth-child(2) {
        transform: translate(30%, 0) rotate(270deg);
        position: absolute;
        top: 50%;
        right: 0;
      }

      &:nth-child(3) {
        transform:  translate(-75%, 20%);
        position: absolute;
        bottom: 20%;
        left: 50%;
      }

      &:nth-child(4) {
        transform: translate(-35%, 0) rotate(90deg) ;
        position: absolute;
        top: 50%;
        left: 0;
      }
    }
  }

}
</style>
