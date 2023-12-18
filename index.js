let tasks = [];
function viewLine(index) {
  const customAlert = document.getElementById('customAlert');
  const customAlertMessage = document.getElementById('customAlertMessage');
  customAlertMessage.textContent = 'information tache.';
  customAlert.style.display = 'block';
  const positifDiv = document.querySelector('.positif');
  const task = tasks[index];
  positifDiv.innerHTML = `
    <p><span class="s">Categorie:</span>  ${task.categorie}</p>
    <p><span class="t">Titre:</span>  ${task.titre}</p>
    <p><span class="da">Date:</span> ${task.date}</p>
    <p><span class="de">Description:</span> ${task.description}</p>
    <p><span class="sta">Statut:</span> ${task.statut}</p>
  `;
}
let lorem;
// function deleteline
function deleteline(index) {
    console.log(index);
    tasks.splice(index, 1)
    localStorage.setItem('task', JSON.stringify(tasks));
    updateTable();

  }
document.addEventListener("DOMContentLoaded", function () {
  const categories = ["Academique", "Extra-academique", "Distraction"];
  const categorieSelect = document.getElementById("choix");
  const titreInput = document.querySelector('.for input[type="text"]');
  const dateInput = document.querySelector('.for input[type="date"]');
  const submitButton = document.querySelector('.submit');
  const tbody = document.getElementById("tbody");
  const descr = document.getElementById('description');
  const statutSelect = document.getElementById('choix1');
  const statut = ["Nouveau", "En cours", "Terminé"];
   lorem = document.querySelector('.lorem')
  const bi = document.querySelector('.bi')
  const cat = document.querySelector('.cat')
  // Charger les tâches depuis le localStorage au chargement de la page
  const stockedtask = localStorage.getItem('task');
  if (stockedtask) {
      tasks = JSON.parse(stockedtask);
      updateTable();
  }


  submitButton.addEventListener("click", function () {
      const categorieValue = categories[categorieSelect.selectedIndex];
      const titreValue = titreInput.value;
      const dateValue = dateInput.value;
      const descrValue = descr.value;
      const statutValue = statut[statutSelect.selectedIndex];
      if (categorieValue && titreValue && dateValue) {
          // Ajouter la tâche au tableau
          tasks.push({ categorie: categorieValue, titre: titreValue, date: dateValue, description: descrValue, statut: statutValue
            }
            );

          // Mettre à jour le tableau HTML
          updateTable();
          // mettre a jour le localstorage
          localStorage.setItem('task', JSON.stringify(tasks));
          // Effacer les champs après l'ajout
          titreInput.value = "";
          dateInput.value = "";
          descr.value = "";
      } else {
          alert("Veuillez remplir tous les champs !");
      }
  });
  // ajout d'ecouteur d'evenement sur le tbody
  tbody.addEventListener('click', function (event) {
      const target = event.target;
      // target the icons with name class bi-eye
      if (target.classList.contains('bi-eye')) {
          const rowIndex = target.parentElement.parentElement.rowIndex - 1;
          viewLine(rowIndex);
      }
  });

  // adding an event handler on all the document
  document.addEventListener('mousedown', function (event) {
      const target = event.target;
      const customAlert = document.getElementById('customAlert');
      // let's check if the element is not into the div
      if (!customAlert.contains(target)) {
          // let's hide the div
          customAlert.style.display = 'none';
      }
  });
});

function updateTable() {
    // Effacer le contenu actuel du tableau
    tbody.innerHTML = `<tr>
        <td>#</td>
        <td>Date</td>
        <td>Titre</td>
        <td>Categorie</td>
        <td>Operation</td>
      </tr>`;
    // Remplir le tableau HTML avec les tâches
    tasks.forEach(function (task, index) {
        const row = tbody.insertRow();
        row.innerHTML += `
            <td>${index + 1}</td>
            <td>${task.date}</td>
            <td class="cat">${task.titre}</td>
            <td>${task.categorie}</td>
            <td>
                <i class="bi bi-eye" onclick="event.stopPropagation();viewLine(${index})"></i>
                <i class="bi1 bi-pencil-fill"></i>
                <i class="fa fa-trash" aria-hidden="true" onclick="event.stopPropagation();deleteline(${index
                })"></i>
            </td>
        `;
        row.addEventListener('click', function () {

            lorem.textContent = tasks[+row.children[0].textContent - 1].description;
        });
    });
}