import { assign, createMachine } from 'xstate';

type Context = {
	emailValue: string;
};

const emailValueDefault = '***************';

export const emailMachine = createMachine(
	{
		id: 'Email',
		context: {
			emailValue: emailValueDefault
		},
		initial: 'hidden',
		states: {
			hidden: {
				entry: ['hideEmailAddress'],
				on: {
					SHOW: {
						target: 'visible'
					}
				}
			},
			visible: {
				entry: ['showEmailAddress'],
				on: {
					COPY: {
						target: 'copied'
					}
				}
			},
			copied: {
				after: {
					'1000': {
						target: 'hidden'
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
			showEmailAddress: assign({
				// prettier-ignore
				emailValue: ['m','i','k','e','@','a','b','c','.','c','o','m'].join('')
			}),
			hideEmailAddress: assign({
				emailValue: emailValueDefault
			})
		}
	}
);
