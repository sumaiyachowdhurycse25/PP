import React, { useEffect, useState } from "react";

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [editId, setEditId] = useState(null);

  const loadSuppliers = () => {
    fetch("http://localhost:5000/api/suppliers")
      .then(res => res.json())
      .then(setSuppliers);
  };

  useEffect(() => {
    loadSuppliers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `http://localhost:5000/api/suppliers/${editId}`
      : "http://localhost:5000/api/suppliers";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    setForm({ name: "", email: "", phone: "" });
    setEditId(null);
    loadSuppliers();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete supplier?")) return;
    await fetch(`http://localhost:5000/api/suppliers/${id}`, {
      method: "DELETE"
    });
    loadSuppliers();
  };

  const handleEdit = (s) => {
    setEditId(s.id);
    setForm({ name: s.name, email: s.email, phone: s.phone });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🏭 Supplier Management</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} style={{ display: "flex",
    gap: "15px",
    marginBottom: "20px",
    flexWrap: "wrap" }}>
        <input
          placeholder="Supplier Name"
          value={form.name}
          required
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Phone"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
        />
        <button type="submit">
          {editId ? "Update Supplier" : "Add Supplier"}
        </button>
      </form>

      {/* LIST */}
      <table border="1" style={{
    borderCollapse: "separate",
    borderSpacing: "22px 12px",
            width: "100%"
  }} cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.phone}</td>
              <td>
                <button onClick={() => handleEdit(s)}>Edit</button>
                <button onClick={() => handleDelete(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

