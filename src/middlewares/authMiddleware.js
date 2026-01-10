import { checkAuthState, getSingleDoc } from '../server.js';

export const authMiddleware = async (ctx, next) => {
    ctx.user = await checkAuthState();
    ctx.hasUser = Boolean(ctx.user);
    if (ctx.hasUser){
        ctx.user.profile = await getSingleDoc('users', ctx.user.uid)
    }
    next();
};
