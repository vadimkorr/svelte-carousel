import DotsView from './DotsView.svelte';

export default {
  title: 'Dots',
  component: DotsView
};

const Template = ({ ...args }) => ({
  Component: DotsView,
  props: args
});

export const Primary = Template.bind({});
