document.addEventListener('DOMContentLoaded', (event) => {
    const alterForm = document.getElementById('alter-form');
    const alterList = document.getElementById('alter-list');

    alterForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const gender = document.getElementById('gender').value;
        const pronouns = document.getElementById('pronouns').value;
        const personality = document.getElementById('personality').value;
        const nicknames = document.getElementById('nicknames').value;
        const imageInput = document.getElementById('image');

        const reader = new FileReader();
        reader.onload = () => {
            const image = reader.result;
            saveAlter({ name, gender, pronouns, personality, nicknames, image });
            displayAlters();
            alterForm.reset();
        };
        
        if (imageInput.files[0]) {
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            saveAlter({ name, gender, pronouns, personality, nicknames, image: null });
            displayAlters();
            alterForm.reset();
        }
    });

    function saveAlter(alter) {
        let alters = JSON.parse(localStorage.getItem('alters')) || [];
        alters.push(alter);
        localStorage.setItem('alters', JSON.stringify(alters));
    }

    function deleteAlter(index) {
        let alters = JSON.parse(localStorage.getItem('alters')) || [];
        alters.splice(index, 1);
        localStorage.setItem('alters', JSON.stringify(alters));
        displayAlters();
    }

    function displayAlters() {
        let alters = JSON.parse(localStorage.getItem('alters')) || [];
        alterList.innerHTML = '';
        alters.forEach((alter, index) => {
            const alterDiv = document.createElement('div');
            alterDiv.className = 'alter';
            
            const alterInfo = document.createElement('div');
            alterInfo.className = 'alter-info';

            if (alter.image) {
                const img = document.createElement('img');
                img.src = alter.image;
                alterInfo.appendChild(img);
            }

            alterInfo.innerHTML += `
                <p><strong>Name:</strong> ${alter.name}</p>
                <p><strong>Gender:</strong> ${alter.gender}</p>
                <p><strong>Pronouns:</strong> ${alter.pronouns}</p>
                <p><strong>Personality:</strong> ${alter.personality}</p>
                <p><strong>Nicknames:</strong> ${alter.nicknames}</p>
            `;

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.innerText = 'Delete';
            deleteBtn.onclick = () => deleteAlter(index);

            alterDiv.appendChild(alterInfo);
            alterDiv.appendChild(deleteBtn);
            alterList.appendChild(alterDiv);
        });
    }

    displayAlters();
});
