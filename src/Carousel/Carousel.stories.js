import CarouselView from './CarouselView.svelte';
import CarouselViewCustomDots from './CarouselViewCustomDots.svelte';
import CarouselViewCustomArrows from './CarouselViewCustomArrows.svelte';

export default {
  title: 'Carousel',
  component: CarouselView
};

const Template = ({ ...args }) => ({
  Component: CarouselView,
  props: args
});
export const Primary = Template.bind({});

const TemplateCustomDots = ({ ...args }) => ({
  Component: CarouselViewCustomDots,
  props: args
});
export const WithCustomDots = TemplateCustomDots.bind({});

const TemplateCustomArrows = ({ ...args }) => ({
  Component: CarouselViewCustomArrows,
  props: args
});
export const WithCustomArrows = TemplateCustomArrows.bind({});

