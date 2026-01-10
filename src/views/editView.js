import { html } from 'lit-html';
import { updateSingleDoc } from '../server';
import { errorTemplate } from '../templates/errorTemplate';
import { formDisplayError } from '../utils/formErrorDisplay';
import { formFieldIsEmptyValidator } from '../utils/formFieldsValidator';
import { imageURLIsNotCorrectValidator } from '../utils/imageUrlValidator';

const editTemplate = (ctx) => html` <section class="section container create">
    <section class="section container create">
        <h2 class="title">Edit</h2>
        <form @submit=${(ev) => onEdit(ev, ctx)} id="testform">
            ${errorTemplate()}
            <div class="field">
                <label class="label">Creator</label>
                <div class="control">
                    <input
                        class="input"
                        type="text"
                        name="creator"
                        .value=${ctx.photo.creator}
                    />
                </div>
            </div>

            <div class="field">
                <label class="label">Title</label>
                <div class="control">
                    <input
                        class="input"
                        type="text"
                        name="title"
                        .value=${ctx.photo.title}
                    />
                </div>
            </div>

            <div class="field">
                <label class="label">Image</label>
                <div class="control">
                    <input
                        class="input"
                        type="text"
                        name="image"
                        .value=${ctx.photo.image}
                    />
                </div>
            </div>
            <div class="field">
                <label class="label">Price</label>
                <div class="control">
                    <input
                        class="input"
                        type="number"
                        name="price"
                        .value=${ctx.photo.price}
                    />
                </div>
            </div>
            <div class="field">
                <label class="label">Description</label>
                <div class="control">
                    <textarea
                        class="width-100"
                        name="description"
                        id=""
                        cols="30"
                        rows="10"
                        .value=${ctx.photo.description}
                    ></textarea>
                </div>
            </div>

            <div class="control">
                <button class="button is-primary width-100">Submit</button>
            </div>
        </form>
    </section>
</section>`;

const collectionName = 'photos';
function onEdit(ev, ctx) {
    ev.preventDefault();
    let target = ev.currentTarget;
    const formData = Object.fromEntries(new FormData(ev.currentTarget));
    try {
        if (formFieldIsEmptyValidator(formData)) {
            throw new Error('Empty Fields!');
        }

        if (imageURLIsNotCorrectValidator(formData.image)) {
            throw new Error('Image URL is not correct!');
        }

        updateSingleDoc(collectionName, ctx.params.id, formData);
        ctx.page.redirect(`/details/${ctx.params.id}`);
    } catch (err) {
        formDisplayError(target, err);
    }
}

export const editView = async (ctx) => {
    ctx.render(editTemplate(ctx));
};
