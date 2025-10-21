const descripcionDiv = document.getElementById("descripcion");
const select = document.getElementById("propiedadSelect");
const btnGenerar = document.getElementById("btnGenerar");
const ejercicioDiv = document.getElementById("ejercicio");

const propiedades = {
  homogeneidad: {
    desc: `**Propiedad de la Homogeneidad o Constante fuera de la integral**:
    Si una función está multiplicada por una constante, se puede sacar la constante fuera de la integral:
    $$\\int_a^b k f(x) dx = k \\int_a^b f(x) dx$$`,
    generador: () => {
      const k = Math.floor(Math.random() * 5) + 2;
      const n = Math.floor(Math.random() * 3) + 1;
      return `\\(\\int ${k} x^${n} dx\\), aplicá la propiedad para sacar la constante fuera de la integral.`;
    }
  },

  nula: {
    desc: `**Propiedad de integral nula o límites iguales**:
    Si los límites de integración coinciden, la integral vale cero:
    $$\\int_a^a f(x) dx = 0$$`,
    generador: () => {
      const a = Math.floor(Math.random() * 5);
      return `Calculá \\(\\int_${a}^${a} (3x^2 + 2) dx\\) y verificá que da 0.`;
    }
  },
  
  cambio: {
    desc: `**Propiedad de cambio de límites**:
    Si se cambian los límites de integración de la integral definida, el resultado es el mismo pero cambiado de signo:
    $$\\int_b^a f(x) dx = -\\int_a^b f(x) dx$$`,
    generador: () => {
      const a = Math.floor(Math.random() * 3);
      const b = a + Math.floor(Math.random() * 3) + 2;
      return `Calculá \\(\\int_${b}^${a} x dx\\) y comprobá que es igual a -\\(\\int_${a}^${b} x dx\\).`;
    }
  },
  
  linealidad: {
    desc: `**Propiedad de linealidad o Suma**:
    La integral de una suma de dos o más funciones es igual a la suma de las integrales de cada función por separado. Por lo tanto, podemos primero sumar las funciones y luego hacer la integración o, por otro lado, primero resolver la integral de cada función y luego sumar los resultados obtenidos.
    $$\\int_a^b [f(x) + g(x)]dx = \\int_a^b f(x)dx + \\int_a^b g(x)dx$$`,
    generador: () => {
      const a = Math.floor(Math.random() * 5) + 1;
      const b = Math.floor(Math.random() * 5) + 1;
      const n = Math.floor(Math.random() * 4) + 1;
      return `\\(\\int (${a}x^{${n}} + ${b}x)\\,dx\\), aplicá la propiedad de linealidad para separar la integral.`;
    }
  },
  
  aditividad: {
    desc: `**Propiedad de aditividad de la integral definida**:
    Sea c un punto interior del intervalo [a,b], 
    la integral definida en el intervalo [a,b] se puede descomponer en dos integrales: 
    una integral definida en el intervalo [a,c] 
    y otra integral definida en el intervalo [c,b].:
    $$\\int_a^b f(x) dx = \\int_a^c f(x) dx + \\int_c^b f(x) dx$$`,
    generador: () => {
      const a = Math.floor(Math.random() * 3);
      const c = a + Math.floor(Math.random() * 3) + 1;
      const b = c + Math.floor(Math.random() * 3) + 1;
      return `Calculá \\(\\int_a^c x^2 dx\\) y \\(\\int_c^b x^2 dx\\), luego sumalas usando la propiedad de aditividad.`;
    }
  },
  
  monotonia: {
    desc: `**Propiedad de monotonía o Conservación del orden**:
    Si una función es menor o igual que otra, 
    la integral de la primera función también es menor o igual que la integral de la segunda función. 
    De manera que después de la integración las funciones conservan su relación.
    Si $$f(x) \le g(x)$$ en [a,b], entonces
    $$\\int_a^b f(x) dx \\le \\int_a^b g(x) dx$$`,
    generador: () => {
      const a = Math.floor(Math.random() * 3);
      const b = a + Math.floor(Math.random() * 3) + 2;
      return `Dadas las funciones f(x) = x y g(x) = x+2, compará \\(\\int_${a}^${b} f(x) dx\\) y \\(\\int_${a}^${b} g(x) dx\\) usando la propiedad de monotonía.`;
    }
  },

  absoluto: {
    desc: `**Propiedad del valor absoluto de la integral o Desigualdad triangular**:
    Si al efectuar el valor absoluto a una función da como resultado una función integrable,
    el valor absoluto de la integral es menor o igual que la integral del valor absoluto:
    $$\\left| \\int_a^b f(x) dx \\right| \\le \\int_a^b |f(x)| dx$$`,
    generador: () => {
      const a = Math.floor(Math.random() * 2);
      const b = a + Math.floor(Math.random() * 3) + 2;
      return `Dada f(x) = x - 1, compará \\(|\\int_${a}^${b} f(x) dx|\\) con \\(\\int_${a}^${b} |f(x)| dx\\) usando la desigualdad del valor absoluto.`;
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
