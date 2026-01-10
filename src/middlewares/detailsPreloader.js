import { orderBy, query } from 'firebase/firestore';
import {
    getByLimitedOrderQuery,
    getByOrderedQuery,
    getByQuery,
    getCollectionReference,
    getSingleDoc,
} from '../server';
import { getAllPhotoLikes } from '../views/likes';

const collectionName = 'comments';
const collectionReference = getCollectionReference(collectionName);

export const detailsPreloader = async (ctx, next) => {
    ctx.photo = await getSingleDoc('photos', ctx.params.id);
    ctx.photo.isOwner = ctx.hasUser && ctx.photo.userId == ctx.user.uid;

    // Making the price to appear with 2 digits after decimal
    ctx.photo.price = Number(ctx.photo.price).toFixed(2);

    ctx.photo.comments = await getByOrderedQuery(
        collectionReference,
        'photoId',
        '==',
        ctx.params.id,
        'createdAt',
        'desc'
    );

    ctx.photo.likes = (await getAllPhotoLikes(ctx)).length;

    let likes = await getAllPhotoLikes(ctx);
    ctx.photo.hasLiked = ctx.user
        ? likes.some((like) => like.userId == ctx.user.uid)
        : false;

    ctx.photo.showLikeButton =
        !ctx.photo.hasLiked && !ctx.photo.isOwner && ctx.hasUser;
    next();
};
