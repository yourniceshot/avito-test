class Api {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    getPictures() {
        return fetch(`${this.baseUrl}images`, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }
}

export const api = new Api('https://boiling-refuge-66454.herokuapp.com/');