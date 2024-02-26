import * as echarts from 'echarts';
import React, { useEffect, useRef } from 'react';

const BarChart = (props) => {
    const {title, xAxis, yAxis} = props.data;
    const chartRef = useRef(null);
    
    useEffect(() => {
        const chartDom = chartRef.current;
        const myChart = echarts.init(chartDom);
        const option = {
        title:{
                text: title,
            },
        xAxis: {
            type: 'category',
            data: xAxis,
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
            type: 'bar',
            data: yAxis,
            },
        ],
        };
        option && myChart.setOption(option);
    }, [props.data]);
    
    return <div ref={chartRef} style={{ width: '500px', height: '400px' }}></div>;
};
export default BarChart;