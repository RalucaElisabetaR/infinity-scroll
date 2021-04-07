const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
function setAttributes(element, attributes) {
  for (const key in attributes)
  {
    element.setAttribute(key, attributes[key]);
  }
}
// create elements for links and photos, add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;

  photosArray.forEach((photo) => {
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // event listner
    img.addEventListener('load', imageLoaded)
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}
// unsplash API 
const count = 10;
const apiKey = 'R5drk7TP-JoRViTt39M18ehNeSg2O_LzEe1WvxT5Jcs';

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if images loaded


function imageLoaded() {
  imagesLoaded++;

  if (imagesLoaded === totalImages)
  {
    ready = true;
    loader.hidden = true;
    count = 30;

  }
}

// get photos
async function getPhotos() {
  try
  {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error)
  {
  }
}
// load more photos event listner
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready)
  {
    ready = false;
    getPhotos();

  }
});



getPhotos();