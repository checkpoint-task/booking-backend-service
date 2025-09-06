import bookingsRepo from "../repo/BookingsRepo.js";


class BookingsService {

    async bookRoom(roomId, userId, startDate, endDate) {
        return await bookingsRepo.createBooking(roomId, userId, startDate, endDate);
    }
}


const bookingsService = new BookingsService();
export default bookingsService;