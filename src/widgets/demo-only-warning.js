import React from "react";
import Alert from "react-bootstrap/Alert";
import Accordion from "react-bootstrap/Accordion";

const DemoOnlyWarning = () => {
  return (
    <div>
      <Accordion>
        <Alert variant="warning">
          <Accordion.Toggle as={Alert.Heading} eventKey="0">
            This is a demo version of the website. Click here to learn more.
          </Accordion.Toggle>
          <Accordion.Collapse as={Alert} eventKey="0">
            <p>
              <ul>
                <li>
                  <b>
                    Please refrain from putting in actual personal information.
                  </b>
                </li>
                <li>User side functionalies should work.</li>
                <ul>
                  <li>
                    To test without using your actual phone numbers, log in with{" "}
                    <code>+11231231234</code> and enter code <code>123456</code>
                  </li>
                </ul>
                <li>
                  Admin side functionalies mostly rely on Firebase Cloud
                  Functions, which have been disabled for this demo.
                  <ul>
                    <li>
                      You won't be able to create a new account and log in.
                    </li>
                    <li>
                      To see what an unverified admin can do, login with these
                      credentials: <code>b@b.org : 123456</code>
                    </li>
                    <li>
                      To see what a verified admin can do, login with these
                      credentials: <code>a@a.org : 123456</code>
                    </li>
                  </ul>
                </li>
              </ul>
            </p>
          </Accordion.Collapse>
        </Alert>
      </Accordion>
    </div>
  );
};

export default DemoOnlyWarning;
