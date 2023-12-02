var speakerPopup = document.getElementById("speakerPopup");
var speakerImage = document.getElementById("speakerImage");
var speakerName = document.getElementById("speakerName");
var speakerDialogue = document.getElementById("speakerText");
var soundSource = document.getElementById("soundSource");
var dialogueRunning = false;

function playSound(soundfile) {
    if (soundSource.src !== `${window.location.protocol + "//" + window.location.host}/bussim-assets/sounds/${soundfile}.mp3`) {
        soundSource.src = `/bussim-assets/sounds/${soundfile}.mp3`
        soundSource.play();
    } else {
        soundSource.play();
    }
}

function startSpeaking(name, dialogues, sound) {
    playSound(sound);
    speakerPopup.style.bottom = "5px";
    speakerName.textContent = name;
    let index = 0;
    
    function showNextDialogue() {
        if (index < dialogues.length) {
            playSound(sound);
            dialogueDelay = dialogues[index][0]
            speakerImage.src = "/bussim-assets/images/dialogue" + dialogues[index][1];
            speakerDialogue.innerHTML = dialogues[index][2];
            index++;
            setTimeout(showNextDialogue, dialogueDelay);
        } else {
            setTimeout(() => {
                speakerPopup.style.bottom = "-130px";
                dialogueRunning = false;
            }, 2000);
        }
    }

    showNextDialogue();
}

function random(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function randomDialogueEvent(force) {
    if (force !== false) {
            if (Math.random() * 100 < 2.5 && dialogueRunning == false) {
                  dialogueRunning = true;
                  fetch("/bussim-assets/dialoguedata/dialogue.json")
                  .then(response => response.json())
                  .then(data => {
                      const speakData = random(data.data)
                      if (Math.random() * 100 < speakData.rarity) {
                            console.log(speakData)
                            startSpeaking(speakData.name, speakData.dialogue, speakData.sound);
                      }
                  })
            }
        }
    else if (dialogueRunning == false) {
        dialogueRunning = true;
        fetch("/bussim-assets/dialoguedata/dialogue.json")
        .then(response => response.json())
        .then(data => {
            const speakData = random(data.data)
            if (Math.random() * 100 < speakData.rarity) {
                  console.log(speakData)
                  startSpeaking(speakData.name, speakData.dialogue, speakData.sound);
            }
        })
    }
}

setInterval(randomDialogueEvent, 5000);