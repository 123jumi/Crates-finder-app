<script setup lang="ts">
import { useCrate } from '@/stores/index'

import CrateCard from '@/components/cards/CrateCard.vue'
import SearchBar from '@/components/search/SearchBar.vue'


const crateStore = useCrate()
</script>
<template>
  <BTabs class="tabtab mt-1 searchTabs  w-75" v-if="crateStore.getRestaurantList">
    <BTab title="find crates" class="postion-absolute" active>
      <BContainer class="tel d-flex align-item-center flex-wrap w-75">
        <SearchBar show-filter-btn />
      </BContainer>
      <BContainer v-if="crateStore.getRestaurantList.length" class="d-flex list flex-wrap"
        :style="{ justifyContent: crateStore.getRestaurantList.length > 1 ? 'space-around' : 'start' }">
        <CrateCard v-for="crate in crateStore.getRestaurantList" :key="crate.id" :crate="crate" />
      </BContainer>
    </BTab>
    
    <BTab title="profil" class="">
      <BContainer class="d-flex justify-content-center flex-wrap w-75">
        <SearchBar show-filter-btn />
        <h2>Profil coming soon</h2>
      </BContainer>
      <BContainer class="map d-flex flex-row justify-content-center align-items-center">
     
      </BContainer>
    </BTab>
  </BTabs>
</template>

<style scoped lang="sass">
.searchTabs
  width: 90%
  height: 80vh 
  padding-bottom: 10rem
  overflow: hidden
  justify-content: space-between
.list
  height: 60vh
  padding-bottom: 5rem
  padding: auto
  overflow-y: scroll
.map
  max-height: 52vh
  margin-bottom: 0rem
  overflow-y: scroll
h1
  font-size: 2.2rem
  margin-bottom: 1rem
  padding: 0
  font-weight: 500
@media screen and (max-width: 900px)
  .tabtab
    width: 100%
  .searchTabs
    width: 100% !important
    height: 80vh !important
  .tel
    width: 100%
  .list
    height: 70vh
    padding-bottom: 15rem
    padding: auto
    overflow-y: scroll
  
</style>
