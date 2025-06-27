const getInfo = () => {
  const input = String(document.getElementById('choice').value);
  const container = document.getElementById("container");

  // Clear previous results
  container.innerHTML = "";

  const url = `https://ballora-backend.onrender.com/api/players?search=${input}`;

  // Add loading spinner
  const spinner = document.createElement('div');
  spinner.className = 'load';
  spinner.innerHTML = `<div></div>`;
  container.style.justifyContent = 'center';
  container.appendChild(spinner);

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error('Players not found or system failed!');
      return res.json();
    })
    .then(data => {
      setTimeout(() => {
        spinner.remove();
        container.style.justifyContent = 'flex-start';

        const players = data.response.suggestions;

        players.forEach(player => {
          // Create player card
          const playersDiv = document.createElement("div");
          playersDiv.className = "player-card";

          // Card header
          const cardHeader = document.createElement("div");
          cardHeader.className = "card-header";
          cardHeader.innerHTML = `
            <i class="fa-solid fa-futbol"></i>
            <h3>${player.name}</h3>
          `;

          // Card body
          const cardBody = document.createElement("div");
          cardBody.className = "card-body";

          const rolePara = document.createElement("p");
          rolePara.innerHTML = `<strong>Role:</strong> ${player.type}`;

          const teamPara = document.createElement("p");
          teamPara.innerHTML = `<strong>Team:</strong> ${player.teamName || 'N/A'}`;

          // Assemble card
          cardBody.appendChild(rolePara);
          cardBody.appendChild(teamPara);
          playersDiv.appendChild(cardHeader);
          playersDiv.appendChild(cardBody);
          container.appendChild(playersDiv);
        });

        // If no players found
        if (players.length === 0) {
          const noResult = document.createElement('p');
          noResult.textContent = "No players found for your search.";
          container.appendChild(noResult);
        }

      }, 4000);
    })
    .catch(err => {
      spinner.remove();
      container.style.justifyContent = 'center';
      const errorMsg = document.createElement("p");
      errorMsg.textContent = "Something went wrong. Please try again.";
      container.appendChild(errorMsg);
      console.error("Error: ", err);
    });
};
