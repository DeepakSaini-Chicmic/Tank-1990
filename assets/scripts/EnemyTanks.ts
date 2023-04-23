import {
  _decorator,
  Component,
  Node,
  tween,
  Vec3,
  Vec2,
  UITransform,
  TiledMap,
} from "cc";
import { TankMovement } from "./TankMovement";
const { ccclass, property } = _decorator;

@ccclass("EnemyTanks")
export class EnemyTanks extends Component {
  Map: Node;
  enemyTankPositionsArray: Vec3[] = [];
  start() {
    this.Map = this.node.parent.getComponent(TankMovement).map.node;
  }

  TankPositions() {
    let numberOfObject =
      this.Map.getComponent(TiledMap).getObjectGroups().length;
    for (let i = 1; i <= numberOfObject; i++) {
      let totalPositionsInGroup = this.Map.getComponent(TiledMap)
        .getObjectGroup(`EnemyTurnings${i}`)
        .getObjects().length;
      let pathObj = this.Map.getComponent(TiledMap).getObjectGroup(
        `EnemyTurnings${i}`
      );
      for (let j = 1; j < totalPositionsInGroup; i++) {
        let button_pos = pathObj.getObject(`Turning${j}`);
        let worlPosOfBtn = pathObj.node
          .getComponent(UITransform)
          .convertToWorldSpaceAR(
            new Vec3(
              button_pos.x - pathObj.node.getComponent(UITransform).width * 0.5,
              button_pos.y - pathObj.node.getComponent(UITransform).height * 0.5
            )
          );

        var positiontoCan = this.Map.parent
          .getComponent(UITransform)
          .convertToNodeSpaceAR(new Vec3(worlPosOfBtn.x, worlPosOfBtn.y));
        this.enemyTankPositionsArray.push(positiontoCan);
      }
    }
    console.log(this.enemyTankPositionsArray);
  }

  update(deltaTime: number) {}
}
