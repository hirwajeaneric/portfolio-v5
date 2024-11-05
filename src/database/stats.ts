export type Stats = {
    name: string;
    number: number;
    caracter: string;
}

export const stats: Stats[] = [
    {
        name: 'Clients',
        number: 23,
        caracter: '+'
    },
    {
        name: 'Projects',
        number: 25,
        caracter: '+'
    },
    {
        name: 'Happy Clients',
        number: 96,
        caracter: '%'
    },
    {
        name: 'Experience',
        number: (new Date().getFullYear() - 2021),
        caracter: 'Years'
    },
];