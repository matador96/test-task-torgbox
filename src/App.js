import React from "react";
import { Form, Row, Container, Col } from "react-bootstrap";
import Clock from "react-clock";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return { clockstore: { firstclock: state[0], secondclock: state[1] } };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTimezone: (timezone) =>
      dispatch({ type: "SET_TIMEZONE", fixgmt: timezone }),
  };
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timefirst: this.props.clockstore.firstclock.date,
      timesecond: this.props.clockstore.secondclock.date,
      timezonefirst: this.props.clockstore.firstclock.timezone,
      timezonesecond: this.props.clockstore.secondclock.timezone,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        timefirst: this.props.clockstore.firstclock.date,
        timesecond: this.props.clockstore.secondclock.date,
      });
    }, 1000);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: parseInt(e.target.value) }, () =>
      this.props.setTimezone({
        timezonefirst: this.state.timezonefirst,
        timezonesecond: this.state.timezonesecond,
      })
    );
  }

  render() {
    const { timezonefirst, timefirst, timesecond, timezonesecond } = this.state;

    return (
      <>
        <Container className="two-clock">
          <Row>
            <Col xs="4">
              <Clock value={timefirst} />
              <span>{timefirst.toLocaleTimeString()}</span>
              <Form.Group as={Col}>
                <Form.Control
                  as="select"
                  defaultValue="name"
                  name="timezonefirst"
                  onChange={this.handleChange}
                  value={timezonefirst}
                >
                  {timezones.map((timezone, i) => (
                    <option value={timezone.value}>{timezone.label}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs="4">
              <Clock value={timesecond} />
              <span>{timesecond.toLocaleTimeString()}</span>
              <Form.Group as={Col}>
                <Form.Control
                  as="select"
                  defaultValue="name"
                  name="timezonesecond"
                  onChange={this.handleChange}
                  value={timezonesecond}
                >
                  {timezones.map((timezone, i) => (
                    <option value={timezone.value}>{timezone.label}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
const timezones = [
  { label: "Владивосток", value: 10 },
  { label: "Калининград", value: 2 },
  { label: "Красноярск", value: 7 },
  { label: "Москва", value: 3 },
];

const ConnectRedux = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectRedux;
