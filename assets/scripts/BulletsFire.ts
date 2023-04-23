import {
  _decorator,
  Component,
  Node,
  Input,
  Prefab,
  instantiate,
  tween,
  Vec3,
  UITransform,
  RigidBody2D,
  Vec2,
  Collider2D,
  NodePool,
} from "cc";
import { ANGLE, COLLISION_GROUPS, VELOCITY } from "./Constants";
import { DestroyBricks } from "./DestroyBricks";
import { PlayerTank } from "./PlayerTank";
import { TankMovement } from "./TankMovement";
const { ccclass, property } = _decorator;

@ccclass("BulletsFire")
export class BulletsFire extends Component {
  @property(Prefab) Bullet: Prefab;
  @property(Node) Map: Node;
  BulletsNodePool: NodePool = new NodePool();
  start() {}

  /**
   * On Clicking Fire Button
   */
  fire() {
    let tank = this.Map.getComponent(TankMovement).tank;
    let bulletCreated = instantiate(this.Bullet);
    tank.getComponent(PlayerTank).Barrel.addChild(bulletCreated);
    bulletCreated.setPosition(0, 0);
    bulletCreated.getComponent(RigidBody2D).group = COLLISION_GROUPS.BULLET;
    bulletCreated.getComponent(Collider2D).group = COLLISION_GROUPS.BULLET;
    bulletCreated.angle = tank.angle;
    bulletCreated.getComponent(DestroyBricks).moveBullet(bulletCreated);
  }

  update(deltaTime: number) {}
}
