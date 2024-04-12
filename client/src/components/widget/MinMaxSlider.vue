<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const props = withDefaults(
  defineProps<{
    min?: number
    max?: number
    step?: number
  }>(),
  {
    min: 1,
    max: 20,
    step: 1,
  }
)

// Define the model for the minimum value of the slider
const minValue = defineModel<number>('minValue', { default: () => 1 })

// Define the model for the maximum value of the slider
const maxValue = defineModel<number>('maxValue', { default: () => 20 })

// Create a ref for the minimum value of the slider
const sliderMinValue = ref(minValue)

// Create a ref for the maximum value of the slider
const sliderMaxValue = ref(maxValue)

// Watch for changes in the slider values and update them if necessary
watchEffect(() => {
  if (sliderMinValue.value < props.min) {
    minValue.value = props.min;
  }
  if (sliderMinValue.value >= sliderMaxValue.value) {
    const adjustedMinValue = Math.max(props.min, sliderMaxValue.value - props.step);
    minValue.value = adjustedMinValue < props.min ? props.min : adjustedMinValue;
  }
  if (sliderMaxValue.value <= sliderMinValue.value) {
    maxValue.value = Math.max(sliderMinValue.value + props.step, props.min + props.step);
  }
});
</script>

<template>
  <div class="custom-slider minmax">
    <input type="range" name="min" :min="props.min" :max="props.max" :step="props.step"
      v-model.number="sliderMinValue" />
    <input type="range" name="max" :min="props.min" :max="props.max" :step="props.step"
      v-model.number="sliderMaxValue" />
  </div>
  <div class="minmax-inputs">
    <div class="input-box">
      <label for="min-input">Min</label>
      <input type="number" name="min-input" :min="props.min" :max="sliderMaxValue - props.step" :step="props.step"
        v-model.number="sliderMinValue"/>
    </div>
    <div class="input-box">
      <label for="max-input">Max</label>
      <input type="number" name="max-input" :min="sliderMinValue + props.step" :max="props.max" :step="props.step"
        v-model.number="sliderMaxValue" />
    </div>
  </div>
</template>

<style scoped lang="sass">
.custom-slider
  margin-top: 2rem
.input-box
  display: flex
  flex-direction: column-reverse
  align-items: center
  justify-content: space-between
  width: 100%
  label
    color: #FF9913
    padding:0.5rem 0 0 0
    margin: 0

.input-box:nth-child(2)
  margin-left: 5rem

.custom-slider.minmax input[type="range"]
  position: absolute
  width:   90%
  justify-self: center 
  margin: 0 4rem 0 2rem

.minmax-inputs
  display: flex
  justify-self: center
  width: 100%
  justify-content: space-around
  margin-top: 4rem 

.minmax-inputs input
  width: 60px

$range-thumb-color: #FF9913
$range-track-color: darken($range-thumb-color, 30%)

input[type="number"]
  padding-left: 0.5rem
  font-weight: bold

input[type="range"]
  -webkit-appearance: none
  width: 100%
  &::-webkit-slider-thumb
    -webkit-appearance: none
    border: none
    height: 20px
    width: 20px
    border-radius: 50%
    background: $range-thumb-color
    cursor: pointer
    margin-top: -9px

  &::-moz-range-thumb
    border: none
    height: 16px
    width: 16px
    border-radius: 50%
    background: $range-thumb-color
    cursor: pointer

  &::-ms-thumb
    border: none
    height: 16px
    width: 16px
    border-radius: 50%
    background: $range-thumb-color
    cursor: pointer

  // Track
  &::-webkit-slider-runnable-track
    background: $range-track-color
    height: 2px
    cursor: pointer

  &::-moz-range-track
    background: $range-track-color
    height: 2px
    cursor: pointer

  &::-ms-track
    background: $range-track-color
    height: 2px
    cursor: pointer
    border-color: transparent
    color: transparent
@media screen and (max-width: 768px)
  .custom-slider.minmax input[type="range"]
    position: absolute
    width: 100%
    margin: 0
  .custom-slider
    margin-top: 0.5rem
  .minmax-inputs
    margin-top: 2.5rem
</style>
