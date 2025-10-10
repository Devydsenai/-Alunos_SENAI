import React, { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView } from 'react-native';
import * as cores from '../../../styles/cores';
import { api } from '../services/api';
import * as S from './SignupScreen.styles';

export default function Cadastro() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    Title: '',
    Year: '',
    Rated: '',
    Released: '',
    Runtime: '',
    Genre: '',
    Director: '',
    Writer: '',
    Actors: '',
    Plot: '',
    Language: '',
    Country: '',
    Awards: '',
    Poster: '',
    imdbRating: '',
    ComingSoon: false,
  });

  const handleSubmit = async () => {
    // Validações
    if (!form.Title || !form.Year || !form.Genre || !form.Director) {
      Alert.alert('Erro', 'Preencha os campos obrigatórios: Título, Ano, Gênero e Diretor');
      return;
    }

    try {
      setLoading(true);
      await api.criarFilme(form);
      Alert.alert('Sucesso!', 'Filme cadastrado com sucesso!', [
        {
          text: 'OK',
          onPress: () => {
            // Limpar formulário
            setForm({
              Title: '',
              Year: '',
              Rated: '',
              Released: '',
              Runtime: '',
              Genre: '',
              Director: '',
              Writer: '',
              Actors: '',
              Plot: '',
              Language: '',
              Country: '',
              Awards: '',
              Poster: '',
              imdbRating: '',
              ComingSoon: false,
            });
          },
        },
      ]);
    } catch (error) {
      console.error('Erro ao cadastrar filme:', error);
      Alert.alert('Erro', 'Não foi possível cadastrar o filme. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Container>
      <S.Header>
        <S.HeaderTitle>➕ Cadastrar Novo Filme</S.HeaderTitle>
        <S.HeaderSubtitle>Preencha as informações do filme</S.HeaderSubtitle>
      </S.Header>

      <ScrollView showsVerticalScrollIndicator={false}>
        <S.Form>
          {/* Título */}
          <S.FormGroup>
            <S.Label>Título *</S.Label>
            <S.Input
              placeholder="Ex: O Poderoso Chefão"
              placeholderTextColor={cores.cinzaTexto}
              value={form.Title}
              onChangeText={(text: string) => setForm({ ...form, Title: text })}
            />
          </S.FormGroup>

          {/* Ano */}
          <S.FormGroup>
            <S.Label>Ano *</S.Label>
            <S.Input
              placeholder="Ex: 2024"
              placeholderTextColor={cores.cinzaTexto}
              value={form.Year}
              onChangeText={(text: string) => setForm({ ...form, Year: text })}
              keyboardType="numeric"
            />
          </S.FormGroup>

          {/* Gênero */}
          <S.FormGroup>
            <S.Label>Gênero *</S.Label>
            <S.Input
              placeholder="Ex: Ação, Aventura, Drama"
              placeholderTextColor={cores.cinzaTexto}
              value={form.Genre}
              onChangeText={(text: string) => setForm({ ...form, Genre: text })}
            />
          </S.FormGroup>

          {/* Diretor */}
          <S.FormGroup>
            <S.Label>Diretor *</S.Label>
            <S.Input
              placeholder="Ex: Christopher Nolan"
              placeholderTextColor={cores.cinzaTexto}
              value={form.Director}
              onChangeText={(text: string) => setForm({ ...form, Director: text })}
            />
          </S.FormGroup>

          {/* Classificação */}
          <S.FormGroup>
            <S.Label>Classificação</S.Label>
            <S.Input
              placeholder="Ex: PG-13, R, PG"
              placeholderTextColor={cores.cinzaTexto}
              value={form.Rated}
              onChangeText={(text: string) => setForm({ ...form, Rated: text })}
            />
          </S.FormGroup>

          {/* Duração */}
          <S.FormGroup>
            <S.Label>Duração</S.Label>
            <S.Input
              placeholder="Ex: 120 min"
              placeholderTextColor={cores.cinzaTexto}
              value={form.Runtime}
              onChangeText={(text: string) => setForm({ ...form, Runtime: text })}
            />
          </S.FormGroup>

          {/* Escritor */}
          <S.FormGroup>
            <S.Label>Escritor(es)</S.Label>
            <S.Input
              placeholder="Ex: Jonathan Nolan, Christopher Nolan"
              placeholderTextColor={cores.cinzaTexto}
              value={form.Writer}
              onChangeText={(text: string) => setForm({ ...form, Writer: text })}
            />
          </S.FormGroup>

          {/* Atores */}
          <S.FormGroup>
            <S.Label>Atores Principais</S.Label>
            <S.Input
              placeholder="Ex: Leonardo DiCaprio, Kate Winslet"
              placeholderTextColor={cores.cinzaTexto}
              value={form.Actors}
              onChangeText={(text: string) => setForm({ ...form, Actors: text })}
            />
          </S.FormGroup>

          {/* Sinopse */}
          <S.FormGroup>
            <S.Label>Sinopse</S.Label>
            <S.TextArea
              placeholder="Descreva a história do filme..."
              placeholderTextColor={cores.cinzaTexto}
              value={form.Plot}
              onChangeText={(text: string) => setForm({ ...form, Plot: text })}
              multiline
              numberOfLines={4}
            />
          </S.FormGroup>

          {/* Idioma */}
          <S.FormGroup>
            <S.Label>Idioma</S.Label>
            <S.Input
              placeholder="Ex: English, Portuguese"
              placeholderTextColor={cores.cinzaTexto}
              value={form.Language}
              onChangeText={(text: string) => setForm({ ...form, Language: text })}
            />
          </S.FormGroup>

          {/* País */}
          <S.FormGroup>
            <S.Label>País</S.Label>
            <S.Input
              placeholder="Ex: USA, Brazil"
              placeholderTextColor={cores.cinzaTexto}
              value={form.Country}
              onChangeText={(text: string) => setForm({ ...form, Country: text })}
            />
          </S.FormGroup>

          {/* URL do Poster */}
          <S.FormGroup>
            <S.Label>URL do Poster</S.Label>
            <S.Input
              placeholder="https://..."
              placeholderTextColor={cores.cinzaTexto}
              value={form.Poster}
              onChangeText={(text: string) => setForm({ ...form, Poster: text })}
            />
          </S.FormGroup>

          {/* Avaliação IMDB */}
          <S.FormGroup>
            <S.Label>Avaliação IMDB</S.Label>
            <S.Input
              placeholder="Ex: 8.5"
              placeholderTextColor={cores.cinzaTexto}
              value={form.imdbRating}
              onChangeText={(text: string) => setForm({ ...form, imdbRating: text })}
              keyboardType="decimal-pad"
            />
          </S.FormGroup>

          {/* Em Breve */}
          <S.CheckboxGroup>
            <S.Checkbox
              onPress={() => setForm({ ...form, ComingSoon: !form.ComingSoon })}
            >
              {form.ComingSoon && <S.CheckboxChecked>✓</S.CheckboxChecked>}
            </S.Checkbox>
            <S.CheckboxLabel>Marcar como "Em Breve"</S.CheckboxLabel>
          </S.CheckboxGroup>

          {/* Botão de Enviar */}
          <S.SubmitButton onPress={handleSubmit} disabled={loading}>
            {loading ? (
              <ActivityIndicator color={cores.brancoTotal} />
            ) : (
              <S.SubmitButtonText>Cadastrar Filme</S.SubmitButtonText>
            )}
          </S.SubmitButton>

          <S.InfoText>* Campos obrigatórios</S.InfoText>
        </S.Form>

        <S.FooterSpace />
      </ScrollView>
    </S.Container>
  );
}

