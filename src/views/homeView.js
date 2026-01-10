import { html } from 'lit-html';

const homeTemplate = () => html`
    <section class="hero-image">
        <section class="hero-text">
        </section>
    </section>
`;
export const homeView = async (ctx) => {
    ctx.render(homeTemplate());
};
