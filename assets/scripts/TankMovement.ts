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
const { ccclass, property } = _decorator;

enum keyCode {
  LEFT = 37,
  UP = 38,
  RIGHT = 39,
  DOWN = 40,
}

@ccclass("TankMovement")
export class TankMovement extends Component {
  @property({ type: Node }) GrassLayer: Node;
  @property({ type: Prefab }) PlayerTank: Prefab;
  @property(Prefab) EnemyTanks: Prefab;
  @property(TiledObjectGroup) EnemyTankPositions: TiledObjectGroup;

  tank: Node = null;
  start() {}
  onLoad() {
    this.tank = instantiate(this.PlayerTank);
    this.node.addChild(this.tank);
    this.GrassLayer.setSiblingIndex(this.GrassLayer.parent.children.length - 1);

    input.on(Input.EventType.KEY_DOWN, this.MoveTank, this);
    input.on(Input.EventType.KEY_PRESSING, this.MoveTank, this);

    this.schedule(this.enemyTanks, 10);
  }
  MoveTank = (event) => {
    let currentTankPosition = this.tank.getPosition();
    switch (event.keyCode) {
      case keyCode.UP: {
        this.tank.angle = 0;
        currentTankPosition.y = currentTankPosition.y + 8;
        this.tank.setPosition(currentTankPosition);
        break;
      }
      case keyCode.LEFT: {
        this.tank.angle = 90;
        currentTankPosition.x = currentTankPosition.x - 8;
        this.tank.setPosition(currentTankPosition);
        break;
      }
      case keyCode.DOWN: {
        this.tank.angle = 180;
        currentTankPosition.y = currentTankPosition.y - 8;
        this.tank.setPosition(currentTankPosition);
        break;
      }
      case keyCode.RIGHT: {
        this.tank.angle = 270;
        currentTankPosition.x = currentTankPosition.x + 8;
        this.tank.setPosition(currentTankPosition);
        break;
      }
    }
  };
  enemyTanks() {
    let enemyTankCreated = instantiate(this.EnemyTanks);
    this.node.addChild(enemyTankCreated);
    // enemyTankCreated.setPosition(this.node.getComponent(TiledMap).getObjectGroup(this.EnemyTankPositions.name).);
  }
  update(deltaTime: number) {}
}
