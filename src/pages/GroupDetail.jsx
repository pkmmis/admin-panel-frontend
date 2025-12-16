import React from 'react';
import AdminSellForm from '../components/AdminSellForm';

export default function GroupDetail({ groupId, propertyId, token }) {
  if (!groupId || !propertyId || !token) return <div>Please provide groupId, propertyId and admin JWT token (prompts when app starts)</div>;
  return (
    <div>
      <p>Group ID: <strong>{groupId}</strong></p>
      <p>Property ID: <strong>{propertyId}</strong></p>
      <AdminSellForm groupId={groupId} propertyId={propertyId} token={token} onDone={()=>alert('Done')} />
    </div>
  );
}
