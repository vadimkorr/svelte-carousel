import ImageCarousel from './ImageCarousel.svelte';

export default {
  title: 'ImageCarousel',
  component: ImageCarousel,
  argTypes: {
    title: { control: 'text' },
  },
};

const Template = ({ ...args }) => ({
  Component: ImageCarousel,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  title: 'This is a title'
};
