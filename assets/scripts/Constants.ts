export enum ANGLE {
  UP = 0,
  LEFT = 90,
  DOWN = 180,
  RIGHT = 270,
}
export enum VELOCITY {
  NONE = 0,
  FIRE_VELOCITY = 50,
}
export enum COLLISION_GROUPS {
  DEFAULT = 1 << 0,
  PLAYER_TANK = 1 << 1,
  BULLET = 1 << 2,
  ENEMY_TANK = 1 << 3,
  BREAKABLE_WALL = 1 << 4,
  WATER = 1 << 5,
  UNBREAKABLE_WALL = 1 << 6,
}
export enum TAGS {
  BREAKABLE_WALL = 1,
  UNBREAKABLE_WALL = 2,
  BULLETWATER = 3,
}
