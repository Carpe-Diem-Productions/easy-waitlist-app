import React from "react";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

const PromptGraphicsCol = (props) => {
  const img_path = props.img_path;
  const alt_text = props.alt_text;
  return (
    <Col md={4} className="d-none d-lg-block">
      <Image src={img_path} fluid alt={alt_text} />
    </Col>
  );
};

export default PromptGraphicsCol;
