<script>
	export let number;
	export let locale = 'en';

	$: formattedNumber = number.toLocaleString(locale, {
		notation: 'compact',
		compactDisplay: 'short'
	});
</script>

<span>{formattedNumber}</span>

<style>
	span {
		font-variant-numeric: tabular-nums;
	}
</style>
