/**
 * Booking Model
 * 
 * Modelo de dados para reservas/compras de assentos.
 */

import Database from '../config/database';

export interface Booking {
  id: number;
  userId: number;
  movieId: string;
  movieTitle: string;
  seatId: string;
  sessionFormat: string;
  sessionTime: string;
  price: number;
  status: 'active' | 'cancelled';
  createdAt: string;
}

export interface CreateBookingDTO {
  userId: number;
  movieId: string;
  movieTitle: string;
  seatId: string;
  sessionFormat: string;
  sessionTime: string;
  price?: number;
}

/**
 * Storage em memória para web
 */
const memoryBookings: Booking[] = [];
let nextBookingId = 1;

export class BookingModel {
  private db = Database.getInstance();

  /**
   * Cria uma nova reserva
   */
  async create(bookingData: CreateBookingDTO): Promise<Booking> {
    const database = this.db.getDatabase();

    // Fallback para web (in-memory)
    if (!database) {
      // Verifica se o assento já está reservado
      const existing = memoryBookings.find(
        b => b.movieId === bookingData.movieId &&
             b.seatId === bookingData.seatId &&
             b.sessionTime === bookingData.sessionTime &&
             b.status === 'active'
      );

      if (existing) {
        throw new Error('Assento já reservado para esta sessão');
      }

      const booking: Booking = {
        id: nextBookingId++,
        userId: bookingData.userId,
        movieId: bookingData.movieId,
        movieTitle: bookingData.movieTitle,
        seatId: bookingData.seatId,
        sessionFormat: bookingData.sessionFormat,
        sessionTime: bookingData.sessionTime,
        price: bookingData.price || 32.00,
        status: 'active',
        createdAt: new Date().toISOString(),
      };

      memoryBookings.push(booking);
      return booking;
    }

    // Verifica se o assento já está reservado
    const existing = await database.getFirstAsync(
      `SELECT * FROM bookings 
       WHERE movieId = ? AND seatId = ? AND sessionTime = ? AND status = 'active'`,
      [bookingData.movieId, bookingData.seatId, bookingData.sessionTime]
    ) as Booking | null;

    if (existing) {
      throw new Error('Assento já reservado para esta sessão');
    }

    // Insere a nova reserva
    const result = await database.runAsync(
      `INSERT INTO bookings (userId, movieId, movieTitle, seatId, sessionFormat, sessionTime, price) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        bookingData.userId,
        bookingData.movieId,
        bookingData.movieTitle,
        bookingData.seatId,
        bookingData.sessionFormat,
        bookingData.sessionTime,
        bookingData.price || 32.00
      ]
    );

    // Busca a reserva criada
    const booking = await database.getFirstAsync(
      'SELECT * FROM bookings WHERE id = ?',
      [result.lastInsertRowId]
    ) as Booking | null;

    if (!booking) {
      throw new Error('Erro ao criar reserva');
    }

    return booking;
  }

  /**
   * Busca todas as reservas de um usuário
   */
  async findByUserId(userId: number): Promise<Booking[]> {
    const database = this.db.getDatabase();

    // Fallback para web (in-memory)
    if (!database) {
      return memoryBookings.filter(b => b.userId === userId && b.status === 'active');
    }

    const bookings = await database.getAllAsync(
      `SELECT * FROM bookings WHERE userId = ? AND status = 'active' ORDER BY createdAt DESC`,
      [userId]
    ) as Booking[];

    return bookings;
  }

  /**
   * Busca reservas de uma sessão específica
   */
  async findBySession(movieId: string, sessionTime: string): Promise<Booking[]> {
    const database = this.db.getDatabase();

    // Fallback para web (in-memory)
    if (!database) {
      return memoryBookings.filter(
        b => b.movieId === movieId && 
             b.sessionTime === sessionTime && 
             b.status === 'active'
      );
    }

    const bookings = await database.getAllAsync(
      `SELECT * FROM bookings 
       WHERE movieId = ? AND sessionTime = ? AND status = 'active'`,
      [movieId, sessionTime]
    ) as Booking[];

    return bookings;
  }

  /**
   * Cancela uma reserva
   */
  async cancel(bookingId: number, userId: number): Promise<void> {
    const database = this.db.getDatabase();

    // Fallback para web (in-memory)
    if (!database) {
      const booking = memoryBookings.find(b => b.id === bookingId && b.userId === userId);
      if (booking) {
        booking.status = 'cancelled';
      }
      return;
    }

    await database.runAsync(
      `UPDATE bookings SET status = 'cancelled' WHERE id = ? AND userId = ?`,
      [bookingId, userId]
    );
  }

  /**
   * Cancela uma reserva por assento
   */
  async cancelBySeat(userId: number, movieId: string, seatId: string, sessionTime: string): Promise<void> {
    const database = this.db.getDatabase();

    // Fallback para web (in-memory)
    if (!database) {
      const booking = memoryBookings.find(
        b => b.userId === userId &&
             b.movieId === movieId &&
             b.seatId === seatId &&
             b.sessionTime === sessionTime &&
             b.status === 'active'
      );
      if (booking) {
        booking.status = 'cancelled';
      }
      return;
    }

    await database.runAsync(
      `UPDATE bookings SET status = 'cancelled' 
       WHERE userId = ? AND movieId = ? AND seatId = ? AND sessionTime = ? AND status = 'active'`,
      [userId, movieId, seatId, sessionTime]
    );
  }

  /**
   * Busca todas as reservas
   */
  async findAll(): Promise<Booking[]> {
    const database = this.db.getDatabase();

    // Fallback para web (in-memory)
    if (!database) {
      return memoryBookings;
    }

    const bookings = await database.getAllAsync(
      'SELECT * FROM bookings ORDER BY createdAt DESC'
    ) as Booking[];

    return bookings;
  }
}

