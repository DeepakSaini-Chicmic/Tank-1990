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
} from "cc";
import { ANGLE } from "./Constants";
import { DestroyBricks } from "./DestroyBricks";
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
    tank.addChild(bulletCreated);
    bulletCreated.setPosition(0, 0);
    bulletCreated.angle = tank.angle;
    this.moveBullet(bulletCreated, bulletCreated.getPosition());
  }

  moveBullet(bullet: Node, bulletPosition: Vec3) {
    switch (bullet.angle) {
      case ANGLE.UP: {
        tween(bullet)
          .by(0.1, { worldPosition: new Vec3(0, bulletPosition.y + 50) })
          .repeatForever()
          .start();
        break;
      }
      case ANGLE.RIGHT: {
        tween(bullet)
          .by(0.1, { worldPosition: new Vec3(bulletPosition.x + 50, 0) })
          .repeatForever()
          .start();
        break;
      }
      case ANGLE.LEFT: {
        tween(bullet)
          .by(0.1, { worldPosition: new Vec3(bulletPosition.x - 50, 0) })
          .repeatForever()
          .start();
        break;
      }
      case ANGLE.DOWN: {
        tween(bullet)
          .by(0.1, { worldPosition: new Vec3(0, bulletPosition.y - 50) })
          .repeatForever()
          .start();
        break;
      }
    }
  }
  update(deltaTime: number) {}
}
