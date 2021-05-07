import * as fb from './hooks/useFirebase.js';

export default async function seed() {
    //console.log('hey Im seeding here');
    const photo = {
        photoId: '1',
        userId: 'jZiJ5wJCdOWgEQRqMXsamz3Par93',
        imageSrc: '/src/image/darthvader/2.jpg',
        caption: 'The power of the dark side',
        likes: [],
        comments: [
            {
                username: 'master_yoda',
                comment: 'A lie, this is',
            },
            {
                username: 'obiwan',
                comment: 'You were my brother...',
            },
        ],
        userLatitude: '40.7128°',
        userLongitude: '74.0060°',
        dateCreated: Date.now(),
    };
    const photo2 = { ...photo, photoId: '2', imageSrc: '/src/image/darthvader/2.jpg' };
    const photo3 = { ...photo, photoId: '3', imageSrc: '/src/image/darthvader/3.jpg' };
    const photo4 = { ...photo, photoId: '4', imageSrc: '/src/image/darthvader/4.jpg' };
    const photo5 = { ...photo, photoId: '5', imageSrc: '/src/image/darthvader/5.jpg' };
    fb.photosCollection.add(photo);
    fb.photosCollection.add(photo2);
    fb.photosCollection.add(photo3);
    fb.photosCollection.add(photo4);
    fb.photosCollection.add(photo5);
}

//seed();
