import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Cell } from 'recharts';
import { GetServicesAdmin, getUserGroupList } from '../../ApiServices/ApiServices';

const pieData = [
  {
    name: 'Group A',
    value: 400,
  },
  {
    name: 'Group B',
    value: 300,
  },
  {
    name: 'Group C',
    value: 300,
  },
  {
    name: 'Group D',
    value: 200,
  },
];

const barDataX = [
  {
    service: 'Service A',
    knockCount: 4000,
  },
  {
    service: 'Service B',
    knockCount: 3000,
  },
  {
    service: 'Service C',
    knockCount: 2000,
  },
  {
    service: 'Service D',
    knockCount: 2780,
  },
  {
    service: 'Service E',
    knockCount: 1890,
  },
  {
    service: 'Service F',
    knockCount: 2390,
  },
  {
    service: 'Service G',
    knockCount: 3490,
  },
];

const AdminDash = () => {
  const [pieData, setPieData] = useState([]); 
  const COLORS = ['limegreen', '#80008e', '#ff1493', '#0034c3']; 
  const [services, setServices] = useState([]); 


  useEffect(() => {
    getUserGroupList().then((res) => {
      setPieData(res.data);
    });
  }, []); 

  useEffect(() => {
    GetServicesAdmin().then((res) => {
      console.log(res.data) 
      const service_data = res.data.services;
      const new_services = service_data.map((s) => (
        {service: s.business_name.slice(0, 5) , knockCount: s.knock_count, full: s.business_name}
      ))
      setServices(new_services)
    })
  }, [])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-semibold my-4 text-sky-700 cursor-default">Users</h1>
        {pieData.length > 0 ? (
          <PieChart width={600} height={320} className="my-4">
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              fill="#82ca9d"
              paddingAngle={5}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
          </PieChart>
        ) : (
          <p>Loading...</p>
        )}
         <h1 className="text-xl font-semibold my-4 text-sky-700 cursor-default">Service Knock Count</h1>
        <BarChart
          className="my-4"
          width={500}
          height={300}
          data={services}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="service" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="knockCount" fill="#8884d8" />
        </BarChart>
      </div>
    </ResponsiveContainer>
  );
};

export default AdminDash;
