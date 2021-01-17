import React, { useState, useEffect } from 'react';
// import { Text } from 'react-native';
import { VictoryPie } from 'victory-native';
import Svg, { Circle } from 'react-native-svg';

const UserChart = () => {
  const data = [
    { x: 'comedy', y: 30 },
    { x: 'drama', y: 50 },
    { x: 'thriller', y: 5 },
    { x: 'action', y: 5 },
    { x: 'documentary', y: 10 },
    // { x: 'adventure', y: 30 },
    // { x: 'animation', y: 50 },
    // { x: 'crime', y: 5 },
    // { x: 'family', y: 5 },
    // { x: 'fantasy', y: 10 },
    // { x: 'history', y: 50 },
    // { x: 'horror', y: 5 },
    // { x: 'music', y: 5 },
    // { x: 'mystery', y: 10 },
    // { x: 'romance', y: 10 },
    // { x: 'science fiction', y: 50 },
    // { x: 'TV movie', y: 5 },
    // { x: 'war', y: 5 },
    // { x: 'western', y: 10 },
  ];

  const defaultGraphicData = [
    { x: 'comedy', y: 100 },
    { x: 'drama', y: 0 },
    { x: 'thriller', y: 0 },
    { x: 'action', y: 0 },
    { x: 'documentary', y: 0 },
  ];

  const graphicColor = [
    '#fec5bb',
    '#fcd5ce',
    '#fae1dd',
    '#f8edeb',
    '#e8e8e4',
    '#d8e2dc',
    '#ece4db',
    '#ffe5d9',
    '#ffd7ba',
    '#fec89a',
  ];

  const [graphicData, setGraphicData] = useState(defaultGraphicData);

  useEffect(() => {
    setGraphicData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Svg width={350} height={350}>
      <Circle cx={175} cy={175} r={30} fill="#c43a31" />
      {/* <Text x={175} y={175} textAnchor="middle">
        100 seen
      </Text> */}
      <VictoryPie
        animate={{ easing: 'exp' }}
        data={graphicData}
        width={350}
        height={350}
        standalone={false}
        colorScale={graphicColor}
        // animate={{
        //   duration: 2000,
        // }}
        padAngle={1}
        innerRadius={40}
        labelRadius={({ innerRadius }) => innerRadius + 7}
        // labelComponent={<VictoryLabel dy={20} />}
        // labelPosition={({ index }) => (index ? 'centroid' : 'startAngle')}
        labelPlacement={({ index }) => (index ? 'parallel' : 'vertical')}
      />
    </Svg>
  );
};

export default UserChart;
