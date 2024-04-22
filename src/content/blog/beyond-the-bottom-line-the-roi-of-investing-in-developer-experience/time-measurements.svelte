<script lang="ts">
	import { persisted } from 'svelte-persisted-store';

	let id = 1;
	let tasks = persisted('mootoday-devx-durations', [
		{
			id: id++,
			name: `Create a bug ticket`,
			notes: ``,
			duration: 0
		},
		{
			id: id++,
			name: `Mark the ticket "In progress"`,
			notes: ``,
			duration: 0
		},
		{
			id: id++,
			name: `Create a branch & ensure the correct dependencies are installed`,
			notes: ``,
			duration: 0
		},
		{
			id: id++,
			name: `Start the dev server(s)`,
			notes: ``,
			duration: 0
		},
		{
			id: id++,
			name: `Review the current state, i.e. look at the app to verify there is a spelling mistake`,
			notes: ``,
			duration: 0
		},
		{
			id: id++,
			name: `Fix the spelling mistake`,
			notes: ``,
			duration: 0
		},
		{
			id: id++,
			name: `Review the new state, i.e. look at the app to verify there is no spelling mistake`,
			notes: `• Do you have to stop & start the server(s)?<br />• Does the server auto-reload?`,
			duration: 0
		},
		{
			id: id++,
			name: `Commit the changes & open a pull request`,
			notes: `• Do git hooks run to format / lint the code? How long do they take?`,
			duration: 0
		},
		{
			id: id++,
			name: `Are there CI checks? How long does each one take?`,
			notes: ``,
			duration: 0
		},
		{
			id: id++,
			name: `Have a team member review the changes locally`,
			notes: `• Locally is important!<br />• What steps are required for them to get the code from the PR running locally?<br />• What happens if they currently have their own feature branch checked out?<br />• How long does it take to switch to the PR branch?<br />• How long does it take to install the correct dependencies?`,
			duration: 0
		},
		{
			id: id++,
			name: `Once the PR is reviewed, merge it`,
			notes: `• If it deploys to a staging environment, measure how long it takes to deploy & review in staging.<br />• Measure every step to go from staging to prod`,
			duration: 0
		},
		{
			id: id++,
			name: `Deploy to production`,
			notes: `• Is it automated? Is it manual?<br />• Are there CI checks?<br />• Does it require additional approvals?<br />• Measure how long each task takes.`,
			duration: 0
		},
		{
			id: id++,
			name: `Verify the spelling fix in production`,
			notes: ``,
			duration: 0
		},
		{
			id: id++,
			name: `Are there any follow-up tasks required? Delete the PR branch? Resolve a bug ticket?`,
			notes: ``,
			duration: 0
		},
	]);

	const newTask = {
		name: '',
		notes: ''
	};

	const formatTime = (seconds: number) => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const remainingSeconds = seconds % 60;

		return `${hours > 0 ? hours + 'h ' : ''}${
			minutes > 0 ? minutes + 'm ' : ''
		}${remainingSeconds}s`;
	};

	const moveTaskUp = (id: number) => () => {
		const index = $tasks.findIndex((task) => task.id === id);
		if (index > 0) {
			let temp = $tasks[index];
			$tasks[index] = $tasks[index - 1];
			$tasks[index - 1] = temp;
		}
	};

	const moveTaskDown = (id: number) => () => {
		const index = $tasks.findIndex((task) => task.id === id);
		if (index >= 0 && index < $tasks.length - 1) {
			let temp = $tasks[index];
			$tasks[index] = $tasks[index + 1];
			$tasks[index + 1] = temp;
		}
	};
</script>

<div class="relative overflow-x-auto">
	<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
		<thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
			<tr>
				<th scope="col" class="px-6 py-3 rounded-tl-lg"> Task </th>
				<th scope="col" class="px-6 py-3"> Duration [in seconds] </th>
				<th scope="col" class="px-6 py-3 rounded-tr-lg"></th>
			</tr>
		</thead>
		<tbody>
			{#each $tasks as task, index (task.id)}
				<tr class="bg-white dark:bg-gray-800">
					<th
						scope="row"
						class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
					>
						{task.name}
						{#if task.notes}
							<br />
							<span class="italic">
								{@html task.notes}
							</span>
						{/if}
					</th>
					<td class="px-6 py-4">
						<form class="max-w-sm mx-auto">
							<input
								bind:value={$tasks[index].duration}
								type="number"
								id="number-input"
								aria-describedby="helper-text-explanation"
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="Enter duration in seconds"
								required
							/>
						</form>
					</td>
					<td class="px-6 py-4 grid grid-cols-3 min-w-28">
						{#if index > 0}
							<button on:click={moveTaskUp(task.id)}>⬆︎</button>
						{:else}
							<span class="min-w-6"></span>
						{/if}
						{#if index < $tasks.length - 1}
							<button on:click={moveTaskDown(task.id)}>⬇︎</button>
						{:else}
							<span class="min-w-6"></span>
						{/if}
						<button on:click={() => ($tasks = $tasks.filter((t) => t.id !== task.id))}>❌</button>
					</td>
				</tr>
			{/each}
			<tr class="bg-white dark:bg-gray-800">
				<th
					scope="row"
					class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-start"
				>
					<form class="w-full space-y-2" on:submit={() => {}}>
						<input
							bind:value={newTask.name}
							type="text"
							id="newTaskName"
							aria-describedby="helper-text-explanation"
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Enter a task name"
							required
						/>
						<input
							bind:value={newTask.notes}
							type="text"
							id="newTaskName"
							aria-describedby="helper-text-explanation"
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Enter task notes (optional)"
							required
						/>
					</form>
				</th>
				<td class="px-6 py-4" colspan="2">
					<button
						on:click={() => {
							$tasks.push({
								duration: 0,
								id: $tasks.length + 1,
								...newTask
							});
							$tasks = $tasks;
							newTask.name = '';
							newTask.notes = '';
						}}
						type="button"
						class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
						>Add new task</button
					>
				</td>
			</tr>
		</tbody>
		<tfoot>
			<tr class="font-semibold text-gray-900 dark:text-white">
				<th scope="row" class="px-6 py-3 text-base">Total time</th>
				<td class="px-6 py-3"
					>{formatTime($tasks.reduce((total, task) => total + task.duration, 0))}</td
				>
				<td class="px-6 py-3"></td>
			</tr>
		</tfoot>
	</table>
</div>
