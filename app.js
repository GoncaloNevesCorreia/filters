import { Observable, objBuilder } from './Includes/builders.js';

const images = document.querySelectorAll("#fotos > img");
const checkboxs = document.querySelectorAll("#filtros .div_filtros input[type=checkbox]")
const sliders = document.querySelectorAll(".slider");
const selectedImage = document.querySelector("#big");

let filters = {};
filters = new objBuilder(filters, "blur", "blur", false, "px", 0, 20, 0, 0);
filters = new objBuilder(filters, "brightness", "brightness", false, "%", 0, 200, 100, 100);
filters = new objBuilder(filters, "contrast", "contrast", false, "%", 0, 200, 100, 100);
filters = new objBuilder(filters, "grayscale", "grayscale", false, "%", 0, 100, 0, 0);
filters = new objBuilder(filters, "hue_rotate", "hue-rotate", false, "deg", 0, 360, 0, 0);
filters = new objBuilder(filters, "invert", "invert", false, "%", 0, 100, 0, 0);
filters = new objBuilder(filters, "opacity", "opacity", false, "%", 0, 100, 100, 100);
filters = new objBuilder(filters, "saturate", "saturate", false, "%", 0, 200, 100, 100);
filters = new objBuilder(filters, "sepia", "sepia", false, "%", 0, 100, 0, 0);

console.log(filters);

const ObserveImages = new Observable();
ObserveImages.subscribe(addClassToSelectedImage);
ObserveImages.subscribe(replaceDisplayImage);

const ObserveCheckBox = new Observable();
ObserveCheckBox.subscribe(sliderVisibility);
ObserveCheckBox.subscribe(updateFilterValues);
ObserveCheckBox.subscribe(applyFilters);

const ObserveSlider = new Observable();
ObserveSlider.subscribe(updateFilterValues);
ObserveSlider.subscribe(applyFilters);
ObserveSlider.subscribe(updateSliderData);



// Comportamento para as imagens
images.forEach((image, index) => {
	image.addEventListener("click", event => {
		const img = event.target;
		ObserveImages.notify(img);
	})

	if (index === 0) image.click();
});


// Comportamento para as Checkbox's
checkboxs.forEach(element => {
	element.addEventListener("click", event => {
		const checkbox = event.target;
		const slider = document.querySelector(`#slider_${checkbox.id}`);

		ObserveCheckBox.notify([slider, checkbox]);
	})
});



// Comportamento para os slides
sliders.forEach(element => {
	element.addEventListener("input", event => {
		const slider = event.target;
		const filterName = slider.id.substring(slider.id.indexOf('_') + 1);
		const checkbox = document.querySelector(`#${filterName}`);

		ObserveSlider.notify([slider, checkbox]);
	})

	updateSliderData(element);
});


// Adiciona os filtros selecionados na imagem, apartir dos valores do objeto "filtros"
function applyFilters() {
	let values = "";

	for (const key in filters) {
		const filter = filters[key];

		if (filter.selected) {
			values += ` ${filter.name}(${filter.value}${filter.type})`;
		} else {
			values += ` ${filter.name}(${filter.default}${filter.type})`;
		}
	}

	selectedImage.style.filter = values;
}


// Esconde/Mostra o slider consoante o estado da checkbox correspondente
function sliderVisibility(arr) {
	const slider = arr[0];
	slider.parentElement.classList.toggle("hide");
}

// Sincronisa os dados do slider com os dados do objeto "filtros"
function updateSliderData(arr) {
	const slider = (arr.length == 2) ? arr[0] : arr;
	const filterName = slider.id.substring(slider.id.indexOf('_') + 1);
	const labelValue = document.querySelector(`#value_${filterName}`);

	slider.min = filters[filterName].min;
	slider.max = filters[filterName].max;
	slider.value = filters[filterName].value;
	labelValue.textContent = filters[filterName].value + filters[filterName].type;
}

// Sincronisa os dados do objeto "filtros" com os dados do Slider
function updateFilterValues(arr) {
	const slider = arr[0];
	const checkbox = arr[1];

	if (slider.value > filters[checkbox.id].max) slider.value = filters[checkbox.id].max;
	if (slider.value < filters[checkbox.id].min) slider.value = filters[checkbox.id].min;

	filters[checkbox.id].selected = checkbox.checked;
	filters[checkbox.id].value = slider.value;
}

// Remove todas as classes "seleccionada" e adiciona na image que recebeu o click
function addClassToSelectedImage(img) {
	const imagesWithSelectedClass = document.querySelectorAll(".seleccionada");
	for (const currentImage of imagesWithSelectedClass) {
		currentImage.classList.remove("seleccionada");
	}

	img.classList.add("seleccionada");
}

// Altera o valor do atributo "src" da imagem em display pela imagem que recebeu o click
function replaceDisplayImage(img) {
	selectedImage.src = img.src.replace("_s.jpg", "_c.jpg");
	selectedImage.alt = img.alt;
}