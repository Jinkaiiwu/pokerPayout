function proceedToStep2() {
    const numPlayers = parseInt(document.getElementById('numPlayers').value);
    const initialBuyIn = parseInt(document.getElementById('initialBuyIn').value);
    const chipColors = parseInt(document.getElementById('chipColors').value);
	const reBuyIn = parseInt(document.getElementById('reBuyIn').value);	
	
	
	if(isNaN(numPlayers)||isNaN(initialBuyIn)||isNaN(chipColors)||isNaN(reBuyIn)){
		alert('Make sure that everything is filled in');
		return;
	}else if(numPlayers==0){
		alert('You cannot play with 0 players');
		return;
	}else if(chipColors>10){
		alert('You should not be playing with more than 5 chip colors');
		return;
	}else{
		// Hide step 1 and show step 2
		document.getElementById('step1').style.display = 'none';
		document.getElementById('step2').style.display = 'block';
	}
	
    const chipValueInputs = document.getElementById('chipValueInputs');
    chipValueInputs.innerHTML = '';

    // Create inputs for each chip color
    for (let i = 1; i <= chipColors; i++) {
        const label = document.createElement('label');
        label.innerHTML = `Value of Chip Color ${i}: `;

        const input = document.createElement('input');
        input.type = 'number';
        input.min = '1';
        input.id = `chipValue${i}`;

        chipValueInputs.appendChild(label);
        chipValueInputs.appendChild(input);
        chipValueInputs.appendChild(document.createElement('br'));
    }
}

function proceedToStep3() {
    const chipColors = parseInt(document.getElementById('chipColors').value);
    const chipCountInputs = document.getElementById('chipCountInputs');
    chipCountInputs.innerHTML = '';
	
	for (let i = 1; i <= chipColors; i++) {
        const chipValue = parseInt(document.getElementById(`chipValue${i}`).value);

        if (isNaN(chipValue)) {
            alert(`Please enter values for Chip Color ${i}`);
            return;
        }
    }
	
	// Hide step 2 and show step 3
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step3').style.display = 'block';
	
    // Create inputs for the number of each chip type per person
    for (let i = 1; i <= chipColors; i++) {
        const label = document.createElement('label');
        label.innerHTML = `Number of Chip Color ${i} per person: `;

        const input = document.createElement('input');
        input.type = 'number';
        input.min = '1';
        input.id = `chipCount${i}`;

        chipCountInputs.appendChild(label);
        chipCountInputs.appendChild(input);
        chipCountInputs.appendChild(document.createElement('br'));
    }
	
	
}
	
function proceedToStep4() {
    const numPlayers = parseInt(document.getElementById('numPlayers').value);
	const chipColors = parseInt(document.getElementById('chipColors').value);
    const playerFinalValueInputs = document.getElementById('playerFinalValueInputs');
    playerFinalValueInputs.innerHTML = '';
	
	for (let i = 1; i <= chipColors; i++) {
        const chipCount = parseInt(document.getElementById(`chipCount${i}`).value);

        if (isNaN(chipCount)) {
            alert(`Please enter values for Chip Color ${i}`);
            return;
        }
    }
	
	// Hide step 3 and show step 4
	document.getElementById('step3').style.display = 'none';
    document.getElementById('step4').style.display = 'block';
	
	for (let i = 1; i <= numPlayers; i++) {
        const nameLabel = document.createElement('label');
        nameLabel.innerHTML = `Name for Player ${i}: `;
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.id = `playerName${i}`;

        const valueLabel = document.createElement('label');
        valueLabel.innerHTML = ` Final Chip Value: `;

        const valueInput = document.createElement('input');
        valueInput.type = 'number';
        valueInput.min = '0';
        valueInput.id = `playerFinalValue${i}`;

        playerFinalValueInputs.appendChild(nameLabel);
        playerFinalValueInputs.appendChild(nameInput);
        playerFinalValueInputs.appendChild(valueLabel);
        playerFinalValueInputs.appendChild(valueInput);
        playerFinalValueInputs.appendChild(document.createElement('br'));
    }
}

function calculateTotal() {
    const chipColors = parseInt(document.getElementById('chipColors').value);
    const numPlayers = parseInt(document.getElementById('numPlayers').value);
    const initialBuyIn = parseInt(document.getElementById('initialBuyIn').value);
	const reBuyIn = parseInt(document.getElementById('reBuyIn').value);

    let totalValue = 0;
	let totalpPerson = 0;
	let truePot = initialBuyIn * numPlayers;

    // Calculate the total value of all chips
    for (let i = 1; i <= chipColors; i++) {
        const chipValue = parseInt(document.getElementById(`chipValue${i}`).value);
        const chipCount = parseInt(document.getElementById(`chipCount${i}`).value);

        if (isNaN(chipValue) || isNaN(chipCount)) {
            alert(`Please enter values for Chip Color ${i} in Steps 2 and 3`);
            return;
        }
        totalpPerson += chipValue * chipCount;
    }

    // Calculate the total value of chips across all players
    totalValue = totalpPerson * (numPlayers + reBuyIn);
	
	let playerFinalValues = [];
    let totalPlayerChips = 0;
    let playerNames = [];
	
	for (let i = 1; i <= numPlayers; i++) {
        const playerName = document.getElementById(`playerName${i}`).value || `Player ${i}`;
        playerNames.push(playerName);

        const finalValue = parseInt(document.getElementById(`playerFinalValue${i}`).value);
        if (isNaN(finalValue)) {
            alert(`Please enter a final chip value for ${playerName}`);
            return;
        }
        playerFinalValues.push(finalValue);
        totalPlayerChips += finalValue;
    }
	
	if(totalPlayerChips != totalValue){
			alert('Someone has reported the wrong number of chips, there is a difference of '+ (totalPlayerChips-totalValue) + '. Please recount!');
			return;
		}else{
			document.getElementById('step4').style.display = 'none';
			const playerPayouts = document.getElementById('playerPayouts');
			playerPayouts.innerHTML = '';
			for (let i = 0; i < numPlayers; i++) {
				const payout = (playerFinalValues[i] / totalValue)*truePot;
				playerPayouts.innerHTML += `${playerNames[i]} Payout: $${payout.toFixed(2)}<br>`;
			}
		}
	
}