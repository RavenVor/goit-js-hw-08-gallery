import gallerySourseFiles from './gallery-items.js';

const maxIndex = gallerySourseFiles.length - 1;
let prevIndex;

// створення галереї

function createElement(element) {
  const galleryItemRef = document.createElement('li');
  galleryItemRef.classList.add('gallery__item');

  const galleryLinkRef = document.createElement('a');
  galleryLinkRef.classList.add('gallery__link');
  galleryLinkRef.href = element.original;

  const galleryImageRef = document.createElement('img');
  galleryImageRef.classList.add('gallery__image');
  galleryImageRef.src = element.preview;
  galleryImageRef.dataset.source = element.original;
  galleryImageRef.dataset.index = gallerySourseFiles.indexOf(element);
  galleryImageRef.alt = element.description;

  galleryLinkRef.appendChild(galleryImageRef);
  galleryItemRef.appendChild(galleryLinkRef);
  return galleryItemRef;
}

const gallerySourseArr = gallerySourseFiles.map(item => createElement(item));

const galleryListRef = document.querySelector('.js-gallery');
galleryListRef.append(...gallerySourseArr);

const ref = {
  backDrop: document.querySelector('.js-lightbox'),
  overley: document.querySelector('.lightbox__overlay'),
  modalImage: document.querySelector('.lightbox__image'),
  closeBtn: document.querySelector('button[data-action="close-lightbox"]'),
};

// підключення великого зображення

galleryListRef.addEventListener('click', onGalleryClick);
ref.overley.addEventListener('click', onOverleyClick);
ref.closeBtn.addEventListener('click', hideModal);

function onGalleryClick(event) {
  event.preventDefault();

  const target = event.target;
  const currentTarget = event.currentTarget;
  const indexOfSmallImg = target.dataset.index;

  if (target === currentTarget) {
    return;
  }

  ref.modalImage.src = target.dataset.source;
  ref.modalImage.alt = target.getAttribute('alt');
  prevIndex = Number(indexOfSmallImg);

  openModal();
}

// відкриття і закриття модалки

function openModal() {
  ref.backDrop.classList.add('is-open');
  window.addEventListener('keydown', onKeyDown);
}

function hideModal() {
  ref.backDrop.classList.remove('is-open');
  ref.modalImage.src = '';
  window.removeEventListener('keydown', onKeyDown);
}

function onOverleyClick(event) {
  const target = event.target;
  const currentTarget = event.currentTarget;
  if (target === currentTarget) {
    hideModal();
  }
}

function showNextIndex(nextIndex) {
  if (nextIndex === gallerySourseFiles.length) {
    return;
  }

  ref.modalImage.src = gallerySourseFiles[nextIndex].original;
}

// дії, при натисненні кнопок

function onKeyDown(event) {
  if (event.code === 'Escape') {
    hideModal();
  }

  let nextIndex;
  if (event.code === 'ArrowRight') {
    prevIndex + 1 > maxIndex ? (nextIndex = 0) : (nextIndex = prevIndex + 1);

    prevIndex = nextIndex;
    showNextIndex(nextIndex);
  }

  if (event.code === 'ArrowLeft') {
    prevIndex - 1 < 0 ? (nextIndex = maxIndex) : (nextIndex = prevIndex - 1);

    prevIndex = nextIndex;
    showNextIndex(nextIndex);
  }
}
