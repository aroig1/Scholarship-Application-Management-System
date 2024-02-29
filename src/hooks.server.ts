import {dev} from "$app/environment";

let env = {};

if (dev) {
    const {Miniflare} = await import("miniflare");

    const mf = new Miniflare({
        d1Databases: ["DB"],
        d1Persist: ".wrangler/state/v3/d1",
        modules: true,
        script: ""
    });
    env = await mf.getBindings();
}

export const handle = async ({event, resolve}) => {
    if (dev) {
        event.platform = {
            ...event.platform,
            env
        };
    }

    return resolve(event);
};
