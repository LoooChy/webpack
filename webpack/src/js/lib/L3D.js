/**
 * create by luqingyi
 * 2018.6.26
 * version 0.1
 * 
 * Descript:
 * if you want create a small 3d project,and you has not basic for 3d,then L3D  probably let you come in 3D world.
 * 
 * you must need three javascript files:
 * L3D.js, three.js
 * and other javascript files on my github ,if you need ,you can download.
 * 
 * my gitgub : https://github.com/LoooChy
 * 
 */
// import L from './L.js';
import * as THREE from './three.module.js';
import Stats from '../jsm/libs/stats.module.js';
import { Line2 } from '../jsm/lines/Line2.js';
import { LineMaterial } from '../jsm/lines/LineMaterial.js';
import { LineGeometry } from '../jsm/lines/LineGeometry.js';
import { OrbitControls } from '../jsm/controls/OrbitControls.js';
class L3D {
    constructor(object) {
        this.scene = new THREE.Scene();
        this.params = {
            box: document.querySelector(object.el),//容器
            width: object.viewport[0],//容器宽度
            height: object.viewport[1],//容器高度
            INTERSECTED: null,
            allObject: object,//初始化时所有的对象
            clock: new THREE.Clock(),//时钟
            controls: null,
            version: 0.2,
            pointer: new THREE.Vector2(),
            raycaster: new THREE.Raycaster(),
            fps: object.render.fps,
            stats: new Stats()
        }
        console.log("L3D " + this.params.version + " DEV");
        this.init(object);
    }

    init = (object) => {
        this.initRender(object);
        this.initCamera(object);
        this.initLight(object);
        this.initAxis(object);
        this.initObjectFn(object);
        this.render();
        this.bindHandler(object);
        this.onResize();
    }

    initRender = (object) => {
        this.renderer = new THREE.WebGLRenderer({
            antialias: object.render.antialias,
            alpha: object.render.alpha,
        });
        object.render.alpha ? this.renderer.setClearColor(0xffffff, 0) : this.renderer.setClearColor(0xffffff, 1);
        this.renderer.shadowMap.enabled = true;
        this.renderer.setSize(this.params.width, this.params.height);
        document.querySelector(object.el).append(this.renderer.domElement);
        this.params.fps ? document.querySelector(object.el).appendChild(this.params.stats.dom) : null;
    }

    initCamera = (object) => {
        this.camera = new THREE.PerspectiveCamera(45, this.params.width / this.params.height, 1, 1000);
        this.camera.position.set(...object.camera.position);
        object.camera.controls ? this.params.controls = new OrbitControls(this.camera, this.renderer.domElement) : this.add(this.camera);
    }

    initLight = (object) => {
        if (object.light && object.light.length > 0) {
            object.light.forEach((item) => {
                switch (item.type) {
                    case 'AmbientLight':
                        const ambient = new THREE.AmbientLight(item.color, item.intensity);
                        ambient.name = item.name;
                        this.add(ambient);
                        break;
                    case 'PointLight':
                        const pointLight = new THREE.PointLight(item.color, item.intensity, item.distance ? item.distance : 0, item.decay ? item.decay : 1);
                        pointLight.name = item.name;
                        pointLight.castShadow = item.shadow ? true : false;
                        pointLight.position.set(...item.position);
                        this.add(pointLight);
                        break;
                    case 'DirectionalLight':
                        const directionalLight = new THREE.DirectionalLight(item.color, item.intensity);
                        directionalLight.name = item.name;
                        directionalLight.position.set(...item.position);
                        this.add(directionalLight);
                        break;
                    case 'SpotLight':
                        const spotLight = new THREE.SpotLight(item.color, item.intensity, item.distance, item.angle, item.penumbra ? item.penumbra : 0, item.decay ? item.decay : 1);
                        spotLight.name = item.name;
                        spotLight.position.set(...item.position);
                        spotLight.castShadow = item.shadow ? true : false;
                        // spotLight.shadow.mapSize.width = 20;
                        // spotLight.shadow.mapSize.height = 20;
                        // spotLight.shadow.camera.near = 20;
                        // spotLight.shadow.camera.far = 100;
                        // spotLight.shadow.camera.fov = 30;
                        const spotLightHelper = new THREE.SpotLightHelper(spotLight);

                        this.add(spotLight);
                        item.help ? this.add(spotLightHelper) : null;
                        break;
                    case 'RectAreaLight':
                        const rectAreaLight = new THREE.RectAreaLight(item.color, item.intensity, item.width, item.height);
                        rectAreaLight.name = item.name;
                        rectAreaLight.position.set(...item.position);
                        rectAreaLight.lookAt(...item.lookAt);
                        this.add(rectAreaLight);
                        break;
                }
            })

        }
    }

    initAxis = (object) => {
        const { axis } = object;
        if (axis.isOpen) {
            const axes = new THREE.AxesHelper(axis.length);
            const grid = new THREE.GridHelper(axis.gridNum[0], axis.gridNum[1], 0x303030, 0x303030);
            this.add(axes);
            this.add(grid);
        }
    }

    initObjectFn = (object) => {
        object.initObjectFn && object.initObjectFn(this, THREE);
    }

    render = () => {
        this.animate(this);
        requestAnimationFrame(this.render);
    }

    animate = () => {
        this.params.allObject.animateFn && this.params.allObject.animateFn(this)
        this.params.raycaster.setFromCamera(this.params.pointer, this.camera);
        const intersects = this.params.raycaster.intersectObjects(this.scene.children);
        this.params.fps ? this.params.stats.update() : null;
        if (intersects.length > 0) {
            if (this.params.INTERSECTED != intersects[0].object) {
                this.params.INTERSECTED = intersects[0].object;
            }
        } else {
            this.params.INTERSECTED = null;
        }
        this.renderer.render(this.scene, this.camera);
    }

    loaderModle = (object) => {

    }

    animateFn = (object) => {

    }

    bindHandler = (object) => {
        document.addEventListener('pointermove', (event) => {
            this.params.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.params.pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
        });
        object.bindHandlerFn && object.bindHandlerFn(this);
    }

    onResize = () => {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.render(this.scene, this.camera);
        });
    }

    create3Dobj = (obj) => {
        const { base, position, name, objType, materialObj, castShadow, receiveShadow } = obj;
        const { materiaType, color, wireframe, opacity, transparent, texture, size, fog, linewidth } = materialObj;
        let geometry, material;
        switch (objType) {
            case 'cube':
                geometry = new THREE.BoxGeometry(...base);
                break;
            case 'spehre':
                geometry = new THREE.SphereGeometry(...base,30,30,30);
                break;
            case 'plane':
                geometry = new THREE.PlaneGeometry(...base);
                break;
            case 'point':
                geometry = this.getPoint(position, color);
                break;
            case 'line':
                geometry = new LineGeometry();
                geometry.setPositions(base);
                break;
            default:
                geometry = new THREE.BoxGeometry(10, 10, 10);
        }
        switch (materiaType) {
            case 'basic':
                material = new THREE.MeshBasicMaterial({ map: texture ? texture[0] : undefined, color: color, wireframe: wireframe ? true : false });
                break;
            case 'phong':
                material = new THREE.MeshPhongMaterial({ map: texture ? texture[0] : undefined, color: color, shininess: 100, opacity: opacity, transparent: transparent, wireframe: wireframe ? true : false });
                break;
            case 'lambert':
                material = new THREE.MeshLambertMaterial({ map: texture ? texture[0] : undefined, color: color, opacity: opacity, transparent: transparent, wireframe: wireframe ? true : false });
                break;
            case 'particle':
                material = new THREE.PointsMaterial({ map: texture ? texture[0] : undefined, color: color, opacity: opacity, transparent: transparent, size: size });
                break;
            case 'shadow':
                material = new THREE.ShadowMaterial({ opacity: opacity });//接受阴影，但在其他地方完全透明；
                break;
            case 'sprite':
                material = new THREE.SpriteMaterial({ map: texture ? texture[0] : undefined, color: color, fog: fog });
                break;
            case 'line':
                material = new LineMaterial({ color: color, linewidth: linewidth, opacity: opacity, transparent: transparent });
                material.resolution.set(window.innerWidth, window.innerHeight)
                break;
            default:
                material = new THREE.MeshNormalMaterial();
        }
        let mesh;
        if (objType === 'point') {
            mesh = new THREE.Points(geometry, material);
            mesh.position.set(0,0,0);
        } else if (objType === 'sprite') {
            mesh = new THREE.Sprite(material);
            mesh.position.set(...position);
            mesh.scale.set(...base);
        } else if (objType === 'line') {
            mesh = new Line2(geometry, material);
            mesh.position.set(...position);
        } else {
            mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(...position);
        }
        mesh.name = name;
        mesh.castShadow = castShadow ? true : false;
        mesh.receiveShadow = receiveShadow ? true : false;

        return mesh;
    }

    getGeometry = (name) => {
        const geometry = name ? this.scene.getObjectByName(name) : '';
        return geometry;
    }
    loadTexture = () => {
        return new THREE.TextureLoader();
    }
    getCurrentObj = () => {
        return this.params.INTERSECTED;
    }
    getPoint = (position, color) => {
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(position, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(new THREE.Color(color), 3));
        geometry.computeBoundingSphere();
        return geometry;
    }
    add = (obj) => {
        this.scene.add(obj);
    }
    getAllObj = () => {
        return this.scene.children;
    }
}
window.L3D = L3D;
export default L3D

// TODO加载模型