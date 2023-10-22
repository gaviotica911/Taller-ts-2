import {Serie} from './Serie.js'
import {series} from './data.js'

let seriesTable: HTMLElement = document.getElementById("series")!;
let promedioElemento : HTMLElement = document.getElementById("promedio")!;
const card = document.getElementById("cardS")!;

mostrarSeries(series);
mostrarPromedio(series);

function mostrarSeries(series:Serie[]) :void{
    let seriesTbody :HTMLElement =document.createElement("tbody");
    for (let serie of series)
    {
        let trElement:HTMLElement=document.createElement("tr");
        trElement.innerHTML=`<td>${serie.id}</td>
        <td><a class="titulo-pelicula" data-more="${serie.url}" data-imagen="${serie.img}" data-descripcion="${serie.descripcion}">${serie.titulo}</a></td>
        <td>${serie.plataforma}</td>
       <td>${serie.temporadas}</td>`;
        seriesTbody.appendChild(trElement);
    }

    seriesTable.appendChild(seriesTbody);

    const tituloPeliculas = document.querySelectorAll(".titulo-pelicula");
  
    tituloPeliculas.forEach((titulo) => {
        titulo.addEventListener("click", () => {
            const imagen = titulo.getAttribute("data-imagen")!;
            console.log(imagen);
            const descripcion = titulo.getAttribute("data-descripcion")!;
            const url=titulo.getAttribute("data-more")!;

            const cardImg = card.querySelector(".card-img-top") as HTMLImageElement ;
            const cardTitle = card.querySelector(".card-title") as HTMLHeadingElement;
            const cardText = card.querySelector(".card-text") as HTMLParagraphElement;
            const cardMore = card.querySelector(".more") as HTMLAnchorElement;

            cardImg.src = imagen;
            console.log(cardImg.src);
            cardTitle.textContent = titulo.textContent!;
            cardText.textContent = descripcion;
            cardMore.href = url;

            card.style.display = "block";
        });

    });





}






function promedio(series:Serie[]):number{
        let temporadas:number = 0;
        for(let index = 0; index < series.length; index++){
            let curso = series[index];
            temporadas+=curso.temporadas; 
        }
        temporadas=temporadas/series.length;
        return temporadas;
}   

function mostrarPromedio(series:Serie[]):void{
    let prom:number=promedio(series);
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td><b>Promedio por temporada: </b></td><td>${prom}</td>`;
    promedioElemento.appendChild(trElement);
}

seriesTable.addEventListener("click", (event) => {
    const target = event.target as HTMLTableCellElement;
    if (target.classList.contains("titulo-pelicula")) {
        const imagen = target.getAttribute("data-imagen");
        const descripcion = target.getAttribute("data-descripcion");

        const cardImg = card?.querySelector(".card-img-top") as HTMLImageElement;
        const cardTitle = card?.querySelector(".card-title") as HTMLHeadingElement;
        const cardText = card?.querySelector(".card-text") as HTMLParagraphElement;

        if (cardImg && cardTitle && cardText && card) {
            cardImg.src = imagen || "";
            cardTitle.textContent = target.textContent || "";
            cardText.textContent = descripcion || "";

            card.style.display = "block";
        }
    }
});

