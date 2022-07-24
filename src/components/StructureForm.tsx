import { BoxWall } from "./BoxWall";
import {PaintBucket} from "phosphor-react"
import { useState } from "react";


export function StructureForm(){
    
    let alerta : Array<string>  = [];
    let areaTotalUtilWall = 0;
    let literTotal = 0;
    const areaUnitWindow = 2.4;
    const areaUnitDoor = 1.52;
    const heightDoorSpace = 2.2;
    const meterPerLiter = 5;
    
    let arrayWall = [
        {"wall":"wall1","height":0,"width":0,"door":0,"window":0,"area": 0,"wallname":"Parede 1"},
        {"wall":"wall2","height":0,"width":0,"door":0,"window":0,"area": 0,"wallname":"Parede 2"},
        {"wall":"wall3","height":0,"width":0,"door":0,"window":0,"area": 0,"wallname":"Parede 3"},
        {"wall":"wall4","height":0,"width":0,"door":0,"window":0,"area": 0,"wallname":"Parede 4"},
    ];

    
    let arrayPaint = [
        [0,18],
        [0,3.6],
        [0,2.5],
        [0,0.5],
    ];
    
    
    function setValueInputInArrayWall(){

        let inputs = document.querySelectorAll("input");

        inputs.forEach(element => {

            let nameInput = element.getAttribute("data-nameinput");
            let key = element.getAttribute("data-wall");
            let value = element.value;
            let itemWall = arrayWall.find(wall => wall.wall === key);

            if(typeof value != "undefined" && value){
                switch (nameInput) {
                    
                    case "height":
                        itemWall!.height = Number(value);
                        break;

                    case "width":
                        itemWall!.width = Number(value);
                        break;

                    case "door":
                        itemWall!.door = Number(value);
                        break;

                    case "window":
                        itemWall!.window = Number(value);
                        break;

                    default:
                        break;
                }
            }
        });
    }

    function calcAreaTotal(){
        document.getElementById('mainBuckets')!.classList.add('hidden');
        let callCalcPaint = true;
        areaTotalUtilWall = 0;
        setValueInputInArrayWall();
        emptyAlertFunc();

        arrayWall.forEach(element => {

            if(element.height == 0.00 || element.width == 0.00){
                setAlertFunc("Informar a altura e largura da " + element.wallname);
                callCalcPaint = false;
            }else{

                let totalAreaWall = element.height * element.width;
                let areaTotalWindowandDoor = (areaUnitWindow * element.window) + (areaUnitDoor * element.door);

                if(totalAreaWall > 50){
                    setAlertFunc("A "+element.wallname+" precisa ter no máximo 50m²!");
                    callCalcPaint = false;
                }
                if(totalAreaWall < 1){
                    setAlertFunc("A "+element.wallname+" precisa ter no mínimo 1m²!");
                    callCalcPaint = false;   
                }
                if(element.door > 0 && element.height < heightDoorSpace){
                    setAlertFunc("A altura da "+ element.wallname+ " precisa ser 30cm mais alta que a porta (Altura Mínima: 2.20 mts)!");
                    callCalcPaint = false;
                }
                if(areaTotalWindowandDoor > totalAreaWall / 2 ){
                    setAlertFunc("A área de janelas e portas deve ser menor que 50% da área da " + element.wallname);
                    callCalcPaint = false;
                }
                
                areaTotalUtilWall += element.area = parseFloat(totalAreaWall.toFixed(2)) - parseFloat(areaTotalWindowandDoor.toFixed(2));
            }
        }); 

        getAlertFunc();
        if(callCalcPaint){
            calcLitersOfPaint(parseFloat(areaTotalUtilWall.toFixed(2)));
        }
        
    }

    

    function calcLitersOfPaint(data: Number){
        
        emptyAlertFunc();
        resetArrayPaint();
        

        var area = parseFloat(data.toFixed(2));
        var liters = area / meterPerLiter;
        liters = parseFloat(liters.toFixed(1));
        literTotal = liters;
        let bucketPaint = 0;
       
        arrayPaint.forEach(element => {
            
            let divider = element[1];

            if(liters >= divider){
            
                bucketPaint = liters / divider;
                
                element[0] = Math.trunc(bucketPaint);
                
                liters %= divider;

                if(parseFloat(liters.toFixed(1)) > 0.0 && parseFloat(liters.toFixed(1)) <= 0.5){
                    arrayPaint[3][0] += 1;
                    return;
                }
            }
        });
        renderBucketsOfPaints();
    }

    function renderBucketsOfPaints(){
        document.getElementById('mainBuckets')!.classList.remove('hidden');
        let boxPaintElement = document.getElementById('boxbucketpaints');
        boxPaintElement!.innerHTML = "";
        document.getElementById('span')?.remove();
        arrayPaint.forEach(element =>{
            if(element[0] > 0)
            boxPaintElement!.innerHTML += "<div class='flex flex-col justify-center p-2 items-center m-5 mb-5 max-w-fit border border-white rounded bg-gray-100 text-gray-900 font-bold'><img src='src/assets/paint-bucket-fill.png'  class='margin-auto w-[60px] h-[60px]' /><span>"+element[0]+" lata(s) de "+element[1]+"L</span></div>";
        });
        document.getElementById('mainBuckets')!.innerHTML += "<span id='span'>Sua área total é de: "+areaTotalUtilWall+"mts², e para isso é preciso "+literTotal+" litros de tinta</span>";
    }

    function resetArrayPaint(){
        arrayPaint.forEach(element => {
           element[0] = 0; 
        });
    }

    function setAlertFunc(data: string){
        alerta.push(data);
    }
    function getAlertFunc(){
        let boxAlerta = document.getElementById("alerta-box");
        boxAlerta!.innerHTML = "";
        alerta.forEach(element => {
            boxAlerta!.innerHTML += "<span class='block m-auto text-red-600 text-center mt-2'>"+element+"</span>";
        });
    }
    function emptyAlertFunc(){
        alerta.splice(0,alerta.length);
    }

    return (
        <div>
            
            <BoxWall description="Informe os dados da Parede 1" wall="wall1" estilo="mb-4 mt-4 border rounded  m-auto p-5 bg-green-700 max-w-max text-center"/>
            <BoxWall description="Informe os dados da Parede 2" wall="wall2" estilo="mb-4 mt-4 border rounded  m-auto p-5 bg-blue-700 max-w-max text-center"/>
            <BoxWall description="Informe os dados da Parede 3" wall="wall3" estilo="mb-4 mt-4 border rounded  m-auto p-5 bg-red-700 max-w-max text-center"/>
            <BoxWall description="Informe os dados da Parede 4" wall="wall4" estilo="mb-4 mt-4 border rounded  m-auto p-5 bg-yellow-700 max-w-max text-center"/>

            <div className="flex justify-center flex-col" >
                <button
                    className="
                    border rounded 
                    border-blue-500 
                    m-auto 
                    text-xl 
                    font-[500] 
                    p-2 
                    transition-all
                    hover:bg-blue-500 
                    hover:text-gray-900
                    hover:transition-all
                    "
                    onClick={calcAreaTotal}
                >
                    Calcular
                </button>
                
                <div id="alerta-box"></div>
                <div id="mainBuckets" className="hidden m-auto mt-5 w-full text-center">
                <span className="text-2xl mb-5 block">Você precisa das seguintes latas</span>
                    <div id="boxbucketpaints" className="flex flex-1 flex-wrap justify-center">
                    </div>
                </div>
            </div>
        </div>
    )
}