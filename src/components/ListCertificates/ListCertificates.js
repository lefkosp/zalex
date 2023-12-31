import React, { useState, useEffect } from "react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import "./ListCertificates.css";
import { listRequests } from "../../services/ListService";

const ListCertificates = () => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [filter, setFilter] = useState({
    reference_no: "",
    address_to: "",
    status: "",
  });
  const [requests, setRequests] = useState([]);
  // const requests = [
  //   {
  //     referenceNo: "12",
  //     addressTo: "Address 1",
  //     purpose: "Purpose 1",
  //     issuedOn: "2023-01-01",
  //     status: "Pending",
  //   },
  //   {
  //     referenceNo: "2",
  //     addressTo: "Address 2",
  //     purpose: "Purpose 2",
  //     issuedOn: "2023-02-15",
  //     status: "Approved",
  //   },
  //   {
  //     referenceNo: "3",
  //     addressTo: "Address 3",
  //     purpose: "Purpose 3",
  //     issuedOn: "2023-03-10",
  //     status: "Rejected",
  //   },
  //   {
  //     referenceNo: "4",
  //     addressTo: "Address 4",
  //     purpose: "Purpose 4",
  //     issuedOn: "2023-04-20",
  //     status: "Pending",
  //   },
  //   {
  //     referenceNo: "5",
  //     addressTo: "Address 5",
  //     purpose: "Purpose 5",
  //     issuedOn: "2023-05-05",
  //     status: "Approved",
  //   },
  //   {
  //     referenceNo: "6",
  //     addressTo: "Address 6",
  //     purpose: "Purpose 6",
  //     issuedOn: "2023-06-30",
  //     status: "Pending",
  //   },
  // ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listRequests();
        setRequests(data);
      } catch (error) {
        console.error("Failed retrieving requests", error);
      }
    };

    fetchData();
  }, []);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const handleFilterChange = (field, value) => {
    setFilter((prevFilter) => ({ ...prevFilter, [field]: value }));
  };

  const filteredRequests = requests.filter((request) => {
    const referenceNoMatch =
      filter.reference_no === "" ||
      +request.reference_no === Number(filter.reference_no);

    const addressToMatch =
      filter.address_to === "" ||
      request.address_to
        .toLowerCase()
        .includes(filter.address_to.toLowerCase());

    console.log(request.address_to, filter.address_to);
    const statusMatch =
      filter.status === "" || request.status.includes(filter.status);

    return referenceNoMatch && addressToMatch && statusMatch;
  });

  const sortedRequests = [...filteredRequests].sort((a, b) => {
    const sortBy = sortColumn;
    if (sortBy === "issued_on" || sortBy === "status") {
      return sortOrder === "asc"
        ? a[sortBy].localeCompare(b[sortBy])
        : b[sortBy].localeCompare(a[sortBy]);
    } else {
      return sortOrder === "asc"
        ? a[sortBy] - b[sortBy]
        : b[sortBy] - a[sortBy];
    }
  });

  return (
    <div className="main-container">
      <div className="filters-container">
        <input
          type="text"
          className="input-field"
          placeholder="Reference No."
          value={filter.reference_no}
          onChange={(e) => handleFilterChange("reference_no", e.target.value)}
        />
        <input
          type="text"
          className="input-field"
          placeholder="Address to"
          value={filter.address_to}
          onChange={(e) => handleFilterChange("address_to", e.target.value)}
        />
        <select
          value={filter.status}
          className="input-field"
          onChange={(e) => handleFilterChange("status", e.target.value)}
        >
          <option value="">Filter by Status ( - )</option>
          <option value="New">New</option>
          <option value="Done">Done</option>
          <option value="Pending">Pending</option>
          <option value="Under Review">Under Review</option>
        </select>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Reference No.</th>
              <th>Address to</th>
              <th>Purpose</th>
              <th
                className="sorting-header"
                onClick={() => handleSort("issued_on")}
              >
                <div className="header-content">
                  <span>Issued on</span>
                  {sortColumn === "issued_on" && (
                    <span>
                      {sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />}
                    </span>
                  )}
                  {sortColumn !== "issued_on" && <FaSort />}
                </div>
              </th>
              <th
                className="sorting-header"
                onClick={() => handleSort("status")}
              >
                <div className="header-content">
                  <span>Status</span>
                  {sortColumn === "status" && (
                    <span>
                      {sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />}
                    </span>
                  )}
                  {sortColumn !== "status" && <FaSort />}
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {sortedRequests.map((request, i) => (
              <tr key={request.reference_no + "-" + i}>
                <td>{request.reference_no}</td>
                <td>{request.address_to}</td>
                <td>{request.purpose}</td>
                <td>{request.issued_on}</td>
                <td>{request.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListCertificates;
