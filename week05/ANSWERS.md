1.	You refresh the browser on /events/2 and the page loads. Which program answered that request in development, and what must the production server do so it still works after deployment?

The vite development handles the client side server for unknowne direction during development; however, during the production, all unknown directories should be redirecting to `index.html`.

2.	The guard stops students from opening /events/new. Can a student still create an event? How, and what must stop them?

yes the student can still send a POST method via curl. To prevent this, the backend needs to implement a role base authorization method.

3.	EventDetailPage loads its event in a watch on the id with immediate: true, not in onMounted. What bug would onMounted alone cause?

This bug would cause stale old even data to display causing confusion.

4.	Why does EventsPage use storeToRefs(store) instead of const { events } = store?

we do this so the reactivity of Vue is maintained, destructuing wil destroy the reactivity

5.	Booking makes two requests: POST the booking, then PATCH the seat count. What happens to the data if the second one fails? How could the server avoid this?

when the second one fails, the database will not align with its data becoming corrupted. To prevent this problem, the backend should use a method where only both method is successful should the data is maintained, otherwise rollback.
