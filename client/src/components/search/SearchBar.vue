<script setup lang="ts">
import { ref } from 'vue'
import { useCrate } from '@/stores/index'
import { useToast } from 'bootstrap-vue-next';
import MinMaxSlider from '@/components/widget/MinMaxSlider.vue'


const crateStore = useCrate()
const address = ref('')
const min = ref(1)
const max = ref(20)
const sliderMinValue = ref(1)
const sliderMaxValue = ref(20)

const { show } = useToast()
/**
 * Component for the search bar functionality.
 */

defineProps<{
  showFilterBtn?: boolean
}>()


const handleSubmit = async () => {
  crateStore.setError(null)
  await crateStore.fetchSearchResults(
    address.value,
    sliderMinValue.value,
    sliderMaxValue.value
  )
  if (crateStore.getError) {
    
    if (crateStore.getError && String(crateStore.getError).includes('Request failed with status code 429')) {
      show?.({
        props: {
          title: 'Error',
          body: 'Too many requests, please try again later',
          pos: 'bottom-center',
          variant: 'danger'
        }
      })
    }
    else { 
  show?.({
    props: {
      title: 'Error',
      body: crateStore.getError,
      pos: 'bottom-center',
      variant: 'danger'
    }
  })
}
    crateStore.setError(null)
  }
  
}

</script>
<template>
  <BForm @submit.prevent="handleSubmit()" class="d-flex flex-column justify-content-center mt-3 mb-3 w-100">
    <BInputGroup class="mt-3 flex-nowrap">
      <BFormInput type="search" class="w-75" placeholder="Your address: 0x...." v-model="address" />
      <BInputGroupAppend>
        <BButton variant="outline-success" aria-label="button search" type="submit">🔎
        </BButton>
      </BInputGroupAppend> 
    </BInputGroup>
    <BContainer class="d-flex minMaxSlider">
     <MinMaxSlider :min="min" :max="max" v-model:min-value="sliderMinValue" v-model:max-value="sliderMaxValue" />
    </BContainer>
  </BForm>
  <BToastOrchestrator />
</template>

<style scoped lang="sass">
button
  color: black
.filter
  position: relative
  width: 80px
  height: 40px
  top: 1rem
  left: 0px
  margin-right : 1rem
.minMaxSlider
  padding: 2rem 0
  width: 100%
  position: relative
  
@media screen and (max-width: 400px)
 
</style>
