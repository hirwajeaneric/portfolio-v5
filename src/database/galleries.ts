export type Gallery = {
    id: number;
    projectId: string;
    name: string;
    description: string;
    thumbnail: string;
};

export const galleries: Gallery[] = [
    {
        id: 1,
        projectId: "1",
        name: "Landing Page",
        description: "Lorem Ipsum dolor sit amet ut dignit. Proca rex albonorum, duos filios numitorum et amulius.",
        thumbnail: "/landing.png",
    },
    {
        id: 2,
        projectId: "1",
        name: "Landing Page",
        description: "Lorem Ipsum dolor sit amet ut dignit. Proca rex albonorum, duos filios numitorum et amulius.",
        thumbnail: "/benefits.png",
    },
    {
        id: 3,
        projectId: "1",
        name: "Landing Page",
        description: "Lorem Ipsum dolor sit amet ut dignit. Proca rex albonorum, duos filios numitorum et amulius.",
        thumbnail: "/courses.png",
    },
    {
        id: 4,
        projectId: "1",
        name: "Landing Page",
        description: "Lorem Ipsum dolor sit amet ut dignit. Proca rex albonorum, duos filios numitorum et amulius.",
        thumbnail: "/articles.png",
    },
];