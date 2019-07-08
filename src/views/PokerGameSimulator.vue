<template>
	<div>
		<div>
			<div>
				<input v-model="name" placeholder="Name of player" :disabled="!canAddPlayer" />
				<button type="button" @click="game.addPlayer(name)" :disabled="!canAddPlayer">
					Add a player
				</button>
			</div>
			<button type="submit" class="btn btn-info" @click="game.generateNewGame()">
				New game
			</button>
			<Player
				v-for="(player, index) in players"
				:key="index"
				:player="player"
				@delete="game.removePlayer(player)"
				:class="{ isWinner: isWinner(player) }"
			>
			</Player>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { PokerGame } from '@/models/PokerGame';
import { PokerPlayer } from '@/models/PokerPlayer';
import Player from '@/components/Player.vue';

@Component({
	components: { Player }
})
export default class PokerGameSimulator extends Vue {
	private game: PokerGame = new PokerGame([]);
	private name: string = '';

	public created(): void {
		this.game.addPlayer('Player1');
		this.game.addPlayer('Player2');
	}

	get players(): PokerPlayer[] {
		return this.game ? this.game.pokerPlayers : [];
	}

	/**
	 * Check user can add a player
	 * @return {boolean} true if can add player, false otherwise
	 */
	get canAddPlayer(): boolean {
		return this.players.length < 10;
	}

	/**
	 * Check player is a winner
	 * @param {PokerPlayer} player: player to check
	 * @return {boolean} true if player is a winner, false otherwise
	 */
	public isWinner(player: PokerPlayer): boolean {
		return this.game && this.game.winners ? this.game.winners.includes(player) : false;
	}

	@Watch('game.pokerPlayers', { deep: true })
	// tslint:disable-next-line
	private handler() {}
}
</script>

<style scoped>
.isWinner {
	color: deeppink;
	font-weight: bold;
}
</style>
