<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import type { BookingInput } from "../types";
import { hasErrors, validateBooking } from "../validation";
import {seatsLeft} from "../format.ts";

const props = defineProps<{ seatsLeft: number; pending?: boolean }>();
const emit = defineEmits<{ submit: [input: BookingInput] }>();

// EventForm.vue is a finished form: use it as your pattern.
// TODO C2: a reactive `form` object { name: "", email: "", seats: 1 }
const form = reactive({ name: "", email:"", seats: 1});
// TODO C3: `submitted` (ref, false) and `errors` (computed with validateBooking)
const submitted = ref(false)
const errors = computed(() => validateBooking(form,props.seatsLeft))
// TODO C4: onSubmit(): set submitted; stop if there are errors;
//          otherwise emit "submit" with the trimmed name and email, and seats
function onSubmit() {
  submitted.value = true;

  if(Object.keys(errors.value).length > 0){
    return;
  }

  emit('submit', {
    name: form.name.trim(),
    email: form.email.trim(),
    seats: form.seats
  });
}
</script>

<template>
  <!-- TODO C5: v-model each input (seats with v-model.number);
       show each error in a <p class="error"> under its field, only after the first submit;
       disable the button and show "Booking..." while 'ending -->
  <form novalidate @submit.prevent="onSubmit">
    <label>
      Name
      <input name="name" v-model="form.name" type="text" autocomplete="name" />
      <span class="error" v-if="submitted && errors.name">{{ errors.name }}</span>
    </label>

    <label>
      Email
      <input name="email" v-model="form.email" type="email" autocomplete="email" />
      <span class="error" v-if="submitted && errors.email">{{ errors.email }}</span>
    </label>

    <label>
      Seats
      <input name="seats" v-model.number="form.seats" type="number" min="1" max="4" />
      <span class="error" v-if="submitted && errors.email">{{errors.seats}}</span>
    </label>

    <button type="submit" :disabled="pending">
      {{pending ? 'Booking...' : 'Book'}}
    </button>
  </form>
</template>

<style scoped>
form { display: flex; flex-direction: column; gap: 8px; max-width: 360px; }
label { display: flex; flex-direction: column; gap: 4px; font-weight: 600; }
.error { color: #d73a49; margin: 0; font-size: 0.9rem; }
button { align-self: flex-start; margin-top: 8px; }
</style>
