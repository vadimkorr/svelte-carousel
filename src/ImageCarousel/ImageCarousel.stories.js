import ImageCarouselView from './ImageCarouselView.svelte';
import ImageCarouselViewCustomDots from './ImageCarouselViewCustomDots.svelte';

export default {
  title: 'ImageCarousel',
  component: ImageCarouselView
};

const Template = ({ ...args }) => ({
  Component: ImageCarouselView,
  props: args
});

const TemplateCustomDots = ({ ...args }) => ({
  Component: ImageCarouselViewCustomDots,
  props: args
});

export const Primary = Template.bind({});

export const WithCustomDots = TemplateCustomDots.bind({});

