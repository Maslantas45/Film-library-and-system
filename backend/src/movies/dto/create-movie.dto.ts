export class CreateMovieDto {
    title: string;
    description: string;
    releaseYear: number;
    posterUrl: string;
    directorId: number; 
    genreIds: number[];
}