import { html, nothing } from 'lit-html';
import { deleteData } from '../server';
import { deleteModal } from '../templates/modalTemplates';
import { setDynamicHeight } from '../utils/resizeCommentsDivHeight';
import { commentForm, commentFormHandler, commentsTemplate } from './comments';
import { allLikes, createLike, getAllPhotoLikes } from './likes';

const showEditDeleteButtons = (ctx, onDelete) => {
    if (ctx.photo.isOwner) {
        return html`
            <a
                href="/details/edit/${ctx.photo.id}"
                class="button is-info is-light"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-edit"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path
                        d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3"
                    ></path>
                    <path
                        d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3"
                    ></path>
                    <line x1="16" y1="5" x2="19" y2="8"></line>
                </svg>
                <span>Edit</span>
            </a>
            <a
                @click=${enableDeleteModal}
                href="javascript:void(0)"
                class="button is-danger is-light"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-trash"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <line x1="4" y1="7" x2="20" y2="7"></line>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                    <path
                        d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"
                    ></path>
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                </svg>
                <span>Delete</span></a
            >
        `;
    } else {
        return nothing;
    }
};

const showCommentButton = (ctx) => {
    if (ctx.hasUser && !ctx.photo.isOwner) {
        return html`
            <a
                @click=${commentFormHandler}
                id="comment-form-toggle"
                class="button is-info is-light"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-message-circle-2"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1"></path>
                    <line x1="12" y1="12" x2="12" y2="12.01"></line>
                    <line x1="8" y1="12" x2="8" y2="12.01"></line>
                    <line x1="16" y1="12" x2="16" y2="12.01"></line>
                </svg>
                <span>Comment</span>
            </a>
        `;
    }
};


const detailsTemplate = (ctx, onDelete) => html`
    <section class="section container">
        ${deleteModal(ctx)}

        <p class="title my-2">${ctx.photo.title}</p>
        <div class="details-container">
            <div class="left-details">
                
                <img @load=${() => setDynamicHeight()} class="details-image" src="${ctx.photo.image}" alt="" />
            </div>
            <div class="right-details">
                ${commentsTemplate(ctx)}
                <div class="button-group">
                    <div class="button-group-likes">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-heart"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                            ></path>
                            <path
                                d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"
                            ></path>
                        </svg>
                        <p>
                            Likes:
                            ${ctx.photo.likes ? html`${ctx.photo.likes}` : 0}
                        </p>
                    </div>
                    <div class="buttons">
                        ${ctx.photo.showLikeButton
                            ? html` <a
                                  @click=${(ev) => createLike(ev, ctx)}
                                  href="#"
                                  class="button is-success is-light"
                              >
                                  <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      class="icon icon-tabler icon-tabler-heart"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      stroke-width="2"
                                      stroke="currentColor"
                                      fill="none"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                  >
                                      <path
                                          stroke="none"
                                          d="M0 0h24v24H0z"
                                          fill="none"
                                      ></path>
                                      <path
                                          d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"
                                      ></path>
                                  </svg>
                                  <span>Like</span>
                              </a>`
                            : nothing}
                        ${showCommentButton(ctx)}
                        ${showEditDeleteButtons(ctx, onDelete)}
                    </div>
                </div>
            </div>
        </div>

        <div class="price">
            <p class="is-size-5">Price: ${ctx.photo.price}$</p>
        </div>
        <div class="description my-5">
            <div class="description-text-container">
                <p class="description-text">${ctx.photo.description}</p>
            </div>
        </div>
        ${commentForm(ctx)}
    </section>
`;

const collectionName = 'photos';

export const detailsView = async (ctx) => {
    ctx.render(detailsTemplate(ctx));
};

const enableDeleteModal = (ev) => {
    const modal = document.querySelector('#modal-delete');
    modal.classList.add('is-active');
};

export function onDeleteModal(ev, ctx) {
    const modal = document.querySelector('#modal-delete');
    if (ev.target.tagName == 'BUTTON') {
        if (ev.target.textContent == 'Yes') {
            deleteData(collectionName, ctx.params.id);
            // NOTE: If catalog page > details > delete -> to redirect back to the catalog
            // If profile > details > delete -> to redirect back to the profile
            window.history.back() 
            // ctx.page.redirect('/catalog');
        } else {
            modal.classList.remove('is-active');
            ctx.page.redirect(`/details/${ctx.params.id}`);
        }
    }
}
