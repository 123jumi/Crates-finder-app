<script setup lang="ts">

import { computed, defineProps } from 'vue';
import type { Crate } from '@/interfaces/index';

const props = defineProps<{
  crate: Crate
}>();
const pic = computed(() => {
  return +props.crate.level >= 16
    ? "https://robots.farm/items/crate-big-s3.webp"
    : +props.crate.level >= 10
      ? "https://robots.farm/items/crate-medium-s3.webp"
      : "https://robots.farm/items/crate-small-s3.webp";
})
const items = computed(() => {
  return props.crate.stats.map((i) => {
    return {
      key: i.key.split(/\s/g)[1]?i.key.split(/\s/g)[1]:i.key,
      value: i.value
    }
  })
})


</script>

<template>
    <BCard class="mb-3 w-100 jusitfy-content-around">
      <BRow>
        <BCol class="d-flex flex-column justify-content-center align-items-center m-0 p-0">
          <BImg class="img-resto" rounded="sm"  :src="pic" alt="Image" top />
          <p class="description">Crate level :{{ crate.level }}</p>
        </BCol>
        <BCol class="d-flex flex-column justify-content-center align-items-center">
          <h3 class="title">{{ crate.price}} eth</h3>
          <div class="d-flex justify-content-center align-items-center">
          <div v-for="i in items" :key="i.key" class="d-flex flex-column justify-content-center align-items-center">
            <img width="60px" :src="`https://robots.farm/items/item-${i.key.toLocaleLowerCase()}.webp`" alt="item" />
            <span>{{ i.value }}</span>
          </div>
          </div>
        </BCol>
        <BCol class="d-flex align-items-center justify-content-center">
              <a  class="link text-decoration-none"
                :href="`${crate.link}`">
               Buy Now
            </a>
        </BCol>
      </BRow>
    </BCard>
</template>

<style scoped lang="sass">
.card
  padding-inline: 2rem

.description
  font-size: 1.5rem

.img-resto
  width: 200px
  object-fit: cover
span
  font-size: 1.5rem
  margin: 0.5rem
  white-space: nowrap
.rating
  margin: 0.5rem 0
  font-size: 1.1rem
  white-space: nowrap
.title
  font-size: 1.5rem
  padding:  0 1rem
  white-space: nowrap

  
.rating img
    width: 1.5rem
    margin-bottom: 0.3rem
    margin-left: 0.3rem
.link
  margin: 0  0.5rem 0 0
  color: purple
  font-size: 1.5rem
.link:hover
  scale: 1.1

@media screen and (max-width: 768px)
  h3
    font-size: 1rem
    text-align: center

  .card
    width: 100%

  .img-resto
    width: 100px
    padding-bottom: 1rem

  .container:last-child
    justify-content: center !important
    gap: 0.8rem
</style>
