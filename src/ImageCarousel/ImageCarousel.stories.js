import ImageCarouselView from './ImageCarouselView.svelte';
import ImageCarouselViewCustomDots from './ImageCarouselViewCustomDots.svelte';
import ImageCarouselViewCustomArrows from './ImageCarouselViewCustomArrows.svelte';

export default {
  title: 'ImageCarousel',
  component: ImageCarouselView
};

const Template = ({ ...args }) => ({
  Component: ImageCarouselView,
  props: args
});
export const Primary = Template.bind({});

const TemplateCustomDots = ({ ...args }) => ({
  Component: ImageCarouselViewCustomDots,
  props: args
});
export const WithCustomDots = TemplateCustomDots.bind({});

const TemplateCustomArrows = ({ ...args }) => ({
  Component: ImageCarouselViewCustomArrows,
  props: args
});
export const WithCustomArrows = TemplateCustomArrows.bind({});

