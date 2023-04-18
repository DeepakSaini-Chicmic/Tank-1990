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
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("AddColliders")
export class AddColliders extends Component {
  @property(Node) RedBricksLayer: Node = null;
  @property(Node) WhiteBricksLayer: Node = null;
  @property(Node) WaterLayer: Node = null;
  @property(TiledMap) Map: TiledMap = null;
  start() {
    // PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.All;
    this.enablecollision(this.RedBricksLayer.name);
    this.enablecollision(this.WhiteBricksLayer.name);
    this.enablecollision(this.WaterLayer.name);
  }

  enablecollision(name) {
    let layer: TiledLayer = this.Map.getLayer(name);
    layer.getComponent(UITransform).setAnchorPoint(0, 0);
    layer.node.setPosition(
      -this.node.getPosition().x,
      -this.node.getPosition().y
    );
    let tilesize = layer.getMapTileSize();
    for (let i = 0; i < layer.getLayerSize().width; i++) {
      for (let j = 0; j < layer.getLayerSize().height; j++) {
        let tile: TiledTile = layer.getTiledTileAt(i, j, true);
        if (tile.grid != 0) {
          tile.addComponent(RigidBody2D);
          tile.getComponent(RigidBody2D).type = ERigidBody2DType.Kinematic;
          tile.getComponent(RigidBody2D).allowSleep = false;
          tile.getComponent(RigidBody2D).awakeOnLoad = true;
          tile.getComponent(RigidBody2D).gravityScale = 0;
          let collider = tile.addComponent(BoxCollider2D);
          collider.size = tilesize;
          collider.density = 1000;
          collider.restitution = 0;
          collider.offset = new Vec2(tilesize.width / 2, tilesize.height / 2);
          collider.apply();
          console.log("Colliders Added");
        }
      }
    }
  }

  update(deltaTime: number) {}
}
