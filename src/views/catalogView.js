import { html } from '../../node_modules/lit-html/lit-html.js';
import { getCollectionReference, getData } from '../server.js';
export const catalogTemplate = (ctx, photos) => html`
    <section class="section container">
        <!-- <h2 class="title">Catalog</h2> -->

        <div class="catalog-flex">
            ${photos.map((picture) => {
                picture.price = Number(picture.price).toFixed(2);

                return html`
                    <div class="card catalog-card">
                        <div data-id="${picture.id}" class="card-image">
                            <figure class="image">
                                <img
                                    class="card-image"
                                    src="${picture.image}"
                                />
                            </figure>
                        </div>
                        <div
                            class="is-grouped is-flex is-flex-direction-column"
                        >
                            <div class="card-content">
                                <h2 class="picture-title">${picture.title}</h2>
                                <p class="picture-creator">
                                    By: ${picture.creator}
                                </p>
                                <p class="picture-price">
                                    Price: ${picture.price}$
                                </p>
                            </div>

                            <a
                                href="/details/${picture.id
                                    ? picture.id
                                    : picture.objectID}"
                                class="button details-color details-btn"
                            >
                                Details
                            </a>
                        </div>
                    </div>
                `;
            })}
        </div>
    </section>
`;

const collectionName = 'photos';
const collectionReference = getCollectionReference(collectionName);

export const catalogView = async (ctx) => {
    let photos = await getData(collectionReference);
    // let photos = await getByQuery(collectionReference, "price", ">", "10");
    // let photos = await getByOrderedQuery(
    //     collectionReference,
    //     'price',
    //     '>=',
    //     '10'
    // );
    ctx.render(catalogTemplate(ctx, photos));
};
