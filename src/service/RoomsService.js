import roomsRepo from "../repo/RoomsRepo.js";

class RoomsService {

    async getRooms(filter) {
        return await roomsRepo.getRoomsByFilter(filter);
    }
}


const roomsService = new RoomsService();
export default roomsService;