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
  SpriteFrame,
  Sprite,
  RigidBody2D,
  Vec2,
} from "cc";
import { AddColliders } from "./AddColliders";
import { ANGLE, COLLISION_GROUPS, TAGS, VELOCITY } from "./Constants";
import { PlayerTank } from "./PlayerTank";
import { TankMovement } from "./TankMovement";
const { ccclass, property } = _decorator;

@ccclass("DestroyBricks")
export class DestroyBricks extends Component {
  start() {
    let bullet = this.node.getComponent(Collider2D);
    bullet.on(Contact2DType.BEGIN_CONTACT, (self, other) => {
      if (other.node.getComponent(Collider2D).tag == TAGS.BREAKABLE_WALL) {
        console.log("SELF", self);
        console.log("OTHER", other);
        setTimeout(() => {
          other.node.destroy();
          self.node.destroy();
        }, 0.01);
      } else if (
        other.node.getComponent(Collider2D).tag == TAGS.UNBREAKABLE_WALL
      ) {
        setTimeout(() => {
          self.node.destroy();
        }, 0.01);
      }
    });
  }
  /**
   * Movement of a particular bullet - Gives velocity and angle according to tank
   * @param bullet - bullet to be moved
   */
  moveBullet(bullet: Node) {
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
