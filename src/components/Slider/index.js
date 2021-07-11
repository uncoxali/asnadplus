import ImageGallery from "react-image-gallery";
import "./index.scss";
import React from "react";

import ComponentsSlider from "./ComponentSlider";

export default function Slider({ data }) {
  return (
    <>
      {" "}
      <ComponentsSlider data={data} />
    </>
  );
}
