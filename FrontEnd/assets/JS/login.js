// Sélection des éléments du formulaire
const loginForm = document.querySelector('#login_form');
const emailInput = document.querySelector('#email_input');
const passwordInput = document.querySelector('#password_input');
const errorMessage = document.querySelector('#error_message');

// Ajout d'un événement de soumission du formulaire
loginForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Empêche l'envoi du formulaire par défaut

  // Récupération des valeurs des champs email et mot de passe
  const email = emailInput.value;
  const password = passwordInput.value;

  // Vérification des champs email et mot de passe
  if (!email || !password) {
    errorMessage.textContent = 'Veuillez remplir tous les champs.';
    return;
  }

  // Appel à l'API de connexion avec les informations d'identification
  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then(response => {
    // Vérification de la réponse de l'API
    if (!response.ok) {
      throw new Error('Email ou mot de passe incorrect.');
    }
    return response.json();
  })
  .then(data => {
    // Stockage du token d'authentification dans le stockage local
    localStorage.setItem('token', data.token);
    // Redirection vers la page suivante
    window.location.href = 'index.html';
  })
  .catch(error => {
    errorMessage.textContent = error.message;
  });
});
