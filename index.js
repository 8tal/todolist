document.addEventListener("DOMContentLoaded", function () {
    const categories = ["Academique", "Extra-academique", "Distraction"];
    const categorieSelect = document.getElementById("choix");
    const titreInput = document.querySelector('.for input[type="text"]');
    const dateInput = document.querySelector('.for input[type="date"]');
    const submitButton = document.querySelector('.submit');
    const tbody = document.getElementById("tbody");
    const descr = document.getElementById('description');
    const statutSelect =document.getElementById('choix1');
    const statut = ["Nouveau", "En cours", "Terminé"];
    let tasks = [];
    if (!localStorage.getItem ('task')) {
      localStorage.setItem ('task', JSON.stringify(tasks));
    }
    submitButton.addEventListener("click", function () {
        const categorieValue = categories[categorieSelect.selectedIndex];
      const titreValue = titreInput.value;
      const dateValue = dateInput.value;
const descrValue= descr.value;
const statutValue = statut[statutSelect.selectedIndex];
      if (categorieValue && titreValue && dateValue) {
        // Ajouter la tâche au tableau
        tasks.push({ categorie: categorieValue, titre: titreValue, date: dateValue, description: descrValue, statut:statutValue});
        // Mettre à jour le tableau HTML
        updateTable();

        // Effacer les champs après l'ajout
        titreInput.value = "";
        dateInput.value = "";
        descr.value = "";
      } else {
        alert("Veuillez remplir tous les champs !");
      }
    });

    function updateTable() {
      // Effacer le contenu actuel du tableau
      tbody.innerHTML = `<tr>
      <td>#</td>
      <td>Date</td>
      <td>Titre</td>
      <td class="cat">Categorie</td>
      <td>Operation</td>
    </tr>`

      // Remplir le tableau HTML avec les tâches
      tasks.forEach(function (task, index) {
        const row = tbody.insertRow();
        if (!localStorage.getItem ('row')) {
          localStorage.setItem ('row', JSON.stringify(row));
        }
        row.innerHTML +=`
                    <td>${index + 1}</td>
                    <td>${task.date}</td>
                    <td>${task.titre}</td>
                    <td class="cat">${task.categorie}</td>
                    <td class="cat">
                    <i class="bi bi-eye"></i>
                    <i class="bi1 bi-pencil-fill"></i>
                    <i class="fa fa-trash" aria-hidden="true" onclick="deleteline(${index})"> </i>
                     </td>

              `
              localStorage.setItem('task', JSON.stringify (task));
      });
    }
  });
  