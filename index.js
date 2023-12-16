document.addEventListener("DOMContentLoaded", function () {
    const categories = ["Academique", "Extra-academique", "Distraction"];
    const categorieSelect = document.getElementById("choix");
    const titreInput = document.querySelector('.for input[type="text"]');
    const dateInput = document.querySelector('.for input[type="date"]');
    const submitButton = document.querySelector('.submit');
    const tbody = document.getElementById("tbody");
    let tasks = [];

    submitButton.addEventListener("click", function () {
        const categorieValue = categories[categorieSelect.selectedIndex];
      const titreValue = titreInput.value;
      const dateValue = dateInput.value;

      if (categorieValue && titreValue && dateValue) {
        // Ajouter la tâche au tableau
        tasks.push({ categorie: categorieValue, titre: titreValue, date: dateValue });

        // Mettre à jour le tableau HTML
        updateTable();

        // Effacer les champs après l'ajout
        titreInput.value = "";
        dateInput.value = "";
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
      <td class="cat">Catyegorie</td>
      <td>Operation</td>
    </tr>`

      // Remplir le tableau HTML avec les tâches
      tasks.forEach(function (task, index) {
        const row = tbody.insertRow();
        // row.innerHTML += `
        // //   <td class="index" >${index + 1}</td>
        // //   <td class="date">${task.date}</td>
        // //   <td class="titre">${task.titre}</td>
        // //   <td class="categorie">${task.categorie}</td>
        // `;
        row.innerHTML +=`
                    <td>${index + 1}</td>
                    <td>${task.date}</td>
                    <td>${task.titre}</td>
                    <td class="cat">${task.categorie}</td>
                    <td class="cat"><i class="fa fa-trash" aria-hidden="true" onclick="deleteline(${index})"> </i></td>

              `
      });
      console.log(tasks)
    }
  });
  