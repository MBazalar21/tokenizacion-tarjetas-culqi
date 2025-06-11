import mongoose from "mongoose";
import { ICard } from "./ICard";
import { ICardDoc } from "./ICardDoc";

export interface ICardModelInterface extends mongoose.Model<ICardDoc> {
    build(attr: ICard) : ICardDoc
}