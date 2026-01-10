import { html } from 'lit-html';
import { onDeleteModal } from '../views/detailsView';

export const successfullyCreatedModal = () => html`
    <div id="modal-create" class="modal">
        <div class="modal-background"></div>
        <div class="modal-content opacity-8">
            <div class="modal-content-icon">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler circle-check"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <circle cx="12" cy="12" r="9"></circle>
                    <path d="M9 12l2 2l4 -4"></path>
                </svg>
            </div>
            <div class="modal-content-text">
                <h2>Successfully Created</h2>
                <p>You are being redirected...</p>
            </div>
        </div>
    </div>
`;

export const deleteModal = (ctx) => html`
    <div id="modal-delete" class="modal">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="model-content-icon-delete">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler circle-x"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <desc>
                        Download more icon variants from
                        https://tabler-icons.io/i/circle-x
                    </desc>
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <circle cx="12" cy="12" r="9"></circle>
                    <path d="M10 10l4 4m0 -4l-4 4"></path>
                </svg>
            </div>
            <div class="modal-content-text-delete">
                <p>Are you sure you want to delete?</p>
                <p>This action cannot be undone</p>
                <div
                    @click=${(ev) => onDeleteModal(ev, ctx)}
                    class="modal-delete-div-buttons"
                >
                    <button class="button delete-cancel">Cancel</button>
                    <button class="button is-danger delete-yes">Yes</button>
                </div>
            </div>
        </div>
    </div>
`;
