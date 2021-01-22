import DotView from './DotView.svelte';

export default {
  title: 'Default Components/Dot',
  component: DotView
};

const Template = ({ ...args }) => ({
  Component: DotView,
  props: args
});

export const Primary = Template.bind({});
