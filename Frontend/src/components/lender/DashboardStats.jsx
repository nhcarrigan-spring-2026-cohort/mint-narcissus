import React from "react";

export default function DashboardStats({stats}) {

    
    return (
      <div className="grid grid-cols-4">
        {stats.map((item) => (
      <div  key={item.id} className='px-6 last-child:pb-6 pt-6'>
          <div className='text-center'>
            <p className='text-3xl font-bold'>{item.value}</p>
            <p className='text-sm text-muted-foreground'>{item.label}</p>
          </div>
        </div>
      
      ))}
        
      </div>
    );
};