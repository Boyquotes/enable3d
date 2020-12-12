import { Vector3 } from 'three'
import ExtendedObject3D from '../threeWrapper/extendedObject3D'
import PhysicsBody from './physicsBody'

/**
 * @author       Yannick Deubel (https://github.com/yandeu)
 * @copyright    Copyright (c) 2019 Yannick Deubel; Project Url: https://github.com/yandeu/enable3d
 * @license      {@link https://github.com/yandeu/enable3d/blob/master/LICENSE|GNU GPLv3}
 */

const getPlayerShape = () => {
  const compoundShape = new Ammo.btCompoundShape()

  const transform1 = new Ammo.btTransform()
  transform1.setIdentity()
  transform1.setOrigin(new Ammo.btVector3(0, 0, 0))
  compoundShape.addChildShape(transform1, new Ammo.btSphereShape(0.25))

  const transform2 = new Ammo.btTransform()
  transform2.setIdentity()
  transform2.setOrigin(new Ammo.btVector3(0, 0.25, 0))
  compoundShape.addChildShape(transform2, new Ammo.btCylinderShape(new Ammo.btVector3(0.25, 0.25, 0)))

  return compoundShape
}

// https://pybullet.org/Bullet/phpBB3/viewtopic.php?t=7468
// https://pybullet.org/Bullet/phpBB3/viewtopic.php?t=9358
// https://github.com/lo-th/Ammo.lab/blob/af8ee2562dd1b928722784319417944b55904399/src/gun/Character.js
// https://discourse.threejs.org/t/ammo-js-with-three-js/12530
// https://github.com/AndresTraks/BulletSharp/wiki/Collision-Callbacks-and-Triggers
class KinematicCharacterController {
  public tmpTrans: Ammo.btTransform
  public physicsWorld: Ammo.btDiscreteDynamicsWorld

  public addKinematicCharacterController() {
    const shape = new Ammo.btCapsuleShape(0.38, 0.8)
    shape.setMargin(0.05)

    const ghostObject = new Ammo.btPairCachingGhostObject()

    const transform = new Ammo.btTransform()
    transform.setIdentity()
    transform.setOrigin(new Ammo.btVector3(0, 2, 0))
    transform.setRotation(new Ammo.btQuaternion(0, 0, 0, 1))

    ghostObject.setWorldTransform(transform)
    ghostObject.setCollisionShape(shape)
    ghostObject.setCollisionFlags(ghostObject.getCollisionFlags() | 16) //CHARACTER_OBJECT
    // ghostObject.setActivationState(4)
    // ghostObject.activate(true)
    // ghostObject.setFriction(0)

    // const controller = new Ammo.btKinematicCharacterController(ghostObject, shape.getChildShape(0), 0.35, 1)
    // 0.5 does not work , 0.6 does not work, but 0.535 works :/
    const controller = new Ammo.btKinematicCharacterController(ghostObject, shape, 0.2, 1)
    controller.setUseGhostSweepTest(true)
    controller.setGravity(9.8 * 3) // default 9.8*3
    controller.setMaxSlope(Math.PI / 3) // default Math.PI / 4

    // controller.setGravity(0)
    // it falls through the ground if I apply gravity
    // controller.setGravity(-this.physicsWorld.getGravity().y())

    // addCollisionObject(collisionObject: Ammo.btCollisionObject, collisionFilterGroup?: number | undefined, collisionFilterMask?: number | undefined): void
    this.physicsWorld.addCollisionObject(ghostObject, 32, -1)
    this.physicsWorld.addAction(controller)

    return { controller, ghostObject }
  }
}

export default KinematicCharacterController