<script>
  import Carousel from '../../components/Carousel/Carousel.svelte'
  import Image from './Image.svelte'

  const albums = {
    forest: {
      title: 'Forest',
      tags: ['forest', 'trees'],
      images: [
        'https://cdn.pixabay.com/photo/2017/04/09/09/56/avenue-2215317_1280.jpg',
        'https://cdn.pixabay.com/photo/2017/11/12/13/37/forest-2942477_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/08/11/23/55/trees-1587301_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/08/16/19/09/forest-1598756_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/11/29/07/12/forest-1868028_1280.jpg',
        'https://cdn.pixabay.com/photo/2015/03/26/09/45/woods-690257_1280.jpg'
      ]
    },
    birds: {
      title: 'Birds',
      tags: ['birds', 'owl', 'parrot'],
      images: [
        'https://cdn.pixabay.com/photo/2016/11/18/12/14/owl-1834152_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/05/26/04/19/macaw-1416388_1280.jpg'
      ]
    },
    flowers: {
      title: 'Flowers',
      tags: ['flowers', 'blossom', 'beauty'],
      images: [
        'https://cdn.pixabay.com/photo/2018/09/06/23/37/hydrangea-3659614_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/04/12/18/19/carnation-1325012_1280.jpg',
        'https://cdn.pixabay.com/photo/2017/06/06/19/18/rose-2378156_1280.jpg'
      ]
    },
    coffee: {
      title: 'Coffee',
      tags: ['coffee', 'cup'],
      images: [
        'https://cdn.pixabay.com/photo/2017/05/12/08/29/coffee-2306471_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/03/30/21/59/coffee-beans-1291656_1280.jpg',
        'https://cdn.pixabay.com/photo/2018/01/31/09/57/coffee-3120750_1280.jpg',
      ]
    }
  }
  function imagesLength(length) {
    return `${length} image${length > 1 ? 's' : ''}`
  }
</script>

<div class="albums-container">
  {#each Object.entries(albums) as [albumKey, album] (albumKey)}
    <div class="album-container">
      <Carousel
        let:showPrevPage
        let:showNextPage
        let:loaded
      >
        <div slot="prev" class="album-arrow album-arrow-prev" on:click={showPrevPage}>
          <i />
        </div>
        {#each album.images as imageSrc, imageIndex (imageSrc)}
          <Image
            src={imageSrc}
            alt={album.title}
            loaded={loaded.includes(imageIndex)}
          />
        {/each}
        <div slot="next" class="album-arrow album-arrow-next" on:click={showNextPage}>
          <i />
        </div>
      </Carousel>
      <div class="">
        <span class="album-title">{album.title}</span>
        <span class="album-size">{imagesLength(album.images.length)}</span>
        <div class="album-tags-container">
          {#each album.tags as tag (tag)}
            <span class="album-tag">{tag}</span>
          {/each}
        </div>
      </div>
    </div>
  {/each}
</div>

<style>
  .albums-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .album-container {
    width: 250px;
    padding: 10px;
    background-color: #c6c6c6;
    border-radius: 5px;
    margin: 5px;
  }
  .album-title {
    font-size: 16px;
  }
  .album-size {
    font-size: 10px;
    color: #585858;
  }
  .album-tag {
    background-color: #8f8f8f;
    border-radius: 5px;
    padding: 1px 5px;
    color: #ffffff;
    margin-top: 3px;
    margin-bottom: 3px;
    display: inline-block;
    font-size: 10px;
  }
  .album-tag:not(:last-child) {
    margin-right: 3px;
  }
  .album-arrow {
    width: 20px;
    background-color: #000000;
    opacity: 0;
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 1;
    transition: opacity 150ms ease;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .album-arrow > i{
    border: solid #1e1e1e;
    border-width: 0 5px 5px 0;
    padding: 5px;
    position: relative;
  }
  .album-container:hover .album-arrow {
    opacity: 0.5;
  }
  .album-arrow-prev {
    left: 0;
  }
  .album-arrow-prev > i {
    transform: rotate(135deg);
    right: -4px;
  }
  .album-arrow-next {
    right: 0;
  }
  .album-arrow-next > i {
    transform: rotate(-45deg);
    left: -4px;
  }
</style>
