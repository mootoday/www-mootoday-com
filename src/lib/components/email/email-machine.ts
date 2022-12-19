import { assign, createMachine } from 'xstate';

type Context = {
	emailValue: string;
};

const emailValueDefault = '************************';

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
						target: 'copying'
					}
				}
			},
			copying: {
				invoke: {
					id: 'copyEmailAddress',
					src: (context, event) => navigator.clipboard?.writeText(context.emailValue || ''),
					onDone: {
						target: 'copied'
					},
					onError: {
						target: 'hidden'
					}
				}
			},
			copied: {
				after: {
					'1000': {
						target: 'hidden',
						actions: [],
						internal: false
					}
				}
			}
		},
		schema: {
			context: {} as Context,
			events: {} as { type: 'SHOW' } | { type: 'COPY' }
		},
		tsTypes: {} as import('./email-machine.typegen').Typegen0,
		predictableActionArguments: true,
		preserveActionOrder: true
	},
	{
		actions: {
			showEmailAddress: assign({
				// prettier-ignore
				emailValue: ['m','i','k','e','@','w','e','b','s','t','o','n','e','h','q','.','c','o','m'].join('')
			}),
			hideEmailAddress: assign({
				emailValue: emailValueDefault
			})
		}
	}
);
