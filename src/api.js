const setupGameURL = window.params.setupGameURL;

class Api {
    getSetupGame() {
        return fetch(setupGameURL, {
            method: "POST",
        }).then(response => {
            return response.json();
        })
    }
}

export default new Api();
