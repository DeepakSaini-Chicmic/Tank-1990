import {
  _decorator,
  Component,
  Node,
  Input,
  Prefab,
  instantiate,
  tween,
  Vec3,
} from "cc";
import { ANGLE } from "./Constants";
import { TankMovement } from "./TankMovement";
const { ccclass, property } = _decorator;

@ccclass("BulletsFire")
export class BulletsFire extends Component {
  @property(Prefab) Bullet: Prefab;
  @property(Node) Map: Node;
  start() {}

  fire() {
    let tank = this.Map.getComponent(TankMovement).tank;
    let tankPosition = tank.getPosition();
    console.log(tankPosition);

    let bulletCreated = instantiate(this.Bullet);
    this.Map.getComponent(TankMovement).tank.addChild(bulletCreated);
    bulletCreated.setPosition(0, 0, 0);
    bulletCreated.angle = tank.angle;
    this.directBullet(bulletCreated, tankPosition);
    console.log("Firing");
  }

  directBullet(bullet: Node, tankPosition: Vec3) {
    switch (bullet.angle) {
      case ANGLE.UP: {
        console.log("UP ANGLE");

        tween(bullet)
          .by(0.5, {
            worldPosition: new Vec3(0, tankPosition.y + 10),
          })
          .repeatForever()
          .start();
        break;
      }
      case ANGLE.RIGHT: {
        console.log("RIGHT ANGLE");

        tween(bullet)
          .by(0.5, {
            worldPosition: new Vec3(0, tankPosition.y - 10),
          })
          .repeatForever()
          .start();
        break;
      }
      case ANGLE.LEFT: {
        console.log("LEFT ANGLE");

        tween(bullet)
          .by(0.5, {
            worldPosition: new Vec3(tankPosition.x - 10, 0),
          })
          .repeatForever()
          .start();
        break;
      }
      case ANGLE.DOWN: {
        console.log("DOWN ANGLE");

        tween(bullet)
          .by(0.5, {
            worldPosition: new Vec3(tankPosition.x + 10, 0),
          })
          .repeatForever()
          .start();
        break;
      }
    }
  }
  update(deltaTime: number) {}
}
