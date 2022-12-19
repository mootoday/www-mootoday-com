import { assign, createMachine } from 'xstate';

type Context = {}

export const emailMachine = createMachine(
	{
		id: 'Email',
		context: {},
		initial: 'hidden',
		states: {
			hidden: {},
			visible: {},
			copied: {}
		},
		schema: {
			context: {} as Context,
			events: {} as { type: 'SHOW' } | { type: 'COPY' }
		},
		predictableActionArguments: true,
		preserveActionOrder: true
	},
	{
		actions: {
			showEmailAddress: assign({}),
			hideEmailAddress: assign({})
		}
	}
);
