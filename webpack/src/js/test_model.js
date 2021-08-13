
import L3D from './lib/L3D.js';
import { Color } from './lib/three.module.js';
// import L from './lib/L.js';

const a = new L3D({
    el: "#canvas-frame",//容器ID
    viewport: [
        document.querySelector("#canvas-frame").offsetWidth, 
        document.querySelector("#canvas-frame").offsetHeight
    ],//容器宽高
    render: {
        antialias: true,//抗锯齿
        alpha: false,//透明度
    },
    camera:{
        position:[0,240,350],//相机坐标
        controls:true//开启控制
    },
    axis:{
        isOpen:true,//坐标轴
        length:200//坐标轴长度
    },
    initObject:(L,TH)=>{
        const cube = L.createCube({
            attrbuilt:[20,20,20],
            color:'#ff00ff',
            name:'cube1'
        });
        L.scene.add(cube)
    }
})

console.log()