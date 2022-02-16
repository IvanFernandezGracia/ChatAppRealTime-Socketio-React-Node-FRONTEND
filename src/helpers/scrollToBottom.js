import { animateScroll } from "react-scroll";

export const scrollToBottom = (id) => {
  animateScroll.scrollToBottom({
    containerId: id,
    duration: 0, // Al cambiar de chat
  });
};

export const scrollToBottomAnimated = (id) => {
  animateScroll.scrollToBottom({
    containerId: id,
    duration: 250, // Al estar en el mismo chat
  });
};
