import { derived, readable, writable } from "svelte/store";
import search from "./search";

const rawTimeline = [
  {
    timestamp: 1606937475381,
    label: "blog",
    milestone: "Introduced the timeline view",
    link: "/blog/introducing-the-timeline-view",
  },
  {
    timestamp: 1606923112654,
    label: "project",
    milestone: "10 active users of Your Analytics",
    cta: "Check out Your Analytics",
    link: "https://www.your-analytics.org",
  },
  {
    timestamp: 1606921112654,
    label: "twitter",
    milestone: "705 Followers 🎉",
    cta: "Check out my tweets",
    link: "/blog/introducing-the-timeline-view",
  },
  {
    timestamp: 1577059200000,
    label: "twitter",
    milestone: "700 Followers 🎉",
    cta: "Check out my tweets",
    link: "/blog/introducing-the-timeline-view",
  },
  {
    timestamp: 1577059100000,
    label: "twitter",
    milestone: "699 Followers 🎉",
    cta: "Check out my tweets",
    link: "/blog/introducing-the-timeline-view",
  },
  {
    timestamp: 1526083200000,
    label: "youtube",
    milestone: "20 Subscribers 🎉",
    cta: "Check out my videos",
    link: "https://www.youtube.com",
  },
];

const timeline = readable(rawTimeline);

export const uniqueFilters = readable(
  Array.from(new Set(rawTimeline.map((entry) => entry.label)))
);

export const selectedFilters = writable(
  Array.from(new Set(rawTimeline.map((entry) => entry.label)))
);

const byFilter = derived(
  [timeline, selectedFilters],
  ([$timeline, $selectedFilters], set) => {
    set($timeline.filter((entry) => $selectedFilters.includes(entry.label)));
  }
);

export const byFilterAndSearch = derived(
  [byFilter, search],
  ([$byFilter, $search], set) => {
    if ($search === "") {
      set($byFilter);
    } else {
      set(
        $byFilter.filter(
          (entry) =>
            entry.milestone.toLowerCase().includes($search) ||
            entry.label.includes($search)
        )
      );
    }
  }
);

export const timelineEntries = derived(
  [byFilterAndSearch],
  ([$byFilterAndSearch], set) => {
    const yearsWithEntries = $byFilterAndSearch.reduce(
      (result, current, index) => {
        const entryFullYear = new Date(current.timestamp).getFullYear();
        if (!result.has(entryFullYear)) {
          result.set(entryFullYear, []);
        }
        result.get(entryFullYear).push(current);
        return result;
      },
      new Map()
    );

    const entriesReadyForDisplay = [];
    yearsWithEntries.forEach((entries, year) => {
      entries.forEach((entry) => entriesReadyForDisplay.push(entry));
      entriesReadyForDisplay.push(year);
    }, []);

    set(entriesReadyForDisplay);
  }
);
