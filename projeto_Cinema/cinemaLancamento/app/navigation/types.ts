// Tipos de navegação para TypeScript
export type RootStackParamList = {
  Home: undefined;
  MovieDetails: { movieId: number };
  Seats: { 
    filmeId: number;
    filmeTitulo: string;
    vagasDisponiveis: number;
  };
  About: undefined;
  Loading: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

