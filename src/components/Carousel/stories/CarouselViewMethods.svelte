<script>
  import {onMount} from 'svelte'
  import Carousel from '../Carousel.svelte'

  const colors = [
    { color: '#e5f9f0', text: '0' },
    { color: '#ccf3e2', text: '1' },
    { color: '#b2edd3', text: '2' },
    { color: '#99e7c5', text: '3' },
    { color: '#7fe1b7', text: '4' },
    { color: '#66dba8', text: '5' },
    { color: '#4cd59a', text: '6' },
    { color: '#32cf8b', text: '7' },
    { color: '#19c97d', text: '8' },
    { color: '#00c36f', text: '9' }
  ]

  let carousel;

  let pageIndex
  function handlePageChange(e) {
    pageIndex = e.target.value
  }
  function handlePageChangeClick() {
    carousel.goTo(pageIndex)
  }
</script>

<div class="main-container">
  <Carousel
    bind:this={carousel}
  >
    {#each colors as { color, text } (color)}
      <div
        class="color-container"
        style="background-color: {color};"
      >
        <p>{text}</p>
      </div>
    {/each}
  </Carousel>
  <input type="number" on:change={handlePageChange} />
  <button class="button" on:click={handlePageChangeClick}>Go to</button>
</div>

<style>
  .main-container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .color-container {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
  }
  .color-container > p {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-style: italic;
    font-size: 18px;
  }

  input {
    width: 200px;
    height: 30px;
  }
  .button {
    width: 200px;
    height: 30px;
  }
</style>