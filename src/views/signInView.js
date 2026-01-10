import { html } from 'lit-html';
import { logInUser } from '../server';
import { errorTemplate } from '../templates/errorTemplate';
import { formDisplayError } from '../utils/formErrorDisplay';
import { formFieldIsEmptyValidator } from '../utils/formFieldsValidator';

const signInTemplate = (ctx) => html`
    <section class="section container">
        <h2 class="title">Sign in</h2>

        <form @submit=${(ev) => onSignIn(ev,ctx)}>
        <!-- Display Error Field -->
            ${errorTemplate()}

            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input class="input" name="email" type="email" />
                </div>
            </div>

            <div class="field">
                <label class="label">Password:</label>
                <div class="control">
                    <input class="input" name="password" type="password" />
                </div>
            </div>

            <div
                class="control is-flex is-flex-direction-column is-justify-content-center"
            >
                <button class="button is-primary">Sign In</button>
                <div>
                    <p class="pt-2">
                        You don't have an account yet?
                        <a href="/sign-up">Sign Up</a>
                    </p>
                </div>
            </div>
        </form>
    </section>
`;
export const signInView = async (ctx) => {
    ctx.render(signInTemplate(ctx));
};

async function onSignIn(ev,ctx) {
    ev.preventDefault();
    const target = ev.currentTarget;
    const formData = Object.fromEntries(new FormData(ev.currentTarget));
    try {
        if (formFieldIsEmptyValidator(formData)) {
            throw new Error('Empty Fields!');
        }
        const user = await logInUser(formData.email, formData.password);
        ctx.page.redirect('/')
    } catch (err) {
        formDisplayError(target, err);

        // console.log(err.message);
        // console.log(err.name);
    }

    // ev.target.reset();
    //NOTE: To check with localStorage.

}
