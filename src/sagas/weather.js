import { call, put } from "redux-saga/effects";
import ApiWeather from "../api/weather";

// fetch the user's list
export function* weatherFetch(action) {
  // call the api to get the users list
  const { payload } = action;
  const weather = yield call(ApiWeather.getWeather, payload);

  yield put({
    type: 'WEATHER_FEATCH_SUCCESS',
    weather: weather,
  });
}
