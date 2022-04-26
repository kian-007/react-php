import React, { useEffect, useState } from 'react';
import './countDown.css';

const CountDown = () => {
    const [start, setStart] = useState(false)
    const [count, setCount] = useState(0)

    const [hour1, setHour1] = useState('0')
    const [hour2, setHour2] = useState('1')

    const [minute1, setMinute1] = useState('0')
    const [minute2, setMinute2] = useState('1')

    const [second1, setSecond1] = useState('0')
    const [second2, setSecond2] = useState('1')


    useEffect(() => {
        setStart(true)
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setCount(count + 1)

            if (second2 > 0) {
                setSecond2(second2 - 1)
                return
            }
            if (second1 > 0) {
                setSecond1(second1 - 1)
                setSecond2(9)
                return
            }

            if (minute2 > 0) {
                setMinute2(minute2 - 1)
                setSecond2(9)
                setSecond1(5)
                return
            }
            if (minute1 > 0) {
                setMinute1(minute1 - 1)
                setMinute2(9)
                setSecond2(9)
                setSecond1(5)
                return
            }

            if (hour2 > 0) {
                setHour2(hour2 - 1)
                setSecond2(9)
                setSecond1(5)
                setMinute2(9)
                setMinute1(5)
                return
            }
            if (hour1 > 0) {
                setHour1(hour1 - 1)
                setHour2(9)
                setSecond2(9)
                setSecond1(5)
                setMinute2(9)
                setMinute1(5)
                return
            }

        }, 480)
    }, [start, count])

    return (
        <div className="countDown">
            <div className="first">
                Hours <br />
                <div >
                    <span>{hour1}</span>
                    <span>{hour2}</span>
                </div>
            </div>
            <div className="first">
                Minutes <br />
                <div >
                    <span>{minute1}</span>
                    <span>{minute2}</span>
                </div>
            </div>
            <div className="first">
                Seconds <br />
                <div >
                    <span>{second1}</span>
                    <span>{second2}</span>
                </div>
            </div>
        </div>
    )
}

export default CountDown;