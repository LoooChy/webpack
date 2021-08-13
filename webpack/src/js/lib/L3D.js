/**
 * create by luqingyi
 * 2018.6.26
 * version 0.1
 * 
 * Descript:
 * if you want create a small 3d project,and you has not basic for 3d,then L3D  probably let you come in 3D world.
 * 
 * you must need three javascript files:
 * L3D.js , L.js , three.js
 * and other javascript files on my github ,if you need ,you can download.
 * 
 * my gitgub : https://github.com/LoooChy
 * 
 */
// import L from './L.js';
import * as THREE from './three.module.js';
import { OrbitControls } from '../jsm/controls/OrbitControls.js';
class L3D {
    constructor(object) {
        this.scene = new THREE.Scene();
        this.params = {
            box: document.querySelector(object.el),//容器
            width: object.viewport[0],//容器宽度
            height: object.viewport[1],//容器高度
            allMesh: [],
            INTERSECTED: null,
            allObject: object,//初始化时所有的对象
            clock: new THREE.Clock(),//时钟
            controls: null,
            version: 0.1
        }
        console.log("L3D " + this.params.version + " DEV");
        this.init(object);
        // console.log(this);


    }

    init = (object) => {
        this.initRender(object);
        this.initCamera(object);
        this.initLight(object);
        this.initAxis(object);
        this.initObject(object);
        this.render(object);
        this.bindHandler(object);
    }

    initRender = (object) => {
        this.renderer = new THREE.WebGLRenderer({
            antialias: object.render.antialias,
            alpha: object.render.alpha,
        });
        object.render.alpha ? this.renderer.setClearColor(0xffffff, 0) : this.renderer.setClearColor(0xffffff, 1);
        // this.renderer.shadowMapEnabled = true;
        this.renderer.setSize(this.params.width, this.params.height);
        document.querySelector(object.el).append(this.renderer.domElement);
    }

    initCamera = (object) => {
        this.camera = new THREE.PerspectiveCamera(45, this.params.width / this.params.height, 1, 1000);
        this.camera.position.set(...object.camera.position);
        object.camera.controls ? this.params.controls = new OrbitControls(this.camera, this.renderer.domElement) : this.scene.add(this.camera);
    }

    initLight = (object) => {

    }

    initAxis = (object) => {
        if (object.axis.isOpen) {
            var axes = new THREE.AxisHelper(object.axis.length);
            this.scene.add(axes)
        }
    }

    initObject = (object) => {
        object.initObject && object.initObject(this, THREE)
    }

    render = (object) => {
        this.animate(this);
        requestAnimationFrame(this.render)
    }

    animate = (object) => {
        this.renderer.render(this.scene, this.camera)
    }

    loaderModle = (object) => {

    }

    animateFn = (object) => {

    }

    bindHandler = (object) => {

    }

    onResize = (object) => {

    }

    ray = (object) => {

    }

    creatPlanMessage = (object) => {

    }

    createCube = (obj) => {
        const geometry = new THREE.BoxGeometry(obj.attrbuilt);
        const material = new THREE.MeshBasicMaterial({ 
            // map: texture 
            color:obj.color
        });
        const mesh = new THREE.Mesh( geometry, material )
        mesh.name = obj.name
        // mesh.position.set(0,0,0)
        mesh.computeBoundingSphere()
        return mesh
    }

    createSpehre = (object) => {

    }
}

export default L3D