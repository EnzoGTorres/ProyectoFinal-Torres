
const eligeMoneda = "Ingresa la moneda de garantía \n" + "dolar \n" + "euro"


class Prestamo {
    constructor(codigo, moneda, monto, prestamo, cuotaPrestamo, prestamoMasInteres) {
        this.codigo = codigo;
        this.moneda = moneda;  
        this.monto = monto;
        this.prestamo = prestamo;
        this.cuotaPrestamo = cuotaPrestamo;
        this.prestamoMasInteres = prestamoMasInteres;
        }
}

botonConsultar.addEventListener("click", ()=> {
    agregarPrestamos();
    cargarPrestamo (prestamos);
});

function elegirMoneda() {
    moneda = (inputMoneda.value).toLowerCase();
    if (moneda!== "dolar"  && moneda !== "euro") {
        alert("debes elegir una moneda de respaldo valida.")

    } else if (moneda === "dolar") {
        interes = 0.85
        interesGarantia = 1.08
        cotizacion = valorDolar
        calculoPrestamo(moneda, interes, interesGarantia, cotizacion);

    } else {
        interes = 0.88
        interesGarantia = 1.05
        cotizacion = valorEuro
        calculoPrestamo(moneda, interes, interesGarantia, cotizacion);
    }
}

function calculoPrestamo() {
    codigo = 0
    monto = inputPrestamo.value;
    prestamo = inputPesos.value;
    cuotas = inputCuotas.value;
    if (prestamo >= monto * cotizacion * interes) {
        alert(" No puedes pedir este monto en relacion a esa garantia.");
    } else {
        codigo = Math.floor(Math.random() * 100) + 1;
        cuotaPrestamo = (((prestamo * (1 + parseFloat(interes / 12))) / cuotas));
        prestamoMasInteres = monto * interesGarantia
        const nuevoPrestamo = new Prestamo(codigo ,moneda, monto, prestamo, cuotaPrestamo, prestamoMasInteres);
prestamos.push(nuevoPrestamo);
        console.log("Nuevo prestamo agregado: ", nuevoPrestamo);
}
}

function consultarPrestamo() {
    elegirMoneda(moneda); 
}

function retornarTableHTML(listaPrestamo){
    return `
    <tr>
        <td>${listaPrestamo.moneda}</td>
        <td>$ ${listaPrestamo.prestamo}</td>
        <td>$ ${listaPrestamo.monto}</td>
        <td>$ ${parseInt(listaPrestamo.cuotaPrestamo)}</td>
        <td>$ ${listaPrestamo.prestamoMasInteres}</td>
        <td><button class="guardar" id="${listaPrestamo.codigo}">Guardar</button></td>
        <td><button class="borrar" id="${listaPrestamo.codigo}">Borrar</button></td>
    </tr>
    `;
}

function agregarPrestamos() {
    consultarPrestamo();
    
    if (prestamos.length > 2) {
    prestamos.sort((a, b) => {
        if (a.cuotaPrestamo < b.cuotaPrestamo) {
        return 1;
        }
        if (a.cuotaPrestamo > b.cuotaPrestamo) {
        return -1;
        }
        return 0;
    });
    console.table(prestamos);
    } else {
    console.table(prestamos);
    }
    
    activarClick()
}

function cargarPrestamo(listaPrestamo) {
    let tablaHTML = `
    <div class="table">
        <table>
        <thead>
            <tr>
            <th>Moneda</th>
            <th>Garantía</th>
            <th>Préstamo $</th>
            <th>Cuota</th>
            <th>Interés Garantía</th>
            </tr>
        </thead>
        <tbody>
    `;

    listaPrestamo.forEach(prestamo => {
        tablaHTML += retornarTableHTML(prestamo);
    });

    tablaHTML += `
        </tbody>
        </table>
    </div>
    `;

    table.innerHTML = tablaHTML;
    
    activarClick()
}

function activarClick() {
    const botonesGuardar = document.querySelectorAll(".guardar");
    botonesGuardar.forEach(boton => {
        boton.addEventListener("click", () => {
            const result = prestamos.find(prestamos => prestamos.codigo == parseInt(boton.id));
            listaPrestamo.push(result);
            guardarPrestamo();
        });
    });

    const botonesBorrar = document.querySelectorAll(".borrar");
    botonesBorrar.forEach(boton => {
        boton.addEventListener("click", () => {
            const codigo = parseInt(boton.id);
            borrarPrestamo(codigo);
        });
    });
}


function guardarPrestamo(){
    localStorage.setItem("listaPrestamo", JSON.stringify(listaPrestamo))
}

function recuperarPrestamo(){
    const listaTemporal = JSON.parse(localStorage.getItem("listaPrestamo")) || []
    listaPrestamo.push(...listaTemporal)
}

function borrarPrestamo(codigo) {
    const index = listaPrestamo.findIndex(prestamo => prestamo.codigo === codigo);
    if(index !== -1) {
        listaPrestamo.splice(index, 1);
        guardarPrestamo();
        cargarPrestamo(listaPrestamo);
    }
}

recuperarPrestamo();
cargarPrestamo(listaPrestamo);

