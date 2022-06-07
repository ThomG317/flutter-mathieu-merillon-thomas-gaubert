import { defineCustomElements as pwaElements} from '@ionic/pwa-elements/loader';
import { Camera, CameraResultType } from '@capacitor/camera';

import { Storage } from '@capacitor/storage';

const setPosts = async (posts) => {
    await Storage.set({
        key: 'posts',
        value: JSON.stringify(posts),
    });
};

const getPosts = async () => {
    const { value } = await Storage.get({ key: 'posts' });
    return JSON.parse(value);
};

const removePosts = async () => {
    await Storage.remove({ key: 'posts' });
};

pwaElements(window);

// chargement de la CSS du Framework Ionic
import '@ionic/core/css/ionic.bundle.css'

import {defineCustomElements} from "@ionic/core/loader"

const init = async () => {
    // chargement de tous les composants
    // la démarche n'est pas optimale car nous importons tous les composants
    await defineCustomElements()

    const modal = document.getElementById("modal");
    const modalBtn = document.getElementById("closeModalBtn");
    const form = document.getElementById("picForm");
    const title = document.getElementById("titleForm");
    const description = document.getElementById("descForm");
    let imageUrl = "";
    let gPosts = [];
    const cameraBtn = document.getElementById("cameraBtn");

    cameraBtn.addEventListener("click", async (event) => {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            resultType: CameraResultType.Uri
        });
        modal.isOpen = true;

        // image.webPath will contain a path that can be set as an image src.
        // You can access the original file using image.path, which can be
        // passed to the Filesystem API to read the raw data of the image,
        // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
        imageUrl = image.webPath;
    });

    modalBtn.addEventListener("click", () => {
        modal.isOpen = false;
    })

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        gPosts.push({
            title: title.value,
            brief: description.value,
            url: imageUrl,
        });
        renderPosts(gPosts);
        imageUrl = "";
        modal.isOpen = false;
    });

    const renderPosts = (posts) => {
        const content = document.getElementById("content");
        let inner = "";
        posts.forEach(post => {
            const url = post.url ? post.url : `https://devfest2018.gdgnantes.com/${post.image}`;
            const card = `
                <ion-card id="card" mode="ios">
                  <img src="${url}" alt="${post.image}"/>
                  <ion-card-header>
                    <ion-card-title>${post.title}</ion-card-title>
                  </ion-card-header>
            
                  <ion-card-content>
                   ${post.brief}
                  </ion-card-content>
                </ion-card>`;
            inner += card;
        });
        content.innerHTML = inner;
        setPosts(posts);
    }

    const storedPosts = await getPosts()
    gPosts = storedPosts ? storedPosts : [];

    if (gPosts.length === 0) {
        fetch("https://devfest-nantes-2018-api.cleverapps.io/blog")
            .then(response => response.json())
            .then(posts => {
               gPosts = posts;
               renderPosts(posts);
            });
    } else {
        renderPosts(gPosts);
    }

}

init()
