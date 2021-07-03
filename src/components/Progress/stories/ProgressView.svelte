<script>
  import Progress from '../Progress.svelte'

  /**
   * Progress value
   */
  export let value = 0
</script>

<div class="progress-container">
  <Progress
    {value}
  >
  </Progress>
</div>

<style>
  .progress-container {
    width: 100%;
    height: 5px;
    background-color: rgba(93, 93, 93, 0.5);
  }
</style>
