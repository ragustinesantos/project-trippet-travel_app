import React from "react";

export default function WeatherCondition(props) {

    function weatherCondition() {
        const condition = Object.keys(props.conditionMap).find(key => props.conditionMap[key].includes(props.condition));
        return props.imageMap[condition]
    }

    return (
        <div className="quadTwo--container">
            <img className="weatherImg" src={weatherCondition()} alt="Weather Condition" />
        </div>
    )
}