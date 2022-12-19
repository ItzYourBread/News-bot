import mongoose from 'mongoose';
import { IGuildConfig } from '../utils/interface/database';
declare const database: mongoose.Model<IGuildConfig, {}, {}, {}, any>;
export { database };
