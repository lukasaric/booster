import CreateDialog from '@/vehicle/CreateDialog';
import { shallowMount } from '@vue/test-utils';

describe('CreateDialog.vue', () => {
  it('Create Dialog exists', () => {
    const wrapper = shallowMount(CreateDialog);
    expect(wrapper.exists()).toBe(true);
  });
});
