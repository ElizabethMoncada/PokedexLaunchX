//referencias al html
const nombre = document.getElementById("nombre");
const tipopoke = document.getElementById("tipopoke");
const estadistica = document.getElementById("estadistica");
const movimiento = document.getElementById("movimiento");

/*Programacion asincrona*/
/*Funcion de fetch consulta o peticion a appi */
/*funcion flecha => = a sustituye palabra function */

const fetchPokemon = () => {
  const pokeName = document.getElementById("pokeName");
  //.toLowercase() pasa todo a minuscula
  let pokeInput = pokeName.value.toLowerCase();
  /*Urls */
  const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`;
  /*consulta a appi, se recibe una promesa*/
  /*sentencia .then significa entonces y recibe res, para poder obtener  respuesta*/
  fetch(url)
    .then((res) => {
      //if si (respuesta del stattu (navegador errores y resp) es dif =! "200")
      if (res.status != "200") {
        console.log(res);
        nombre.innerHTML = "";
        tipopoke.innerHTML = "";
        estadistica.innerHTML = "";
        movimiento.innerHTML = "";
        //ruta se escribe manual
        pokeImage("./assets/pokesad.gif");
      } else {
        return res.json();
      }

      /*Informacion especifica q queremos saber se manda llamar la funcion */
    })
    .then((data) => {
      console.log(data);

      //asignas el data necesario a la constante
      nombre.innerHTML = data.species.name;
      tipopoke.innerHTML = "";
      estadistica.innerHTML = "";
      movimiento.innerHTML = "";
      data.types.forEach((types) => {
        tipopoke.innerHTML = tipopoke.innerHTML + types.type.name + " ";
      });
      data.stats.forEach((stats) => {
        estadistica.innerHTML = ` ${estadistica.innerHTML}
          ${stats.stat.name} : ${stats.base_stat} 
          <br>`;
      });
      data.abilities.forEach((habilidad) => {
        movimiento.innerHTML = `
        ${movimiento.innerHTML} ${habilidad.ability.name}
        `;
      });

      /*let variable  */
      let pokeImg = data.sprites.front_default;
      console.log(pokeImg);
      pokeImage(pokeImg);
    });
};

//fetchPokemon();
const pokeImage = (url) => {
  const pokeImg = document.getElementById("pokeImg");
  pokeImg.src = url;
};
fetchPokemon();
