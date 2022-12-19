import { Client, CommandInteraction } from 'eris';
declare const _default: {
    data: {
        name: string;
        description: string;
    };
    run: (client: Client, interaction: CommandInteraction) => Promise<import("eris").Message<import("eris").TextableChannel>>;
};
export default _default;
