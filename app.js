const auth = "TSpu1vb3bwsSPOFeqn7MDGfWKf4l1m353kzno40plgtaQk5hKcPTUGfE"; //ADD THE AUTH KEY
const searchInput = document.querySelector(".search-input");
const submitButton = document.querySelector(".submit-btn");
const moreButton = document.querySelector(".more-btn");
const gallery = document.querySelector(".gallery");
let fetchLink;
let searchValue;
let querry;
let homePhotosPage = 1;
let searchKeyword = "curated";
//event listener
searchInput.addEventListener("input", (e) => {
  searchValue = e.target.value;
});

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  clear();
  querry = searchValue;
  homePhotosPage = 1;
  searchPhotos(querry);
});

//generating more photos
moreButton.addEventListener("click", () => {
  homePhotosPage++;
  if (querry != undefined) {
    searchPhotos(querry);
  } else curatedPhotos();
});
//get request to pexels server
async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = dataFetch.json();
  return data;
}

//making request to fetchApi() function  to give data of random photos
async function curatedPhotos() {
  console.log("Currated photos called");
  fetchLink = `https://api.pexels.com/v1/${searchKeyword}?per_page=15&page=${homePhotosPage}`;
  const data = await fetchApi(fetchLink);
  //content on the screen
  generateGallery(data);
}

//generating search result
async function searchPhotos(querry) {
  console.log("searchPhotos called ");
  fetchLink = `https://api.pexels.com/v1/search?query=${querry}+querry&per_page=15&page=${homePhotosPage}`;
  const data = await fetchApi(fetchLink);
  generateGallery(data);
}

//convert the data from the get request to visual changes in the screen
function generateGallery(data) {
  data.photos.forEach((photo) => {
    const gallaryImg = document.createElement("div");
    gallaryImg.classList.add("gallary-img");
    gallaryImg.innerHTML = `
        <div class="shine"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <img src=${photo.src.large} ></img>
      `;
    gallery.appendChild(gallaryImg);
  });
}

//clear function to remove the previous fetched contained from the screen
function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}
curatedPhotos();

// ========== NEW MODAL FUNCTIONALITY ==========

// Get modal elements
const modal = document.getElementById("photoModal");
const modalImage = document.querySelector(".modal-image");
const photographerName = document.querySelector(".photographer-name");
const photoDimensions = document.querySelector(".photo-dimensions");
const downloadBtn = document.querySelector(".download-btn");
const photographerLink = document.querySelector(".photographer-link");
const closeBtn = document.querySelector(".close-btn");

// Function to open modal with photo details
function openModal(photo) {
  // Set image
  modalImage.src = photo.src.large2x;

  // Set photographer name
  photographerName.textContent = photo.photographer;

  // Set dimensions
  photoDimensions.textContent = `${photo.width} x ${photo.height}`;

  // Set download link
  downloadBtn.href = photo.src.original;
  downloadBtn.download = `photo-by-${photo.photographer}.jpg`;

  // Set photographer profile link
  photographerLink.href = photo.photographer_url;

  // Show modal with animation
  modal.classList.add("active");
  document.body.style.overflow = "hidden"; // Prevent scrolling
}

// Function to close modal
function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "auto"; // Restore scrolling
}

// Close button event
closeBtn.addEventListener("click", closeModal);

// Close when clicking outside the card
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Close with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeModal();
  }
});

// Update generateGallery to add click event to images
// We need to modify the existing generateGallery function
// Store original function
const originalGenerateGallery = generateGallery;

// Override with new functionality
function generateGallery(data) {
  data.photos.forEach((photo) => {
    const gallaryImg = document.createElement("div");
    gallaryImg.classList.add("gallary-img");
    gallaryImg.innerHTML = `
        <div class="shine"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <img src=${photo.src.large} ></img>
      `;

    // Add click event to open modal
    const img = gallaryImg.querySelector("img");
    img.addEventListener("click", () => {
      openModal(photo);
    });

    gallery.appendChild(gallaryImg);
  });
}

// ========== END NEW MODAL FUNCTIONALITY ==========
