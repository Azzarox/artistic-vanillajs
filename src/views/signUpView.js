import { html } from 'lit-html';
import { createUser, setSingleDoc } from '../server';
import { errorTemplate } from '../templates/errorTemplate';
import { formDisplayError } from '../utils/formErrorDisplay';
import { formFieldIsEmptyValidator } from '../utils/formFieldsValidator';
import { imageURLIsNotCorrectValidator } from '../utils/imageUrlValidator';

const signUpTemplate = (ctx) => html`
    <section class="section container sign-up">
        <h2 class="title">Sign up</h2>

        <form @submit=${(ev) => onSignUp(ev, ctx)}>
            ${errorTemplate()}

            <div class="field">
                <label class="label">Username</label>
                <div class="control">
                    <input class="input" name="username" type="text" />
                </div>
            </div>

            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input class="input" name="email" type="email" />
                </div>
            </div>

            <div class="field photo">
                <label class="label">Profile Image URL</label>
                <div class="control">
                    <input class="input" name="photo" type="text" />
                </div>
            </div>

            <div class="field" >
                <label class="label">Password</label>
                <p class="info-message"></p>
                <div class="control">
                    <input class="input" name="password" type="password" @keyup=${keyPressEventHandler} />
                </div>
            </div>
            <div class="field">
                <label class="label">Confirm Password</label>
                <div class="control">
                    <input class="input" name="repass" type="password" />
                </div>
            </div>

            <div
                class="control is-flex is-flex-direction-column is-justify-content-center"
            >
                <button class="button is-primary">Sign Up</button>
                <p class="pt-2">
                    You already have an account? <a href="/sign-in">Sign In</a>
                </p>
            </div>
        </form>
    </section>
`;
export const signUpView = async (ctx) => {
    ctx.render(signUpTemplate(ctx));
};

async function onSignUp(ev, ctx) {
    ev.preventDefault();
    const target = ev.currentTarget;
    const formData = Object.fromEntries(new FormData(ev.currentTarget));
    // ev.target.reset();

    // NOTE: Doesn't include photo since it could be empty
    const toValidateFields = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        repass: formData.repass,
    };

    try {
        if (formFieldIsEmptyValidator(toValidateFields)) {
            throw new Error('Empty Fields');
        }

        if (formData.photo !== "" && imageURLIsNotCorrectValidator(formData.photo)) {
            throw new Error('Image url is not correct!');
        }

        const user = await createUser(formData.email, formData.password);
        user.displayName = formData.username;
        // user.photoURL = formData.photo;
        
        user.photoURL = formData.photo == "" ? '/images/default-image.jpg' : formData.photo

        // NOTE: Creates 'users' collection in the database with more general fields like profile image and such

        const docInfo = await setSingleDoc('users', user.uid, {
            username: user.displayName,
            photoUrl: user.photoURL,
            email: user.email,
        });
        ctx.page.redirect('/');
    } catch (err) {
        formDisplayError(target, err);
    }

    // setUserPropsToLocalStorage(user)
    //NOTE: To check with localStorage.
}


function keyPressEventHandler(ev){
    const infoMessage = document.querySelector('.info-message');
    infoMessage.style.display = ev.target.value.length >= 6 ? 'none' : 'block';
}