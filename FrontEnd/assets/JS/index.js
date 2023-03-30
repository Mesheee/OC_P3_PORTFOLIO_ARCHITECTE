//RECUPERATION DES DONNEES API
// Stocke les données récupérées dans une variable
let projects;
// Récupère les données des projets depuis l'API et les traite en JSON
fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((data) => {
    // Stocke les données récupérées dans la variable projects
    projects = data;
    // Ajoute les projets à la section galerie
    addProjects(projects);
    // Ajoute les projets à la modale
    addModal(projects);
  })
  .catch((error) => console.error(error));



// WORKS // 
// Ajoute les projets à la section galerie
function addProjects(projects) {
  const sectionGallery = document.querySelector(".gallery");
  // Parcourt chaque projet dans le tableau projects
  for (const project of projects) {
    // Destructure les propriétés id, title et imageUrl de l'objet project
    const { id, title, imageUrl } = project;
    // Crée un nouvel élément figure pour contenir l'image et le titre du projet
    const projectElement = document.createElement("figure");
    projectElement.id = id;
    // Crée un nouvel élément image avec la source définie sur l'URL de l'image du projet
    const imageElement = new Image();
    imageElement.src = imageUrl;
    imageElement.crossOrigin = "anonymous";
    // Crée un nouvel élément figcaption pour contenir le titre du projet
    const titleElement = document.createElement("figcaption");
    titleElement.textContent = title;
    // Ajoute les éléments image et titre à l'élément project
    projectElement.appendChild(imageElement);
    projectElement.appendChild(titleElement);
    // Ajoute l'élément project à la section galerie
    sectionGallery.appendChild(projectElement);
  }
}

//FILTERS//
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

// Lorsque le bouton "Tous" est cliqué, supprime les projets actuels et affiche tous les projets
btnAll.addEventListener("click", () => {
  deleteList();
  addProjects(projects);
});

// Récupère les données de catégorie depuis l'API et ajoute des boutons pour chaque catégorie
fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((categories) => {
    // Parcourt chaque catégorie dans le tableau categories
    for (const category of categories) {
      // Crée un nouvel élément bouton pour la catégorie
      const bouton = document.createElement("button");
      bouton.classList.add("button_filters");
      bouton.textContent = category.name;
      // Lorsque le bouton de la catégorie est cliqué, filtre les projets par catégorie et les affiche
      bouton.addEventListener("click", () => {
        const filteredProjects = projects.filter(
          (project) => project.category.name === category.name
        );
        deleteList();
        addProjects(filteredProjects);
      });
    filters.appendChild(bouton);
  }
})
.catch((error) => console.error(error));




