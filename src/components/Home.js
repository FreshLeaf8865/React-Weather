import React from "react";
import { connect } from "react-redux";
import TabButton from './common/TabButton';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      data: []
    }
    this.keyDownHandler = this.keyDownHandler.bind(this);
  }

  componentWillMount() {
    this.loadState();
  }

  componentDidMount(){
    document.addEventListener("keydown", this.keyDownHandler, false);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.keyDownHandler, false);
  }

  componentWillReceiveProps(nextProps) {
    const { weather } = this.props;
    if (nextProps.weather && nextProps.weather.weather !== weather.weather) {
      const { data } = this.state;
      data.push(nextProps.weather.weather);
      this.setState({
        data: data,
        activeIndex: data.length - 1
      }, () => {
        this.saveState()
      });
    }
  }

  saveState() {
    localStorage.setItem('weather', JSON.stringify(this.state));
  }

  loadState() {
    const data = JSON.parse(localStorage.getItem('weather'));
    if (!data) {
      this.setState({
        activeIndex: 0,
        data: []
      });
    } else {
      this.setState({
        activeIndex: data.activeIndex,
        data: data.data
      });
    }
  }

  keyDownHandler(event) {
    if(event.keyCode === 13) {
      let str = this.input.value.split(",");
      const location = {
        city: str[0],
        country: str[1]
      }
      this.props.dispatch({
        type: 'WEATHER_FEATCH_REQUEST',
        payload: location
      });
      this.input.value = '';
    }
  }

  tabButtonClickHandler(index) {
    this.setState({ activeIndex: index }, () => {
      this.saveState()
    });
  }

  tabCloseButtonClickHandler(index) {
    const { data, activeIndex } = this.state;
    data.splice(index, 1);
    const newIndex = (activeIndex == data.length) ? data.length - 1 : activeIndex;
    this.setState({
      data: data,
      activeIndex: newIndex
    }, () => {
      this.saveState()
    });
  }

  renderTab() {
    const { data, activeIndex } = this.state;
    let mark = null;
    if (data) {
      mark = data.map((item, index) => (
        <TabButton
          key={`btn-groups-${index.toString()}`}
          index={index}
          title={item.name}
          className={(activeIndex === index) ? 'active-tab' : ''}
          onClick={(i) => this.tabButtonClickHandler(i)}
          onClose={(i) => this.tabCloseButtonClickHandler(i)} />
      ));
    }
    return mark;
  }

  renderTabContent() {
    const { data, activeIndex } = this.state;
    const activeData = data[activeIndex];
    let mark = null;
    if (activeData) {
      const city = activeData.name;
      const icon = `http://openweathermap.org/img/w/${activeData.weather[0].icon}.png`;
      const temp = Math.round((activeData.main.temp - 273) * 10) / 10;
      mark = (
        <div className="weather-content">
          <div className="list-group-item">
            <div>
              <div className="city">{city}</div>
            </div>
            <div className="icon"><img src={icon} /></div>
            <div className="temp">{temp} &deg;c</div>
          </div>
        </div>
      );
    }
    return mark;
  }

  render() {
    return (
      <div className="page-home">
        <div className="container">
          <div className="input-group">
            <input ref={el => this.input = el} type="text" className="form-control" placeholder="Location" aria-describedby="basic-addon1" />
          </div>
          <div className="btn-group" role="group" aria-label="...">
            {this.renderTab()}
          </div>
          {this.renderTabContent()}
        </div>
      </div>
    );
  }
}

// export the connected class
function mapStateToProps(state) {
  return {
    weather: state.weather
  };
}
export default connect(mapStateToProps)(Home);
