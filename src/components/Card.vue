<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
})

const cardConfig = {
  heart: '♥',
  diamond: '♦',
  club: '♣',
  spade: '♠',
}

const cardContent = computed(() => {
  return cardConfig[props.card.color] + props.card.point
})
</script>

<template>
  <div class="card" :class="[card.color, { active }]">
    <div class="top">
      {{ cardContent }}
    </div>
    <div class="bottom">
      {{ cardContent }}
    </div>
  </div>
</template>

<style lang="less" scoped>
.card {
  cursor: pointer;
  width: 100px;
  height: 150px;
  background-color: #fff;

  margin-left: -55px;
  margin-top: -75px;

  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;

  &.active {
    z-index: 99;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    transform: translateY(-10px);
  }

  .top {
    position: absolute;
    top: 10px;
    left: 6px;
  }
  .bottom {
    position: absolute;
    bottom: 10px;
    right: 6px;
    transform: rotate(180deg);
  }

  &.heart, &.diamond {
    color: #f00;
  }

  &.club, &.spade {
    color: #000;
  }
}

@media screen and (max-width: 960px) {
  .card {
    width: 50px;
    height: 75px;

    margin-left: -25px;
    margin-top: -25px;

    font-size: 12px;
  }
}
</style>
