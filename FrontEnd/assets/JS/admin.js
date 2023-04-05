//MODIFICATIONS ADMIN MODE
// Vérification de la connexion de l'utilisateur
const token = localStorage.getItem('token');
  if (token) {
    // L'admninistrateur est connecté, affichage des éléments pour l'administrateur
    const adminElements = document.querySelectorAll('#adminMode');
    adminElements.forEach(adminMode => {
      adminMode.style.display = 'flex';
    });
    // Modification du lien de la page HTML si l'administrateur est connecté
    const loginLink = document.querySelector('#loginLink');
    if (loginLink) {
    loginLink.textContent = 'logout';
    // Déconnexion de l'administrateur au clic sur "logout"
    loginLink.addEventListener('click', e => {
    e.preventDefault();
    localStorage.removeItem('token');
    window.location.href = 'login.html';
    });
    }
    // Masquage des filtres si l'administrateur est connecté
    const filtersElement = document.querySelector('#contener_filters');
    if (filtersElement) {
    filtersElement.style.display = 'none';
    }
  }

  
//OUVERTURE ET FERMETURE DES MODALES
const openModale = document.querySelector(".button_modif_modal");
// Sélectionner tous les éléments avec l'ID "modal1"
const modaleModeElements = document.querySelectorAll("#modal1");
// Ajouter un événement au clic sur le bouton pour afficher les éléments 
openModale.addEventListener("click", () => modaleModeElements.forEach(e => e.style.display = "flex"));
// Sélectionner l'icône pour fermer la modale
const closeModalCross = document.querySelector(".fa-xmark");
// Fermer les modales en cliquant en dehors
const closeModalClick = document.querySelectorAll(".modal");
closeModalClick.forEach((modalElement) => {
  modalElement.addEventListener("click", function (event) {
    if (event.target === modalElement) {
      modalElement.style.display = "none";
    }
  });
});
// Sélectionner tous les éléments avec les IDs "modal1" et "modal2"
const modaleCloseElements = document.querySelectorAll("#modal1", "#modal2");
// Ajouter un événement au clic sur l'icône pour cacher les éléments modale
closeModalCross.addEventListener("click", () => modaleCloseElements.forEach(e => e.style.display = "none"));
// Empêcher la propagation de l'événement de clic à l'intérieur de la modale
const stopPropagation = (event) => event.stopPropagation();
document.querySelector("#modal1").addEventListener("click", stopPropagation);
document.querySelector("#modal2").addEventListener("click", stopPropagation);
// Sélectionner l'icône pour retourner à la modale 1
const icon = document.querySelector(".fa-arrow-left");
// Ajouter un événement au clic sur l'icône pour cacher la modale 2 et afficher la modale 1
icon.addEventListener("click", () => {
document.querySelector("#modal2").style.display = "none";
document.querySelector("#modal1").style.display = "flex";
});
// Sélectionner le bouton pour ajouter des images
const addImagesButton = document.querySelector(".button_add_images");
// Ajouter un événement au clic sur le bouton pour afficher la modale 2 et cacher la modale 1
addImagesButton.addEventListener("click", () => {
const modaleModeElements = document.querySelectorAll("#modal2");
modaleModeElements.forEach(e => e.style.display = "flex");
const modaleCloseElements = document.querySelectorAll("#modal1");
modaleCloseElements.forEach(e => e.style.display = "none");
});


//GENERER LE CONTENU DE LA MODALE 1
// Fonction pour ajouter une modale avec les projets passés en paramètre
function addModal(projects) {
  // Sélectionne l'élément HTML de la galerie modale
  const sectionModal = document.querySelector(".gallery_modal");
  // Récupère le token d'authentification stocké dans le local storage
  const token = localStorage.getItem('token');
  
  // Boucle sur les projets et crée un élément HTML pour chacun
  projects.forEach((article) => {
    // Crée une figure pour chaque projet et ajoute une classe "figureEdit"
    const figureModale = document.createElement("figure");
    figureModale.classList.add("figureEdit");
    // Ajoute un attribut "data-image-url" contenant l'URL de l'image correspondante dans la galerie principale
    figureModale.setAttribute("data-image-url", article.imageUrl);
    
    // Crée un conteneur pour l'image et ajoute une classe "containerImg"
    const contenairImg = document.createElement("div");
    contenairImg.classList.add("containerImg");
    // Crée une balise <img> avec l'URL de l'image du projet
    const imgModale = document.createElement("img");
    imgModale.src = article.imageUrl;
    // Spécifie l'attribut "crossOrigin" pour charger l'image depuis une source externe
    imgModale.crossOrigin = "anonymous";
    
    // Crée une balise <figcaption> avec le texte "éditer"
    const editImg = document.createElement("figcaption");
    editImg.innerText = "éditer";
    // Crée une icône de poubelle en utilisant FontAwesome
    const editIcon = document.createElement("i");
    editIcon.classList.add("fa-solid", "fa-trash-can", "editIcon");

    // AJOUT D'UN ÉVÉNEMENT DE SUPPRESSION
    editIcon.addEventListener("click", () => {
      // Envoie une requête de suppression à l'API
      fetch(`http://localhost:5678/api/works/${article.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // Ajoute le token d'authentification dans les en-têtes de la requête
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          // Si la suppression est réussie, supprime l'élément du DOM correspondant à l'image dans la modale
          if (response.ok) {
            figureModale.remove();
            // Supprime également l'élément correspondant dans la galerie principale
            const imageUrl = figureModale.getAttribute("data-image-url");
            const galleryImg = document.querySelector(`.gallery figure img[src="${imageUrl}"]`);
            if (galleryImg) {
              galleryImg.parentElement.remove();
            }
          } else {
            throw new Error("Erreur lors de la suppression de l'image");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });
      contenairImg.appendChild(imgModale);
    figureModale.appendChild(contenairImg);
    figureModale.appendChild(editImg);
    figureModale.appendChild(editIcon);
    sectionModal.appendChild(figureModale);
  });
}


//AJOUT NOUVEAU PROJET A LA GALERIE 
// Récupération des éléments du DOM
const buttonNewImage = document.getElementById("button_new_images");
const inputFile = document.getElementById("input_file");
const blocAddImages = document.querySelector(".bloc_add_images");
const selectCategory = document.getElementById("category_list");
const buttonValidate = document.querySelector(".button_validate");
const inputTitle = document.querySelector("[name=title]");

// Ajout d'un écouteur d'événement "click" sur le bouton d'ajout d'image
buttonNewImage.addEventListener("click", () => inputFile.click());

// Ajoute un écouteur d'événement "change" à l'élément inputFile
inputFile.addEventListener("change", () => {
  // Crée un élément d'image <img> avec l'URL de l'objet fichier sélectionné
  const image = new Image();
  image.src = URL.createObjectURL(inputFile.files[0]);
  // Ajoute un événement "load" à l'image qui révoque l'URL de l'objet une fois l'image chargée
  image.addEventListener("load", () => URL.revokeObjectURL(image.src));

  // Ajout de l'élément image à la div de blocage d'ajout d'image
  blocAddImages.appendChild(image);
});

// Récupération des catégories depuis l'API et ajout des options à la liste déroulante
fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((categories) => {
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.name;
      selectCategory.appendChild(option);
    });
  })
  .catch((error) => console.error("Error:", error));

// Ajout d'un écouteur d'événement "click" sur le bouton de validation
buttonValidate.addEventListener("click", () => {
  // Crée un objet FormData avec les données du formulaire
  const formData = new FormData();
  const file = inputFile.files[0];
  formData.append("image", file, file.name);
  formData.append("title", inputTitle.value);
  formData.append("category", selectCategory.value);
  // Envoie des données au serveur si elles sont valides
  if (formData.get("title") && formData.get("category") && formData.get("image")) {
    fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Crée un élément figure avec l'image et le titre renvoyés par le serveur
        const project = document.createElement("figure");
        const imageElement = new Image();
        const titleElement = document.createElement("figcaption");
        imageElement.src = data.imageUrl;
        titleElement.textContent = data.title;
        project.append(imageElement, titleElement);
        project.id = data.id;
        document.querySelector(".gallery").appendChild(project);
        document.getElementById("modal2").style.display = "none";
      })
      .catch((error) => console.error("Error:", error));
  } else {
    alert("Veuillez remplir tous les champs");
  }
});






