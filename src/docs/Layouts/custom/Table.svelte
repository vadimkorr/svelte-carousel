<div class="table-wrapper">
  <table>
    <slot></slot>
  </table>
</div>

<style>
  .table-wrapper {
    max-width: 100%;
    overflow-x: auto;
  }
  table {
    border-collapse: collapse;
  }
</style>