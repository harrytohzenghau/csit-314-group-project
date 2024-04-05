const Room = require("../../models/room.model");

module.exports = {
    create: async (req, res) => {
        const { name, size, capacity } = req.body;
        const { type, floor, unit } = req.body.location;
        const { allSlots } = req.body;
        const { available } = req.body;

        const schedules = [];

        for (let i = 0; i < allSlots.length; i++) {
            schedules.push({
                days: [],
                timeSlots: [],
            });

            const days = allSlots[i].availDays;
            for (let j = 0; j < days.length; j++) {
                schedules[i].days.push(days[j]);
            }

            const timeSlots = allSlots[i].timeSlots;
            for (let j = 0; j < timeSlots.length; j++) {
                const timeSlot = {
                    start: timeSlots[j].start,
                    end: timeSlots[j].end,
                    price: timeSlots[j].price,
                    promo: timeSlots[j].promo,
                };
                schedules[i].timeSlots.push(timeSlot);
            }
        }

        const newRoom = await Room({
            details: {
                name,
                size,
                capacity,
                available,
            },
            location: {
                type,
                floor,
                unit,
            },
            schedules: schedules,
        });
        await newRoom.save();
        res.json(true);
    },
    allRooms: async (req, res) => {
        const allRooms = await Room.find();
        res.json(allRooms);
    },
    makeRoomAvail: async (req, res) => {
        const { id } = req.body;
        const room = await Room.findById(id);

        if (!room.details.available) {
            room.details.available = true;
        } else {
            room.details.available = false;
        }
        room.save();
    },
    deleteRoom: async (req, res) => {
        const { id } = req.body;
        await Room.findByIdAndDelete(id);
        res.json(true);
    },
    updateRoom: async (req, res) => {
        const { _id } = req.body;
        await Room.findByIdAndUpdate(_id, req.body);
    },
};
