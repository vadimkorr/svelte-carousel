import ImageCarouselView from './ImageCarouselView.svelte';

export default {
  title: 'ImageCarousel',
  component: ImageCarouselView
};

const Template = ({ ...args }) => ({
  Component: ImageCarouselView,
  props: args
});

export const Primary = Template.bind({});
