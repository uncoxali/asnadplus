import ImageGallery from "react-image-gallery";
import "./index.scss";
import React from "react";

import ComponentsSlider from "./ComponentSlider";

export default function Slider() {
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  });
  return <>{loading && <ComponentsSlider />}</>;
}
