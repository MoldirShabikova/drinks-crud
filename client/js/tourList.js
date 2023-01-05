let postTours = document.querySelector(".tours");
let addBtn = document.querySelector(".btn.post");
const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

const baseURL = `http://localhost:4000`;

const createTourCard = (tours) => {
  const newTourCard = document.createElement("div");
  newTourCard.classList.add("box");
  newTourCard.innerHTML = `
<div>

<h3 class="title">${tours.name}</h3>
            <img src=${tours.image} alt="" />
            <p>
            ${tours.info}
            </p>
            <div>
            <h4>$${tours.price}</h4>
            <div>
            </div>
            </div>
              <button onclick="deleteTour(${tours.id})" class="btn">Not Interested</button>
              </div>
    `;
  postTours.appendChild(newTourCard);
};

const displayTours = (arr) => {
  arr.map((el) => {
    console.log(el);
    createTourCard(el);
  });
};

const getAllTours = () => {
  axios
    .get(`${baseURL}/getTours`)
    .then((res) => {
      displayTours(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  });
});

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal.active");
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

const addTour = () => {
  postTours.innerHTML = "";

  const postModal = document.querySelector(".modal-body");
  const name = document.querySelector("#titleInput");
  const info = document.querySelector("#infoInput");
  const image = document.querySelector("#imageInput");
  const price = document.querySelector("#priceInput");

  let bodyObj = {
    name: name.value,
    info: info.value,
    image: image.value,
    price: price.value,
  };

  console.log(bodyObj);

  axios
    .post(`${baseURL}/addTours`, bodyObj)
    .then((res) => {
      name.value = "";
      info.value = "";
      image.value = "";
      price.value = "";

      displayTours(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteTour = (id) => {
  axios
    .delete(`${baseURL}/deleteTour/${id}`)
    .then((res) => {
      postTours.innerHTML = "";
      displayTours(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

addBtn.addEventListener("click", addTour);

getAllTours();
