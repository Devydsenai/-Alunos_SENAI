/**
 * Booking Controller
 * 
 * Controller para gerenciar reservas de assentos
 */

import { BookingModel, CreateBookingDTO } from '../models/Booking.model';

export class BookingController {
  private bookingModel = new BookingModel();

  /**
   * Cria uma nova reserva
   */
  async create(bookingData: CreateBookingDTO) {
    try {
      const booking = await this.bookingModel.create(bookingData);
      return {
        success: true,
        data: booking,
        message: 'Reserva realizada com sucesso!',
      };
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao criar reserva');
    }
  }

  /**
   * Busca todas as reservas de um usuário
   */
  async getByUserId(userId: number) {
    try {
      const bookings = await this.bookingModel.findByUserId(userId);
      return {
        success: true,
        data: bookings,
      };
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao buscar reservas');
    }
  }

  /**
   * Busca reservas de uma sessão específica
   */
  async getBySession(movieId: string, sessionTime: string) {
    try {
      const bookings = await this.bookingModel.findBySession(movieId, sessionTime);
      return {
        success: true,
        data: bookings,
      };
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao buscar reservas da sessão');
    }
  }

  /**
   * Cancela uma reserva
   */
  async cancel(bookingId: number, userId: number) {
    try {
      await this.bookingModel.cancel(bookingId, userId);
      return {
        success: true,
        message: 'Reserva cancelada com sucesso!',
      };
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao cancelar reserva');
    }
  }

  /**
   * Cancela uma reserva por assento
   */
  async cancelBySeat(userId: number, movieId: string, seatId: string, sessionTime: string) {
    try {
      await this.bookingModel.cancelBySeat(userId, movieId, seatId, sessionTime);
      return {
        success: true,
        message: 'Reserva cancelada com sucesso!',
      };
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao cancelar reserva');
    }
  }

  /**
   * Lista todas as reservas
   */
  async getAll() {
    try {
      const bookings = await this.bookingModel.findAll();
      return {
        success: true,
        data: bookings,
      };
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao buscar reservas');
    }
  }
}

