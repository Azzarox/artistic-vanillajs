import { html } from 'lit-html';

const homeTemplate = () => html`
    <section class="hero-image">
        <section class="hero-text">
        </section>
    </section>
    <!-- <section class="section container">
        <h2 class="title" style="text-align: center;">Art Sale</h2>
        <p class="title" style="text-align: center;">
            Hi, this is a site for selling and uploading photography
        </p>
        <img
            src="/images/logo.png"
            alt="home image of mountains and website name"
        />
    </section> -->
`;
export const homeView = async (ctx) => {
    ctx.render(homeTemplate());
};
