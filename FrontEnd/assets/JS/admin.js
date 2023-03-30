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
const closeModale = document.querySelector(".fa-xmark");
// Sélectionner tous les éléments avec les IDs "modal1" et "modal2"
const modaleCloseElements = document.querySelectorAll("#modal1", "#modal2");
// Ajouter un événement au clic sur l'icône pour cacher les éléments modale
closeModale.addEventListener("click", () => modaleCloseElements.forEach(e => e.style.display = "none"));
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
//SUPPRESSION DES TRAVAUX
function addModal(projects) {
  // Récupération de l'élément du DOM qui accueillera la modale
  const sectionModal = document.querySelector(".gallery_modal");
  projects.forEach((article) => {
    const figureModale = document.createElement("figure");
    figureModale.classList.add("figureEdit");
    const contenairImg = document.createElement("div");
    contenairImg.classList.add("containerImg");
    const imgModale = document.createElement("img");
    imgModale.src = article.imageUrl;
    imgModale.crossOrigin = "anonymous";
    const editImg = document.createElement("figcaption");
    editImg.innerText = "éditer";
    const editIcon = document.createElement("i");
    editIcon.classList.add("fa-solid", "fa-trash-can", "editIcon");
    // Ajout d'un écouteur d'événement au clic sur l'icône de la corbeille
    editIcon.addEventListener("click", () => {
      figureModale.remove();
    });
    contenairImg.appendChild(imgModale);
    figureModale.appendChild(contenairImg);
    figureModale.appendChild(editImg);
    figureModale.appendChild(editIcon);
    sectionModal.appendChild(figureModale);
  });
}



  