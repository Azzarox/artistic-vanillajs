import { html } from '../../node_modules/lit-html/lit-html.js';
import { navigationTemplate } from './navigationTemplate.js';
export const mainLayout = (ctx, templateResult) => html`
    <header class="nav">
        ${navigationTemplate(ctx)}
    </header>
    <main>
        ${templateResult}
    </main>
    <footer>

    </footer>
`;
