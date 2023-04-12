//RECUPERATION DES DONNEES API
let projects;
// Récupère les données des projets depuis l'API et les traite en JSON
fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((data) => {
    // Stocke les données récupérées dans la variable projects
    projects = data;
    galleryProjects(projects);
    modalProjects(projects);
  })
  .catch((error) => console.error(error));

// PROJETS // 
// Ajoute les projets à la section galerie
function galleryProjects(projects) {
  const sectionGallery = document.querySelector(".gallery");
  // Parcourt chaque projet dans le tableau projects
  for (const project of projects) {
    // Destructure les propriétés id, title et imageUrl de l'objet project
    const { id, title, imageUrl } = project;
    // Crée un nouvel élément figure pour contenir l'image et le titre
    const projectElement = document.createElement("figure");
    projectElement.id = id;
    // Crée un nouvel élément image avec la source définie sur l'URL
    const imageElement = new Image();
    imageElement.src = imageUrl;
    imageElement.crossOrigin = "anonymous";
    // Crée un nouvel élément figcaption pour contenir le titre
    const titleElement = document.createElement("figcaption");
    titleElement.textContent = title;
    titleElement.classList.add("project_title_gallery");
    projectElement.appendChild(imageElement);
    projectElement.appendChild(titleElement);
    sectionGallery.appendChild(projectElement);
  }
}

//FILTRES//
// Supprime tous les éléments de la section galerie
function deleteList() {
  document.querySelector(".gallery").textContent = "";
}

// Ajoute un bouton "Tous" pour afficher tous les projets
const filters = document.querySelector("#filters");
const btnAll = document.createElement("button");
btnAll.innerHTML = "Tous";
btnAll.id = "category";
btnAll.classList.add("button_filters");
filters.appendChild(btnAll);

// Supprime les projets actuels et affiche tous les projets
btnAll.addEventListener("click", () => {
  deleteList();
  galleryProjects(projects);
});

// Récupère les données de catégorie depuis l'API et ajoute des boutons
fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((categories) => {
    for (const category of categories) {
      // Crée un nouvel élément bouton pour chaque catégorie
      const bouton = document.createElement("button");
      bouton.classList.add("button_filters");
      bouton.textContent = category.name;
      // Filtre les projets par catégorie et les affiche
      bouton.addEventListener("click", () => {
        const filteredProjects = projects.filter(
          (project) => project.category.name === category.name
        );
        deleteList();
        galleryProjects(filteredProjects);
      });
    filters.appendChild(bouton);
  }
})
.catch((error) => console.error(error));




