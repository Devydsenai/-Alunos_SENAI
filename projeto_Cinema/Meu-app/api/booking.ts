/**
 * Booking API
 * 
 * API client para gerenciar reservas de assentos
 */

import { BookingController } from './src/controllers/booking.controller';
import type { Booking, CreateBookingDTO } from './src/models/Booking.model';

const bookingController = new BookingController();

/**
 * Cria uma nova reserva de assento
 */
export async function createBooking(bookingData: CreateBookingDTO): Promise<Booking> {
  try {
    const result = await bookingController.create(bookingData);
    return result.data;
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao criar reserva');
  }
}

/**
 * Busca todas as reservas de um usuário
 */
export async function getUserBookings(userId: number): Promise<Booking[]> {
  try {
    const result = await bookingController.getByUserId(userId);
    return result.data;
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao buscar reservas');
  }
}

/**
 * Busca reservas de uma sessão específica
 */
export async function getSessionBookings(movieId: string, sessionTime: string): Promise<Booking[]> {
  try {
    const result = await bookingController.getBySession(movieId, sessionTime);
    return result.data;
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao buscar reservas da sessão');
  }
}

/**
 * Cancela uma reserva específica
 */
export async function cancelBooking(bookingId: number, userId: number): Promise<void> {
  try {
    await bookingController.cancel(bookingId, userId);
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao cancelar reserva');
  }
}

/**
 * Cancela uma reserva por assento
 */
export async function cancelBookingBySeat(
  userId: number,
  movieId: string,
  seatId: string,
  sessionTime: string
): Promise<void> {
  try {
    await bookingController.cancelBySeat(userId, movieId, seatId, sessionTime);
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao cancelar reserva');
  }
}

/**
 * Busca todas as reservas
 */
export async function getAllBookings(): Promise<Booking[]> {
  try {
    const result = await bookingController.getAll();
    return result.data;
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao buscar reservas');
  }
}

