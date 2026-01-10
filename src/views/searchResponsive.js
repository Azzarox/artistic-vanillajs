import { html } from 'lit-html';
import { getSearchData } from '../searchUI';
import { catalogTemplate, catalogView } from './catalogView';

//
const searchTemplateResponsive = (ctx, searchPhotos) => html`
    <section class="section">
        <form @submit=${(ev) => onSubmitSearch(ev, ctx)}>
            <div class="panel-block">
                <p class="control has-icons-left">
                    <input
                        class="input"
                        type="text"
                        name="search"
                        placeholder="Search"
                    />
                    <span class="icon is-left">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler search-phone"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <desc>
                                Download more icon variants from
                                https://tabler-icons.io/i/search
                            </desc>
                            <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                            ></path>
                            <circle cx="10" cy="10" r="7"></circle>
                            <line x1="21" y1="21" x2="15" y2="15"></line>
                        </svg>
                    </span>
                </p>
            </div>
        </form>

        ${searchPhotos.length == 0
            ? html`
            
            <p class="no-results-search">There are no results.</p>`
            : catalogTemplate(ctx, searchPhotos)}
    </section>
`;

export const searchViewResponsive = (ctx) => {
    ctx.render(searchTemplateResponsive(ctx, []));
};

async function onSubmitSearch(ev, ctx) {
    ev.preventDefault();
    let target = ev.currentTarget;
    let formData = Object.fromEntries(new FormData(ev.currentTarget));
    const searchPhotos = await getSearchData(formData.search);
    // console.log(searchPhotos);
    target.reset();
    ctx.render(searchTemplateResponsive(ctx, searchPhotos));
}
