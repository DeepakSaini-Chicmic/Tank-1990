import {
  _decorator,
  Component,
  Node,
  TiledMap,
  TiledLayer,
  TiledTile,
  Contact2DType,
  Collider2D,
  Vec3,
  UITransform,
  CircleCollider2D,
  BoxCollider2D,
  Prefab,
  instantiate,
  NodePool,
} from "cc";
import { AddColliders } from "./AddColliders";
import { PlayerTank } from "./PlayerTank";
import { TankMovement } from "./TankMovement";
const { ccclass, property } = _decorator;

@ccclass("DestroyBricks")
export class DestroyBricks extends Component {
  // @property(TiledLayer) RedTiles: TiledLayer = null;
  BulletsNodePool: NodePool = new NodePool();
  @property(Prefab) Destroyed: Prefab;
  // tilesMatrix: Vec3[][] = [];
  start() {
    let bullet = this.node.getComponent(Collider2D);
    bullet.on(Contact2DType.BEGIN_CONTACT, (self, other) => {
      if (other.node.getComponent(Collider2D).tag == 10) {
        console.log("SELF", self);
        console.log("OTHER", other);
        other.destroy();
        self.destroy();
      }
    });
  }
  collisionDetection() {
    let tankRect = this.getComponent(TankMovement)
      .tank.getComponent(UITransform)
      .getBoundingBoxToWorld();
    console.log(tankRect);
  }
  update(deltaTime: number) {}
}
