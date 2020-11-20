import gallerySourseFiles from './gallery-items.js';

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
  // galleryImageRef.setAttribute('data-source', element.original);
  galleryImageRef.dataset.source = element.original;
  galleryImageRef.dataset.index = element.index;
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
  modalImage: document.querySelector('.lightbox__image'),
  closeBtn: document.querySelector('button[data-action="close-lightbox"]'),
};

// підключення великого зображення

galleryListRef.addEventListener('click', onGalleryClick);
ref.closeBtn.addEventListener('click', hideModal);

function onGalleryClick(event) {
  event.preventDefault();

  const target = event.target;
  const currentTarget = event.currentTarget;

  if (target === currentTarget) {
    return;
  }

  ref.modalImage.src = target.dataset.source;
  ref.modalImage.alt = target.getAttribute('alt');

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

// дії, при натисненні кнопок

function onKeyDown(event) {
  if (event.code === 'Escape') {
    hideModal();
  }

  if (event.code === 'ArrowRight') {
    let prevIndex = +event.target.firstChild.dataset.index;
    let nextIndex = +event.target.firstChild.dataset.index + 1;
    console.log(prevIndex, nextIndex);

    if (nextIndex + 1 === gallerySourseFiles.length) {
      return;
    }
    prevIndex += 1;
    ref.modalImage.src = gallerySourseFiles[nextIndex].original;
    console.log(gallerySourseFiles[nextIndex]);
  }
}
