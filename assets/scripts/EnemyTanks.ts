import { _decorator, Component, Node, tween, Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("EnemyTanks")
export class EnemyTanks extends Component {
  start() {
    // tween(this.node)
    //   .by(1, {
    //     worldPosition: new Vec3(
    //       this.node.getPosition().x,
    //       this.node.getPosition().y + 10
    //     ),
    //   })
    //   .start();
  }

  update(deltaTime: number) {}
}
