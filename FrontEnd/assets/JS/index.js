//ADMIN MODE//
// Vérification de la connexion de l'utilisateur
const token = localStorage.getItem('token');

//Modification Admin Mode
if (token) {
  // L'utilisateur est connecté, affichage des éléments pour l'administrateur
  const adminElements = document.querySelectorAll('#adminMode');
  adminElements.forEach(adminMode => {
    adminMode.style.display = 'flex';
  });

  // Modification du lien de la page HTML si l'utilisateur est connecté
  const loginLink = document.querySelector('#loginLink');
  if (loginLink) {
  loginLink.textContent = 'logout';

  // Déconnexion de l'utilisateur au clic sur "logout"
  loginLink.addEventListener('click', e => {
  e.preventDefault();
  localStorage.removeItem('token');
  window.location.href = 'login.html';
  });
  }

  // Masquage de l'élément avec l'ID "filters" si l'utilisateur est connecté
  const filtersElement = document.querySelector('#contener_filters');
  if (filtersElement) {
  filtersElement.style.display = 'none';
  }
}

// WORKS // 
// Cette fonction asynchrone récupère les projets à partir de l'API
async function getProjects() {
  // On effectue une requête fetch pour récupérer les données des projets
  const response = await fetch("http://localhost:5678/api/works");
  // On attend la résolution de la promesse renvoyée par la méthode json() de la réponse HTTP pour obtenir les données au format JSON
  return await response.json();
}

function addProjects(projects) {
  // On sélectionne la section de la galerie dans le DOM
  const sectionGallery = document.querySelector(".gallery");
  // On parcours tous les éléments du tableau
  for (const project of projects) {
    // On extrait le titre et l'URL de l'image du projet 
    const { title, imageUrl } = project;
    // On crée un élément figure qui contiendra l'image et le titre du projet
    const projectElement = document.createElement("figure");
    // On crée un élément image et on lui attribue l'URL de l'image du projet
    const imageElement = document.createElement("img");
    imageElement.src = imageUrl;
    // On crée un élément figcaption pour afficher le titre du projet
    const titleElement = document.createElement("figcaption");
    titleElement.innerText = title;
    // On ajoute l'image et le titre à l'élément figure créé précédemment
    projectElement.append(imageElement, titleElement);
    // On ajoute l'élément figure à la section de la galerie dans le DOM
    sectionGallery.appendChild(projectElement);
  }
}

// Supprimer les projets affichés
function deleteList() {
  document.querySelector(".gallery").textContent = "";
}

// On récupère les projets en utilisant la fonction "getProjects()" et on les affiche dans la galerie
getProjects().then((projects) => {
  addProjects(projects);
  
  // On crée un bouton pour afficher tous les projets dans la galerie
  const filters = document.querySelector("#filters");
  const btnAll = document.createElement("button");
  btnAll.innerHTML = "Tous";
  btnAll.id = "category";
  btnAll.classList.add("button_filters");
  filters.appendChild(btnAll);

  // On ajoute un gestionnaire d'événement pour le clic sur le bouton "Tous"
  btnAll.addEventListener("click", () => {
    // On supprime tous les éléments de la galerie
    deleteList();
    // On réaffiche tous les projets dans la galerie
    addProjects(projects);
  });

// FILTERS //
 // On récupère les catégories à partir de l'API
fetch("http://localhost:5678/api/categories")
.then((response) => response.json())
.then((categories) => {

  // On boucle à travers toutes les catégories
  for (const category of categories) {
    // On crée un bouton pour chaque catégorie
    const bouton = document.createElement("button");
    bouton.classList.add("button_filters");
    bouton.textContent = category.name;
    // On ajoute un gestionnaire d'événement pour le clic sur le bouton de la catégorie
    bouton.addEventListener("click", () => {
    // On filtre les projets en fonction de la catégorie sélectionnée
    const filteredProjects = projects.filter(
    (project) => project.category.name === category.name
    );
    // On supprime tous les éléments de la galerie
    deleteList();
    // On affiche les projets filtrés dans la galerie
    addProjects(filteredProjects);
    });
    // On ajoute le bouton de la catégorie à la liste des filtres
    filters.appendChild(bouton);
  }
});
});


