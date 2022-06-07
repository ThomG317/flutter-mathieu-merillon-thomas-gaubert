// chargement de la CSS du Framework Ionic
import '@ionic/core/css/ionic.bundle.css'

import {defineCustomElements} from "@ionic/core/loader"

const init = async () => {
    // chargement de tous les composants
    // la démarche n'est pas optimale car nous importons tous les composants
    await defineCustomElements()

    // TODO
    fetch("https://devfest-nantes-2018-api.cleverapps.io/blog")
        .then(response => response.json())
        .then(posts => {
            const content = document.getElementById("content");
            let inner = "";
            posts.forEach(post => {
                const card = `
                <ion-card id="card" mode="ios">
                  <img src="https://devfest2018.gdgnantes.com/${post.image}" alt="${post.image}"/>
                  <ion-card-header>
                    <ion-card-title>${post.title}</ion-card-title>
                    <!--<div class="ion-text-center">
                      <ion-button shape="round" mode="ios" color="primary">
                        <ion-icon slot="icon-only" name="camera"></ion-icon>
                      </ion-button>
                    </div>-->
                  </ion-card-header>
            
                  <ion-card-content>
                   ${post.brief}
                  </ion-card-content>
                </ion-card>`;
                inner += card;
            });
            content.innerHTML = inner;
        });

}

init()
