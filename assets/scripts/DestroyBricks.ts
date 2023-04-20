import {
  _decorator,
  Component,
  Node,
  TiledMap,
  TiledLayer,
  TiledTile,
  Contact2DType,
  Collider2D,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("DestroyBricks")
export class DestroyBricks extends Component {
  @property(TiledLayer) RedTiles: TiledLayer = null;
  start() {
    this.RedTiles.node.on(Contact2DType.BEGIN_CONTACT, (self, other) => {
      for (let i = 0; i < this.RedTiles.getLayerSize().width; i++) {
        for (let j = 0; j < this.RedTiles.getLayerSize().height; j++) {
          let tile: TiledTile = this.RedTiles.getTiledTileAt(i, j, true);
          console.log(other.node.name);
          tile.node.destroy();
        }
      }
    });
  }
  collisionDetection() {}
  update(deltaTime: number) {}
}
