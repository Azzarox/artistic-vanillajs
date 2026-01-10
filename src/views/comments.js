import { serverTimestamp } from 'firebase/firestore';
import { html, nothing } from 'lit-html';
import { getCollectionReference, getSingleDoc, postData } from '../server';
import { errorTemplate } from '../templates/errorTemplate';
import { formDisplayError } from '../utils/formErrorDisplay';

const commentTemplate = (comment) => {
    return html`
        <li>
            <div class="user-avatar">
                <figure class="">
                    <img
                        src="${comment.creatorUser.photoUrl}"
                        class="user-image border"
                    />
                </figure>
                <div class="comment-title-wrapper">
                <p class="ml-2">${comment.creatorUser.username} says:</p>
                <p class="comment-timestamp">${comment.createdAt.toDate().toUTCString()}</p>
                </div>
            </div>
            <div class="comment-content">
                <p>${comment.content}</p>
            </div>
        </li>
    `;
};
export const commentsTemplate = (ctx) => {
    return html`
        <div class="comments">
            ${ctx.photo.comments == 0
                ? html`<p class="no-comments">No comments</p>`
                : html`
                      <ul>
                          ${ctx.photo.comments.map((comment) => {
                              return commentTemplate(comment);
                          })}
                      </ul>
                  `}
        </div>
    `;
};

export const commentForm = (ctx) => {
    if (ctx.hasUser && !ctx.photo.isOwner) {
        return html`
            <form
                id="form-visibility"
                action=""
                @submit=${(ev) => onSubmitComment(ev, ctx)}
            >
                ${errorTemplate()}
                <article class="media">
                    <figure class="media-left">
                        <p class="image is-64x64">
                            <img src="${ctx.user.profile.photoUrl}" />
                        </p>
                    </figure>

                    <div class="media-content">
                        <div class="field">
                            <p class="control">
                                <textarea
                                    class="textarea"
                                    placeholder="Add a comment..."
                                    name="content"
                                    id="comment"
                                ></textarea>
                            </p>
                        </div>
                        <div class="field">
                            <p class="control">
                                <button class="button">Post comment</button>
                            </p>
                        </div>
                    </div>
                </article>
            </form>

            <!-- <div class="comment-form">
                <form
                    @submit=${(ev) => onSubmitComment(ev, ctx)}
                    class="field control box"
                >
                    ${errorTemplate()}
                    <label for="comment"></label>
                    <textarea
                        class="textarea comment-textarea"
                        name="content"
                        id="comment"
                        cols="30"
                        rows="10"
                    ></textarea>
                    <div class="is-flex mt-3 is-justify-content-flex-start">
                        <button
                            class="button px-5 is-size-5 is-black"
                            type="submit"
                        >
                            Post
                        </button>
                    </div>
                </form>
            </div> -->
        `;
    }
};

export function commentFormHandler() {
    const commentForm = document.querySelector('#form-visibility');
    commentForm.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Scrolls to the element

    commentForm.style.visibility =
        commentForm.style.visibility == 'visible' ? 'hidden' : 'visible';
}

const collectionName = 'comments';
const collectionReference = getCollectionReference(collectionName);

async function onSubmitComment(ev, ctx) {
    ev.preventDefault();
    let target = ev.currentTarget;
    const data = Object.fromEntries(new FormData(ev.currentTarget));
    const commentCreatorUser = await getSingleDoc('users', ctx.user.uid);
    try {
        if (data.content == '') {
            throw new Error("Can't post an empty comment!");
        }

        postData(collectionReference, {
            content: data.content,
            photoId: ctx.params.id,
            creatorUser: commentCreatorUser,
            createdAt: serverTimestamp()
        });
        target.reset();
        ctx.page.redirect(`/details/${ctx.params.id}`);
    } catch (err) {
        formDisplayError(target, err, false);
    }
}
