import React from "react";
import LocInfo from "./LocInfo";
import WeatherCondition from "./WeatherCondition";
import TimeInfo from "./TimeInfo";
import TempInfo from "./TempInfo";

export default function TodayCard(props) {
    
    return (
        <div className="current--container">
            <div className="current--top">
                <div className="current--quadOne current--quad">
                    <LocInfo
                        {...props} />
                </div>
                <div className="current--quadTwo current--quad">
                    <WeatherCondition
                        {...props} />
                </div>
            </div>
            <div className="current--bottom">
                <div className="current--quadThree current--quad">
                    <TimeInfo
                        {...props} />
                </div>
                <div className="current--quadFour current--quad">
                    <TempInfo
                        {...props} />
                </div>
            </div>
        </div>
    )
};