import { takeLatest } from "redux-saga";
import { fork } from "redux-saga/effects";
import { weatherFetch } from "./weather";

// main saga generators
export function* sagas() {
  yield [
    fork(takeLatest, 'WEATHER_FEATCH_REQUEST', weatherFetch),
  ];
}