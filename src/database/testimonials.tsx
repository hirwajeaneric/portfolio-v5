export interface Testimonal {
    logo: string;
    name: string;
    role: string;
    title: string;
    description: string;
    image: string;
}

export const Testimonials: Testimonal[] = [
    {
        logo: "/IRO.jpg",
        name: "Stella Impuhwe",
        role: "Backend Software Developer",
        title: "It was a great experience to work with Eric as a team leader",
        description: "I was honored to have worked on a number of projects with Eric. He is a great team leader and a great person to work with. He is always willing to help and is very knowledgeable. I would recommend him to anyone looking for a great team leader.",
        image: "stella.jpeg",
    },
    {
        logo: "/SheCanCODE Logo.jpeg",
        name: "Ntirushwa Kelly Brice",
        role: "Frontend Software Developer",
        title: "I love the way Eric approaches projects",
        description: "It doesn't take you long to realize that Eric is not just a software developer. He is an artist. He has a very imaginary mind and he uses his creativity to solve problems. In some cases, you will realize that he is sometimes ahead of you in terms of how to implement or build a solution. Overall, I love the way he works.",
        image: "kelly.jpeg",
    }
]