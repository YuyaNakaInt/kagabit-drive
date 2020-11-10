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

    enum adMode{
        //アナログ
        Analog = 1,
        //デジタル
        Digital = 0
    }

    enum stop{
        //停止
        Stop = 1,
        //移動
        Move = 0
    }

    let nowADmode = [adMode.Analog, adMode.Analog];
    let nowDirection = [direction.Forward,direction.Forward];
    let nowPower =[0,0];
    let nowStop=[stop.Stop,stop.Stop];

    //% group="モーター制御"
    //% blockId="Double_DCmotorAnalog"
    //% block="モーター制御 Lモーター %powerL Rモーター %powerR"
    //% powerL.min=-1023 powerL.max=1023
    //% powerR.min=-1023 powerR.max=1023
    export function DoubleMotor(powerL:number,powerR:number){

        nowADmode[0] = adMode.Analog;
        nowADmode[1] = adMode.Analog;

        if (powerL == 0) {
            nowPower[0] = Math.abs(powerL);
            nowStop[0] = stop.Stop;
        }else if(powerL >= 0){
            nowDirection[0] = direction.Forward;
            nowPower[0] = Math.abs(powerL);
            nowStop[0] = stop.Move;
        } else {
            nowDirection[0] = direction.Back;
            nowPower[0] = Math.abs(powerL);
            nowStop[0] = stop.Move;
        }

        if (powerR == 0) {
            nowPower[1] = Math.abs(powerR);
            nowStop[1] = stop.Stop;
        }else if(powerR >= 0){
            nowDirection[1] = direction.Forward;
            nowPower[1] = Math.abs(powerR);
            nowStop[1] = stop.Move;
        } else {
            nowDirection[1] = direction.Back;
            nowPower[1] = Math.abs(powerR);
            nowStop[1] = stop.Move;
        }

        pins.digitalWritePin(DigitalPin.P13, nowDirection[0])
        pins.analogWritePin(AnalogPin.P14, nowPower[0])

        pins.digitalWritePin(DigitalPin.P15, nowDirection[1])
        pins.analogWritePin(AnalogPin.P16, nowPower[1])

    }



    //% blockId=L_DCmotorAnalog
    //% block="Lモーター 方向%mode アナログ出力%power"
    //% power.min=0 power.max=1023
    export function LmotorA(mode: direction, power: number) {

        nowADmode[0] = adMode.Analog;
        nowDirection[0] = mode;
        nowPower[0] = power;
        nowStop[0] = stop.Move;

        pins.digitalWritePin(DigitalPin.P13, mode)
        pins.analogWritePin(AnalogPin.P14, power)
  
    }

    //% blockId=R_DCmotorAnalog
    //% block="Rモーター 方向%mode アナログ出力%power"
    //% power.min=0 power.max=1023
    export function RmotorA(mode: direction, power: number) {

        nowADmode[1] = adMode.Analog;
        nowDirection[1] = mode;
        nowPower[1] = power;
        nowStop[1] = stop.Move;

        pins.digitalWritePin(DigitalPin.P15, mode)
        pins.analogWritePin(AnalogPin.P16, power)

    }

    //% blockId=L_DCmotorDigtal
    //% block="Lモーター 方向%mode デジタル出力%power"
    //% power.min=0 power.max=1
    export function LmotorD(mode: direction, power: number) {

        nowADmode[0] = adMode.Digital;
        nowDirection[0] = mode;
        nowPower[0] = power;
        nowStop[0] = stop.Move;

        pins.digitalWritePin(DigitalPin.P13, mode)
        pins.digitalWritePin(DigitalPin.P14, power)

    }

    //% blockId=R_DCmotorDigtal
    //% block="Rモーター 方向%mode デジタル出力%power"
    //% power.min=0 power.max=1
    export function RmotorD(mode: direction, power: number) {

        nowADmode[1] = adMode.Digital;
        nowDirection[1] = mode;
        nowPower[1] = power;
        nowStop[1] = stop.Move;

        pins.digitalWritePin(DigitalPin.P15, mode)
        pins.digitalWritePin(DigitalPin.P16, power)

    }

    //% blockId=L_DCmotor_stop
    //% block="Lモーター停止"
    export function LmotorStop() {
        if (nowStop[0] == stop.Move) { //モーターが動いていたら
            if (nowDirection[0] == direction.Forward) {    //前回転の場合
                pins.digitalWritePin(DigitalPin.P13, direction.Back)
            } else {  //後ろ回転の場合
                pins.digitalWritePin(DigitalPin.P13, direction.Forward)
            }
            if(nowADmode[0] == adMode.Analog){  //アナログの場合
                
                pins.analogWritePin(AnalogPin.P14, nowPower[0])
                basic.pause(50)
                pins.analogWritePin(AnalogPin.P14, 0)
            }else{  //デジタルの場合
                pins.digitalWritePin(DigitalPin.P14, nowPower[0])
                basic.pause(50)
                pins.digitalWritePin(DigitalPin.P14, 0)
            }
        }else{

        }

        nowStop[0] == stop.Stop;
           
    }

    //% blockId=R_DCmotor_stop
    //% block="Rモーター停止"
    export function RmotorStop() {
        if (nowStop[1] == stop.Move) { //モーターが動いていたら
            if (nowDirection[1] == direction.Forward) {    //前回転の場合
                pins.digitalWritePin(DigitalPin.P15, direction.Back)
            } else {  //後ろ回転の場合
                pins.digitalWritePin(DigitalPin.P15, direction.Forward)
            }
            if (nowADmode[1] == adMode.Analog) {  //アナログの場合

                pins.analogWritePin(AnalogPin.P16, nowPower[0])
                basic.pause(50)
                pins.analogWritePin(AnalogPin.P16, 0)
            } else {  //デジタルの場合
                pins.digitalWritePin(DigitalPin.P16, nowPower[0])
                basic.pause(50)
                pins.digitalWritePin(DigitalPin.P16, 0)
            }
        } else {

        }

        nowStop[1] == stop.Stop;

    }

    //% blockId=L_Servo_Angle block="Lサーボの角度%angle"
    //% angle.min=0 angle.max=180
    export function LServoAngle(angle: number) {
        
        pins.servoWritePin(AnalogPin.P7, angle)
    }

    //% blockId=R_Servo_Angle block="Rサーボの角度%angle"
    //% angle.min=0 angle.max=180
    export function RServoAngle(angle: number) {
        
        pins.servoWritePin(AnalogPin.P9, angle)
    }
    
}