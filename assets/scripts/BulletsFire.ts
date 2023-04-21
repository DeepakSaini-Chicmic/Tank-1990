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
} from "cc";
import { ANGLE, VELOCITY } from "./Constants";
import { DestroyBricks } from "./DestroyBricks";
import { PlayerTank } from "./PlayerTank";
import { TankMovement } from "./TankMovement";
const { ccclass, property } = _decorator;

@ccclass("BulletsFire")
export class BulletsFire extends Component {
  @property(Prefab) Bullet: Prefab;
  @property(Node) Map: Node;
  start() {}

  fire() {
    let tank = this.Map.getComponent(TankMovement).tank;
    let bulletCreated = instantiate(this.Bullet);
    tank.getComponent(PlayerTank).Barrel.addChild(bulletCreated);
    bulletCreated.setPosition(0, 0);
    bulletCreated.angle = tank.angle;
    this.moveBullet(bulletCreated, bulletCreated.getPosition());
  }

  moveBullet(bullet: Node, bulletPosition: Vec3) {
    switch (bullet.angle) {
      case ANGLE.UP: {
        bullet.getComponent(RigidBody2D).linearVelocity = new Vec2(
          VELOCITY.NONE,
          VELOCITY.FIRE_VELOCITY
        );
        break;
      }
      case ANGLE.RIGHT: {
        bullet.getComponent(RigidBody2D).linearVelocity = new Vec2(
          VELOCITY.FIRE_VELOCITY,
          VELOCITY.NONE
        );
        break;
      }
      case ANGLE.LEFT: {
        bullet.getComponent(RigidBody2D).linearVelocity = new Vec2(
          -VELOCITY.FIRE_VELOCITY,
          VELOCITY.NONE
        );
        break;
      }
      case ANGLE.DOWN: {
        bullet.getComponent(RigidBody2D).linearVelocity = new Vec2(
          VELOCITY.NONE,
          -VELOCITY.FIRE_VELOCITY
        );
        break;
      }
    }
  }
  update(deltaTime: number) {}
}
