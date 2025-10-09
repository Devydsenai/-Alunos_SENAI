import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Interface para os filmes
interface Filme {
  codigo: number;
  Title: string;
  Year: string;
  Rated: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Plot: string;
  Poster: string;
  imdbRating: string;
  ComingSoon: boolean;
}

// Dados dos filmes (do seed.js) com imagens funcionais
const filmes: Filme[] = [
  {
    codigo: 1,
    Title: "Avatar",
    Year: "2009",
    Rated: "PG-13",
    Runtime: "162 min",
    Genre: "Action, Adventure, Fantasy",
    Director: "James Cameron",
    Plot: "A paraplegic marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
    Poster: "https://m.media-amazon.com/images/M/MV5BMTYwOTEwNjAzMl5BMl5BanBnXkFtZTcwODc5MTUwMw@@._V1_SX300.jpg",
    imdbRating: "7.9",
    ComingSoon: false,
  },
  {
    codigo: 2,
    Title: "The Avengers",
    Year: "2012",
    Rated: "PG-13",
    Runtime: "143 min",
    Genre: "Action, Sci-Fi, Thriller",
    Director: "Joss Whedon",
    Plot: "Earth's mightiest heroes must come together and learn to fight as a team if they are to stop the mischievous Loki and his alien army from enslaving humanity.",
    Poster: "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    imdbRating: "8.1",
    ComingSoon: false,
  },
  {
    codigo: 3,
    Title: "Interstellar",
    Year: "2014",
    Rated: "PG-13",
    Runtime: "169 min",
    Genre: "Adventure, Drama, Sci-Fi",
    Director: "Christopher Nolan",
    Plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    Poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    imdbRating: "8.6",
    ComingSoon: false,
  },
  {
    codigo: 4,
    Title: "I Am Legend",
    Year: "2007",
    Rated: "PG-13",
    Runtime: "101 min",
    Genre: "Drama, Horror, Sci-Fi",
    Director: "Francis Lawrence",
    Plot: "Years after a plague kills most of humanity and transforms the rest into monsters, the sole survivor in New York City struggles valiantly to find a cure.",
    Poster: "https://m.media-amazon.com/images/M/MV5BMTU4NzMyNDk1OV5BMl5BanBnXkFtZTcwOTEwMzU1MQ@@._V1_SX300.jpg",
    imdbRating: "7.2",
    ComingSoon: false,
  },
  {
    codigo: 5,
    Title: "300",
    Year: "2006",
    Rated: "R",
    Runtime: "117 min",
    Genre: "Action, Drama, Fantasy",
    Director: "Zack Snyder",
    Plot: "King Leonidas of Sparta and a force of 300 men fight the Persians at Thermopylae in 480 B.C.",
    Poster: "https://m.media-amazon.com/images/M/MV5BMjAzNTkzNjcxNl5BMl5BanBnXkFtZTYwNDA4NjE3._V1_SX300.jpg",
    imdbRating: "7.7",
    ComingSoon: false,
  },
  {
    codigo: 6,
    Title: "The Wolf of Wall Street",
    Year: "2013",
    Rated: "R",
    Runtime: "180 min",
    Genre: "Biography, Comedy, Crime",
    Director: "Martin Scorsese",
    Plot: "Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.",
    Poster: "https://m.media-amazon.com/images/M/MV5BMjIxMjgxNTk0MF5BMl5BanBnXkFtZTgwNjIyOTg2MDE@._V1_SX300.jpg",
    imdbRating: "8.2",
    ComingSoon: false,
  },
  {
    codigo: 7,
    Title: "Breaking Bad",
    Year: "2008–2013",
    Rated: "TV-14",
    Runtime: "49 min",
    Genre: "Crime, Drama, Thriller",
    Director: "N/A",
    Plot: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's financial future.",
    Poster: "https://m.media-amazon.com/images/M/MV5BMTQ0ODYzODc0OV5BMl5BanBnXkFtZTgwMDk3OTcyMDE@._V1_SX300.jpg",
    imdbRating: "9.5",
    ComingSoon: false,
  },
  {
    codigo: 8,
    Title: "Game of Thrones",
    Year: "2011–",
    Rated: "TV-MA",
    Runtime: "56 min",
    Genre: "Adventure, Drama, Fantasy",
    Director: "N/A",
    Plot: "While a civil war brews between several noble families in Westeros, the children of the former rulers of the land attempt to rise up to power.",
    Poster: "https://m.media-amazon.com/images/M/MV5BMjM5OTQ1MTY5Nl5BMl5BanBnXkFtZTgwMjM3NzMxODE@._V1_SX300.jpg",
    imdbRating: "9.5",
    ComingSoon: false,
  },
  {
    codigo: 9,
    Title: "Vikings",
    Year: "2013–",
    Rated: "TV-14",
    Runtime: "44 min",
    Genre: "Action, Drama, History",
    Director: "N/A",
    Plot: "The world of the Vikings is brought to life through the journey of Ragnar Lothbrok, the first Viking to emerge from Norse legend and onto the pages of history.",
    Poster: "https://m.media-amazon.com/images/M/MV5BOTEzNzI3MDc0N15BMl5BanBnXkFtZTgwMzk1MzA5NzE@._V1_SX300.jpg",
    imdbRating: "8.6",
    ComingSoon: false,
  },
  {
    codigo: 10,
    Title: "Doctor Strange",
    Year: "2016",
    Rated: "N/A",
    Runtime: "N/A",
    Genre: "Action, Adventure, Fantasy",
    Director: "Scott Derrickson",
    Plot: "After his career is destroyed, a brilliant but arrogant and conceited surgeon gets a new lease on life when a sorcerer takes him under her wing.",
    Poster: "https://m.media-amazon.com/images/M/MV5BNjgwNzAzNjk1Nl5BMl5BanBnXkFtZTgwMzQ2NjI1OTE@._V1_SX300.jpg",
    imdbRating: "N/A",
    ComingSoon: true,
  },
  {
    codigo: 11,
    Title: "Rogue One: A Star Wars Story",
    Year: "2016",
    Rated: "N/A",
    Runtime: "N/A",
    Genre: "Action, Adventure, Sci-Fi",
    Director: "Gareth Edwards",
    Plot: "The Rebellion makes a risky move to steal the plans to the Death Star, setting up the epic saga to follow.",
    Poster: "https://m.media-amazon.com/images/M/MV5BMjQyMzI2OTA3OF5BMl5BanBnXkFtZTgwNDg5NjQ0OTE@._V1_SX300.jpg",
    imdbRating: "N/A",
    ComingSoon: true,
  },
  {
    codigo: 12,
    Title: "Assassin's Creed",
    Year: "2016",
    Rated: "N/A",
    Runtime: "N/A",
    Genre: "Action, Adventure, Fantasy",
    Director: "Justin Kurzel",
    Plot: "When Callum Lynch explores the memories of his ancestor Aguilar and gains the skills of a Master Assassin, he discovers he is a descendant of the secret Assassins society.",
    Poster: "https://m.media-amazon.com/images/M/MV5BMTU2MTQwMjU1OF5BMl5BanBnXkFtZTgwMDA5NjU5ODE@._V1_SX300.jpg",
    imdbRating: "N/A",
    ComingSoon: true,
  },
];

export default function Index() {
  const [filmesEmCartaz, setFilmesEmCartaz] = useState<Filme[]>([]);
  const [lancamentos, setLancamentos] = useState<Filme[]>([]);

  useEffect(() => {
    // Separar filmes em cartaz e lançamentos
    const emCartaz = filmes.filter(filme => !filme.ComingSoon);
    const novosLancamentos = filmes.filter(filme => filme.ComingSoon);
    
    setFilmesEmCartaz(emCartaz);
    setLancamentos(novosLancamentos);
  }, []);

  const renderFilmeCard = (filme: Filme) => (
    <TouchableOpacity key={filme.codigo} style={styles.card}>
      <Image 
        source={{ uri: filme.Poster }} 
        style={styles.poster}
        defaultSource={require('../../assets/images/icon.png')} // Imagem padrão caso não carregue
        onError={() => console.log('Erro ao carregar imagem:', filme.Title)}
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{filme.Title}</Text>
        <Text style={styles.cardYear}>{filme.Year}</Text>
        <Text style={styles.cardGenre}>{filme.Genre}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐ {filme.imdbRating}</Text>
          {filme.ComingSoon && (
            <View style={styles.comingSoonBadge}>
              <Text style={styles.comingSoonText}>EM BREVE</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🎬 Cinema</Text>
        <Text style={styles.headerSubtitle}>Filmes em Cartaz</Text>
      </View>

      {/* Filmes em Cartaz */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📽️ Em Cartaz</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {filmesEmCartaz.map(renderFilmeCard)}
        </ScrollView>
      </View>

      {/* Lançamentos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🚀 Lançamentos</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {lancamentos.map(renderFilmeCard)}
        </ScrollView>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Total de filmes: {filmes.length}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#1a1a1a",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#E50914",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 18,
    color: "#fff",
    opacity: 0.8,
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 20,
    marginBottom: 15,
  },
  horizontalScroll: {
    paddingLeft: 20,
  },
  card: {
    width: 180,
    marginRight: 15,
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  poster: {
    width: "100%",
    height: 240,
    resizeMode: "cover",
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  cardYear: {
    fontSize: 14,
    color: "#E50914",
    marginBottom: 4,
  },
  cardGenre: {
    fontSize: 12,
    color: "#999",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rating: {
    fontSize: 14,
    color: "#ffd700",
    fontWeight: "bold",
  },
  comingSoonBadge: {
    backgroundColor: "#E50914",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  comingSoonText: {
    fontSize: 10,
    color: "#fff",
    fontWeight: "bold",
  },
  footer: {
    padding: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#666",
  },
});
