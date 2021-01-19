<script>
  /**
   * Enable Next/Previos arrows
   */
	export let arrows = true;
</script>

<div class="main-container">
  {#if arrows}
  <div class="side-container">
    <span class="clickable">&lt;</span>
  </div>
  {/if}
  <div class="content-container">
    <slot></slot>
  </div>
  {#if arrows}
  <div class="side-container">
    <span class="clickable">&gt;</span>
  </div>
  {/if}
</div>

<style>
  .main-container {
    display: flex;
    width: 100%;
  }
  .content-container {
    flex: 1;
  }
  .side-container {
    background-color: cornflowerblue;
    height: 100%;
    padding: 5px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .clickable {
    cursor: pointer;
  }
</style>