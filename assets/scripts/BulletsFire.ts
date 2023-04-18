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
const { ccclass, property } = _decorator;

@ccclass("BulletsFire")
export class BulletsFire extends Component {
  @property(Prefab) Bullet: Prefab;
  onLoad() {}
  start() {
    this.node.on(Input.EventType.MOUSE_UP, this.fire, this);
  }
  fire = (event) => {
    let bulletCreated = instantiate(this.Bullet);
    this.node.addChild(bulletCreated);
    let tankPosition = this.node.getPosition();
    bulletCreated.setPosition(tankPosition);
    bulletCreated.angle = this.node.angle;
    console.log(event);

    switch (this.node.angle) {
      case 0: {
        console.log(this.node.angle);
        console.log("Bullet angle", bulletCreated.angle);

        tween(bulletCreated)
          .by(0.3, {
            position: new Vec3(tankPosition.x, tankPosition.y + 10),
            angle: 0,
          })
          .repeatForever()
          .start();
      }
      case 90: {
        console.log(this.node.angle);
        console.log("Bullet angle", bulletCreated.angle);

        tween(bulletCreated)
          .by(0.3, {
            position: new Vec3(tankPosition.x - 10, tankPosition.y),
            angle: 90,
          })
          .repeatForever()
          .start();
      }
      case 180: {
        console.log(this.node.angle);
        console.log("Bullet angle", bulletCreated.angle);

        tween(bulletCreated)
          .by(0.3, {
            position: new Vec3(tankPosition.x, tankPosition.y - 10),
            angle: 180,
          })
          .repeatForever()
          .start();
      }
      case 270: {
        console.log(this.node.angle);
        console.log("Bullet angle", bulletCreated.angle);

        tween(bulletCreated)
          .by(0.3, {
            position: new Vec3(tankPosition.x + 10, tankPosition.y),
            angle: 270,
          })
          .repeatForever()
          .start();
      }
    }
  };
  update(deltaTime: number) {}
}
