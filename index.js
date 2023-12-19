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
let newChart;
function chart(){
  if(newChart) newChart.destroy()
  const nouveau = tasks?.filter(item => item.statut==="Nouveau")?.length ?? 0;
  const encours = tasks?.filter(item => item.statut==="En cours")?.length ?? 0;
  const termine = tasks?.filter(item => item.statut==="Terminé")?.length ?? 0;
  const ctx = document.getElementById('myChart');
  newChart = new Chart(ctx, {
    type: 'pie',
    data: {
     labels: ['Nouveau', 'En cours','Terminé'],
      datasets: [{
        label: "Nouveau",
        data: [nouveau,encours,termine],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          display:false,
          beginAtZero: true
        }
      }
    }
  });
}
// function deleteline
function deleteline(index) {
    console.log(index);
    tasks.splice(index, 1)
    localStorage.setItem('task', JSON.stringify(tasks));
    updateTable();
    chart();
  }
  let categorieSelect;
  let categories;
//   function editline
function editline(index) {
    // console.log(index);
    // add1.style.display = 'block';
    // btnAddexpense.style.display = 'none';
    // categorieSelect.value = tasks[index + 1];
    categorieValue = categories[categorieSelect.selectedIndex];
    statutValue = statut[statutSelect.selectedIndex];
    titreInput.value = tasks[index].titre;
    descr.value=tasks[index].titre;
    submitButton.addEventListener('click', function () {
        // tasks[index + 1]=categorieSelect.value;
      categories[categorieSelect.selectedIndex] =categorieValue;
      statut[statutSelect.selectedIndex]=statutValue;
      tasks[index].titre = titreInput.value;
      tasks[index].description = descr.value;
      titreInput.value = "";
      descr.value= "";
      localStorage.setItem('tasks', JSON.stringify(tasks));
//   add1.style.display = 'none';
    //   btnAddexpense.style.display = 'block';
      updateTable();
//   document.location.reload();
    })
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
          tasks.push({ categorie: categorieValue, titre: titreValue, date: dateValue, description: descrValue,   statut: statut[statutSelect.selectedIndex]
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
          chart();
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


chart();
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
                <i class="bi1 bi-pencil-fill" onclick="editline(${index})"></i>
                <i class="fa fa-trash" aria-hidden="true" onclick="event.stopPropagation();deleteline(${index
                })"></i>
            </td>
        `;
        row.addEventListener('click', function () {

            lorem.textContent = tasks[+row.children[0].textContent - 1].description;
        });
    });
}

