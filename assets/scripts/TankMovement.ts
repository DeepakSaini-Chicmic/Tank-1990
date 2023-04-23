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
  KeyCode,
  Collider2D,
  RigidBody2D,
} from "cc";
import { ANGLE, COLLISION_GROUPS } from "./Constants";
import { EnemyTanks } from "./EnemyTanks";
const { ccclass, property } = _decorator;
@ccclass("TankMovement")
export class TankMovement extends Component {
  @property(Node) Canvas: Node;
  @property({ type: Node }) GrassLayer: Node;
  @property({ type: Prefab }) PlayerTank: Prefab;
  @property(Prefab) EnemyTank: Prefab;
  @property(Prefab) RedWall: Prefab;
  @property(TiledObjectGroup) PlayerTankPosition: TiledObjectGroup;
  @property(TiledObjectGroup) EnemyTankPositions: TiledObjectGroup;
  @property(TiledLayer) redWallLayer: TiledLayer;
  @property(TiledObjectGroup) RedWallPositionGroup: TiledObjectGroup;
  keyPressedCode: KeyCode = KeyCode.NONE;
  tank: Node = null;
  enemyTanksArray: Node[] = [];
  map: TiledMap = null;
  totalEnemyTanks: number = 0;
  i = 1;
  redwallno = 1;
  start() {}
  onLoad() {
    this.tank = instantiate(this.PlayerTank);
    this.tank.getComponent(Collider2D).group = COLLISION_GROUPS.PLAYER_TANK;
    this.tank.getComponent(RigidBody2D).group = COLLISION_GROUPS.PLAYER_TANK;
    this.map = this.node.getComponent(TiledMap);
    this.node.addChild(this.tank);
    this.setTankPosition();
    this.GrassLayer.setSiblingIndex(this.GrassLayer.parent.children.length - 1);

    input.on(Input.EventType.KEY_DOWN, this.MoveTank, this);
    input.on(Input.EventType.KEY_PRESSING, this.MoveTank, this);
    this.schedule(this.enemyTanks, 2);
  }

  addRedWalls() {
    let redWall = instantiate(this.RedWall);
    this.node.addChild(redWall);
    redWall.getComponent(RigidBody2D).group = COLLISION_GROUPS.BREAKABLE_WALL;
    redWall.getComponent(Collider2D).group = COLLISION_GROUPS.BREAKABLE_WALL;
    let redWallPositionGroup: TiledObjectGroup = this.RedWallPositionGroup;
    let tankLocation = redWallPositionGroup.getObject(`${this.redwallno}`);
    const x_coordinate =
      redWallPositionGroup.getObject(`${this.redwallno}`).x -
      redWallPositionGroup.node.getComponent(UITransform).width * 0.5;
    const y_coordinate =
      redWallPositionGroup.getObject(`${this.redwallno}`).y -
      redWallPositionGroup.node.getComponent(UITransform).height * 0.5;
    console.log("Tile added", redWall);
    redWall.setPosition(x_coordinate, y_coordinate);
    this.redwallno++;
  }
  /**
   * Sets the Tanks Position according to the Object Location provided on the Tiled Map
   */
  setTankPosition() {
    let tankPositionGroup: TiledObjectGroup = this.PlayerTankPosition;
    let tankLocation = tankPositionGroup.getObject(`Position1`);
    const x_coordinate =
      tankPositionGroup.getObject(`Position1`).x -
      tankPositionGroup.node.getComponent(UITransform).width * 0.5;
    const y_coordinate =
      tankPositionGroup.getObject(`Position1`).y -
      tankPositionGroup.node.getComponent(UITransform).height * 0.5;
    console.log("Tank Location", tankLocation);
    this.tank.setPosition(x_coordinate, y_coordinate);
  }
  /**
   * Move the tank in different Directions on Key Presses
   * @param event - For checking which key is pressed.
   */
  MoveTank = (event: any) => {
    let currentTankPosition = this.tank.getPosition();
    switch (event.keyCode) {
      case KeyCode.ARROW_UP:
      case KeyCode.KEY_W: {
        this.tank.angle = ANGLE.UP;
        currentTankPosition.y = currentTankPosition.y + 8;
        this.tank.setPosition(currentTankPosition);
        break;
      }
      case KeyCode.ARROW_LEFT:
      case KeyCode.KEY_A: {
        this.tank.angle = ANGLE.LEFT;
        currentTankPosition.x = currentTankPosition.x - 8;
        this.tank.setPosition(currentTankPosition);
        break;
      }
      case KeyCode.ARROW_DOWN:
      case KeyCode.KEY_S: {
        this.tank.angle = ANGLE.DOWN;
        currentTankPosition.y = currentTankPosition.y - 8;
        this.tank.setPosition(currentTankPosition);
        break;
      }
      case KeyCode.ARROW_RIGHT:
      case KeyCode.KEY_D: {
        this.tank.angle = ANGLE.RIGHT;
        currentTankPosition.x = currentTankPosition.x + 8;
        this.tank.setPosition(currentTankPosition);
        break;
      }
    }
  };
  /**
   * Creates Enemy Tanks
   */
  enemyTanks() {
    if (this.enemyTanksArray.length < 1) {
      console.log("ENEMY TANK ADDED");
      let enemyTankCreated = instantiate(this.EnemyTank);
      this.node.addChild(enemyTankCreated);
      enemyTankCreated.getComponent(RigidBody2D).group =
        COLLISION_GROUPS.ENEMY_TANK;
      enemyTankCreated.getComponent(Collider2D).group =
        COLLISION_GROUPS.ENEMY_TANK;
      this.totalEnemyTanks++;
      this.enemyTanksArray.push(enemyTankCreated);
      console.log("Enemy tank position", enemyTankCreated.getWorldPosition());
      this.GrassLayer.setSiblingIndex(this.node.children.length - 1);
      this.setEnemyTanksPosition(enemyTankCreated);
    } else {
      this.unschedule(this.enemyTanks);
    }
  }
  /**
   * Sets the position of Enemy tanks according to the locations provided on the Map
   * @param enemyTank Sets the position of particular tank
   */
  setEnemyTanksPosition(enemyTank: Node) {
    let enemyTanksPositionGroup: TiledObjectGroup = this.EnemyTankPositions;
    let enemyTankLocation = enemyTanksPositionGroup.getObject(
      `Position${this.i}`
    );
    enemyTank.setPosition(enemyTankLocation.x, enemyTankLocation.y);
    this.i++;
    if (this.i == 4) {
      this.i = 1;
    }
  }
  update(deltaTime: number) {}
}
