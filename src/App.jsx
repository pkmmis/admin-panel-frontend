import React from 'react';
import GroupDetail from './pages/GroupDetail';

export default function App(){
  const groupId = prompt('Enter group id to manage (create one via backend if needed):') || '';
  const propertyId = prompt('Enter property id to process sale (create or set):') || '';
  const token = prompt('Enter admin JWT token:') || '';
  return (
    <div className="container">
      <h1>GroupProp Admin</h1>
      <div className="card">
        <GroupDetail groupId={groupId} propertyId={propertyId} token={token} />
      </div>
    </div>
  );
}
