/**
 * MovieCard Component
 * 
 * Componente especializado para exibir informações de filmes
 * com layout profissional e interativo.
 */

import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { BorderRadius, Colors, Shadows, Spacing, Typography } from '../../constants/theme';

interface MovieCardProps {
  title: string;
  posterPath: string;
  rating?: number;
  onPress?: () => void;
}

/**
 * Card para exibir informações de um filme
 * 
 * @param title - Título do filme
 * @param posterPath - URL do poster do filme
 * @param rating - Classificação do filme (0-10)
 * @param onPress - Função chamada ao pressionar o card
 */
export function MovieCard({ title, posterPath, rating, onPress }: MovieCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.container}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: posterPath }}
          style={styles.image}
          resizeMode="cover"
        />
        
        {/* Gradiente overlay na parte inferior */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        >
          <Text numberOfLines={2} style={styles.title}>
            {title}
          </Text>
          
          {rating && (
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingIcon}>⭐</Text>
              <Text style={styles.rating}>{rating.toFixed(1)}</Text>
            </View>
          )}
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: Spacing.md,
    ...Shadows.medium,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 2 / 3,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    backgroundColor: Colors.lightSecondary,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.md,
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: Colors.light,
    marginBottom: Spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  ratingIcon: {
    fontSize: Typography.sizes.sm,
  },
  rating: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: Colors.light,
  },
});

