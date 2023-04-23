import {
  _decorator,
  Component,
  Node,
  TiledLayer,
  TiledMap,
  UITransform,
  TiledTile,
  RigidBody2D,
  ERigidBody2DType,
  BoxCollider2D,
  Vec2,
  PhysicsSystem2D,
  EPhysics2DDrawFlags,
  Vec3,
  Sprite,
  SpriteFrame,
} from "cc";
import { COLLISION_GROUPS, TAGS } from "./Constants";
const { ccclass, property } = _decorator;

@ccclass("AddColliders")
export class AddColliders extends Component {
  @property(Node) RedBricksLayer: Node = null;
  @property(Node) WhiteBricksLayer: Node = null;
  @property(Node) WaterLayer: Node = null;
  @property(TiledMap) Map: TiledMap = null;
  @property(SpriteFrame) DestroyedTile: SpriteFrame;
  start() {
    // PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.All;
    this.Map.node.setWorldPosition(0, 0, 0);
    this.Map.node.getComponent(UITransform).setAnchorPoint(0, 0);
    console.log("Map Orientation", this.Map);
    this.AddColliders(this.RedBricksLayer.name, TAGS.BREAKABLE_WALL);
    this.AddColliders(this.WhiteBricksLayer.name, TAGS.UNBREAKABLE_WALL);
    this.AddColliders(this.WaterLayer.name, TAGS.BULLETWATER);
  }

  /**
   * Add Colliders on tiles of layers of Tiled Map
   * @param name - Name of the layer on which colliders are to be added
   * @param tag - Tag number to be given to a particular type of layer
   */

  AddColliders(name: string, tag: number) {
    let layer: TiledLayer = this.Map.getLayer(name);
    let tilesize = layer.getMapTileSize();
    for (let i = 0; i < layer.getLayerSize().width; i++) {
      for (let j = 0; j < layer.getLayerSize().height; j++) {
        var tile: TiledTile = layer.getTiledTileAt(i, j, true);
        if (tile.grid != 0) {
          tile.addComponent(RigidBody2D);
          tile.getComponent(RigidBody2D).enabledContactListener = true;
          tile.getComponent(RigidBody2D).bullet = true;
          tile.getComponent(RigidBody2D).type = ERigidBody2DType.Kinematic;
          tile.getComponent(RigidBody2D).allowSleep = false;
          tile.getComponent(RigidBody2D).awakeOnLoad = true;
          tile.getComponent(RigidBody2D).gravityScale = 0;
          let collider = tile.addComponent(BoxCollider2D);
          collider.size = tilesize;
          collider.density = 1000;
          collider.restitution = 0;
          collider.tag = tag;
          console.log(collider.tag);

          collider.offset = new Vec2(tilesize.width / 2, tilesize.height / 2);
          this.setCollisionGroups(tile, collider, tag);
          collider.apply();
          console.log("Colliders Added");
          let sprite = tile.addComponent(Sprite);
        }
      }
    }
  }
  /**
   * Set Different Collision Groups of Different Layers
   * @param tile - Tile of a layer
   * @param collider - Collider of a tile
   * @param Tag - Tag to be given to tiles of same layer
   */
  setCollisionGroups(tile: TiledTile, collider: BoxCollider2D, Tag: number) {
    switch (Tag) {
      case TAGS.BREAKABLE_WALL:
        tile.getComponent(RigidBody2D).group = COLLISION_GROUPS.BREAKABLE_WALL;
        collider.group = COLLISION_GROUPS.BREAKABLE_WALL;
        console.log("BREAKABLE WALL COLLIDER ADDED");
        break;
      case TAGS.UNBREAKABLE_WALL:
        tile.getComponent(RigidBody2D).group =
          COLLISION_GROUPS.UNBREAKABLE_WALL;
        collider.group = COLLISION_GROUPS.UNBREAKABLE_WALL;
        console.log("UNBREAKABLE WALL COLLIDER ADDED");
        break;
      case TAGS.BULLETWATER:
        tile.getComponent(RigidBody2D).group = COLLISION_GROUPS.WATER;
        collider.group = COLLISION_GROUPS.WATER;
        console.log("WATER COLLIDER ADDED");
        break;
    }
  }

  update(deltaTime: number) {}
}
