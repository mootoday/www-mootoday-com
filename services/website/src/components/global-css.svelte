<style global>
	* {
		box-sizing: border-box;
		user-select: none;
	}
	html,
	body,
	span,
	applet,
	object,
	iframe,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	p,
	blockquote,
	pre,
	a,
	abbr,
	acronym,
	address,
	big,
	cite,
	code,
	del,
	dfn,
	em,
	img,
	ins,
	kbd,
	q,
	s,
	samp,
	small,
	strike,
	strong,
	sub,
	sup,
	tt,
	var,
	b,
	u,
	i,
	center,
	dl,
	dt,
	dd,
	ol,
	ul,
	li,
	fieldset,
	form,
	label,
	legend,
	table,
	caption,
	tbody,
	tfoot,
	thead,
	tr,
	th,
	td,
	article,
	aside,
	canvas,
	details,
	embed,
	figure,
	figcaption,
	footer,
	header,
	hgroup,
	menu,
	nav,
	output,
	ruby,
	section,
	summary,
	time,
	mark,
	audio,
	video,
	button {
		margin: 0;
		padding: 0;
		border: 0;
		font: inherit;
		vertical-align: baseline;
	}
	p:first-child {
		margin-top: 0;
	}
	p:last-child {
		margin-bottom: 0;
	}
	a {
		text-decoration: none;
		color: inherit;
	}
	img {
		max-width: 100%;
	}
	html {
		--purple: #9059f5;
		--plum: #f25d91;
		--orange: #ffb800;
		--blue: #6293f3;
		--green: #72c22e;
		--charcoal: rgba(0,0,0,0.6);
		--brownText: #744c28;
		--purpleText: #8d56ea;
		--redText: #fd6113;
		--plumText: #f1578b;
		--orangeText: #f49c18;
		--greenText: #4b8340;
		--nenoGreenText: #55d189;
		--neonBlueText: #008bf0;
		--inputBgBlue: #e2f1fc;
		--inputTextBlue: #217ab6;
		--shadow: 0 0.5em 1em -0.2em rgba(0,0,0,0.35);
		--lightGreyText: #a5a5a5;
	}
	body {
		font-size: 16px;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		background: #fff;
		color: #555;
		line-height: 1.67;
		font-family: "Arial Rounded MT Bold", "Yuanti SC", "Microsoft Yahei", "微软雅黑", STXihei, "华文细黑", sans-serif;
		max-width: 100vw;
		overflow: scroll;
	}
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		line-height: 1.2;
		font-weight: bold;
	}
	h1 {
		font-size: 2em;
	}
	h2 {
		font-size: 1.5em;
	}
	h3 {
		font-size: 1.33em;
	}
	h4 {
		font-size: 1.25em;
	}
	h5 {
		font-size: 1em;
	}
	h6 {
		font-size: 0.75em;
	}
	.body {
		font-size: 0.85em;
	}
	.bold {
		font-weight: bold !important;
	}
	.mt1 {
		margin-top: 0.1em !important;
	}
	.mr1 {
		margin-right: 0.1em !important;
	}
	.mb1 {
		margin-bottom: 0.1em !important;
	}
	.ml1 {
		margin-left: 0.1em !important;
	}
	.mx1 {
		margin-left: 0.1em !important;
		margin-right: 0.1em !important;
	}
	.my1 {
		margin-top: 0.1em !important;
		margin-bottom: 0.1em !important;
	}
	.mt2 {
		margin-top: 0.2em !important;
	}
	.mr2 {
		margin-right: 0.2em !important;
	}
	.mb2 {
		margin-bottom: 0.2em !important;
	}
	.ml2 {
		margin-left: 0.2em !important;
	}
	.mx2 {
		margin-left: 0.2em !important;
		margin-right: 0.2em !important;
	}
	.my2 {
		margin-top: 0.2em !important;
		margin-bottom: 0.2em !important;
	}
	.mt3 {
		margin-top: 0.3em !important;
	}
	.mr3 {
		margin-right: 0.3em !important;
	}
	.mb3 {
		margin-bottom: 0.3em !important;
	}
	.ml3 {
		margin-left: 0.3em !important;
	}
	.mx3 {
		margin-left: 0.3em !important;
		margin-right: 0.3em !important;
	}
	.my3 {
		margin-top: 0.3em !important;
		margin-bottom: 0.3em !important;
	}
	.mt4 {
		margin-top: 0.4em !important;
	}
	.mr4 {
		margin-right: 0.4em !important;
	}
	.mb4 {
		margin-bottom: 0.4em !important;
	}
	.ml4 {
		margin-left: 0.4em !important;
	}
	.mx4 {
		margin-left: 0.4em !important;
		margin-right: 0.4em !important;
	}
	.my4 {
		margin-top: 0.4em !important;
		margin-bottom: 0.4em !important;
	}
	.mt5 {
		margin-top: 0.5em !important;
	}
	.mr5 {
		margin-right: 0.5em !important;
	}
	.mb5 {
		margin-bottom: 0.5em !important;
	}
	.ml5 {
		margin-left: 0.5em !important;
	}
	.mx5 {
		margin-left: 0.5em !important;
		margin-right: 0.5em !important;
	}
	.my5 {
		margin-top: 0.5em !important;
		margin-bottom: 0.5em !important;
	}
	.mt6 {
		margin-top: 0.6em !important;
	}
	.mr6 {
		margin-right: 0.6em !important;
	}
	.mb6 {
		margin-bottom: 0.6em !important;
	}
	.ml6 {
		margin-left: 0.6em !important;
	}
	.mx6 {
		margin-left: 0.6em !important;
		margin-right: 0.6em !important;
	}
	.my6 {
		margin-top: 0.6em !important;
		margin-bottom: 0.6em !important;
	}
	.mt7 {
		margin-top: 0.7em !important;
	}
	.mr7 {
		margin-right: 0.7em !important;
	}
	.mb7 {
		margin-bottom: 0.7em !important;
	}
	.ml7 {
		margin-left: 0.7em !important;
	}
	.mx7 {
		margin-left: 0.7em !important;
		margin-right: 0.7em !important;
	}
	.my7 {
		margin-top: 0.7em !important;
		margin-bottom: 0.7em !important;
	}
	.mt8 {
		margin-top: 0.8em !important;
	}
	.mr8 {
		margin-right: 0.8em !important;
	}
	.mb8 {
		margin-bottom: 0.8em !important;
	}
	.ml8 {
		margin-left: 0.8em !important;
	}
	.mx8 {
		margin-left: 0.8em !important;
		margin-right: 0.8em !important;
	}
	.my8 {
		margin-top: 0.8em !important;
		margin-bottom: 0.8em !important;
	}
	.mt9 {
		margin-top: 0.9em !important;
	}
	.mr9 {
		margin-right: 0.9em !important;
	}
	.mb9 {
		margin-bottom: 0.9em !important;
	}
	.ml9 {
		margin-left: 0.9em !important;
	}
	.mx9 {
		margin-left: 0.9em !important;
		margin-right: 0.9em !important;
	}
	.my9 {
		margin-top: 0.9em !important;
		margin-bottom: 0.9em !important;
	}
	.mt10 {
		margin-top: 1em !important;
	}
	.mr10 {
		margin-right: 1em !important;
	}
	.mb10 {
		margin-bottom: 1em !important;
	}
	.ml10 {
		margin-left: 1em !important;
	}
	.mx10 {
		margin-left: 1em !important;
		margin-right: 1em !important;
	}
	.my10 {
		margin-top: 1em !important;
		margin-bottom: 1em !important;
	}
	.mt11 {
		margin-top: 1.1em !important;
	}
	.mr11 {
		margin-right: 1.1em !important;
	}
	.mb11 {
		margin-bottom: 1.1em !important;
	}
	.ml11 {
		margin-left: 1.1em !important;
	}
	.mx11 {
		margin-left: 1.1em !important;
		margin-right: 1.1em !important;
	}
	.my11 {
		margin-top: 1.1em !important;
		margin-bottom: 1.1em !important;
	}
	.mt12 {
		margin-top: 1.2em !important;
	}
	.mr12 {
		margin-right: 1.2em !important;
	}
	.mb12 {
		margin-bottom: 1.2em !important;
	}
	.ml12 {
		margin-left: 1.2em !important;
	}
	.mx12 {
		margin-left: 1.2em !important;
		margin-right: 1.2em !important;
	}
	.my12 {
		margin-top: 1.2em !important;
		margin-bottom: 1.2em !important;
	}
	.mt13 {
		margin-top: 1.3em !important;
	}
	.mr13 {
		margin-right: 1.3em !important;
	}
	.mb13 {
		margin-bottom: 1.3em !important;
	}
	.ml13 {
		margin-left: 1.3em !important;
	}
	.mx13 {
		margin-left: 1.3em !important;
		margin-right: 1.3em !important;
	}
	.my13 {
		margin-top: 1.3em !important;
		margin-bottom: 1.3em !important;
	}
	.mt14 {
		margin-top: 1.4em !important;
	}
	.mr14 {
		margin-right: 1.4em !important;
	}
	.mb14 {
		margin-bottom: 1.4em !important;
	}
	.ml14 {
		margin-left: 1.4em !important;
	}
	.mx14 {
		margin-left: 1.4em !important;
		margin-right: 1.4em !important;
	}
	.my14 {
		margin-top: 1.4em !important;
		margin-bottom: 1.4em !important;
	}
	.mt15 {
		margin-top: 1.5em !important;
	}
	.mr15 {
		margin-right: 1.5em !important;
	}
	.mb15 {
		margin-bottom: 1.5em !important;
	}
	.ml15 {
		margin-left: 1.5em !important;
	}
	.mx15 {
		margin-left: 1.5em !important;
		margin-right: 1.5em !important;
	}
	.my15 {
		margin-top: 1.5em !important;
		margin-bottom: 1.5em !important;
	}
	.mt16 {
		margin-top: 1.6em !important;
	}
	.mr16 {
		margin-right: 1.6em !important;
	}
	.mb16 {
		margin-bottom: 1.6em !important;
	}
	.ml16 {
		margin-left: 1.6em !important;
	}
	.mx16 {
		margin-left: 1.6em !important;
		margin-right: 1.6em !important;
	}
	.my16 {
		margin-top: 1.6em !important;
		margin-bottom: 1.6em !important;
	}
	.mt17 {
		margin-top: 1.7em !important;
	}
	.mr17 {
		margin-right: 1.7em !important;
	}
	.mb17 {
		margin-bottom: 1.7em !important;
	}
	.ml17 {
		margin-left: 1.7em !important;
	}
	.mx17 {
		margin-left: 1.7em !important;
		margin-right: 1.7em !important;
	}
	.my17 {
		margin-top: 1.7em !important;
		margin-bottom: 1.7em !important;
	}
	.mt18 {
		margin-top: 1.8em !important;
	}
	.mr18 {
		margin-right: 1.8em !important;
	}
	.mb18 {
		margin-bottom: 1.8em !important;
	}
	.ml18 {
		margin-left: 1.8em !important;
	}
	.mx18 {
		margin-left: 1.8em !important;
		margin-right: 1.8em !important;
	}
	.my18 {
		margin-top: 1.8em !important;
		margin-bottom: 1.8em !important;
	}
	.mt19 {
		margin-top: 1.9em !important;
	}
	.mr19 {
		margin-right: 1.9em !important;
	}
	.mb19 {
		margin-bottom: 1.9em !important;
	}
	.ml19 {
		margin-left: 1.9em !important;
	}
	.mx19 {
		margin-left: 1.9em !important;
		margin-right: 1.9em !important;
	}
	.my19 {
		margin-top: 1.9em !important;
		margin-bottom: 1.9em !important;
	}
	.mt20 {
		margin-top: 2em !important;
	}
	.mr20 {
		margin-right: 2em !important;
	}
	.mb20 {
		margin-bottom: 2em !important;
	}
	.ml20 {
		margin-left: 2em !important;
	}
	.mx20 {
		margin-left: 2em !important;
		margin-right: 2em !important;
	}
	.my20 {
		margin-top: 2em !important;
		margin-bottom: 2em !important;
	}
	.z1 {
		z-index: 1;
	}
	.z2 {
		z-index: 2;
	}
	.z3 {
		z-index: 3;
	}
	.z4 {
		z-index: 4;
	}
	.z5 {
		z-index: 5;
	}
	.z6 {
		z-index: 6;
	}
	.z7 {
		z-index: 7;
	}
	.z8 {
		z-index: 8;
	}
	.z9 {
		z-index: 9;
	}
	.z10 {
		z-index: 10;
	}
	.z11 {
		z-index: 11;
	}
	.z12 {
		z-index: 12;
	}
	.z13 {
		z-index: 13;
	}
	.z14 {
		z-index: 14;
	}
	.z15 {
		z-index: 15;
	}
	.z16 {
		z-index: 16;
	}
	.z17 {
		z-index: 17;
	}
	.z18 {
		z-index: 18;
	}
	.z19 {
		z-index: 19;
	}
	.z20 {
		z-index: 20;
	}
	.color-purple {
		color: var(--purpleText) !important;
	}
	.color-orange {
		color: var(--orangeText) !important;
	}
	.color-brown {
		color: var(--brownText) !important;
	}
	.color-plum {
		color: var(--plumText) !important;
	}
	.color-red {
		color: var(--redText) !important;
	}
	.color-green {
		color: var(--greenText) !important;
	}
	.color-neon-green {
		color: var(--nenoGreenText) !important;
	}
	.color-neon-blue {
		color: var(--neonBlueText) !important;
	}
	.color-light-grey {
		color: var(--lightGreyText) !important;
	}
	.color-white {
		color: #fff !important;
	}
	.ac {
		display: flex;
		align-items: center;
	}
	.ab {
		display: flex;
		align-items: flex-end;
	}
	.jc {
		display: flex;
		justify-content: center;
	}
	.cc {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.flex {
		display: flex;
	}
	.flex-column {
		display: flex;
		flex-direction: column;
	}
	.spacer {
		flex: 1;
	}
	.block,
	.fw {
		width: 100%;
	}
	.fh {
		height: 100%;
	}
	.tac {
		text-align: center;
	}
	.nowrap {
		white-space: nowrap;
	}
	.abs {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.hidden {
		visibility: hidden;
	}
	.divider {
		height: 1px;
		background: #916034;
		opacity: 0.2;
	}
	.app-main {
		background: #9059f5;
		min-height: 100vh;
	}
	.error {
		color: #f00;
		font-size: 0.75em;
		margin: 0.3em 0;
	}
	.html p {
		margin: 0.3em 0;
	}
	.html ul {
		margin-left: 1.25em;
	}
	.html li {
		position: relative;
		list-style: none;
		margin-bottom: 0.5em;
	}
	.html li:before {
		user-select: none;
		pointer-events: none;
		position: absolute;
		top: auto;
		left: auto;
		font-weight: 400;
		margin-left: -1.25em;
		content: '•';
		opacity: 1;
		color: inherit;
		vertical-align: top;
	}
	.row {
		display: flex;
		flex-wrap: wrap;
		margin: 0 -0.5em;
	}
	.col {
		width: 33.33%;
		min-width: 33.33%;
		padding: 0 0.6em 1em;
		box-sizing: border-box;
	}
	.col.xs4 {
		width: 25%;
		min-width: 25%;
	}
</style>