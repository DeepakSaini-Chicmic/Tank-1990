import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("PlayerTank")
export class PlayerTank extends Component {
  @property(Node) Barrel: Node;
  parentNode: Node;
  start() {
    this.parentNode = this.node.parent;
  }

  update(deltaTime: number) {}
}
