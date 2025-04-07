let izmers = 25; 
let rindas = 20; 
let kolonas = 20; 
let laukums; 
let konteksts; 


let cuskaX = izmers * 1;
let cuskaY = izmers * 1;

let atrumsX = 0;
let atrumsY = 0;

let cuskasKermenis = []; 

let ediensX;
let ediensY;

let speleBeidzas = false;
let pauze = false;


let rez = 0;
let toprez = localStorage.getItem("toprez") || 0;


let spelasIntervals;

window.onload = function () {
    laukums = document.getElementById("laukums");
    laukums.height = rindas * izmers;
    laukums.width = kolonas * izmers;
    konteksts = laukums.getContext("2d");

    document.getElementById("toprez").textContent = toprez;

    novietotEdienu();
    document.addEventListener("keyup", mainitVirzienu);
    document.getElementById("pauseButton").addEventListener("click", parsliegtPauzi);
    document.getElementById("restartButton").addEventListener("click", restartetSpeli);
    spelasIntervals = setInterval(atjaunot, 1300 / 10);
};

function atjaunot() {
    if (speleBeidzas || pauze) return;

    konteksts.fillStyle = "black";
    konteksts.fillRect(0, 0, laukums.width, laukums.height);

    konteksts.fillStyle = "red";
    konteksts.fillRect(ediensX, ediensY, izmers, izmers);

    if (cuskaX === ediensX && cuskaY === ediensY) {
        cuskasKermenis.push([ediensX, ediensY]);
        novietotEdienu();
        rez++;
        document.getElementById("rez").textContent = rez;

        if (rez > toprez) {
            toprez = rez;
            document.getElementById("toprez").textContent = toprez;
            localStorage.setItem("toprez", toprez);
        }
    }

    for (let i = cuskasKermenis.length - 1; i > 0; i--) {
        cuskasKermenis[i] = cuskasKermenis[i - 1];
    }
    if (cuskasKermenis.length) {
        cuskasKermenis[0] = [cuskaX, cuskaY];
    }

    cuskaX += atrumsX * izmers;
    cuskaY += atrumsY * izmers;

    konteksts.fillStyle = cuskaKrasa;
    konteksts.fillRect(cuskaX, cuskaY, izmers, izmers);
    for (let i = 0; i < cuskasKermenis.length; i++) {
        konteksts.fillRect(cuskasKermenis[i][0], cuskasKermenis[i][1], izmers, izmers);
    }


    if (cuskaX < 0 || cuskaX >= kolonas * izmers || cuskaY < 0 || cuskaY >= rindas * izmers) {
        speleBeidzas = true;
        alert("Spēle beigusies");
    }

    for (let i = 0; i < cuskasKermenis.length; i++) {
        if (cuskaX === cuskasKermenis[i][0] && cuskaY === cuskasKermenis[i][1]) {
            speleBeidzas = true;
            alert("Spēle beigusies");
        }
    }
}

function mainitVirzienu(e) {
    if (pauze || speleBeidzas) return;

    if (e.code === "ArrowUp" && atrumsY !== 1) {
        atrumsX = 0;
        atrumsY = -1;
    } else if (e.code === "ArrowDown" && atrumsY !== -1) {
        atrumsX = 0;
        atrumsY = 1;
    } else if (e.code === "ArrowLeft" && atrumsX !== 1) {
        atrumsX = -1;
        atrumsY = 0;
    } else if (e.code === "ArrowRight" && atrumsX !== -1) {
        atrumsX = 1;
        atrumsY = 0;
    }
}

function novietotEdienu() {
    ediensX = Math.floor(Math.random() * kolonas) * izmers;
    ediensY = Math.floor(Math.random() * rindas) * izmers;
}

function parsliegtPauzi() {
    pauze = !pauze;
    const poga = document.getElementById("pauseButton");
    poga.textContent = pauze ? "Atsākt" : "Pauze";
}

function restartetSpeli() {
    speleBeidzas = false;
    pauze = false;
    rez = 0;
    cuskaX = izmers * 5;
    cuskaY = izmers * 5;
    atrumsX = 0;
    atrumsY = 0;
    cuskasKermenis = [];
    novietotEdienu();
    document.getElementById("rez").textContent = rez;
}



