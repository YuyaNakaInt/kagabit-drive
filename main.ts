//% weight=30 icon="\uf1b9" color=#000000 block="KAGA:bit-Drive"
namespace kagabitdrive {

    export enum ledmodeval{
        //% block="使う"
        Use = 1,
        //% block="使わない"
        NoUse = 0
    }
    export enum direction {
        //% block="前"
        Forward = 1,
        //% block="後"
        Back = 0
    }
    //% blockId=use_led block="LEDの利用 %ledmode %v"
    export function useled(ledmode:ledmodeval):void{
        if(ledmode == 1){
            led.enable(true)
        }
        else if (ledmode == 1){
            led.enable(false)
        }else{

        }
    }
    //% blockId=show_strings block="コメント文 |%text %power %v"
    export function showcomment(text: direction,power:number): void {
    }

}