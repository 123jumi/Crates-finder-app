<script setup lang="ts">
import SearchTabs from '@/features/searchResult/components/SearchTabs.vue';
</script>

<template>
  <main id="search" class="d-flex flex-column flex-grow-1 justify-content-center align-items-center  p-3">
     <h1>Crates Finder</h1>
    <SearchTabs />
  </main>
</template>

<style scoped lang="sass">
#search
  width: 100%
  position: relative
  overflow: hidden

h1
  font-size: 2.2rem
  
  margin: 2rem
  padding: 0
  font-weight: 500
</style>