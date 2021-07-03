import ProgressView from './ProgressView.svelte';

export default {
  title: 'Default Components/Progress',
  component: ProgressView
};

const Template = ({ ...args }) => ({
  Component: ProgressView,
  props: args
});

export const Primary = Template.bind({});
