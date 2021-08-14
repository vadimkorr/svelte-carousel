import PausedIndicatorView from './PausedIndicatorView.svelte';

export default {
  title: 'Default Components/PausedIndicator',
  component: PausedIndicatorView,
};

const Template = ({ ...args }) => ({
  Component: PausedIndicatorView,
  props: args,
});

export const Primary = Template.bind({});
