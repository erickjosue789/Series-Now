export interface Serie {
    getTopTenShows(): unknown;
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
