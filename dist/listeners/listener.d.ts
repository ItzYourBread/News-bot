import { ready } from './listenerList/ready';
import { interactionCreate } from './listenerList/interactionCreate';
import { shardReady } from './listenerList/shardReady';
declare const _default: {
    ready: typeof ready;
    shardReady: typeof shardReady;
    interactionCreate: typeof interactionCreate;
};
export default _default;
