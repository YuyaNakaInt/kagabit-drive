//% weight=30 icon="\uf1b9" color=#000000 block="KAGA:bit-Drive"
namespace kagabitdrive {

    enum direction {
        //% block=Forward
        Forward = 1,
        //% block=Back
        Back = 0
    }

    //% blockId=stop_led block="LEDを無効にする %v"
    export function stopLed() {
        led.enable(false)
    }
    //% blockId=start_led block="LEDを有効ににする %v"
    export function startLed() {
        led.enable(true)
    }
    //% blockId=show_strings block="コメント文 %text %v"
    export function showcomment(text: direction): void {
    }

}