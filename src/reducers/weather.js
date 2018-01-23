// users reducer

const initialState = {
  isRunning: false,
  isLoaded: false,
  weather: {},
};

export default function weathers(state = initialState, action) {
  switch (action.type) {
    case 'WEATHER_FEATCH_REQUEST':
      return {
        ...state,
        isRunning: true,
        isLoaded: false,
      };

    case 'WEATHER_FEATCH_SUCCESS':
      const weather = action.weather;
      return {
        weather: weather,
        isRunning: false,
        isLoaded: true,
      };

    case 'WEATHER_FEATCH_FAIL':
      return {
        weather: null,
        isRunning: false,
        isLoaded: true,
      };
      break;

    // initial state
    default:
      return state;
  }
}