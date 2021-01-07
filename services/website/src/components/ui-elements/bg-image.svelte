<script>
	export let src
	export let portrait = false
	export let circle = false
	export let borderRadius = ''
	export let border = undefined
	export let width = '100%'
	export let pt = ''
	export let contain = false
	export let fallbackBg = undefined
	export let center = undefined
	export let shadow = undefined

	let ImgEl
	$: {
		(ImgEl && ImgEl.style.backgroundImage) ? ImgEl.style.backgroundImage = `url(${src})` : ''
	}

	const onLazyLoad = node => {
		const observer = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					node.style.backgroundImage = `url(${src})`
					observer.disconnect();
				}
			});
		});

		observer.observe(node);

		return {
			destroy() {
				observer.disconnect();
			}
		};
	}
</script>

<div style="width: {width}; border: {border}; border-radius: {borderRadius};" class="s-image-wrap" class:circle class:center>
	<div class="s-image"
	     class:shadow
	     class:circle
	     class:portrait
	     class:contain
	     use:onLazyLoad
	     bind:this={ImgEl}
	     style="padding-top: {pt}%; background-color: {fallbackBg}; border-radius: {borderRadius};">
		<slot/>
	</div>
</div>

<style>
    .s-image-wrap {
        flex-shrink: 0;
    }

    .circle {
        border-radius: 50% !important;
    }

    .center {
        margin: 0 auto;
    }

    .shadow {
        box-shadow: 0 .3em .8em 0 rgba(0,0,0,0.3);
    }

    .s-image {
        border-radius: 1em;
        width: 100%;
        padding-top: 100%;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        position: relative;
    }

    .s-image.portrait {
        padding-top: 125%;
    }

    .s-image.contain {
        background-size: contain;
    }

    :global(._overlay) {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0,0,0,.4);
        color: white;
        border-radius: inherit;
    }
</style>
