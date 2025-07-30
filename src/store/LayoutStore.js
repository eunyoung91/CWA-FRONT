import {defineStore} from 'pinia';

export const useLayoutStore = defineStore('layout', {
    state: () => ({
        username: null,
    }),
    actions: {
        setUsername(name){
            this.username = name;
        }
    }
});