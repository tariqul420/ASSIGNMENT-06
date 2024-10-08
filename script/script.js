const displayBtn = async () => {
  const api = await fetch("https://openapi.programming-hero.com/api/peddy/categories");
  const data = await api.json();
  const displayBtn = data["categories"];

  const allAnimalContainer = document.getElementById("all-animal-container");
  let lastClickBtn = null;

  displayBtn.map((items) => {
    const { category, category_icon } = items;

    const btnContainer = document.getElementById("category-btn-container");

    const button = document.createElement("button");
    button.className = "flex gap-4 items-center justify-center border border-solid border-[#0e7a8126] rounded-2xl w-[15rem] h-[5rem] mx-auto";
    button.innerHTML = `
      <img src="${category_icon}" alt="">
      <p class="font-inter font-bold text-color-primary text-2xl">${category}</p>
    `;

    button.addEventListener("click", () => {
      allAnimalContainer.innerHTML = "";

      if (lastClickBtn) {
        lastClickBtn.classList.remove("bg-btn-primary/20", "rounded-full");
      }

      button.classList.add("bg-btn-primary/20", "rounded-full");
      lastClickBtn = button;

      const spinner = document.createElement("div");
      spinner.classList.add("spinner");
      allAnimalContainer.classList.remove("grid");
      allAnimalContainer.classList.add("flex", "items-center", "justify-center", "h-[375px]", "bg-[#13131308]");
      allAnimalContainer.appendChild(spinner);

      setTimeout(() => {
        allAnimalAPI(category);
        allAnimalContainer.removeChild(spinner);
        allAnimalContainer.classList.add("grid");
        allAnimalContainer.classList.remove("flex", "items-center", "justify-center", "h-[375px]", "bg-[#13131308]");
      }, 2000);
    });

    btnContainer.append(button);
  });
};

async function allAnimalAPI(category) {
  const api = await fetch(`https://openapi.programming-hero.com/api/peddy/${category ? `category/${category}` : `pets`}`);
  const data = await api.json();
  allAnimalDisplay(data["pets"] ? data["pets"] : data["data"]);
}

const allAnimalDisplay = (allData) => {
  const allAnimalContainer = document.getElementById("all-animal-container");
  const sortByPriceBtn = document.getElementById("sort-by-price");

  allAnimalContainer.innerHTML = "";
  allAnimalContainer.classList.add("grid");

  if (allData.length === 0) {
    allAnimalContainer.classList.remove("grid");
    const noData = document.createElement("div");
    noData.className = "flex items-center justify-center flex-col space-y-6 p-10 bg-[#13131308] rounded-[12px]";
    noData.innerHTML = `
      <img class="w-[9.5rem]" src="../images/error.webp">
    <h2 class="font-inter font-bold text-color-primary text-3xl text-center">No Information Available</h2>
    <p class="font-bold text-xl text-color-secondary text-center">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a.</p>
    `;
    sortByPriceBtn.classList.add("cursor-not-allowed", "bg-gray-400");
    sortByPriceBtn.setAttribute("disabled", true);

    allAnimalContainer.append(noData);
    return;
  }

  sortByPriceBtn.classList.remove("cursor-not-allowed", "bg-gray-400");
  sortByPriceBtn.removeAttribute("disabled", true);

  sortByPriceBtn.addEventListener("click", () => {
    const sortResult = allData.sort((a, b) => b.price - a.price);
    allAnimalDisplay(sortResult);
  });

  allData.forEach((data) => {
    const { image, pet_name, breed, date_of_birth, gender, price, petId } = data;
    const card = document.createElement("div");
    card.className = "border border-solid border-[#1313131a] p-4 rounded-[12px]";
    card.innerHTML = `
              <div>
                <img class="rounded-[8px] w-full h-full" src=${image}>
              </div>
              <div class="mt-3">
                <h3 class="font-inter font-bold text-xl text-color-primary">${pet_name}</h3>
                <p class="text-color-secondary font-semibold"><i class="fa-solid fa-layer-group"></i> Breed: ${breed ? breed : "Not Available"}</p>
                <p class="text-color-secondary font-semibold"><i class="fa-regular fa-calendar-days"></i> Birth: ${date_of_birth ? date_of_birth : "Not Available"}</p>
                <p class="text-color-secondary font-semibold"><i class="fa-solid fa-venus-mars"></i> Gender: ${gender ? gender : "Not Available"}</p>
                <p class="text-color-secondary font-semibold"><i class="fa-solid fa-dollar-sign"></i> Price : ${price ? `${price} $` : "Not Available"}</p>
              </div>
              <hr class="bg-[#1313131a] mt-2">
              <div class="mt-2 flex items-center justify-between">
                <button onclick="likeBtn(${petId})" class="text-[18px] text-btn-primary px-5 lg:px-3 py-2 border border-solid border-[rgb(14, 122, 129, 0.15)] rounded-[8px] text-xl font-bold"><i class="fa-regular fa-thumbs-up"></i></button>
                <button id="adopt-btn-${petId}" onclick="adoptBtn(${petId})" class="text-[18px] text-btn-primary px-5 lg:px-3 py-2 border border-solid border-[rgb(14, 122, 129, 0.15)] rounded-[8px] text-xl font-bold">Adopt</button>
                <button onclick="detailsBtn(${petId})" class="text-[18px] text-btn-primary px-5 lg:px-3 py-2 border border-solid border-[rgb(14, 122, 129, 0.15)] rounded-[8px] text-xl font-bold">Details</button>
              </div>
        `;

    allAnimalContainer.append(card);
  });
};

const likeBtn = async (id) => {
  const link = await fetch("https://openapi.programming-hero.com/api/peddy/pets");
  const data = await link.json();
  const postAllData = data["pets"];

  const animalPhotoContainer = document.getElementById("animalPhoto");
  postAllData.forEach((image) => {
    if (image.petId === id) {
      const img = document.createElement("div");
      img.innerHTML = `
      <img class="rounded-[8px] h-full w-full" src="${image.image}" alt="">
      `;

      animalPhotoContainer.append(img);
    }
  });
};

const adoptBtn = async (id) => {
  const link = await fetch("https://openapi.programming-hero.com/api/peddy/pets");
  const data = await link.json();
  const postAllData = data["pets"];

  postAllData.forEach((data) => {
    if (data.petId === id) {
      const beforeModal = document.getElementById("my_modal_1");
      if (beforeModal) {
        beforeModal.remove();
      }

      const adoptBtnId = document.getElementById(`adopt-btn-${id}`);
      adoptBtnId.classList.add("cursor-not-allowed", "bg-gray-400", "text-white", "text-[15px]");
      adoptBtnId.innerText = "Adopted";
      adoptBtnId.setAttribute("disabled", true);

      const modal = document.createElement("div");
      modal.innerHTML = `
    <dialog id="my_modal_1" class="modal">
      <div class="modal-box flex flex-col items-center justify-center space-y-4">
        <img class="w-40" src="../images/handshake.png">
        <h2 class="text-color-primary font-black text-2xl text-center">Adoption Process is Starting for Your Pet</h2>
        <div id="countdown" class="text-8xl font-bold mt-4">3</div>
      </div>
    </dialog>
    `;

      document.body.appendChild(modal);

      const openModal = document.getElementById("my_modal_1");
      openModal.showModal();

      let countdown = 3;
      const countdownId = document.getElementById("countdown");

      const countdownTime = setInterval(() => {
        countdown--;
        countdownId.innerText = countdown;

        if (countdown === 0) {
          clearInterval(countdownTime);
          openModal.close();
        }
      }, 1000);
    }
  });
};

const detailsBtn = async (id) => {
  const link = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`);
  const data = await link.json();
  const petData = data["petData"];

  const { image, pet_name, breed, gender, vaccinated_status, date_of_birth, price, pet_details } = petData;

  const beforeModal = document.getElementById("my_modal_1");
  if (beforeModal) {
    beforeModal.remove();
  }

  if (petData.petId === id) {
    const modal = document.createElement("div");
    modal.innerHTML = `
    <dialog id="my_modal_1" class="modal">
      <div class="modal-box">
        <div>
          <img class="w-full h-full rounded-lg" src="${image}" alt="" />
        </div>

        <div class="mt-6">
          <h2 class="font-inter font-bold text-xl text-color-primary">${pet_name}</h2>
          <div class="flex gap-8 mt-4">
            <div>
              <p class="text-color-secondary font-semibold"><i class="fa-solid fa-layer-group"></i> Breed: ${breed ? breed : "Not Available"}</p>
              <p class="text-color-secondary font-semibold"><i class="fa-solid fa-venus-mars"></i> Gender: ${gender ? gender : "Not Available"}</p>
              <p class="text-color-secondary font-semibold"><i class="fa-solid fa-venus-mars"></i> Vaccinated status: ${vaccinated_status ? vaccinated_status : "Not available"}</p>
            </div>
            <div>
              <p class="text-color-secondary font-semibold"><i class="fa-regular fa-calendar-days"></i> Birth: ${date_of_birth ? date_of_birth : "Not Available"}</p>
              <p class="text-color-secondary font-semibold"><i class="fa-solid fa-dollar-sign"></i> Price : ${price ? `${price} $` : "Not Available"}</p>
            </div>
          </div>
        </div>

        <hr class="mt-4 mb-4" />
        
        <div>
          <h3 class="text-color-primary font-bold text-xl font-inter">Details Information</h3>
          <p class="text-color-secondary font-semibold">${pet_details ? pet_details : "Not Available"}</p>
        </div>

        <form method="dialog" class="mt-4">
          <button class="btn w-full bg-btn-primary/20 hover:bg-btn-primary/20 text-xl font-black text-btn-primary">Close</button>
        </form>
      </div>
    </dialog>
    `;

    document.body.appendChild(modal);

    const openModal = document.getElementById("my_modal_1");
    openModal.showModal();
  }
};

displayBtn();
allAnimalAPI();
