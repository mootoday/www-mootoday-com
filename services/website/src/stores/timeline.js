import { derived, get, readable, writable } from "svelte/store";
// import rawTimeline from "../timeline";
import search from "./search";

export const timeline = writable([]);

const uniqueFilters = derived([timeline], ([$timeline], set) => {
  set(Array.from(new Set($timeline.map((entry) => entry.label))));
});

// const uniqueFilters = readable(Array.from(
//   new Set(get(timeline).map((entry) => entry.label))
// ));

export const allFiltersForDisplay = readable(get(uniqueFilters));

export const selectedFilters = writable([]);
uniqueFilters.subscribe((value) => {
  selectedFilters.set(value);
});

const byFilter = derived(
  [timeline, selectedFilters],
  ([$timeline, $selectedFilters], set) => {
    set($timeline.filter((entry) => $selectedFilters.includes(entry.label)));
  }
);

const byFilterAndSearch = derived(
  [byFilter, search],
  ([$byFilter, $search], set) => {
    if ($search === "") {
      set($byFilter);
    } else {
      set(
        $byFilter.filter(
          (entry) =>
            entry.milestone.toLowerCase().includes($search.toLowerCase()) ||
            entry.label.includes($search.toLowerCase())
        )
      );
    }
  }
);

export const timelineEntries = derived(
  [byFilterAndSearch],
  ([$byFilterAndSearch], set) => {
    const yearsMonthsWithEntries = $byFilterAndSearch.reduce(
      (result, current) => {
        const entryDate = new Date(current.timestamp);
        const entryFullYear = entryDate.getFullYear();
        const entryMonth = entryDate.getMonth();
        if (!result.has(entryFullYear)) {
          result.set(entryFullYear, new Map());
        }
        if (!result.get(entryFullYear).has(entryMonth)) {
          result.get(entryFullYear).set(entryMonth, []);
        }

        result.get(entryFullYear).get(entryMonth).push(current);
        return result;
      },
      new Map()
    );

    const entriesReadyForDisplay = [];
    yearsMonthsWithEntries.forEach((months, year) => {
      months.forEach((entries, month) => {
        entries.forEach((entry) => {
          // When filters are applied, some elements have their `year` & `month` properties set because they were the first
          // in a given year for the given filter.
          // Let's make sure we reset all `year` & `month` properties so only the first entry of a given year or of a given month have it set.
          entry.month = undefined;
          entry.year = undefined;
          entriesReadyForDisplay.push(entry);
        });

        // At this point in the forEach loop, the latest element is the first of the currently processed month.
        // We add the `month` property to display the month in the timeline view after this specific `entry`.
        entriesReadyForDisplay[entriesReadyForDisplay.length - 1].month = month;
      });

      // At this point in the forEach loop, the latest element is the first of the currently processed year.
      // We add the `year` property to display the year in the timeline view after this specific `entry`.
      entriesReadyForDisplay[entriesReadyForDisplay.length - 1].year = year;
    }, []);
    set(entriesReadyForDisplay);
  }
);

export const filteredFilters = derived(
  [byFilterAndSearch, selectedFilters],
  ([$byFilterAndSearch, $selectedFilters], set) => {
    set(Array.from(new Set($byFilterAndSearch.map((entry) => entry.label))));
  }
);
