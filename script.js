let deckId;
let remaining;

document.getElementById("new-deck").addEventListener("click", () => {
  if (!deckId) {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
      .then((response) => response.json())
      .then((data) => {
        deckId = data.deck_id;
        remaining = data.remaining;
        console.log(deckId);
        document.querySelector(".cards").innerText = remaining;
      });
  }
});

document.getElementById("draw-cards").addEventListener("click", () => {
  if (deckId && remaining != 0) {
    fetch(
      `https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        remaining = remaining - 2;
        document.querySelector(".cards").innerText = remaining;
        showCard(data);
        winnerCard(data);
        finalWinner();
      });
  }
});

function showCard(data) {
  const placeHolder = document.querySelectorAll(".card");
  placeHolder[0].innerText = "";
  placeHolder[1].innerText = "";
  for (let i = 0; i < placeHolder.length; i++) {
    const image = document.createElement("img");
    const result = document.createElement("div");
    result.setAttribute("class", "placeholder");
    image.setAttribute("src", data.cards[i].image);
    placeHolder[i].append(image);
    console.log(data.cards[i].image);
  }
}

function winnerCard(data) {
  for (let i = 0; i < 2; i++) {
    switch (data.cards[i].value) {
      case "JACK":
        data.cards[i].value = "11";
        break;
      case "QUEEN":
        data.cards[i].value = "12";
        break;
      case "KING":
        data.cards[i].value = "13";
        break;
      case "ACE":
        data.cards[i].value = "14";

        break;

      default:
        break;
    }
  }
  console.log(parseInt(data.cards[0].value));
  console.log(parseInt(data.cards[1].value));
  if (parseInt(data.cards[0].value) > parseInt(data.cards[1].value)) {
    document.querySelector("h1").innerText = " computer win";
    document.querySelector("#computer").innerText =
      parseInt(document.querySelector("#computer").innerText) + 1;
  } else if (parseInt(data.cards[0].value) < parseInt(data.cards[1].value)) {
    document.querySelector("h1").innerText = " you win";
    document.querySelector("#me").innerText =
      parseInt(document.querySelector("#me").innerText) + 1;
  } else {
    document.querySelector("h1").innerText = "Draw";
  }
}

function finalWinner() {
  console.log(remaining);
  if (remaining === 0) {
    if (
      parseInt(document.querySelector("#me").innerText) >
      parseInt(document.querySelector("#computer").innerText)
    ) {
      document.querySelector("h1").innerText = "Final winner is you";
    } else {
      document.querySelector("h1").innerText = "Final winner is computer";
    }
  }
}
