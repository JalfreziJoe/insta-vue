export default {
    state() {
        return {
            photos: [
                {
                    photoId: '',
                    userId: '',
                    imageSrc: '',
                    caption: '',
                    likes: [],
                    comments: [
                        {
                            displayName: '',
                            comment: '',
                        },
                    ],
                    userLatitude: '',
                    userLongitude: '',
                    dateCreated: Date.now(),
                },
            ],
        };
    },
    getters: {},
    actions: {},
    mutations: {},
};
