const newPalayerName = document.getElementById('registrationName');
const newPalayerPassword = document.getElementById('registrationName');
const newPalayerPasswordСonfirmation = document.getElementById('registrationName');

async function createNewPlayer(){
    if(!newPalayerName || !newPalayerPassword || !newPalayerPasswordСonfirmation){
        alert('Не всі поля заповнені');
    }

    if(newPalayerPassword.value == newPalayerPasswordСonfirmation.value){
        const req = await fetch('http://localhost:7777/api/player', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newPalayerName, password: newPalayerPassword}),
        });
        if(req.status == ok){
            alert('Успішно зареєстровано');
        }
    }else if(newPalayerPassword.value != newPalayerPasswordСonfirmation.value){
        alert('Паролі не збігаються');
    }
    
}

//const socket = io.connect();