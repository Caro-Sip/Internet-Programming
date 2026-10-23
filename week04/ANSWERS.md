1. In EventList, what goes wrong if you use the array index as :key and the list gets filtered while a card has local state (for example an open details panel)? 

The array index will shift when the list shrinks or expand causing mismatch in the UI states like checkboxes.

2. Why is visible a computed and not a function called from the template? What is the difference when you type in the search box? 

Computed will re-evaluated everytime its dependencies changed but as a function, it will do it everytime something changes, causing performance issues. When typing into a search box, the computed will cache and save for the next render without having to redo the calculation.

3. EventCard emits book instead of changing event.booked. Give two reasons. 

For one, it prevents a child from messing with props from the parent. Second, the parent component will handle the localstorage persistence while the child can care about the presentation only.

4. You write const { booked } = reactive(event); booked++. The page does not change. Why?

Because { booked } destructured booking causing it to lose its reactivity.

5. Where does myBookings live, and why not in EventCard or EventList?

myBookings lives inside of localStorage of the browser from its code inside of `App.vue`. It cannot be in EventCard nor EventList because those two do not handle data, only the presentation of data.