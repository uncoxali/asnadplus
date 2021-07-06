import { useState } from "react";
import "./index.scss";
const src =
  "https://images.unsplash.com/photo-1584819332026-ac894ac5c26e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=450&ixid=MXwxfDB8MXxhbGx8fHx8fHx8fA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=600";
export default function ImageHover() {
  let img = null;
  const [place, setPlace] = useState({ top: 0, left: 0 });
  const [permission, setPermission] = useState(false);
  const handleMouseMove = (e) => {
    const top = e.clientY - img.getBoundingClientRect().top;
    const left = e.clientX - img.getBoundingClientRect().left;
    const width = img.getBoundingClientRect().width;
    const height = img.getBoundingClientRect().height;
    console.log(top > top + width);
    console.log(top + width);
    setPlace({ top, left });
  };
  const styles = (type = "mouse") => {
    const { top, left } = place;
    if (false) {
      return { top: 0, left: 0 };
    } else {
      switch (type) {
        case "mouse":
          return { top: top - 37.5, left: left - 37.5 };
        case "image-box":
          return { top: -(top * 2) + 100, left: -(left * 2) + 100 };
        default:
          break;
      }
    }
  };
  return (
    <div className="ImageHover" onMouseMove={handleMouseMove}>
      <img
        className="w-100 h-100"
        ref={(element) => (img = element)}
        src={src}
        alt="image"
        onMouseLeave={() => setPermission(false)}
        onMouseMove={() => setPermission(true)}
      />
      <div className="mouse-place" style={styles()}>
        <div className="image-box">
          <img style={styles("image-box")} src={src} alt="image" />
        </div>
      </div>
    </div>
  );
}
