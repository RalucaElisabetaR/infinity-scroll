const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let photosArray = [];

function setAttributes(element, attributes) {
  for (const key in attributes)
  {
    element.setAttribute(key, attributes[key]);
  }
}

// create elements for links and photos, add to DOM
function displayPhotos() {
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

    item.appendChild(img);
    imageContainer.appendChild(item);


  });
}
// unsplash API 
const count = 10;
const apiKey = 'R5drk7TP-JoRViTt39M18ehNeSg2O_LzEe1WvxT5Jcs';

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

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
getPhotos();