import * as sapper from '@sapper/app';
import { init as initGA } from './utils/ga'

sapper.start({
	target: document.querySelector('#sapper')
});

initGA();