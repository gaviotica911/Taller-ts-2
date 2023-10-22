import { series } from './data.js';
var seriesTable = document.getElementById("series");
var promedioElemento = document.getElementById("promedio");
var card = document.getElementById("cardS");
mostrarSeries(series);
mostrarPromedio(series);
function mostrarSeries(series) {
    var seriesTbody = document.createElement("tbody");
    for (var _i = 0, series_1 = series; _i < series_1.length; _i++) {
        var serie = series_1[_i];
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>".concat(serie.id, "</td>\n        <td><a class=\"titulo-pelicula\" data-more=\"").concat(serie.url, "\" data-imagen=\"").concat(serie.img, "\" data-descripcion=\"").concat(serie.descripcion, "\">").concat(serie.titulo, "</a></td>\n        <td>").concat(serie.plataforma, "</td>\n       <td>").concat(serie.temporadas, "</td>");
        seriesTbody.appendChild(trElement);
    }
    seriesTable.appendChild(seriesTbody);
    var tituloPeliculas = document.querySelectorAll(".titulo-pelicula");
    tituloPeliculas.forEach(function (titulo) {
        titulo.addEventListener("click", function () {
            var imagen = titulo.getAttribute("data-imagen");
            console.log(imagen);
            var descripcion = titulo.getAttribute("data-descripcion");
            var url = titulo.getAttribute("data-more");
            var cardImg = card.querySelector(".card-img-top");
            var cardTitle = card.querySelector(".card-title");
            var cardText = card.querySelector(".card-text");
            var cardMore = card.querySelector(".more");
            cardImg.src = imagen;
            console.log(cardImg.src);
            cardTitle.textContent = titulo.textContent;
            cardText.textContent = descripcion;
            cardMore.href = url;
            card.style.display = "block";
        });
    });
}
function promedio(series) {
    var temporadas = 0;
    for (var index = 0; index < series.length; index++) {
        var curso = series[index];
        temporadas += curso.temporadas;
    }
    temporadas = temporadas / series.length;
    return temporadas;
}
function mostrarPromedio(series) {
    var prom = promedio(series);
    var trElement = document.createElement("tr");
    trElement.innerHTML = "<td><b>Promedio por temporada: </b></td><td>".concat(prom, "</td>");
    promedioElemento.appendChild(trElement);
}
seriesTable.addEventListener("click", function (event) {
    var target = event.target;
    if (target.classList.contains("titulo-pelicula")) {
        var imagen = target.getAttribute("data-imagen");
        var descripcion = target.getAttribute("data-descripcion");
        var cardImg = card === null || card === void 0 ? void 0 : card.querySelector(".card-img-top");
        var cardTitle = card === null || card === void 0 ? void 0 : card.querySelector(".card-title");
        var cardText = card === null || card === void 0 ? void 0 : card.querySelector(".card-text");
        if (cardImg && cardTitle && cardText && card) {
            cardImg.src = imagen || "";
            cardTitle.textContent = target.textContent || "";
            cardText.textContent = descripcion || "";
            card.style.display = "block";
        }
    }
});
