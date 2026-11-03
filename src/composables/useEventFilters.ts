import { computed, ref, type Ref } from "vue";
import type { CampusEvent, Category } from "../types";

// TODO E1 (refactor): move the filtering logic from week 4's EventList.vue here,
// so any page can reuse it. Return { search, category, visible }.
// The test "filters the list with the search box" in EventsPage.test.ts checks it.
export function useEventFilters(events: Ref<CampusEvent[]>) {
  const search = ref("");
  const category = ref<Category | "all">("all");
  const visible = computed(() => {
    const query = search.value.trim().toLowerCase();

    return events.value.filter(e  => {
      const matchedCategory = category.value == "all" || e.category == category.value;
      const matchedSearch = e.title.toLowerCase().includes(query) || e.location.toLowerCase().includes(query);
      return matchedCategory && matchedSearch;
    })
  });
  return { search, category, visible };
}
