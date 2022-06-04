
class Culturas{
    constructor(Pais, Tradicion){
    this.Pais = Pais;
    this.Tradicion = Tradicion;
}}

const allCulturas = [
    new Culturas('El Salvador', 'Domingos de pupusas.'),

    new Culturas('Honduras', 'Feria de La Ceiba.'),

    new Culturas('Guatemala','Semana Santa.'),

    new Culturas('Nicaragua','los buñuelos.'),

    new Culturas('Costa Rica','Festival de la Luz.'),

    new Culturas('Panama', 'Los Carnavales.')
];
exports.getRandomCulturas = () => {
    return allCulturas[Math.floor(Math.random() * allCulturas.length)];
  }
exports.allCulturas = allCulturas;


