import { html } from 'lit-html';
import { getSearchData } from '../searchUI';
import { getByQuery, getCollectionReference } from '../server';
import { catalogTemplate } from './catalogView';

export const searchFormTemplate = (ctx) => html`
    <form
        @submit=${(ev) => onSubmitSearch(ev, ctx)}
        class="search-form is-flex is-flex-direction-row-reverse"
    >
        <button type="" class="search-icon-link">
            <a @click=${showInputField} href="javascript:void(0)"
                ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="ml-3 icon icon-tabler icon-tabler-search"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    style="color: #95685ce3"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <circle cx="10" cy="10" r="7"></circle>
                    <line x1="21" y1="21" x2="15" y2="15"></line>
                </svg>
            </a>
        </button>
        <input type="text" name="search" class="search-input-field" />
    </form>
`;

let collectionName = 'photos';
let colRef = getCollectionReference(collectionName);

async function onSubmitSearch(ev, ctx) {
    ev.preventDefault();
    let target = ev.currentTarget;
    let formData = Object.fromEntries(new FormData(ev.currentTarget));
    const searchPhotos = await getSearchData(formData.search);
    target.reset();
    ctx.render(catalogTemplate(ctx, searchPhotos));
}

function showInputField(ev) {
    const searchInputField = document.querySelector('.search-input-field');
    searchInputField.style.display = 'block';
}
