import { render } from 'lit-html';
import { mainLayout } from '../templates/mainLayout.js';

const root = document.querySelector('#root');

const ctxRender = (ctx, templateResult) =>
    render(mainLayout(ctx, templateResult), root);
export const renderMiddleware = (ctx, next) => {
    ctx.render = ctxRender.bind(null, ctx);
    next();
};
