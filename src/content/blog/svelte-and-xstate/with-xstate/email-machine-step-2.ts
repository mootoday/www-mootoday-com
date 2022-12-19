import { assign, createMachine } from 'xstate';

type Context = {}

export const emailMachine = createMachine(
	{
		id: 'Email',
		context: {},
		initial: 'hidden',
		states: {
			hidden: {
				on: {
					SHOW: {
						target: 'visible'
					}
				}
			},
			visible: {
				on: {
					COPY: {
						target: 'copied'
					}
				}
			},
			copied: {
				after: {
					'1000': {
						target: 'hidden',
					}
				}
			}
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
