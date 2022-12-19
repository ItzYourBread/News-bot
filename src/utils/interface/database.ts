import { Document } from 'mongoose';

export interface IGuildConfig extends Document {
    id: string;
    channel: string;
    webhook: string;
}
