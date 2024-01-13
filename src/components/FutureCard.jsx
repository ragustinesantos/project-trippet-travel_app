import React from "react";
import moment from "moment-timezone";

export default function FutureCard(props) {

    const day = moment(props.date).format('dddd')
    const date = moment(props.date).format('ll')

    function weatherCondition() {
        const condition = Object.keys(props.conditionMap).find(key => props.conditionMap[key].includes(props.condition));
        return props.imageMap[condition]
    }

    return (
            <div className="future--container">
                <div className="future--left">
                    <div className="future--top--left futureLeft">
                        <div className="future--day">{day}</div>
                        <div className="future--date">{date}</div>
                    </div>
                    <div className="future--bottom--left futureLeft">
                        <img src={weatherCondition()} alt="Weather Condition" width="50px" />
                    </div>
                </div>
                <div className="future--right">
                    <div className="future--celsius">{props.celsius}°C</div>
                    <div className="future--farenheit">{props.farenheit}°F</div>
                    <div className="future--condition">{props.condition}</div>
                </div>
            </div>
    )
}