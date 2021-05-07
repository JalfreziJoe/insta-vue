import { getUserFollowingPhotos } from '../DB/firebaseFunctions.js';

export default async function useFollowedUsersPhotos(userId = '', following = []) {
    let photos = {};
    //const store = useStore();
    //console.log(userId);
    //console.log(following);
    if (following.length > 0) {
        photos = await getUserFollowingPhotos(userId, following);
    }
    //console.log(photos);
    return photos;
    // firebase get photos collection where userId is in following array
    // sort like this followedUsersPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
    // return photos
}
