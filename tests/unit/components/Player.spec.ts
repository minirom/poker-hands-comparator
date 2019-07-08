import { mount } from '@vue/test-utils';
import createFactory from '../../utils/createFactory';
import Player from '@/components/Player.vue';
import { PokerPlayer } from '@/models/PokerPlayer';

// @ts-ignore
const factory = createFactory(({ props }) =>
	mount(Player, {
		propsData: {
			...props
		}
	})
);

test('Player component', () => {
	describe('should create poker player', () => {
		const wrapper = factory({ props: { player: new PokerPlayer('1', 'AS KS QS JS TS') } });
		expect(wrapper).toMatchSnapshot();
	});
});
