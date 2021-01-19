import ImageCarouselView from './ImageCarouselView.svelte';

export default {
  title: 'ImageCarousel',
  component: ImageCarouselView,
  argTypes: {
    arrows: { control: 'boolean' },
  },
};

const Template = ({ ...args }) => ({
  Component: ImageCarouselView,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  arrows: true
};
