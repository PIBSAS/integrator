const descripcionDiv = document.getElementById("descripcion");
const select = document.getElementById("propiedadSelect");
const btnGenerar = document.getElementById("btnGenerar");
const ejercicioDiv = document.getElementById("ejercicio");

const propiedades = {
  linealidad: {
    desc: `**Propiedad de linealidad**:
    $$\\int [f(x) + g(x)]dx = \\int f(x)dx + \\int g(x)dx$$`,
    generador: () => {
      const a = Math.floor(Math.random() * 5) + 1;
      const b = Math.floor(Math.random() * 5) + 1;
      const n = Math.floor(Math.random() * 4) + 1;
      return `\\(\\int (${a}x^{${n}} + ${b}x)\\,dx\\)`;
    }
  },

  aditividad: {
    desc: `**Propiedad de aditividad**:
    $$\\int_a^b f(x)dx + \\int_b^c f(x)dx = \\int_a^c f(x)dx$$`,
    generador: () => {
      const a = Math.floor(Math.random() * 3);
      const b = a + Math.floor(Math.random() * 3) + 1;
      const c = b + Math.floor(Math.random() * 3) + 1;
      return `\\(\\int_{${a}}^{${b}} x^2dx + \\int_{${b}}^{${c}} x^2dx = ?\\)`;
    }
  },

  constante: {
    desc: `**Constante fuera de la integral**:
    $$\\int k f(x)dx = k\\int f(x)dx$$`,
    generador: () => {
      const k = Math.floor(Math.random() * 5) + 2;
      const n = Math.floor(Math.random() * 4) + 1;
      return `\\(\\int ${k}x^{${n}}dx\\)`;
    }
  }
};

select.addEventListener("change", () => {
  const prop = propiedades[select.value];
  if (prop) {
    descripcionDiv.innerHTML = marked.parse(prop.desc);
    ejercicioDiv.innerHTML = "";
    MathJax.typesetPromise();
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
