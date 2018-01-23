export default class ApiWeather {
  static getWeather(params) {
    const apiKey = '7453232bbda2216f7d00b9be1f1b20b0';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${params.city},${params.country}&appid=${apiKey}`;
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => {
          if (res.ok) {
            res.json().then(json => {
              resolve(json);
            }, err => {
              reject(err);
            });
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}