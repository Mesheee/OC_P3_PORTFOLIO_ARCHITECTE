//MODIFICATIONS ADMIN MODE
// Vérification de la connexion de l'utilisateur
const token = localStorage.getItem('token');
  if (token) {
    // Affichage des éléments pour l'administrateur
    const adminElements = document.querySelectorAll('#adminMode');
    adminElements.forEach(adminMode => {
      adminMode.style.display = 'flex';
    });
     // Masquage des filtres 
     const filtersElement = document.querySelector('#contener_filters');
     if (filtersElement) {
     filtersElement.style.display = 'none';
     }
    // Modification du lien "Login" de la page HTML 
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
  }
  
//OUVERTURE ET FERMETURE DES MODALES
const openModal = document.querySelector(".button_modif_modal");
const closeModalCross1 = document.querySelector(".fa-xmark");
const modal1 = document.querySelector("#modal1");
const modal2 = document.querySelector("#modal2");

// Ouvre la modale 1 quand on clique sur le bouton
openModal.addEventListener("click", () => modal1.style.display = "flex");

// Ferme les modales quand on clique sur la croix ou en dehors de la modale
const closeModal = () => {
modal1.style.display = "none";
modal2.style.display = "none";
};
closeModalCross1.addEventListener("click", closeModal);
modal1.addEventListener("click", (event) => {
if (event.target === modal1) closeModal();
});
modal2.addEventListener("click", (event) => {
if (event.target === modal2) closeModal();
});
document.querySelector("#modal2 .fa-xmark").addEventListener("click", closeModal);

// Retourne à la modale 1 quand on clique sur la flèche
const icon = document.querySelector(".fa-arrow-left");
icon.addEventListener("click", () => {
modal2.style.display = "none";
modal1.style.display = "flex";
});

// Affiche la modale 2 quand on clique sur le bouton pour ajouter des images
const addImagesButton = document.querySelector(".button_add_images");
addImagesButton.addEventListener("click", () => {
modal1.style.display = "none";
modal2.style.display = "flex";
});


//GENERER LE CONTENU DE LA MODALE 1
function modalProjects(projects) {
  const sectionModal = document.querySelector(".gallery_modal");
  const token = localStorage.getItem('token');
  // Boucle sur les projets et crée un élément HTML pour chacun
  projects.forEach((article) => {
    const figureModal = document.createElement("figure");
    figureModal.classList.add("figureEdit");
    // Ajoute un attribut contenant l'URL de l'image correspondante dans la galerie 
    figureModal.setAttribute("data-image-url", article.imageUrl);
    
    const contenairImg = document.createElement("div");
    contenairImg.classList.add("containerImg");
    
    const imgModal = document.createElement("img");
    imgModal.src = article.imageUrl;
    imgModal.crossOrigin = "anonymous";
    
    const editImg = document.createElement("figcaption");
    editImg.innerText = "éditer";
    
    // Crée une icône de corbeille en utilisant FontAwesome
    const editIcon = document.createElement("i");
    editIcon.classList.add("fa-solid", "fa-trash-can", "editIcon");


    // AJOUT D'UN ÉVÉNEMENT DE SUPPRESSION
    editIcon.addEventListener("click", () => {
      // Envoie une requête de suppression à l'API
      fetch(`http://localhost:5678/api/works/${article.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // Ajoute le token d'authentification
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          // Supprime l'élément du DOM correspondant à l'image dans la modale
          if (response.ok) {
            figureModal.remove();
            // Supprime l'élément correspondant dans la galerie principale
            const imageUrl = figureModal.getAttribute("data-image-url");
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
    figureModal.append(contenairImg, editImg, editIcon);
    sectionModal.appendChild(figureModal);
    contenairImg.appendChild(imgModal);
  });
}

//AJOUT NOUVEAU PROJET A LA GALERIE 
const buttonNewImage = document.getElementById("button_new_images");
const inputFile = document.getElementById("input_file");
const blocAddImages = document.querySelector(".bloc_add_images");
const selectCategory = document.getElementById("category_list");
const buttonValidate = document.querySelector(".validate_button");
const inputTitle = document.getElementById("input_title");

// Ajout d'un écouteur d'événement sur le bouton d'ajout d'image
buttonNewImage.addEventListener("click", () => inputFile.click());
// Ajoute un écouteur d'événement "change" à l'élément inputFile
inputFile.addEventListener("change", () => {
  // Crée un élément image avec l'URL de l'objet fichier sélectionné
  const image = new Image();
  image.src = URL.createObjectURL(inputFile.files[0]);
  // Ajoute un événement "load" à l'image qui révoque l'URL de l'objet une fois l'image chargée
  image.addEventListener("load", () => URL.revokeObjectURL(image.src));
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

// Ajout d'un écouteur d'événement sur le bouton de validation
buttonValidate.addEventListener("click", () => {
  // Vérifie si tous les champs sont remplis avant d'envoyer les données
  if (inputTitle.value && selectCategory.value !== "none" && inputFile.files.length > 0) {
    // Crée un objet FormData avec les données du formulaire
    const formData = new FormData();
    const file = inputFile.files[0];
    formData.append("image", file, file.name);
    formData.append("title", inputTitle.value);
    formData.append("category", selectCategory.value);
    // Envoie des données au serveur
    fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Le projet a été ajouté avec succès !");
        // Crée un élément figure avec l'image et le titre 
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
    alert("Veuillez remplir tous les champs du formulaire !");
  }
});