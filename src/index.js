const characterBar = document.getElementById('character-bar');
const detailedName = document.getElementById('name'); 
const detailedImage = document.getElementById('image'); 
const detailedVotes = document.getElementById('vote-count');
const votesForm = document.getElementById('votes-form');

let characters = [];
let currentCharacter = null;
fetch('http://localhost:3000/characters')
  .then(response => response.json())
  .then(data => {
    characters = data;
    renderCharacters(data);
  })
  .catch(error => console.error('Error fetching characters:', error));
  function renderCharacters(chars) {
    characterBar.innerHTML = '';
    chars.forEach(character => {
      const span = document.createElement('span');
      span.textContent = character.name;
      span.addEventListener('click', () => showCharacterDetails(character));
      characterBar.appendChild(span);
    });
}
      function showCharacterDetails(character) {
        currentCharacter = character;
        detailedImage.src = character.image;
        detailedName.textContent = character.name;
        detailedVotes.textContent = character.votes;
      }
      votesForm.addEventListener('submit', e => {
        e.preventDefault();
        const votes = parseInt(e.target.votes.value, 10);
        if (!isNaN(votes) && currentCharacter) {
          currentCharacter.votes += votes;
          detailedVotes.textContent = currentCharacter.votes;
          e.target.reset();
            }
        });
        resetButton.addEventListener('click', () => {
            if (currentCharacter) {
              currentCharacter.votes = 0;
              detailedVotes.textContent = currentCharacter.votes;
            }
          });
          