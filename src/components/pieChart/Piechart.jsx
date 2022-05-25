import React, { PureComponent } from 'react';
import { useSelector } from 'react-redux';
import { PieChart, Pie,  Cell } from 'recharts';



const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];


const Userchart = () => {
  const managers = useSelector((state) => state.developer.managers);
  const developers = useSelector((state) => state.developer.developers);
  const admins = managers.find((item) => item.ismainAdmin === true)
  const data = [
    { name: 'Managers', value: managers.length },
    { name: 'developers', value: developers.length },
    { name: 'Admins', value: 1 },
    
  ];
  return (
    <PieChart width={250} height={200} >
             <Pie
          data={data}
          cx={120}
          cy={100}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
  )
}

export default Userchart