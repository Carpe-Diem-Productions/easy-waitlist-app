import React from "react";
import Col from "react-bootstrap/Col";

const PromptGraphics = (props) => {
  const img_path = props.img_path;
  const alt_text = props.alt_text;
  return (
    <Col md={4} className="d-none d-lg-block">
      <img src={img_path} className="img-fluid" alt={alt_text} />
    </Col>
  );
};

export default PromptGraphics;
