export type Stage = { n: number; name: string; exercise: string };

export type Group = { id: string; title: string; concepts: string[] };

export type Concept = {
	id: string;
	title: string;
	stage: number;
	docs: string[];
	summary: string;
	related: string[];
	rev: number;
	addedIn: number;
};

export type RetiredConcept = { id: string; title: string; retiredIn: number };

export type StudyMap = {
	version: number;
	generatedAt: string;
	stages: Stage[];
	groups: Group[];
	concepts: Concept[];
	aliases: Record<string, string>;
	retired: RetiredConcept[];
};

/** What the model returns. The generator adds version, generatedAt, addedIn and retiredIn. */
export type StudyMapDraft = {
	stages: Stage[];
	groups: Group[];
	concepts: Omit<Concept, 'addedIn'>[];
	aliases: { from: string; to: string }[];
	retired: { id: string; title: string }[];
	/** One entry per concept whose rev increased, explaining the change for readers. */
	revChanges: { id: string; reason: string }[];
};
