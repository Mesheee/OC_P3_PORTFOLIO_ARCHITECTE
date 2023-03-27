//OUVERTURE ET FERMETURE MODALES
const openModale = document.querySelector(".button_modif_modal");
// Sélectionner tous les éléments avec l'ID "modal1"
const modaleModeElements = document.querySelectorAll("#modal1");
// Ajouter un événement au clic sur le bouton pour afficher les éléments modale
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

// Sélectionner l'icône pour retourner à la modale1
const icon = document.querySelector(".fa-arrow-left");
// Ajouter un événement au clic sur l'icône pour cacher la modale2 et afficher la modale1
icon.addEventListener("click", () => {
document.querySelector("#modal2").style.display = "none";
document.querySelector("#modal1").style.display = "flex";
});

// Sélectionner le bouton pour ajouter des images
const addImagesButton = document.querySelector(".button_add_images");
// Ajouter un événement au clic sur le bouton pour afficher la modale2 et cacher la modale1
addImagesButton.addEventListener("click", () => {
const modaleModeElements = document.querySelectorAll("#modal2");
modaleModeElements.forEach(e => e.style.display = "flex");
const modaleCloseElements = document.querySelectorAll("#modal1");
modaleCloseElements.forEach(e => e.style.display = "none");
});