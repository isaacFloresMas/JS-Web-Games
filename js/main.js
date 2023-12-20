let planets = [
    {name: "Merucury", isLife: false},
    {name: "Mars", isLife: true},
    {name: "Earth", isLife: true},
    {name: "Venus", isLife: false},
    {name: "Jupyter", isLife: false},
    {name: "Saturn", isLife: false},
    {name: "Urunus", isLife: false},
    {name: "Neptune", isLife: false},
];

// let jovians = planets.splice(planets.indexOf("Jupyter"), planets.length);
// let ter = planets.splice(0, 4);

const pen = {
    color: 'blue',
    brand: "bic",
    is_permanent: true,
    price: {value:2 , currency:'USD'},
    name: function() {
        return this.color + " " + this.brand;
    },
};

console.log(planets[2]);
console.log(pen.name());