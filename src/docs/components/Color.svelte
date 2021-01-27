<script>
  export let color, text
</script>

<div
  class="color-container"
  style="background-color: {color};"
>
  <p>{text}</p>
</div>

<style>
  .color-container {
    height: 150px;
    width: 100%;
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
</style>
