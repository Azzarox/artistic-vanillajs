import {
    getByQuery,
    getCollectionReference,
    getSingleDoc,
    postData,
    updateSingleDoc,
} from '../server';

const collectionName = 'likes';
const collectionReference = getCollectionReference(collectionName);

export const getAllPhotoLikes = async (ctx) => {
    return await getByQuery(
        collectionReference,
        'photoId',
        '==',
        ctx.params.id
    );
};

export const createLike = async (ev, ctx) => {
    ev.preventDefault();
    if (!ctx.photo.hasLiked) {
        postData(collectionReference, {
            photoId: ctx.params.id,
            userId: ctx.user.uid,
        });
        // updatePrice(ctx);
        ctx.page.redirect(`/details/${ctx.params.id}`);
    } else {
        return alert('You have already liked this image!');
    }
};

export const updatePrice = async (ctx) => {
    const photo = await getSingleDoc('photos', ctx.params.id);

    let newPrice = Number(photo.price)+ 0.5;
    updateSingleDoc('photos', ctx.params.id, {
        price: newPrice,
    });

};
