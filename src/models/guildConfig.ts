import mongoose, { Schema } from 'mongoose';
import { IGuildConfig } from '../utils/interface/database';

const GuildConfig: Schema = new Schema({
    id: { type: String, unique: true, required: true },
    channel: { type: String },
    webhook: { type: String },
});

const database = mongoose.model<IGuildConfig>('GuildConfig', GuildConfig);
export { database };
