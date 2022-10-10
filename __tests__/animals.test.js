const fs = require('fs');
const {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal
} = require('../lib/animals.js');
const { animals } = require('../data/animals.json');

jest.mock('fs');

test('creates an animal object', () => {
    const animal = createNewAnimal(
        { name: 'Darlene', id: '123' },
        animals
    );

    expect(animal.name).toEqual('Darlene');
    expect(animal.id).toEqual('123');
});

test('filters by query', () => {
    const startingAnimals = [
        {
            id: "3",
            name: "Erica",
            species: "gorilla",
            diet: "omnivore",
            personalityTraits: ["quirky", "rash"],
        },
        {
            id: "4",
            name: "Noel",
            species: "bear",
            diet: "carnivore",
            personalityTraits: ["impish", "sassy", "brave"],
        },
    ];
    const updateAnimals = filterByQuery({ species: "gorilla" }, startingAnimals);

    expect(updateAnimals.length).toEqual(1);
});

test('finds an animal by id', () => {
    const startingAnimals = [
        {
            id: "3",
            name: "Erica",
            species: "gorilla",
            diet: "omnivore",
            personalityTraits: ["quirky", "rash"],
        },
        {
            id: "4",
            name: "Noel",
            species: "bear",
            diet: "carnivore",
            personalityTraits: ["impish", "sassy", "brave"],
        },
    ];
    const result = findById('3', startingAnimals);

    expect(result.name).toBe('Erica');
});

test('validate personality traits', () => {
    const animal = {
        id: "3",
        name: "Erica",
        species: "gorilla",
        diet: "omnivore",
        personalityTraits: ["quirky", "rash"],
    };
    const invalidAnimal = {
        id: "3",
        name: "Erica",
        species: "gorilla",
        diet: "omnivore",
    };
    const result = validateAnimal(animal);
    const result2 = validateAnimal(invalidAnimal);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});