import {
  _decorator,
  Component,
  Node,
  Input,
  tween,
  Vec3,
  input,
  UITransform,
  Prefab,
  instantiate,
  TiledMap,
  TiledLayer,
  TiledObjectGroup,
} from "cc";
import { ANGLE, KEYCODE } from "./Constants";
const { ccclass, property } = _decorator;
@ccclass("TankMovement")
export class TankMovement extends Component {
  @property({ type: Node }) GrassLayer: Node;
  @property({ type: Prefab }) PlayerTank: Prefab;
  @property(Prefab) EnemyTank: Prefab;
  @property(TiledObjectGroup) PlayerTankPosition: TiledObjectGroup;
  @property(TiledObjectGroup) EnemyTankPositions: TiledObjectGroup;
  @property(Node) EnemyTanks: Node;
  keyPressedCode: KEYCODE = KEYCODE.NONE;
  tank: Node = null;
  map: TiledMap = null;
  totalEnemyTanks: number = 0;
  i = 1;
  start() {}
  onLoad() {
    this.tank = instantiate(this.PlayerTank);
    this.map = this.node.getComponent(TiledMap);
    this.node.addChild(this.tank);
    this.setTankPosition();
    this.GrassLayer.setSiblingIndex(this.GrassLayer.parent.children.length - 1);

    input.on(Input.EventType.KEY_DOWN, this.MoveTank, this);
    input.on(Input.EventType.KEY_PRESSING, this.MoveTank, this);
    this.schedule(this.enemyTanks, 2);
  }
  setTankPosition() {
    let tankPositionGroup: TiledObjectGroup = this.PlayerTankPosition;
    let tankLocation = tankPositionGroup.getObject(`Position1`);
    let worldPositionOfTankLocation = tankPositionGroup.node
      .getComponent(UITransform)
      .convertToWorldSpaceAR(
        new Vec3(
          tankLocation.x -
            tankPositionGroup.node.getComponent(UITransform).width * 0.5,
          tankLocation.y -
            tankPositionGroup.node.getComponent(UITransform).height * 0.5,
          0
        )
      );
    let positiontoConvert = this.node.parent
      .getComponent(UITransform)
      .convertToNodeSpaceAR(
        new Vec3(worldPositionOfTankLocation.x, worldPositionOfTankLocation.y)
      );
    this.tank.setPosition(positiontoConvert);
  }

  MoveTank = (event: any) => {
    let currentTankPosition = this.tank.getWorldPosition();
    switch (event.keyCode) {
      case KEYCODE.UP: {
        this.tank.angle = ANGLE.UP;
        currentTankPosition.y = currentTankPosition.y + 8;
        this.tank.setWorldPosition(currentTankPosition);
        break;
      }
      case KEYCODE.LEFT: {
        this.tank.angle = ANGLE.LEFT;
        currentTankPosition.x = currentTankPosition.x - 8;
        this.tank.setWorldPosition(currentTankPosition);
        break;
      }
      case KEYCODE.DOWN: {
        this.tank.angle = ANGLE.DOWN;
        currentTankPosition.y = currentTankPosition.y - 8;
        this.tank.setWorldPosition(currentTankPosition);
        break;
      }
      case KEYCODE.RIGHT: {
        this.tank.angle = ANGLE.RIGHT;
        currentTankPosition.x = currentTankPosition.x + 8;
        this.tank.setWorldPosition(currentTankPosition);
        break;
      }
    }
  };

  enemyTanks() {
    if (this.totalEnemyTanks < 10) {
      console.log("ENEMY TANK ADDED");
      let enemyTankCreated = instantiate(this.EnemyTank);
      this.EnemyTanks.addChild(enemyTankCreated);
      this.totalEnemyTanks++;
      this.GrassLayer.setSiblingIndex(
        this.GrassLayer.parent.children.length - 1
      );
      this.setEnemyTanksPosition(enemyTankCreated);
    } else {
      this.unschedule(this.enemyTanks);
    }
  }

  setEnemyTanksPosition(enemyTank: Node) {
    let enemyTanksPositionGroup: TiledObjectGroup = this.EnemyTankPositions;
    // let numberOfObjectGroupsInMap = enemyTanksPositionGroup.getObjects().length;
    let enemyTankLocation = enemyTanksPositionGroup.getObject(
      `Position${this.i}`
    );
    let worldPositionOfTankLocation = enemyTanksPositionGroup.node
      .getComponent(UITransform)
      .convertToWorldSpaceAR(
        new Vec3(
          enemyTankLocation.x -
            enemyTanksPositionGroup.node.getComponent(UITransform).width * 0.5,
          enemyTankLocation.y -
            enemyTanksPositionGroup.node.getComponent(UITransform).height * 0.5,
          0
        )
      );
    let positiontoConvert = this.node.parent
      .getComponent(UITransform)
      .convertToNodeSpaceAR(
        new Vec3(worldPositionOfTankLocation.x, worldPositionOfTankLocation.y)
      );
    enemyTank.setPosition(positiontoConvert);
    this.i++;
    if (this.i == 4) {
      this.i = 1;
    }
  }
  update(deltaTime: number) {}
}
