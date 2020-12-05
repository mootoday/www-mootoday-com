import { derived, readable, writable } from "svelte/store";
import rawTimeline from "../timeline-raw";
import search from "./search";

const timeline = readable(rawTimeline);
const uniqueFilters = Array.from(
  new Set(rawTimeline.map((entry) => entry.label))
);

export const allFiltersForDisplay = readable(uniqueFilters);

export const selectedFilters = writable(uniqueFilters);

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
    const yearsWithEntries = $byFilterAndSearch.reduce((result, current) => {
      const entryFullYear = new Date(current.timestamp).getFullYear();
      if (!result.has(entryFullYear)) {
        result.set(entryFullYear, []);
      }
      result.get(entryFullYear).push(current);
      return result;
    }, new Map());

    const entriesReadyForDisplay = [];
    yearsWithEntries.forEach((entries, year) => {
      entries.forEach((entry) => {
        // When filters are applied, some elements have their `year` property set because they were the first
        // in a given year for the given filter.
        // Let's make sure we reset all `year` properties so only the first entry of a given year has it set.
        entry.year = undefined;
        entriesReadyForDisplay.push(entry);
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
