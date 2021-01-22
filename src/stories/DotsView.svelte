<script>
  import Dots from '../Dots.svelte'

  /**
   * Amount of pages (amount of dots)
   */
  export let pagesCount = 5

  /**
   * Index of the current page
   */
  export let currentPageIndex = 3

  function handlePageChange(event) {
    currentPageIndex = event.detail
  }
</script>

<Dots
  {pagesCount}
  {currentPageIndex}
  on:pageChange={handlePageChange}
>
</Dots>
