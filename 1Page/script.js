let textAnzeige = document.getElementById("text").innerHTML;
let isTyping = false; //für Animation des Textes
let menuOpen = false; //für das Menü
let changingSlotName = false; //für das umbenennen des Speicherstandes
let willSlotUmbenennen = false; //für das umbenennen des Speicherstandes
let textArray = [
  "Hi bbg das ist ein test",
  "das ist der zweite test",
  "img",
  "das ist der dritte test",
  "das ist der vierte testttttttttttt tttttttttttttttt tttttttttttttttttttttttt ttttttttttttttttttttttttttttttttttttttttttt",
  "opt",
];
let text1A = [
  "Oh... ich dachte nicht das du so nett zu mir seien würdest",
  "Du schaust immer so schlecht drauf aus, was nichts dran ändert das du auch gut Ausschaust",
  "Sehr gut sogar",
  "Ich bin froh das ich dich getroffen habe",
  "Ich hoffe wir können uns noch öfter sehen",
];
let text1B = [
  "Was meine Mutter?",
  "Soll ich dich küssen??!, Soll ich dich küssen??!",
  "Ja pass lieber auf wo du hintrittst",
  "Sonst schieb ich noch meinen Lörres in dein Gesicht",
];
let textStelle = 0;
let bildStelle = 0;
let optionenStelle = 0;


function Spielzug() {
  if (textArray[textStelle] === "img") {
    nextBild();
  } else if (textArray[textStelle] === "opt") {
    optionenErstellen();
  } else {
    nextText();
    textStelle++;
  }

  if (textStelle >= textArray.length) {
    console.log("ende von text");
  }

  
if (!localStorage.getItem("SpeicherstandArray")) { //Wenn es noch keine Speicherstände gibt, wird es erstellt
    localStorage.setItem("SpeicherstandArray", JSON.stringify([]));
}
if (!localStorage.getItem("SpeicherstandAnzeige")) {            //Wenn es noch keine Speicherstandanzeige für das Menü gibt, wird es erstellt
    localStorage.setItem("SpeicherstandAnzeige", `<h3>Deine Speicherstände</h3>
          <div class="speicherstaende">
            <div onclick="slotButtonClicked(event)" id="slot1" class="slot">
                <div class="slot-number">Leerer Slot</div>
                <div class="slot-date">Datum: 2024-06-22</div>
              </div>
              <div onclick="slotButtonClicked(event)" id="slot2" class="slot">
                <div class="slot-number">Leerer Slot</div>
                <div class="slot-date">Datum: 2024-06-21</div>
              </div>
              <div onclick="slotButtonClicked(event)" id="slot3" class="slot">
                <div class="slot-number">Leerer Slot</div>
                <div class="slot-date">Datum: 2024-06-23</div>
              </div>
              <div onclick="slotButtonClicked(event)" id="slot4" class="slot">
                <div class="slot-number">Leerer Slot</div>
                <div class="slot-date">Datum: 2024-06-24</div>
              </div>
              <div onclick="slotButtonClicked(event)" id="slot5" class="slot">
                <div class="slot-number">Leerer Slot</div>
                <div class="slot-date">Datum: 2024-06-25</div>
              </div>
              <div onclick="slotButtonClicked(event)" id="slot6" class="slot">
                <div class="slot-number">Leerer Slot</div>
                <div class="slot-date">Datum: 2024-06-26</div>
              </div>
              <div onclick="slotButtonClicked(event)" id="slot7" class="slot">
                <div class="slot-number">Leerer Slot</div>
                <div class="slot-date">Datum: 2024-06-27</div>
              </div>
              <div onclick="slotButtonClicked(event)" id="slot8" class="slot">
                <div class="slot-number">Leerer Slot</div>
                <div class="slot-date">Datum: 2024-06-26</div>
              </div>
              <div onclick="slotButtonClicked(event)" id="slot9" class="slot">
                <div class="slot-number">Leerer Slot</div>
                <div class="slot-date">Datum: 2024-06-27</div>
              </div>
            

          </div>`);
}
}

function nextBild() {
  document.body.style.backgroundImage =
    "url('picture1/img" + bildStelle + ".jpg')";
  bildStelle++;
  textStelle++;
  console.log(bildStelle + "Bild changing success");
  Spielzug();
}

function optionenErstellen() {
  //Hidet den textcontainer und zeigt die Optionen an, je nachdem welche OptionenStelle gerade ist
  console.log("Optionen fuktion gestartet");
  let textContainer = document.getElementById("text-container");
  textContainer.style.display = "none";

  if (optionenStelle === 0) {
    //Optionen für die Erste Option
    let optionenContainer = document.getElementById("optionen-container");
    optionenContainer.innerHTML = `
       <button id="optionA" onclick='optionenHantieren("A")' > ihn</button>
        <button id="optionB" onclick='optionenHantieren("B")' >Spuck im</button>
       `;
  }
}

function optionenHantieren(option) {
  //Pusht den Optionen Array in den TextArray entsprechend der Option die bei dem buttononclick übergeben wird. Dann cleared sie den optionen-container und zeigt den Textcontainer wieder an, dann kriegen optionen, textstelle ++ und Spielzug wird aufgerufen
  if (option == "A") {
    textArray = textArray.concat(text1A);
    console.log("in den Array erfolgreich eingefügt" + textArray);
  } else if (option == "B") {
    textArray = textArray.concat(text1B);
    console.log("in den Array erfolgreich eingefügt" + textArray);
  }

  document.getElementById("optionen-container").innerHTML = "";
  let textContainer = document.getElementById("text-container");
  textContainer.style.display = "block";

  textStelle++;
  optionenStelle++;
  Spielzug();
}

function nextText() {
  //macht isTyping true und fängt an den Text zu schreiben
  document.getElementById("text").innerHTML = "";
  let text = textArray[textStelle];
  let i = 0;
  isTyping = true;

  function smoothTextAnzeige() {
    //Funktion für die Animation des Textes, checkes ob Istyping true ist und sobald es fertig ist macht es isTyping false
    if (i < text.length && isTyping) {
      document.getElementById("text").innerHTML += text.charAt(i);
      setTimeout(smoothTextAnzeige, 70);
      i++;
    } else {
      isTyping = false;
    }
  }
  smoothTextAnzeige();
}

function openMenu() {
  //Öffnet das Menü
  menuOpen = true;
  let menudiv = document.getElementById("menu-div");
  let text = document.getElementById("text-container");
  let insidemenu = document.getElementById("inside-menu");
  menudiv.style.opacity = "90%";
  text.style.opacity = "30%";
  menudiv.style.zIndex = 3;
  insidemenu.style.display = "block";
  insidemenu.style.zIndex = 4;

    getSpeicherstandAnzeige();
}

function getSpeicherstandAnzeige() {    //Holt die Speicherstände aus dem Localstorage und zeigt sie an
    let currentAnzeige = document.getElementById("speicherstaende-container-id");
    currentAnzeige.innerHTML = localStorage.getItem("SpeicherstandAnzeige");
}

function setSpeicherstandAnzeige() { //Settet die Speicherstände in den Localstorage
    let currentAnzeige = document.getElementById("speicherstaende-container-id");
    localStorage.setItem("SpeicherstandAnzeige", currentAnzeige.innerHTML);

}


function closeMenu() {
  //closed das menü
  menuOpen = false;
  let menudiv = document.getElementById("menu-div");
  let text = document.getElementById("text-container");
  let insidemenu = document.getElementById("inside-menu");
  menudiv.style.opacity = "0%";
  text.style.opacity = "100%";
  menudiv.style.zIndex = -6;
  insidemenu.style.display = "none";
  insidemenu.style.zIndex = -5;
}

function slotButtonClicked(event) {
  if (!changingSlotName) {
    let element = event.target;
    while (element && !element.classList.contains("slot")) {
      element = element.parentElement;
    }
    // If we found an element with a class of 'slot', log its id
    if (element) {
      console.log("slot button: " + element.id + " clicked");
        if (willSlotUmbenennen) {
      changingSlotName = true;
      speicherstandUmbenennen(element);
    } else {
        changingSlotName = true;
        speicherstandUmbenennen(element);
        speicherstandSpeichern(element);
  }}}
}
  


function speicherstandSpeichern(element) {      //Ändert den SpeicherstandArray im localstorage, In porgress
    let speicherstandArray = JSON.parse(localStorage.getItem("SpeicherstandArray"));
    let speicherstand = {
        id: element.id,
        name: element.children[0].innerHTML,
        date: element.children[1].innerHTML,
        speicherTextStelle: textStelle,
        speicherBildStelle: bildStelle,
        speicherOptionenStelle: optionenStelle,
        speicherTextArray: textArray,
    }
    speicherstandArray.push(speicherstand);
    localStorage.setItem("SpeicherstandArray", JSON.stringify(speicherstandArray));
}

function speicherstandUmbenennen(element) {     //Nennt nur den Speicherstab um und ändert den SpeicherstandArray im localstorage nicht
  element.children[0].innerHTML = `<input id="slot-input-id" class="slot-input" type="text">`;

  if (changingSlotName) {
    let input = document.getElementById("slot-input-id");
    input.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        if (input.value === "") {
          input.value = "Slot Name";
        }
        element.children[1].innerHTML = getDate();
        element.children[0].innerHTML = input.value;
        changingSlotName = false;
        setSpeicherstandAnzeige();
      }
    });
  }
}

function getDate() {
    var date = new Date();
    return "Datum: " + date.getDate()+"-"+(date.getMonth() + 1)+"-"+date.getFullYear();
}

onkeydown = function (event) {//öffnet und schließt das Menü mit Escape
  if (event.code === "Escape") { //Für das Menü, Escape
    if (menuOpen) {
      console.log("Menu closed");
      closeMenu();
    } else if (!menuOpen) {
      console.log("Menu opened");
      openMenu();
    }
  }

  if (event.code === "Space") {             //Für den SPielzug, Leertase
    if (isTyping) {
        console.log("Text wird vollständig angezeigt");
      document.getElementById("text").innerHTML = textArray[textStelle - 1];
      isTyping = false;
    } else {
        console.log("Spielzug wird gestartet");
      Spielzug();
    }
  }
};

function changeDarkmode() {
  if (localStorage.getItem("dark-mode") === "true") {
    //Settet den Darkmode und Fontsize beim Start, auch ohne localStorage change
    console.log("darkmode");
    var element = document.body;
    element.classList.add("dark-mode");
    document.getElementById("text-container").classList.add("dark-mode");
  } else {
    console.log("hellmode");
    var element = document.body;
    element.classList.remove("dark-mode");
    document.getElementById("text-container").classList.remove("dark-mode");
  }
}
changeDarkmode(); //Darkmode Einstellen beim Start

function changeFontSize() {
  let fontSize = localStorage.getItem("fontSize");
  if (fontSize) {
    document.getElementById("text-container").style.fontSize = fontSize + "px";
    console.log("Fontsize changed");
  }
}
changeFontSize(); //Fontsize Einstellen beim Start

window.addEventListener("storage", (event) => {
  //wird direkt ausgeführt wenn sich der Localstorage ändert für Fontsize und Darkmode
  if (event.key == "fontSize") {
    //Fontsize Einstellen mit Localstorage
    changeFontSize();
  }
  if (event.key == "dark-mode") {
    //Für Darkmode Einstellungen
    changeDarkmode();
  }
})
