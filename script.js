const descripcionDiv = document.getElementById("descripcion");
const select = document.getElementById("propiedadSelect");
const btnGenerar = document.getElementById("btnGenerar");
const ejercicioDiv = document.getElementById("ejercicio");

function aleatorio(min, max, allowNeg = true) {
  let valor = Math.floor(Math.random() * (max - min + 1)) + min;
  if (allowNeg && Math.random() < 0.5) valor *= -1;
  return valor;
}

function funcionAleatoria() {
  const tipos = ["polinomica", "trigonometrica", "exponencial"];
  const tipo = tipos[Math.floor(Math.random() * tipos.length)];
  switch(tipo) {
    case "polinomica":
      let n = Math.floor(Math.random() * 3) + 1;
      return `x^{${n}}`;
    case "trigonometrica":
      let trig = Math.random() < 0.5 ? "sin" : "cos";
      let m = Math.floor(Math.random() * 3) + 1;
      return `\\${trig}(${m}x)`;
    case "exponencial":
      let base = Math.random() < 0.5 ? "e" : (Math.floor(Math.random() * 3) + 2);
      let exp = Math.floor(Math.random() * 3) + 1;
      return base === "e" ? `e^(${exp}x)` : `${base}^x`;
  }
}

const propiedades = {
  homogeneidad: {
    desc: `**Propiedad de la Homogeneidad o Constante fuera de la integral**:
    Si una función está multiplicada por una constante, se puede sacar la constante fuera de la integral:
    $$\\int_a^b k \\cdot f(x) \\ dx = k \\cdot \\int_a^b f(x) \\ dx$$`,
    generador: () => {
      let k = aleatorio(1,5);
      let a = aleatorio(0,5);
      let b = aleatorio(0,5);
      if(a > b) [a,b] = [b,a];
      let fx = funcionAleatoria();
      return `\\(\\int_{${a}}^{${b}} ${k} \\cdot ${fx} \\ dx\\)`;
    }
  },
  
  nula: {
    desc: `**Propiedad de integral nula o límites iguales**:
    Si los límites de integración coinciden, la integral vale cero:
    $$\\int_a^a f(x) \\ dx = 0$$`,
    generador: () => {
      let a = aleatorio(0,5);
      let fx = funcionAleatoria();
      return `\\(\\int_{${a}}^{${a}} ${fx} \\ dx\\)`;
    }
  },
  
  cambio: {
    desc: `**Propiedad de cambio de límites**:
    Si se cambian los límites de integración de la integral definida, el resultado es el mismo pero cambiado de signo:
    $$\\int_b^a f(x) dx = -\\int_a^b f(x) dx$$`,
    generador: () => {
      let a = aleatorio(0,3);
      let b = aleatorio(0,3);
      if(a === b) b += 1;
      let fx = funcionAleatoria();
      return `\\(\\int_{${b}}^{${a}} ${fx} \\ dx\\)`;
    }
  },
  
  linealidad: {
    desc: `**Propiedad de linealidad o Suma**:
    La integral de una suma de dos o más funciones es igual a la suma de las integrales de cada función por separado. Por lo tanto, podemos primero sumar las funciones y luego hacer la integración o, por otro lado, primero resolver la integral de cada función y luego sumar los resultados obtenidos.
    $$\\int_a^b [f(x) + g(x)]dx = \\int_a^b f(x) \\ dx + \\int_a^b g(x) \\ dx$$`,
    generador: () => {
      let a = aleatorio(0,5);
      let b = aleatorio(0,5);
      if(a > b) [a,b] = [b,a];
      let f = funcionAleatoria();
      let g = funcionAleatoria();
      return `\\(\\int_{${a}}^{${b}} \\left[ ${f} + ${g} \\right] \\ dx\\)`;
    }
  },
  
  aditividad: {
    desc: `**Propiedad de aditividad de la integral definida**:
    Sea c un punto interior del intervalo [a,b], 
    la integral definida en el intervalo [a,b] se puede descomponer en dos integrales: 
    una integral definida en el intervalo [a,c] 
    y otra integral definida en el intervalo [c,b].:
    $$\\int_a^b f(x) \\ dx = \\int_a^c f(x) \\ dx + \\int_c^b f(x) \\ dx$$`,
    generador: () => {
      let a = aleatorio(0,3);
      let c = a + aleatorio(1,3);
      let b = c + aleatorio(1,3);
      let fx = funcionAleatoria();
      return `\\(\\int_{${a}}^{${c}} ${fx} \\ dx + \\int_{${c}}^{${b}} ${fx} \\ dx\\) = \\(\\int_{${a}}^{${b}} ${fx} \\ dx\\)`;
    }
  },
  
  monotonia: {
    desc: `**Propiedad de monotonía o Conservación del orden**:
    Si una función es menor o igual que otra, 
    la integral de la primera función también es menor o igual que la integral de la segunda función. 
    De manera que después de la integración las funciones conservan su relación.
    Si $f(x) \\leq g(x)$ en [a,b], entonces
    $$\\int_a^b f(x) \\ dx \\leq \\int_a^b g(x) \\ dx$$`,
    generador: () => {
      let a = aleatorio(0,3);
      let b = a + aleatorio(2,4);
      let f = funcionAleatoria();
      let g = funcionAleatoria();
      return `\\(\\int_{${a}}^{${b}} ${f} \\ dx \\leq \\int_{${a}}^{${b}} ${g} \\ dx\\)`;
    }
  },

  absoluto: {
    desc: `**Propiedad del valor absoluto de la integral o Desigualdad triangular**:
    Si al efectuar el valor absoluto a una función da como resultado una función integrable,
    el valor absoluto de la integral es menor o igual que la integral del valor absoluto:
    $$\\left| \\int_a^b f(x) \\ dx \\right| \\leq \\int_a^b |f(x)| \\ dx$$`,
    generador: () => {
      let a = aleatorio(0,2);
      let b = a + aleatorio(2,4);
      let fx = funcionAleatoria();
      return `\\(\\left| \\int_{${a}}^{${b}} ${fx} \\ dx \\right|  \\leq \\int_{${a}}^{${b}} |${fx}| \\ dx\\)`;
    }
  },
};

select.addEventListener("change", () => {
  const prop = propiedades[select.value];
  if (prop) {
    descripcionDiv.innerHTML = marked.parse(prop.desc);
    MathJax.typesetPromise();
    ejercicioDiv.innerHTML = "";
  } else {
    descripcionDiv.innerHTML = "";
    ejercicioDiv.innerHTML = "";
  }
});

btnGenerar.addEventListener("click", () => {
  const prop = propiedades[select.value];
  if (prop) {
    ejercicioDiv.innerHTML = prop.generador();
    MathJax.typesetPromise();
  } else {
    ejercicioDiv.innerHTML = "Primero seleccioná una propiedad.";
  }
});
