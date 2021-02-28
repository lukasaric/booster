import CreateDialog from '@/vehicle/CreateDialog';
import { mount } from '@vue/test-utils';

describe('CreateDialog.vue', () => {
  it('Create Dialog exists', () => {
    const wrapper = mount(CreateDialog);
    expect(wrapper.exists()).toBe(true);
  });
});
