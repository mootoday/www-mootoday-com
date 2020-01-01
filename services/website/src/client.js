import * as sapper from '@sapper/app';

window.firebase && window.firebase.messaging().usePublicVapidKey('BDafCFznxc8Rfo-bMGm4XjyigfK9TKiZ6ApurbzrXwElx5jmBfbUrppOezKLzfGfz7WyVqc9ZtwAGBQpBDM0Ovw')

sapper.start({
	target: document.querySelector('#sapper')
});