<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import Card from '@/components/Card.vue'
import { sort } from '@/utils/card'

const props = defineProps({
  player: {
    type: Number,
    required: true,
  },
  dealCards: {
    type: Array,
    required: true,
  },
})

const cards = ref([])

const activeIds = ref([-1])

function handleClick(idx) {
  if (activeIds.value.includes(idx))
    activeIds.value = activeIds.value.filter(i => i !== idx)

  else
    activeIds.value.push(idx)
}

watchEffect(
  () => {
    const t = sort(props.dealCards)
    // 一张一张的发牌
    cards.value = []
    for (let i = 0; i < t.length; i++)
      setTimeout(() => cards.value.push(t[i]), i * 300)

    activeIds.value = [-1]
  },
)
</script>

<template>
  <div>
    <div class="name">
      玩家 {{ player }}
    </div>
    <div class="card-wrapper">
      <div class="card">
        <template v-for="(card, idx) in cards" :key="card.key">
          <div class="item" @click="handleClick(idx)">
            <Card :card="card" :active="activeIds.includes(idx)" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.name {
  font-size: 20px;
  padding: 10px 0;
  text-align: center;
}

.card-wrapper {
  margin-left: calc(55px + 10px);
  margin-top: calc(75px);

  .card {
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
  }
}

@media screen and (max-width: 960px) {
  .name {
    font-size: 12px;
    padding: 5px 0;
    text-align: center;
  }

  .card-wrapper {
    width: 100%;
    margin-left: calc(55px + 10px);
    margin-top: calc(25px);

    .card {
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
    }
  }
}
</style>
