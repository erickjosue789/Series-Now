export interface Serie {
    id: number;
    name: string;
    image: {
        original: string;
        medium: string;
    };
    rating:{
        average: number;
    };
    genres: [];
}
