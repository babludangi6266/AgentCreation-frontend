import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("agents");
  const [agents, setAgents] = useState([]);
  const [csvFile, setCsvFile] = useState(null);
  const [distributedLists, setDistributedLists] = useState([]);
  const [agentData, setAgentData] = useState({ name: "", email: "", mobile: "", password: "" });
  const [uploadMessage, setUploadMessage] = useState("");
  useEffect(() => {
    fetchAgents();
    fetchDistributedLists();
  }, []);

  const fetchAgents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/agents");
      setAgents(response.data);
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  };

  const fetchDistributedLists = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/lists");
      setDistributedLists(response.data);
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  };

  const handleAddAgent = async () => {
    try {
      await axios.post("http://localhost:5000/api/agents/create", agentData);
      fetchAgents();
      setAgentData({ name: "", email: "", mobile: "", password: "" });
    } catch (error) {
      console.error("Error adding agent:", error);
    }
  };

const handleUpload = async () => {
  if (!csvFile) {
    alert("Please select a CSV/XLSX/XLS file.");
    return;
  }

  const formData = new FormData();
  formData.append("file", csvFile);

  try {
    const response = await axios.post("http://localhost:5000/api/lists/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setUploadMessage(response.data.message || "File uploaded successfully! Tasks have been distributed.");
    fetchDistributedLists(); 
    setCsvFile(null);
  } catch (error) {
    setUploadMessage("Error uploading file. Please try again.");
    console.error("Error uploading CSV:", error);
  }
};


  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="sidebar-header">Admin Panel</h2>
        <ul className="nav-links">
          <li
            onClick={() => setActiveTab("agents")}
            className={activeTab === "agents" ? "active" : ""}
          >
            Manage Agents
          </li>
          <li
            onClick={() => setActiveTab("upload")}
            className={activeTab === "upload" ? "active" : ""}
          >
            Upload CSV
          </li>
          <li
            onClick={() => setActiveTab("lists")}
            className={activeTab === "lists" ? "active" : ""}
          >
            Distributed Lists
          </li>
        </ul>
      </aside>

      <main className="content">
        {activeTab === "agents" && (
          <div className="tab-content">
            <h2>Manage Agents</h2>
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                value={agentData.name}
                onChange={(e) => setAgentData({ ...agentData, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                value={agentData.email}
                onChange={(e) => setAgentData({ ...agentData, email: e.target.value })}
              />
              <input
                type="text"
                placeholder="Mobile Number"
                value={agentData.mobile}
                onChange={(e) => setAgentData({ ...agentData, mobile: e.target.value })}
              />
              <input
                type="password"
                placeholder="Password"
                value={agentData.password}
                onChange={(e) => setAgentData({ ...agentData, password: e.target.value })}
              />
              <button onClick={handleAddAgent} className="primary-btn">Add Agent</button>
            </div>
            <ul className="agent-list">
              {agents.map((agent) => (
                <li key={agent._id} className="agent-item">
                  <strong>{agent.name}</strong> - {agent.email}
                </li>
              ))}
            </ul>
          </div>
        )}
{activeTab === "upload" && (
  <div className="tab-content">
    <h2>Upload CSV</h2>
    <p>
      Upload a CSV file containing tasks, and the system will automatically distribute them among the agents.
      Ensure the file follows the required format: <strong>FirstName, Phone, Notes</strong>.
    </p>
    <input
      type="file"
      accept=".csv,.xlsx,.xls"
      onChange={(e) => setCsvFile(e.target.files[0])}
      className="file-input"
    />
    <button onClick={handleUpload} className="primary-btn">Upload</button>
    {uploadMessage && <p className="upload-message">{uploadMessage}</p>}
  </div>
)}


        {activeTab === "lists" && (
<div className="tab-content">
  <h2>Distributed Lists</h2>
  <ul className="list-display">
    {distributedLists.map((list, index) => (
      <li key={index} className="list-item">
        <div className="agent-info">
          <div className="agent-details">
            <strong>Agent:</strong> {list.agentId.name} ({list.agentId.email})
          </div>
          <div className="item-count">
            <strong>Items:</strong> {list.items.length}
          </div>
        </div>
        <div className="items-container">
          <h3>Items:</h3>
          <ul className="nested-list">
            {list.items.map((item, idx) => (
              <li key={idx} className="nested-list-item">
                <div className="item-info">
                  <span className="item-name">{item.firstName}</span>
                  <span className="item-phone">({item.phone})</span>
                  <span className="item-notes">{item.notes}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </li>
    ))}
  </ul>
</div>


        )}
      </main>
    </div>
  );
};

export default Dashboard;
