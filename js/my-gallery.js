import gallerySourseFiles from "./gallery-items.js";

const galleryListRef = document.querySelector(".js-gallery");
// galleryListRef.addEventListener("click", );

function createElement(element) {
  const galleryItemRef = document.createElement("li");
  galleryItemRef.classList.add("gallery__item");

  const galleryLinkRef = document.createElement("a");
  galleryLinkRef.classList.add("gallery__link");
  galleryLinkRef.href = element.original;

  const galleryImageRef = document.createElement("img");
  galleryImageRef.classList.add("gallery__image");
  galleryImageRef.src = element.preview;
  galleryImageRef.setAttribute("data-source", `${element.original}`);
  galleryImageRef.alt = element.description;

  galleryLinkRef.appendChild(galleryImageRef);
  galleryItemRef.appendChild(galleryLinkRef);

  return galleryItemRef;
}

const gallerySourseArr = gallerySourseFiles.map((item) => createElement(item));
console.log(gallerySourseArr);
galleryListRef.append(...gallerySourseArr);
