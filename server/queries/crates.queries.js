import Crate from "../database/models/crate.model.js";

export const createCrate = (crate) => new Crate(crate).save();

export const findCrate = (id) => Crate.findOne({ id: id });

export const deleteCrate = (id) => Crate.findByIdAndDelete(id);

export const deleteAllCrates = () => Crate.deleteMany({});

export const updateCrate = (id, crate) => Crate.findByIdAndUpdate({ _id: id }, crate);

export const getAllCrates = () => Crate.find({});
