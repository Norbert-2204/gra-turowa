import { Heroes } from "./data/hero-skills.js";

// const selectedButtons = new Set();
// const warrior = new Heroes();

// export function toggleButton(button) {
//   if (selectedButtons.has(button)) {
//     selectedButtons.delete(button);
//     button.style.backgroundColor = ""; // Reset kolor przycisku
//   } else {
//     selectedButtons.add(button);
//     button.style.backgroundColor = "lightblue"; // Kolor zaznaczonego przycisku
//   }

//   if (selectedButtons.size >= 4) {
//     const buttons = document.querySelectorAll(".btn");
//     buttons.forEach((btn) => {
//       btn.classList.add("hidden"); // Ukryj wszystkie przyciski
//     });
//   }
// }

// let testKlas;
// testKlas = document.querySelector(".test-class").innerHTML =
//   warrior.warrior.skillsList;
// console.log(testKlas);

// const mainButton = document.getElementById("mainButton");
// const buttonList = document.getElementById("buttonList");

// mainButton.addEventListener("click", () => {
//   // Przełącz widoczność listy przycisków
//   buttonList.style.display =
//     buttonList.style.display === "none" ? "block" : "none";
// });

// // Dodaj listener do wszystkich nowych przycisków
// const newButtons = document.querySelectorAll(".newButton");
// newButtons.forEach((button) => {
//   button.addEventListener("click", () => {
//     // Ukryj listę nowych przycisków po kliknięciu jednego z nich
//     buttonList.style.display = "none";
//   });
// });

// funkcja blokowania przycisków przykład
// const firstButton = document.getElementById("firstButton");
// const secondButton = document.getElementById("secondButton");

// let clickCount = 0;

// firstButton.addEventListener("click", function () {
//   // Blokujemy pierwszy przycisk
//   firstButton.disabled = true;
// });

// secondButton.addEventListener("click", function () {
//   // Zwiększamy licznik kliknięć
//   clickCount++;

//   // Po drugim kliknięciu odblokowujemy pierwszy przycisk
//   if (clickCount === 2) {
//     firstButton.disabled = false;
//     clickCount = 0; // Resetujemy licznik
//   }
// });

// Funkcja uruchamiająca wybór akcji
// document.getElementById("startButton").onclick = function () {
//   document.getElementById("actionButtons").style.display = "block";
// };

// // Funkcja zadająca obrażenia potworowi
// function attack(type) {
//   const monster = document.getElementById("monster");
//   let damage = 0;

//   // Określenie obrażeń na podstawie wybranego ataku
//   switch (type) {
//     case "fire":
//       damage = 30;
//       break;
//     case "ice":
//       damage = 20;
//       break;
//     case "lightning":
//       damage = 25;
//       break;
//     default:
//       console.log("Nieznany atak");
//   }

//   // Obliczanie aktualnych punktów życia potwora
//   let currentHp = parseInt(monster.getAttribute("data-hp"));
//   currentHp -= damage;

//   // Aktualizacja wartości HP
//   monster.setAttribute("data-hp", currentHp);
//   document.getElementById("hp").innerText = currentHp;

//   // Sprawdzenie, czy potwór został pokonany
//   if (currentHp <= 0) {
//     alert("Potwór został pokonany!");
//     // Możesz dodać logikę do zakończenia gry lub zmiany stanu.
//   }
// }

function test(random, random2) {
  random = console.log("dupa");
  random2 = console.log("chuj");
}
test(dupa, chuj);
