<template>
	<div>
		{{ player.name }} : {{ player.hand }}
		<button @click="$emit('delete', player)">Delete</button>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { PokerPlayer } from '@/models/PokerPlayer';

@Component
export default class Player extends Vue {
	@Prop() private player!: PokerPlayer;
}
</script>
