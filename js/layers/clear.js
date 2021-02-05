/**
 * Layer to clear the screen
 */
export function clearScreenLayer() {
  return function clearScreen(context) {
    context.clearRect(
      0,
      0,
      context.canvas.clientWidth,
      context.canvas.clientHeight
    );
  };
}
