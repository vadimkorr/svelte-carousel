![svelte-carousel](./docs/svelte-carousel-logo-md.png)


# svelte-carousel

<div align="left">

[![npm](https://img.shields.io/npm/v/svelte-carousel.svg)](https://www.npmjs.com/package/svelte-carousel) [![npm](https://img.shields.io/npm/dm/svelte-carousel.svg)](https://www.npmjs.com/package/svelte-carousel)
<br />
[![GitHub repo](https://img.shields.io/badge/github-repo-green.svg?style=flat)](https://github.com/vadimkorr/svelte-carousel) [![GitHub followers](https://img.shields.io/github/followers/vadimkorr.svg?style=social&label=Follow)](https://github.com/vadimkorr)

</div>

The awesome carousel component for Svelte 3

## Demo

https://vadimkorr.github.io/svelte-carousel

## Installation
```bash
yarn add svelte-carousel
npm install svelte-carousel
```

Import component and styles in App component
```jsx
<script>
  import 'svelte-carousel/dist/index.css'
  import Carousel from 'svelte-carousel'
  // ...
</script>
```

## Props
| Prop                 | Type       | Default     | Description                                   | 
|----------------------|------------|-------------|-----------------------------------------------|
| arrows               | boolean    | true        | Enable Next/Prev arrows                       |
| infinite             | boolean    | true        | Infinite looping                              |
| initialPageIndex     | number     | 0           | Page to start on                              |
| duration             | number     | 500         | Transition duration (ms)                      |
| autoplay             | boolean    | false       | Enables auto play of pages                    |
| autoplayDuration     | number     | 3000        | Auto play change interval                     |
| autoplayDirection    | string     | 3000        | Auto play change direction (`next` or `prev`) |
| dots                 | boolean    | true        | Current page indicator dots                   |

## Slots

### `prev` and `next`
They are used for customizing prev and next buttons.

Slot props:

| Prop               | Type        | Description                           | 
|--------------------|-------------|---------------------------------------|
| `showPrevPage`     | `function`  | Call it to switch to the previos page |
| `showNextPage`     | `function`  | Call it to switch to the next page    |

```jsx
<Carousel
  let:showPrevPage
  let:showNextPage
>
  <div slot="prev">
    <!-- -->
  </div>
  <div slot="next">
    <!-- -->
  </div>
  <!-- -->
</Carousel>
```

### `dots`

This slot is used for customizing dots appearance.

Slot props:

| Prop                | Type         | Description                                  | 
|---------------------|--------------|----------------------------------------------|
| `currentPageIndex`  | `number`     | Represents current page index (start from 0) |
| `pagesCount`        | `number`     | Total pages amount                           |
| `showPage`          | `function`   | Takes index as page to be shown              |

```jsx
<Carousel
  let:currentPageIndex
  let:pagesCount
  let:showPage
>
  <div slot="dots">
    <!-- -->
  </div>
  <!-- -->
</Carousel>
```

### Default slot

This slot takes content for the carousel.

Slot props:

| Prop              | Type       | Description                                                          | 
|-------------------|------------|----------------------------------------------------------------------|
| `loaded`          | `number[]` | Contains indexes of pages to be loaded. Can be used for lazy loading |

```jsx
<Carousel
  let:loaded
>
  <div>
    <!-- -->
  </div>
  <!-- -->
</Carousel>
```