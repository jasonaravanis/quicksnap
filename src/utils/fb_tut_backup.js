import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const getBostonAreaWeather = functions.https.onRequest(
  (request, response) => {
    admin
      .firestore()
      .doc("areas/greater-boston")
      .get()
      .then((areaSnapshot) => {
        const cities = areaSnapshot.data()!.cities;
        const promises = [];
        for (const city in cities) {
          const p = admin.firestore().doc(`cities-weather/${city}`).get();
          promises.push(p);
        }
        return Promise.all(promises);
      })
      .then((citySnapshots) => {
        const results: any = [];
        citySnapshots.forEach((citySnap) => {
          const data: any = citySnap.data();
          data.city = citySnap.id;
          results.push(data);
        });
        response.send(results);
      })
      .catch((error) => {
        console.log(error);
        response.status(500).send(error);
      });
  }
);

export const onBostonWeatherUpdate = functions.firestore
  .document("cities-weather/boston-ma-us")
  .onUpdate((change) => {
    const after = change.after.data();
    const payload = {
      data: {
        temp: String(after.temp),
        conditions: after.conditions,
      },
    };
    return admin.messaging().sendToTopic("weather_boston-ma-ua", payload);
  });

export const getBostonWeather = functions.https.onRequest(
  (request, response) => {
    admin
      .firestore()
      .doc("cities-weather/boston-ma-us")
      .get()
      .then((snapshot) => {
        const data = snapshot.data();
        response.send(data);
      })
      .catch((error) => {
        console.log(error);
        response.status(500).send(error);
      });
  }
);
