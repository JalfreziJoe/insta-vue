import * as fb from '../hooks/useFirebase.js';
import store from '../store/index.js';

export async function getUserFollowingPhotos(userId, following) {
    const res = await fb.photosCollection.where('userId', 'in', following).get();
    //console.log('get photos');
    //console.dir(res.docs);
    //console.dir(res.docs[0].data());
    const followedPhotos = res.docs.map(item => {
        return {
            ...item.data(),
            docId: item.id,
        };
    });
    // do another map of followedPhotos in a await Promise.all
    const details = await Promise.all(
        followedPhotos.map(async item => {
            // let userLikedPhoto and see if mapitem.likes.includes(userId). Set true/false
            let userLikedPhoto = false;
            if (item.likes.includes(userId)) {
                userLikedPhoto = true;
            }
            // const user = firebase userCollection.where(userId == photo.userId).get()
            const user = await getUserById(item.userId);
            // console.dir(user);
            const username = user.username;
            // return {username, ...mapitem, userLikedPhoto}
            return { username, ...item, userLikedPhoto };
        })
    );
    // photos = array of each map;
    details.sort((a, b) => {
        b.dateCreated - a.dateCreated;
    });
    return details;
}

export async function getUserById(id) {
    const res = await fb.usersCollection.where('userId', '==', id).get();
    const user = { ...res.docs[0].data(), docId: res.docs[0].id };
    //console.log(user);
    return user;
}

export async function getUserByUsername(username) {
    const res = await fb.usersCollection.where('username', '==', username).get();
    console.dir(res);
    let user = null;
    if (res.docs.length > 0) user = { ...res.docs[0].data(), docId: res.docs[0].id };
    return user;
}

export async function getSuggestedProfiles(id) {
    // get all users limit 10
    const result = await fb.usersCollection.limit(10).get();
    // get all following users
    const following = store.getters['users/following'];

    console.log(result);
    // map all users and return a filter that doesn't include the following users
    return result.docs
        .map(profile => ({ ...profile.data(), docId: profile.id }))
        .filter(pro => pro.userId !== id && !following.includes(pro.userId));
}

export async function updateUserFollowing(docId, profileId, isFollowingProfile, isUpdateFollowing) {
    let followUpdate = {};
    console.log(isUpdateFollowing);
    console.log(docId);
    console.log(profileId);
    if (isUpdateFollowing) {
        followUpdate = {
            following: isFollowingProfile
                ? fb.firestore.FieldValue.arrayRemove(profileId)
                : fb.firestore.FieldValue.arrayUnion(profileId),
        };
    } else {
        followUpdate = {
            followers: isFollowingProfile
                ? fb.firestore.FieldValue.arrayRemove(profileId)
                : fb.firestore.FieldValue.arrayUnion(profileId),
        };
    }
    fb.usersCollection.doc(docId).update(followUpdate);
}

export async function toggleFollow(isFollowing, loggedInUserId, profileId) {
    console.log(isFollowing, profileId, loggedInUserId);
    await updateUserFollowing(loggedInUserId, profileId, !isFollowing, true);
    await updateUserFollowing(profileId, loggedInUserId, !isFollowing, false);
}

export async function getUserPhotosByUserId(userId) {
    console.log('getUserPhotosByUserId');
    const res = await fb.photosCollection.where('userId', '==', userId).get();
    let photos = [];
    if (res.docs.length > 0) {
        photos = res.docs.map(photo => ({ ...photo.data(), docId: photo.id }));
    }
    console.log(photos);
    return photos;
}

export async function isLoggedInUserFollowing(username, profileId) {
    console.log('isLoggedInUserFollowing');
    console.log(username);
    console.log(profileId);
    const res = await fb.usersCollection
        .where('username', '==', username)
        .where('following', 'array-contains', profileId)
        .get();
    console.dir(res.docs);
    const [response = {}] = res.docs.map(item => ({ ...item.data(), docId: item.id }));
    console.log(response);
    return !!response.fullname;
}
