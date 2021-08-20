
import L3D from './lib/L3D.js';
import picture1 from '../images/brick_diffuse.jpg';
import picture2 from '../images/hardwood2_diffuse.jpg';


const a = new L3D({
    el: "#canvas-frame",//容器ID
    viewport: [
        document.querySelector("#canvas-frame").offsetWidth,
        document.querySelector("#canvas-frame").offsetHeight
    ],//容器宽高
    render: {
        antialias: true,//抗锯齿
        alpha: true,//开启透明
        fps:false//开启帧数检测
    },
    camera: {
        position: [150, 440, 450],//相机坐标
        controls: true//开启控制
    },
    axis: {
        isOpen: true,//坐标轴
        length: 200,//坐标轴长度
        gridNum: [200, 40],//【网格大小,网格密度】
    },
    light: [
        {
            type: 'DirectionalLight',
            color: '',
            position: [],
            intensity: 0.9
        },
        {
            type: 'PointLight',
            name: 'pointLight',
            color: '#ffffff',
            shadow: false,
            position: [40, 90, 40],
            intensity: 1,//光照强度
            distance: 0,//光源到光照强度为0的位置
            decay: 1//沿着光照距离的衰退量
        },
        {
            type: 'AmbientLight',
            name: 'ambientLight',
            color: '#ffffff',
            intensity: 0.9
        },
        {
            type: 'SpotLight',
            color: '#00ff00',
            shadow: true,
            position: [100, 200, 100],
            intensity: 0.9,
            distance: 300,//从光源发出光的最大距离，其强度根据光源的距离线性衰减
            angle: Math.PI / 8,//光线散射角度，最大为Math.PI/2
            penumbra: 0,//聚光锥的半影衰减百分比。在0和1之间的值。默认为0。
            decay: 1,//沿着光照距离的衰减量
            help:true
        },
        {
            type: 'RectAreaLight',
            name: 'rectAreaLight',
            color: '#ffffff',
            intensity: 0.9,
            width: 30,
            height: 70,
            position: [-30, 0, -60],
            lookAt: [0, 0, 0]//面光源朝向
        }
    ],
    initObjectFn: (L) => {
        const loader = L.loadTexture();
        const pic1 = loader.load(picture1);
        const pic2 = loader.load(picture2);

        const cube = L.create3Dobj({
            objType: 'cube',
            base: [20, 20, 20],
            position: [0, 0, 0],
            name: 'cube1',
            materialObj: {
                materiaType: 'basic',
                color: '#ff00ff',
                wireframe: false,
                texture: [pic1]
            }
        });
        L.add(cube);
        const spehre = L.create3Dobj({
            objType: 'spehre',
            base: [20],
            position: [30, 30, 30],
            name: 'spehre1',
            castShadow:true,
            materialObj: {
                materiaType: 'phong',
                color: '#f0f0f0',
                wireframe: false,
                opacity: 0.9,
                transparent: false,
                texture: [pic2],
            }
        });
        L.add(spehre);
        const plane = L.create3Dobj({
            objType: 'plane',
            base: [180, 180],
            position: [0, 0, 0],
            name: 'plane1',
            receiveShadow:true,
            materialObj: {
                materiaType: 'shadow',
                color: '#ff00ff',
                wireframe: false,
                opacity: 0.2,
                transparent: false,
                // texture: [pic2]
            }
        });
        plane.rotateX(-Math.PI * 0.5);
        L.add(plane);

        const points = L.create3Dobj({
            objType: 'point',
            position: [50, 50, 50],
            name: 'point1',
            materialObj: {
                materiaType: 'particle',
                color: '#334477',
                opacity: 0.9,
                transparent: false,
                // texture: [pic2],
                size:15,//点的大小
            }
        });
        L.add(points);

        const sprite = L.create3Dobj({
            objType: 'sprite',
            base:[100,50,1],
            position: [-50, -50, -50],
            name: 'sprite1',
            fog:true,
            materialObj: {
                materiaType: 'sprite',
                color: '#ffffff',
                opacity: 0.9,
                transparent: false,
                texture: [pic1],
                // size:15,//点的大小
            }
        });
        L.add(sprite);

        const line = L.create3Dobj({
            objType: 'line',
            base:[0,0,0,100,50,1,60,70,50],
            position: [-50, 20, 10],
            name: 'line1',
            materialObj: {
                materiaType: 'line',
                color: '#ff00ff',
                opacity: 0.5,
                transparent: true,
                linewidth:5
            }
        });
        L.add(line);

    },
    animateFn: (L) => {
        const spehre1 = L.getGeometry('spehre1');
        const elapsed = L.params.clock.getElapsedTime();
        spehre1.position.set(Math.sin(elapsed) * 5, 30, Math.cos(elapsed) * 5);
    },
    bindHandlerFn: (L) => {
        document.addEventListener('click', () => {
            // console.log(L.getCurrentObj(),"currentObj");
            // console.log(L.getAllObj(),"getAllObj");
            console.log(L.getGeometry('line1').getPoints(10))
        });
    }
})
