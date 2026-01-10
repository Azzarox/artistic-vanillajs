import { logOutUser } from "../server"

export const signOutView = (ctx) => {
    logOutUser();
    ctx.page.redirect('/')
}