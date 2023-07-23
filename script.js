const cuentas = [
  { nombre: "Jose", saldo: 200, email: "jose@gmail.com", password: 123 },
  {
    nombre: "Fernando",
    saldo: 290,
    email: "fernando@gmail.com",
    password: 456,
  },
  { nombre: "Andrea", saldo: 67, email: "andrea@gmail.com", password: 789 },
];
let validar = true;
let validarDeposito = true;
let validarRetiro = true;
let validarSaldo = true;

function iniciarSesion() {
  //Validaciones para iniciar sesion de usuario y contraseña
  const selectedCuentas = document.getElementById("cuenta").value;
  const selectedCuenta = selectedCuentas.toLowerCase();
  const passwords = document.getElementById("password").value;
  const password = +passwords;
  for (let i = 0; i < cuentas.length; i++) {
    if (
      selectedCuenta === cuentas[i].email &&
      password === cuentas[i].password
    ) {
      //Acá oculto el cuadro de usuario y contraseña cuando el inicio es exitoso
      document.querySelector(".entradas").classList.add("input_login");
      //Este es el cuadro de bienvenida y aparecen los para el usuario
      document.getElementById("nombreCuenta").textContent = cuentas[i].nombre;
      document.getElementById("opciones").classList.remove("ocultar");
      validar = false;
      return;
    }
  }
  //Esta es la notificacion cuando el usuario o contraseña estan errados
  if (iniciarSesion && validar === true) {
    document.getElementById("login_errado").classList.remove("ocultar_login");
    setTimeout(() => {
      document.getElementById("login_errado").classList.add("ocultar_login");
    }, 3000);
  }
}

//Funcion para consultar saldo
function consultarSaldo() {
    const selectedCuentas = document.getElementById("cuenta").value;
    const selectedCuenta = selectedCuentas.toLowerCase();
    const mostrarSaldo = document.querySelector("#mostrarSaldo");
    for (let i = 0; i < cuentas.length; i++) {
      if (cuentas[i].email === selectedCuenta) {
        const saldoActual = cuentas[i].saldo;
        mostrarSaldo.classList.add(
          "mt-4",
          "block",
          "notification",
          "is-danger"
        );
        if (validarSaldo) {
            const textoSaldo = document.createElement("p");
            textoSaldo.classList.add("textActSaldo")
            mostrarSaldo.appendChild(textoSaldo);
        }
        validarSaldo = false;
        const textoSaldoFinal = document.querySelector(".textActSaldo")
        textoSaldoFinal.textContent = "Saldo: $" + saldoActual;
        return;
      }
  }
  
}

function ingresarMonto() {
  if (validarDeposito) {
    const selectedCuentas = document.getElementById("cuenta").value;
    const selectedCuenta = selectedCuentas.toLowerCase();
    //Todo esto es para crear los elementos del div, input y el boton
    const ingresarDeposito = document.querySelector("#ingresarDeposito");
    ingresarDeposito.classList.add(
      "mt-4",
      "block",
      "notification",
      "is-danger"
    );
    const cajaDeDeposito = document.createElement("input");
    cajaDeDeposito.classList.add("input", "is-primary");
    cajaDeDeposito.setAttribute("type", "number");
    cajaDeDeposito.setAttribute("placeholder", "Ingresa el monto a depositar");
    ingresarDeposito.appendChild(cajaDeDeposito);
    const buttonCajaDeposito = document.createElement("button");
    buttonCajaDeposito.classList.add("button", "is-primary", "mt-4");
    buttonCajaDeposito.textContent = "Depositar";
    ingresarDeposito.appendChild(buttonCajaDeposito);

    //Acá vamos a tomar los datos que se ingresen en la caja cuando den click al boton
    buttonCajaDeposito.addEventListener("click", (e) => {
      const valorCaja = cajaDeDeposito.value;
      const montoIngresar = parseFloat(valorCaja);

      for (let i = 0; i < cuentas.length; i++) {
        if (selectedCuenta === cuentas[i].email) {
          if (!isNaN(montoIngresar) && montoIngresar > 0) {
            const nuevoSaldo = cuentas[i].saldo + montoIngresar;
            if (nuevoSaldo <= 990) {
              cuentas[i].saldo = nuevoSaldo;
              consultarSaldo();
              cajaDeDeposito.value = "";
              return;
            } else {
              const excedeMonto = document.getElementById("login_errado");
              excedeMonto.textContent = "El saldo no puede ser mayor a $990.";
              excedeMonto.classList.remove("ocultar_login");
              cajaDeDeposito.value = "";
              setTimeout(() => {
                excedeMonto.classList.add("ocultar_login");
              }, 3000);
            }
          } else {
            const excedeMonto = document.getElementById("login_errado");
            excedeMonto.textContent = "Ingresa un monto válido.";
            excedeMonto.classList.remove("ocultar_login");
            cajaDeDeposito.value = "";
            setTimeout(() => {
              excedeMonto.classList.add("ocultar_login");
            }, 3000);
          }
        }
      }
    });
  }
  validarDeposito = false;
}

function retirarMonto() {
  if (validarRetiro) {
    const selectedCuentas = document.getElementById("cuenta").value;
    const selectedCuenta = selectedCuentas.toLowerCase();
    //Todo esto es para crear los elementos del div, input y el boton
    const ingresarDeposito = document.querySelector("#ingresarRetiro");
    ingresarDeposito.classList.add(
      "mt-4",
      "block",
      "notification",
      "is-info"
    );
    const cajaDeDeposito = document.createElement("input");
    cajaDeDeposito.classList.add("input", "is-primary", "mt-5");
    cajaDeDeposito.setAttribute("type", "number");
    cajaDeDeposito.setAttribute("placeholder", "Ingresa el monto a retirar");
    ingresarDeposito.appendChild(cajaDeDeposito);
    const buttonCajaDeposito = document.createElement("button");
    buttonCajaDeposito.classList.add("button", "is-primary", "mt-4");
    buttonCajaDeposito.textContent = "Retirar";
    ingresarDeposito.appendChild(buttonCajaDeposito);

    //Acá vamos a tomar los datos que se ingresen en la caja cuando den click al boton
    buttonCajaDeposito.addEventListener("click", (e) => {
      const valorCaja = cajaDeDeposito.value;
      const montoIngresar = parseFloat(valorCaja);

      for (let i = 0; i < cuentas.length; i++) {
        if (selectedCuenta === cuentas[i].email) {
          if (!isNaN(montoIngresar) && montoIngresar > 0) {
            const nuevoSaldo = cuentas[i].saldo - montoIngresar;
            if (nuevoSaldo >= 10) {
              cuentas[i].saldo = nuevoSaldo;
              consultarSaldo();
              cajaDeDeposito.value = "";
              return;
            } else {
              const excedeMonto = document.getElementById("login_errado");
              excedeMonto.textContent = "El saldo no puede ser menor a $10.";
              excedeMonto.classList.remove("ocultar_login");
              cajaDeDeposito.value = "";
              setTimeout(() => {
                excedeMonto.classList.add("ocultar_login");
              }, 3000);
            }
          } else {
            const excedeMonto = document.getElementById("login_errado");
            excedeMonto.textContent = "Ingresa un monto válido.";
            excedeMonto.classList.remove("ocultar_login");
            cajaDeDeposito.value = "";
            setTimeout(() => {
              excedeMonto.classList.add("ocultar_login");
            }, 3000);
          }
        }
      }
    });
  }
  validarRetiro = false;
}
