var mySwiper = new Swiper('.swiper-container', {
  loop: false,
  rewind: true,
  freeMode: true,
  slidesPerView: 1,
  pagination: {
      el: '.swiper-pagination',
      clickable: true,
  },
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
  },
});
