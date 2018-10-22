import React, { Component } from 'react';
import InputDisplay from './InputDisplay';
import {
  Button,
  Form,
  Card,
  FormGroup,
  CardTitle,
  Label,
  CardBody,
  Input,
  Col,
  Row
} from 'reactstrap';

class Login extends Component {
  state = {
    xss_safe: '',
    xss_not_safe: ''
  };
  test = () => {
    console.log(this.state);
    this.setState({
      xss_safe: document.getElementById('xss_safe').value,
      xss_not_safe: document.getElementById('xss_not_safe').value
    });
  };
  onChange = e => {
    console.log('fired');

    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    return (
      <Row className="mb-5">
        <Col lg={{ size: 8, offset: 2 }}>
          <Card>
            <CardBody className="text-center">
              <CardTitle>Test XSS</CardTitle>
            </CardBody>
            <CardBody>
              <Form>
                <FormGroup>
                  <Label for="xss_safe">XSS Safe Input</Label>
                  <Input
                    onChange={this.onChange}
                    type="text"
                    name="xss_safe"
                    id="xss_safe"
                    placeholder="Enter something dangerous"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="xss_not_safe">Not XSS Safe Input</Label>
                  <Input
                    onChange={this.onChange}
                    type="text"
                    name="xss_not_safe"
                    id="xss_not_safe"
                    placeholder="Enter something dangerous"
                  />
                </FormGroup>
                <InputDisplay input={this.state.xss_safe} safe={true} />
                <InputDisplay input={this.state.xss_not_safe} />
                <Button id="submit" color="danger" onClick={this.test}>
                  Submit
                </Button>
                <Button id="none-id" color="success" onClick={this.test}>
                  Submit
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Login;
