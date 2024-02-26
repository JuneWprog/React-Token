import * as echarts from "echarts";
import { useEffect, useRef } from "react";
import BarChart from "@/components/BarChart";

//get dom element

const Home = () => {
  //useRef to get virtual dom element
  return (
    <div>
        <BarChart
            data={{
            title: "June First Weekly Sales",
            xAxis: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            yAxis: [150, 230, 224, 218, 135, 147, 260],
            }}
        />
        <BarChart
            data={{
            title: "June Second Weekly Sales",
            xAxis: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            yAxis: [150, 230, 2, 218, 135, 147, 260],
            }}
        />
    </div>
  );
};
export default Home;
