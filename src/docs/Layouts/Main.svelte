<div class="docs__main-layout__content-container">
  <div class="docs__main-layout__content-inner-container">
    <slot></slot>
  </div>
</div>

<style>
.docs__main-layout__content-container {
  display: flex;
  justify-content: center;
}
@media screen and (min-width: 0px) {
  .docs__main-layout__content-inner-container {
    width: 100%;
  }
}
@media screen and (min-width: 768px) {
  .docs__main-layout__content-inner-container {
    width: 70%;
  }
}
@media screen and (min-width: 992px) {
  .docs__main-layout__content-inner-container {
    width: 60%;
  }
}
@media screen and (min-width: 1200px) {
  .docs__main-layout__content-inner-container {
    width: 50%;
  }
}
</style>