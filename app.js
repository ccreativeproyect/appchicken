
//Para el navbar el toogle del menu
let toggle = document.getElementById('toggle-menu'),
    nav = document.getElementById('nav');
toggle.addEventListener('click', () => {
    nav.classList.toggle('show');
})



//Constantes
const mainBtnIngrediente = document.getElementById('mainBtnIngrediente');
const mainBtnPlatoAleatorio = document.getElementById('mainBtnPlatoAleatorio');
const mainBtnObjetivos = document.getElementById('btnObj');
const mainBtnHerramientas = document.getElementById('btnHerram');
const mainBtnDev = document.getElementById('btnDev');
const contentList = document.createElement('div');
const container_medium = document.getElementById('container_medium')
const btnHome = document.getElementById('btnHome')
let arrRandomsName = [];
let arrRandomsImage = [];
let fecha = document.getElementById('datetime');


const getDate = () => {
    let fechaInst = new Date();
    let mes = new Array();

    mes[0] = "January";
    mes[1] = "February";
    mes[2] = "March";
    mes[3] = "April";
    mes[4] = "May";
    mes[5] = "June";
    mes[6] = "July";
    mes[7] = "August";
    mes[8] = "September";
    mes[9] = "October";
    mes[10] = "November";
    mes[11] = "December";

    let fechaImprimir = mes[fechaInst.getMonth()]

    fecha.innerHTML = `${fechaImprimir} - ${fechaInst.getFullYear()}`
}

//Boton para ir al Home del navbar-menu

getDate();

btnHome.addEventListener('click', e => {
    setTimeout(() => {
        location.reload();
    }, 600);
})

// Al pulsar click en Ingredientes se ejecuta la funcion loadIngredientes
mainBtnIngrediente.addEventListener('click', e => {
    loadIngredientes();
})

mainBtnPlatoAleatorio.addEventListener('click', e => {
    loadAleatorio()
})

mainBtnObjetivos.addEventListener('click', e => {
    drawDesarrollo('del objetivo')
})

mainBtnHerramientas.addEventListener('click', e => {
    drawDesarrollo('de las herramientas')
})

mainBtnDev.addEventListener('click', e => {
    drawDesarrollo('del desarrollador')
})



// Funcion que carga los ingredientes mediante la funcion loadAleatorio 
const loadAleatorio = async () => {

    // const url = `/data.json`;
    const url = `https://appkitchen.herokuapp.com/platos`;
    const response = await fetch(url)
    let arrNameAleatorio = [];
    let arrImageAleatorio = [];
    switch (response.status) {
        case 200:
            const infoData = await response.json();

            for (let i = 0; i < infoData.length; i++) {
                arrNameAleatorio.push(infoData[i].nombrePlato)
                arrImageAleatorio.push(infoData[i].img)
            }

            numRandom = Math.round(Math.random() * (arrNameAleatorio.length - 1))
            getPlatosAndImages_2(arrNameAleatorio, arrImageAleatorio, numRandom)

            break;
        default:
            console.log('Error desconocido:' + response.status);
            break;
    }

}

// Funcion que carga los ingredientes usando fetch y si el estado es 200 dibujara el frame 3 y 4 pasando como argumento el JSON
const loadIngredientes = async () => {

    // const url = `/dataIngredientes.json`;
    const url = `https://appkitchen.herokuapp.com/ingredientes`;
    const response = await fetch(url)
    switch (response.status) {
        case 200:
            const info = await response.json();
            const infoData = info[0]
            drawFrame3_4(infoData)
            // const url2 = `/data.json`;
            const url2 = `https://appkitchen.herokuapp.com/platos`;
            const response2 = await fetch(url2)
            const infoDatita = await response2.json();
            const btnAplicar = document.getElementById('btnAplicar');
            btnAplicar.addEventListener('click', async (e) => {
                e.preventDefault()
                //Como la funcion retorna el array lo guardo en una constante
                const data = await getArray(infoData.lista.length);
                //Validamos que se haya seleccionado algun ingrediente mediante un check
                if (data.length === 0) {
                    console.log('no hay datos')
                } else {
                    //Esta constante la paso como argumento para luego utilizarla, es decir aqui tendre el array de los checkbox seleccionados
                    showIngredientes(data, infoDatita);
                }
            })
            backtoVolver_3();
            break;
        default:
            console.log('Error desconocido:' + response.status);
            break;
    }

}

// Funcion que se encarga de crear la estructura para los ingredientes y su checkbox
const createLista = (data) => {

    data.lista.map(i => {
        const draw = `
        <div class="container-ingredientes">
            <img src=${i.imagen} class="img_ingrediente">
            <p class="parrafo__ingrediente">${i.ingrediente}</p>
            <input type="checkbox" class="checks" value="${i.ingrediente}">
        </div>
        `
        contentList.insertAdjacentHTML('beforeend', draw)

    })


}

//Funcion para volver al frame 3 y 4
const backtoVolver_3 = () => {

    const btnVolver_f3 = document.getElementById('btnVolver_f3');
    btnVolver_f3.addEventListener('click', e => {

        setTimeout(() => {
            location.reload();
        }, 1000);

    })

}

//Funcion que se encarga de dibujar el frame 3 y 4 pasando como argumento la data del JSON y contruyendo la estructura de todo el frame
const drawFrame3_4 = (data) => {
    container_medium.innerHTML = '';
    const drawHeader = `
            <div class="container-pretitle">
                <p class="pretitle">Marca los ingredientes para encontrar tu plato</p>
            </div>`

    createLista(data)

    const drawFooter = `
            <div class="container-buttons modification">
                <div class="first-button">
                    <a href="#" class="text__volver" id="btnVolver_f3">Volver</a>
                </div>
                <div class="second-button">
                    <a href="#" class="text__aplicar" id="btnAplicar">Aplicar</a>
                </div>
            </div>`

    container_medium.insertAdjacentHTML('beforeend', drawHeader)
    container_medium.insertAdjacentElement('beforeend', contentList)
    container_medium.insertAdjacentHTML('beforeend', drawFooter)

}

//Funcion que se encarga de dibujar el contruyendo y en desarrollo
const drawDesarrollo = (dataText) => {
    container_medium.innerHTML = '';
    const drawContent = `
            <div class="container">
                <div class="proceso">
                    <h2 class="textproceso">Pagina ${dataText} esta en construcción...</h2>
                    <img src="/img/construct.png" class="imgConstruccion" alt="construccion">
                </div>
            </div>
            `

    container_medium.insertAdjacentHTML('beforeend', drawContent)
}

// Funcion que se encarga de crear la estructura para los nombres de los platos y sus imagenes
const createPlatosAndImages = (dataName, dataImage, i) => {

    const draw = `
        <div class="container-title">
            <p class="title">${dataName[i]}</p>
        </div>
        <div class="container-platos">
            <img src=${dataImage[i]} class="img_plato">
        </div>`

    contentList.insertAdjacentHTML('beforeend', draw)

}

//Funcion para volver al frame 5 y 6
const backtoVolver_5 = () => {

    const btnVolver_f5 = document.getElementById('btnVolver_f5');
    btnVolver_f5.addEventListener('click', e => {

        setTimeout(() => {
            location.reload();
        }, 1000);

    })

}

//Funcion para volver al frame 7 y 8
const backtoVolver_7 = () => {

    const btnVolver_f7 = document.getElementById('btnVolver_f7');
    btnVolver_f7.addEventListener('click', e => {

        setTimeout(() => {
            location.reload();
        }, 1000);

    })

}

//Funcion que se encarga de dibujar el frame 5 y 6 pasando como argumento la data del JSON y contruyendo la estructura de todo el frame
const drawFrame5_6 = (name, imagen, i, termino) => {
    container_medium.innerHTML = '';
    contentList.innerHTML = '';
    const drawHeader = `
        <div class="container-pretitle">
            <p class="pretitle">Este es el plato que puedes preparar hoy:</p>
        </div>`

    createPlatosAndImages(name, imagen, i)

    const drawFooter = `
        <div class="container-posttitle">
            <p class="posttitle">¿Ya preparaste este plato?</p>
        </div>
        <div class="container-description">
            <p class="description">Presiona en <span class="description__span">"Siguiente"</span> para buscar otro
                plato con los mismos ingredientes</p>
        </div>
        <div class="container-buttons modification">
            <div class="first-button">
                <a href="#" class="text__volver" id="btnVolver_f5">Ir a Inicio</a>
            </div>
            <div class="second-button">
                <a href="#" class="text__aplicar" id="btnSiguiente">${termino}</a>
            </div>
        </div>`



    container_medium.insertAdjacentHTML('beforeend', drawHeader)
    container_medium.insertAdjacentElement('beforeend', contentList)
    container_medium.insertAdjacentHTML('beforeend', drawFooter)

}


//Funcion que se encarga de dibujar el frame 7 y 8 pasando como argumento la data del JSON y contruyendo la estructura de todo el frame
const drawFrame7_8 = (name, imagen, i, termino) => {
    container_medium.innerHTML = '';
    contentList.innerHTML = '';
    const drawHeader = `
        <div class="container-pretitle">
            <p class="pretitle">El plato aleatorio de hoy es el siguiente:</p>
        </div>`

    createPlatosAndImages(name, imagen, i)

    const drawFooter = `
        <div class="container-posttitle">
            <p class="posttitle">¿Ya preparaste este plato?</p>
        </div>
        <div class="container-description">
            <p class="description">Presiona en <span class="description__span">"Siguiente"</span> para buscar otro
                plato aleatorio</p>
        </div>
        <div class="container-buttons modification">
            <div class="first-button">
                <a href="#" class="text__volver" id="btnVolver_f7">Ir a Inicio</a>
            </div>
            <div class="second-button">
                <a href="#" class="text__aplicar" id="btnSiguiente">${termino}</a>
            </div>
        </div>`



    container_medium.insertAdjacentHTML('beforeend', drawHeader)
    container_medium.insertAdjacentElement('beforeend', contentList)
    container_medium.insertAdjacentHTML('beforeend', drawFooter)

}



//Esta funcion retorna los ingredientes del checkbox al hacer click en el boton Aplicar
const getArray = (totalArray) => {
    let arraNew = [];
    let cheks = document.getElementsByClassName('checks');

    for (let i = 0; i < totalArray; i++) {

        if (cheks[i].checked == true) {
            arraNew.push(cheks[i].value)
        }

    }

    //Al ejecutar la funcion retornaremos el array con los checks seleccionados
    return arraNew;

}


// Esta funcion aun no esta activada
const getArrayClick = (dataChecks) => {
    const btnAplicar = document.getElementById('btnAplicar');
    btnAplicar.addEventListener('click', (e) => {
        e.preventDefault()
        let cheks = document.getElementsByClassName('checks');
        let arraNew = [];

        for (let i = 0; i < dataChecks; i++) {

            if (cheks[i].checked == true) {
                arraNew.push(cheks[i].value)
            }

        }

        //Al ejecutar la funcion retornaremos el array con los checks seleccionados
        // console.log(dataChecks)
        return arraNew
    })

}

//Esta funcion recorre cada lista de los ingredientes en cada plato y los agrega en un array
const getListPlato = (dataLista, arrIngredListPlatos, listaIngre, i) => {

    for (let j = 0; j < dataLista; j++) {
        arrIngredListPlatos.push(listaIngre[i].lista[j].ingrediente)
    }

}

//Compara que dentro del array de los ingredientes de la lista del plato esta cada elemento seleccionado en el check
//Estoy aplicando la comparacion del array de los checks seleccionados con la lista de ingredientes en cada plato
//Esta funcion recorre los ingredientes que faltan en cada plato y los agrega a un array
const getIngredFaltantes = (arrIngredListPlatos, dataChecks, arrFaltantes) => {

    for (let p = 0; p < arrIngredListPlatos.length; p++) {

        const ingredienteFalta = dataChecks.includes(arrIngredListPlatos[p])
        if (ingredienteFalta === false) {
            arrFaltantes.push(arrIngredListPlatos[p])
        }

    }

}

//Funcion que recorre, guarda los elementos de los checks seleccionados y agrega tanto el nombre como la imagen del plato con relacion a dichos checks seleccionados
const getArrImageAndNamePlato = (dataChecks, arrCompSelectChecks, arrIngredListPlatos, arrPlato, arrImagen, plato, imagen) => {

    //Comparo si dentro del array de los ingredientes dentro de los platos existe cada elemento del array de checks seleccionados
    for (let k = 0; k < dataChecks.length; k++) {
        const optionsChecksSelect = arrIngredListPlatos.includes(dataChecks[k]);
        arrCompSelectChecks.push(optionsChecksSelect);
    }
    //Agrega el plato y su imagen a el array correspondiente
    if (arrCompSelectChecks.includes(true)) {
        arrPlato.push(plato)
        arrImagen.push(imagen)
    }

}

//Funcion para mostrar los ingredientes en un array
//Puedo usar otra funcion pasandole el array que obtuve de la anterior funcion(getArray)
const showIngredientes = (dataChecks, listaIngre) => {
    // console.log('Ingredientes seleccionados: ', dataChecks)
    //Recorre el array de los platos y retorna el nombre del plato de cada elemento del Array
    let arrPlato = [];
    let arrImagen = [];
    let i = 0;
    //Recorre todos los elementos del array de plato -> 3 en total
    for (let i = 0; i < listaIngre.length; i++) {
        let arrIngredListPlatos = [];
        let arrCompSelectChecks = [];
        let arrFaltantes = [];
        const plato = listaIngre[i].nombrePlato;
        const imagen = listaIngre[i].img;
        const arrList = listaIngre[i].lista.length

        getListPlato(arrList, arrIngredListPlatos, listaIngre, i);
        // console.log('Ingredientes del plato: ', arrIngredListPlatos);
        getIngredFaltantes(arrIngredListPlatos, dataChecks, arrFaltantes);
        getArrImageAndNamePlato(dataChecks, arrCompSelectChecks, arrIngredListPlatos, arrPlato, arrImagen, plato, imagen);
        //Array que devuelve los ingredientes faltantes de cada plato
        // console.log("ingredientes faltantes ps : ", arrFaltantes)
        // console.log('***************')

    }

    getPlatosAndImages(arrPlato, arrImagen, i);

}


//Funcion que obtiene los datos de los nombres de los platos y las imagenes que se encuentran en el array
const getPlatosAndImages = (arrPlato, arrImagen, i) => {
    container_medium.innerHTML = '';
    const dataNamePlatos = arrPlato;
    const dataImages = arrImagen;

    // console.log('Array de platos: ', dataNamePlatos)
    // console.log('Array de imagenes: ', dataImages)

    //Comprueba si existe un solo plato
    if (dataNamePlatos.length === 1) {
        drawFrame5_6(dataNamePlatos, dataImages, i, termino = "Unico");
        backtoVolver_5()
        return false;
    }

    //Comprueba que mientras existan platos los va dibujando al hacer click en siguiente
    if (i < dataNamePlatos.length) {
        drawFrame5_6(dataNamePlatos, dataImages, i, termino = "Siguiente");
        if (i === dataNamePlatos.length - 1) {
            drawFrame5_6(dataNamePlatos, dataImages, i, termino = "Repetir");
        }
    } else {
        i = 0;
        getPlatosAndImages(dataNamePlatos, dataImages, i);
    }

    //Al hacer click en siguiente se ejecutara esta misma funcion para comprobar el procedimiento
    const btnSiguiente = document.getElementById('btnSiguiente');
    btnSiguiente.addEventListener('click', e => {
        e.preventDefault();
        i++;
        container_medium.innerHTML = '';
        getPlatosAndImages(dataNamePlatos, dataImages, i);
    })

    backtoVolver_5()


}

//Funcion que obtiene los datos de los nombres de los platos y las imagenes que se encuentran en el array
const getPlatosAndImages_2 = (arrPlato, arrImagen, i) => {
    container_medium.innerHTML = '';
    const dataNamePlatos = arrPlato;
    const dataImages = arrImagen;

    // console.log('Array de platos: ', dataNamePlatos)
    // console.log('Array de imagenes: ', dataImages)

    //Comprueba si existe un solo plato
    if (dataNamePlatos.length === 1) {
        drawFrame7_8(dataNamePlatos, dataImages, i, termino = "Ultimo");
        backtoVolver_7()
        return false;
    }

    //Comprueba que mientras existan platos los va dibujando al hacer click en siguiente
    if (i < dataNamePlatos.length) {
        drawFrame7_8(dataNamePlatos, dataImages, i, termino = "Siguiente");
        let deleteIndName = dataNamePlatos.splice(dataNamePlatos.indexOf(dataNamePlatos[i]), 1);
        let deleteIndImage = dataImages.splice(dataImages.indexOf(dataImages[i]), 1);
        // console.log('Queda: ', dataNamePlatos);
        // Arrays donde se evalua y se agregan cada elemento eliminado a un array vacio
        arrRandomsName.push(deleteIndName);
        arrRandomsImage.push(deleteIndImage);
    }

    // console.log('Array regenerado nombres: ', arrRandomsName)
    // console.log('Array regenerado imagenes: ', arrRandomsImage)

    //Al hacer click en siguiente se ejecutara esta misma funcion para comprobar el procedimiento
    const btnSiguiente = document.getElementById('btnSiguiente');
    btnSiguiente.addEventListener('click', e => {
        e.preventDefault();
        numRandom = Math.round(Math.random() * (dataNamePlatos.length - 1))
        container_medium.innerHTML = '';
        getPlatosAndImages_2(dataNamePlatos, dataImages, numRandom);
    })

    backtoVolver_7()


}
