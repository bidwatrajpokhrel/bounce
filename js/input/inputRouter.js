/**
 * lets it so that a function and runs on a set of different entities
 * Acts as the middleman between entity and input
 *
 */
export default class InputRouter {
  constructor() {
    this.receivers = new Set();
  }
  addReceiver(receiver) {
    this.receivers.add(receiver);
  }
  dropReceiver(receiver) {
    this.receivers.delete(receiver);
  }
  route(routeInput) {
    for (const receiver of this.receivers) {
      routeInput(receiver);
    }
  }
}
