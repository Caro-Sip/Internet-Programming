<script setup lang="ts">
import {computed, ref, transformVNodeArgs, watch} from "vue";
import EventList from "./components/EventList.vue";
import { initialEvents } from "./data/events";
import type { CampusEvent } from "./types";

// A reactive copy of the hard-coded events
const events = ref<CampusEvent[]>(initialEvents.map(e => ({ ...e })));

const myBookings = ref<number[]>([]);
const bookingCount = computed(() => {
  return myBookings.value.length;
})

//         increase its `booked` and add the id to myBookings
function onBook(id: number) {
  const selectedEvent = events.value.find(e => e.id === id);

  if(selectedEvent && selectedEvent.booked < selectedEvent.capacity){
      selectedEvent.booked++;
      myBookings.value.push(id);
      console.log("book", id);
  }
}

// TODO 4 (bonus): keep my bookings after a page reload
//   - watch myBookings and save it to localStorage (JSON.stringify)
//   - read it back when the app starts, and add those seats to `booked`
watch(myBookings, ids => {
  localStorage.setItem("myBookings", JSON.stringify(ids)); },
    { deep: true}
);

const savedBookings =  localStorage.getItem("myBookings");

if(savedBookings){
  const savedIds: number[] = JSON.parse(savedBookings);
  myBookings.value = savedIds;

  savedIds.forEach(id =>{
    const targetEvent = events.value.find(e => e.id == id);
    if(targetEvent){
      targetEvent.booked++;
    }
  });
}

</script>

<template>
  <main>
    <header>
      <h1>Campus Events</h1>
      <p class="mine">You have booked {{bookingCount}} {{bookingCount == 1 ? "seat" : "seats" }}.</p>
    </header>
    <EventList :events="events" @book="onBook" />
  </main>
</template>

<style scoped>
header { margin-bottom: 16px; }
.mine { color: #6b7280; margin: 0; }
</style>
