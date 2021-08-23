
import L3D from './lib/L3D.js';
import pic1s from '../images/brick_diffuse.jpg';
import circle1 from '../images/circle1.png';

const can = document.querySelector('#circle_1');
can.width = 10;
can.height = 20;
const cans = can.getContext('2d');
let start = 0;
let texture;


const a = new L3D({
    el: "#canvas-frame",//容器ID
    viewport: [
        document.querySelector("#canvas-frame").offsetWidth,
        document.querySelector("#canvas-frame").offsetHeight
    ],//容器宽高
    render: {
        antialias: true,//抗锯齿
        alpha: true,//开启透明
        fps: true//开启帧数检测
    },
    camera: {
        position: [100, 80, 100],//相机坐标
        controls: true//开启控制
    },
    axis: {
        isOpen: true,//坐标轴
        length: 500,//坐标轴长度
        gridNum: [500, 40],//【网格大小,网格密度】
    },
    light: [
        {
            type: 'AmbientLight',
            name: 'ambientLight',
            color: '#ffffff',
            intensity: 0.9
        }
    ],
    initObjectFn: (L, THREE) => {
        // ss();
        let positions = [];
        for (let i = 0; i < 10000; i++) {
            positions.push((Math.random() * 2 - 1) * 2000);
            positions.push((Math.random() * 2 - 1) * 2000);
            positions.push((Math.random() * 2 - 1) * 2000);
        }
        const points = L.create3Dobj({
            objType: 'point',
            position: positions,
            name: 'points',
            materialObj: {
                materiaType: 'particle',
                color: '#ffffff',
                opacity: 1,
                transparent: false,
                // texture: [pic2],
                size: 2,//点的大小
            }
        });
        L.add(points);

        const loader = L.loadTexture();
        const pic1 = loader.load(pic1s);
        const circle1s = loader.load(circle1);

        const plane = L.create3Dobj({
            objType: 'plane',
            base: [500, 500],
            position: [0, 0, 0],
            name: 'plane1',
            materialObj: {
                materiaType: 'basic',
                color: '#cccccc',
                wireframe: false,
                opacity: 0.2,
                transparent: false,
                // texture: [pic1]
            }
        });
        plane.rotateX(-Math.PI * 0.5);
        L.add(plane);

        texture = new THREE.CanvasTexture(strokes())
        const spehre = L.create3Dobj({
            objType: 'halfSpehre',
            base: [40],
            position: [0, 0, 0],
            name: 'spehre1',
            castShadow: true,
            materialObj: {
                materiaType: 'basic',
                color: '#ffffff',
                wireframe: false,
                opacity: 0.5,
                transparent: true,
                texture: [texture],
            }
        });
        texture.needsUpdate = true;
        L.add(spehre);


    },
    animateFn: (L) => {
        const points = L.getGeometry('points');
        const elapsed = L.params.clock.getElapsedTime();
        points.rotation.set(0, elapsed * 0.05, 0);
        texture.needsUpdate = true;
    },
    bindHandlerFn: (L) => {
        document.addEventListener('click', () => {
            // console.log(L.getCurrentObj(), "currentObj");
            console.log(L.getAllObj(), "getAllObj");
            // console.log(L.getGeometry('line1').getPoints(10))
        });
    }
})

function strokes() {
    cans.moveTo(0, 0);
    cans.lineTo(0, 20);
    var gnt1 = cans.createLinearGradient(0, 0, 0, 20);//线性渐变的起止坐标

    start = start + 0.05;
    start = Number(start.toFixed(2));
    if (start + 0.05 + 0.001 >= 1) {
        start = 0;
    }
    gnt1.addColorStop(0, "#1890ff");
    gnt1.addColorStop(start, "#1890ff");
    gnt1.addColorStop(start + 0.05, "rgba(255,0,0,1)");
    gnt1.addColorStop(start + 0.1, "#1890ff");
    gnt1.addColorStop(1, "#1890ff");
    cans.strokeStyle = gnt1;
    cans.lineWidth = 20;
    cans.stroke();
    cans.closePath();
    return can
}
let s = setInterval(function () {
    strokes();
}, 0);