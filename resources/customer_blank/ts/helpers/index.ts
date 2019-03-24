export const getCursorOffset = (e) => {

  let leftOffset = +Number(e.clientX - e.currentTarget.getBoundingClientRect().left).toFixed(),
    topOffset = +Number(e.clientY - e.currentTarget.getBoundingClientRect().top).toFixed(),
    rightOffset = +Number(e.currentTarget.getBoundingClientRect().right - e.clientX).toFixed(),
    bottomOffset = +Number(e.currentTarget.getBoundingClientRect().bottom - e.clientY).toFixed();

  return {
    left: leftOffset,
    top: topOffset,
    right: rightOffset,
    bottom: bottomOffset,
  };

};
