import React, { useState } from 'react';
import axios from 'axios';

export default function AdminSellForm({ groupId, propertyId, token, onDone }) {
  const [salePrice, setSalePrice] = useState('');
  const [deductions, setDeductions] = useState([{ type: 'brokerage', amount: '', description: '' }]);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      const sp = Math.round(parseFloat(salePrice) * 100);
      const ded = deductions.map(d => ({ type: d.type, amount: Math.round(parseFloat(d.amount) * 100), description: d.description || '' }));
      await axios.post(`/api/admin/groups/${groupId}/property/${propertyId}/sell`, { sale_price: sp, deductions: ded }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Sale processed successfully');
      if (onDone) onDone();
    } catch (e) {
      alert('Error: ' + (e.response?.data?.error || e.message));
    } finally {
      setLoading(false);
    }
  };

  const updateDeduction = (idx, field, val) => {
    const copy = [...deductions];
    copy[idx][field] = val;
    setDeductions(copy);
  };

  return (
    <div>
      <h3>Process Property Sale</h3>
      <div style={{marginTop:8}}>
        <label>Sale price (₹)</label><br />
        <input value={salePrice} onChange={e=>setSalePrice(e.target.value)} />
      </div>

      <div style={{marginTop:8}}>
        <label>Deductions</label>
        {deductions.map((d,i)=>(
          <div key={i} style={{display:'flex',gap:8,marginTop:6}}>
            <select value={d.type} onChange={e=>updateDeduction(i,'type',e.target.value)}>
              <option value="brokerage">Brokerage</option>
              <option value="visiting">Visiting</option>
              <option value="tax">Tax</option>
              <option value="other">Other</option>
            </select>
            <input placeholder="Amount ₹" value={d.amount} onChange={e=>updateDeduction(i,'amount',e.target.value)} />
            <input placeholder="Description" value={d.description} onChange={e=>updateDeduction(i,'description',e.target.value)} />
          </div>
        ))}
        <button style={{marginTop:8}} onClick={()=>setDeductions([...deductions,{type:'other',amount:'',description:''}])}>Add</button>
      </div>

      <div style={{marginTop:12}}>
        <button onClick={submit} disabled={loading}>{loading? 'Processing...':'Process Sale & Distribute'}</button>
      </div>
    </div>
  );
}
