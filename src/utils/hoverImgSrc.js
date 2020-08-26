export default (node, src) => {
  let orgSrc = node.src
  const handlemouseenter = () => {
    node.src = src
  };
  const handlemouseleave = () => {
    node.src = orgSrc
  };
  node.addEventListener("mouseenter", handlemouseenter);
  node.addEventListener("mouseleave", handlemouseleave);
  return {
    destroy() {
      node.removeEventListener("mouseenter", handlemouseenter);
      node.removeEventListener("mouseleave", handlemouseleave);
    },
    update(newsrc) {
      src = newsrc;
    }
  };
};