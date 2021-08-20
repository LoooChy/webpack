
import L3D from './lib/L3D.js';
import erth from '../images/erth.jpg';
import chinaJson from '../json/china.json';



const a = new L3D({
    el: "#canvas-frame",//容器ID
    viewport: [
        document.querySelector("#canvas-frame").offsetWidth,
        document.querySelector("#canvas-frame").offsetHeight
    ],//容器宽高
    render: {
        antialias: true,//抗锯齿
        alpha: true,//开启透明
        fps: false//开启帧数检测
    },
    camera: {
        position: [100, 80, 100],//相机坐标
        controls: true//开启控制
    },
    axis: {
        isOpen: true,//坐标轴
        length: 200,//坐标轴长度
        gridNum: [200, 40],//【网格大小,网格密度】
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
        const pic1 = loader.load(erth);
        const spehre = L.create3Dobj({
            objType: 'spehre',
            base: [20],
            position: [30, 29.99, 30],
            name: 'erth',
            castShadow: true,
            materialObj: {
                materiaType: 'phong',
                color: '#f0f0f0',
                wireframe: false,
                opacity: 0.9,
                transparent: false,
                texture: [pic1],
            }
        });
        spehre.rotation.set(0, -Math.PI * 1, 0);
        // spehre.tansform.y = 2;
        L.add(spehre);
        // function lglt2xyz(lng, lat, radius) {
        //     const theta = (90 + lng) * (Math.PI / 180)
        //     const phi = (90 - lat) * (Math.PI / 180)
        //     return (new THREE.Vector3()).setFromSpherical(new THREE.Spherical(radius, phi, theta))
        // }
    //     const projection = d3
    // .geoMercator()
    // .center([104.0, 37.5])
    // .scale(80)
    // .translate([0, 0])
        // let map = new THREE.Object3D();
        // chinaJson.features.forEach(elem => {
        //     // 新建一个省份容器：用来存放省份对应的模型和轮廓线
        //     const province = new THREE.Object3D();
        //     const coordinates = elem.geometry.coordinates;
            
        //     coordinates.forEach((multiPolygon) => {
        //         multiPolygon.forEach((polygon) => {
        //           const shape = new THREE.Shape()
        //           const lineMaterial = new THREE.LineBasicMaterial({
        //             color: 'white',
        //           })
        //           const lineGeometry = new THREE.BufferGeometry()
        //           const arr = [];
        //           for (let i = 0; i < polygon.length; i++) {
        //             const [x, y] = projection(polygon[i])
        //             if (i === 0) {
        //               shape.moveTo(x, -y)
        //             }
        //             shape.lineTo(x, -y)
        //             // lineGeometry.vertices.push(new THREE.Vector3(x, -y, 4.01))
        //             arr.push(new THREE.Vector3(x, -y, 4.01))
        //           }
        //           lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(position, 3));
        //           const extrudeSettings = {
        //             depth: 10,
        //             bevelEnabled: false,
        //           }
          
        //           const geometry = new THREE.ExtrudeGeometry(
        //             shape,
        //             extrudeSettings
        //           )
        //           const material = new THREE.MeshBasicMaterial({
        //             color: '#2defff',
        //             transparent: true,
        //             opacity: 0.6,
        //           })
        //           const material1 = new THREE.MeshBasicMaterial({
        //             color: '#3480C4',
        //             transparent: true,
        //             opacity: 0.5,
        //           })
          
        //           const mesh = new THREE.Mesh(geometry, [material, material1])
        //           const line = new THREE.Line(lineGeometry, lineMaterial)
        //           province.add(mesh)
        //           province.add(line)
        //         })
        //       })
        //     map.add(province);
        // });
        // map.scale.set(20, 20, 20);
        // map.position.set(30, 30, 30);
        // map.rotation.set(0, -Math.PI, 0)
        // L.add(map);

    },
    animateFn: (L) => {
        const points = L.getGeometry('points');
        const elapsed = L.params.clock.getElapsedTime();
        points.rotation.set(0, elapsed * 0.05, 0);

    },
    bindHandlerFn: (L) => {
        document.addEventListener('click', () => {
            // console.log(L.getCurrentObj(), "currentObj");
            console.log(L.getAllObj(), "getAllObj");
            // console.log(L.getGeometry('line1').getPoints(10))
        });
    }
})
