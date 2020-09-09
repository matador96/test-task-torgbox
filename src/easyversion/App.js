import React from "react";
import { Form, Row, Container, Col } from "react-bootstrap";
import Clock from "react-clock";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timefirst: this.props.clockStore.getState()[0],
      timesecond: this.props.clockStore.getState()[1],
      timezonefirst: 7,
      timezonesecond: 3,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const clockStore = this.props.clockStore;
    clockStore.subscribe(() => {
      const timenowfirst = clockStore.getState()[0];
      const timenowsecond = clockStore.getState()[1];
      const firsttime = this.TimeZoneAdd(
        this.state.timezonefirst,
        timenowfirst
      );
      const secondtime = this.TimeZoneAdd(
        this.state.timezonesecond,
        timenowsecond
      );

      this.setState({
        timefirst: firsttime,
        timesecond: secondtime,
      });
    });
  }

  TimeZoneAdd(gmt, date) {
    let setdate = date;
    let sethours = setdate.setHours(
      setdate.getHours() + setdate.getTimezoneOffset() / 60 + gmt
    );

    return new Date(sethours);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: parseInt(e.target.value) });
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
