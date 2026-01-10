import { html } from 'lit-html';
import { getByQuery, getCollectionReference, updateSingleDoc } from '../server';
import { errorTemplate } from '../templates/errorTemplate';
import { formDisplayError } from '../utils/formErrorDisplay';
import { formFieldIsEmptyValidator } from '../utils/formFieldsValidator';
import { imageURLIsNotCorrectValidator } from '../utils/imageUrlValidator';

const profileTemplate = (ctx, myImages) => html`
    <section class="section container">
        <!-- <h2 class="title">Profile</h2> -->
        <div class="profile">
            <div class="profile-image-section">
                <figure class="image is-small">
                    <img
                        @click=${showProfileForm}
                        class="profile-image"
                        src="${ctx.user.profile.photoUrl}"
                        alt=""
                    />
                </figure>

                <form
                    @submit=${(ev) => updateUserProfile(ev, ctx)}
                    action="#"
                    method="POST"
                    class="profile-form"
                >
                    ${errorTemplate()}
                    <div class="update-user-profile">
                        <div class="field">
                            <div>
                                <label class="label">Username</label>
                                <input
                                    name="username"
                                    class="input"
                                    type="text"
                                    placeholder="Username"
                                    .value="${ctx.user.profile.username}"
                                />
                            </div>
                            <div>
                                <label class="label">Avatar</label>
                                <input
                                    name="photo"
                                    class="input"
                                    type="text"
                                    placeholder="Avatar"
                                    .value="${ctx.user.profile.photoUrl}"
                                />
                            </div>
                        </div>
                        <div class="control">
                            <button class="button width-100">Update</button>
                        </div>
                    </div>
                </form>
            </div>
            <div>
                <p class="is-size-3 my-2">${ctx.user.profile.username}</p>
            </div>
            <div>
                <p class="is-size-3">My images</p>
            </div>
        </div>
        ${myImagesTemplate(myImages)}
    </section>
`;

const myImagesTemplate = (myImages) => html`
    <section class="user-cards section">
        ${myImages.map(
            (image) => html`
                <div class="card">
                    <figure class="image">
                        <a href="/details/${image.id}">
                            <img
                                class="profile-card-image card-image"
                                src="${image.image}"
                                alt="Placeholder image"
                            />
                        </a>
                    </figure>
                </div>
            `
        )}
    </section>
`;

const collectionName = 'photos';
const collectionReference = getCollectionReference(collectionName);

export const profileView = async (ctx) => {
    const myImages = await getByQuery(
        collectionReference,
        'userId',
        '==',
        ctx.user.uid
    );
    ctx.render(profileTemplate(ctx, myImages));
};

async function updateUserProfile(ev, ctx) {
    ev.preventDefault();
    let target = ev.currentTarget;
    let formData = Object.fromEntries(new FormData(ev.currentTarget));
    try {
        if (formFieldIsEmptyValidator(formData)) {
            throw new Error('Empty Field!');
        }

        if (imageURLIsNotCorrectValidator(formData.photo)) {
            throw new Error('URL is not correct!');
        }

        updateSingleDoc('users', ctx.user.uid, {
            username: formData.username,
            photoUrl: formData.photo,
        });

        ctx.page.redirect('/profile');
    } catch (err) {
        formDisplayError(target, err, false);
    }
}

function showProfileForm(ev) {
    const profileForm = document.querySelector('.profile-form');
    profileForm.style.display =
        profileForm.style.display == 'block' ? 'none' : 'block';
}
