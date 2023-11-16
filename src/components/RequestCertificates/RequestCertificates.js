import React, { useState } from "react";
import "./RequestCertificates.css";
import { FaExclamationCircle, FaCheckCircle } from "react-icons/fa";
import { submitForm } from "../../services/FormService";

function RequestCertificates() {
  const [address, setAddress] = useState("");
  const [purpose, setPurpose] = useState("");
  const [issuedOn, setIssuedOn] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateAddress = () => {
    if (!address.match(/^[a-zA-Z0-9\s]+$/)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        address: "Address should be alphanumeric",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, address: "" }));
    }
  };

  const validatePurpose = () => {
    if (purpose.length < 50) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        purpose: "Purpose should be at least 50 characters",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, purpose: "" }));
    }
  };

  const validateIssuedOn = () => {
    if (
      !issuedOn.match(/^\d{2}-\d{2}-\d{4}$/) ||
      new Date(issuedOn) <= new Date()
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        issuedOn: "Issued on should be a future date in the format DD-MM-YYYY",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, issuedOn: "" }));
    }
  };

  const validateEmployeeId = () => {
    if (!employeeId.match(/^\d+$/)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        employeeId: "Employee ID should be numeric",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, employeeId: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    validateAddress();
    validatePurpose();
    validateIssuedOn();
    validateEmployeeId();

    if (Object.values(errors).every((error) => error === "")) {
      const formData = {
        address_to: address,
        purpose: purpose,
        issued_on: issuedOn,
        employee_id: employeeId,
      };

      try {
        await submitForm(formData);
        setIsSubmitted(true);
      } catch (error) {
        console.error("Form submission error:", error);
      }
    } else {
      console.log("Form has errors. Please fix them before submitting.");
    }
  };

  return (
    <div className="main-container">
      <div className="headings">
        <h1 className="main-title">Request a Certificate</h1>
        <span className="main-subtitle">
          Insert the details about the certificate you are looking for
        </span>
      </div>

      <form onSubmit={handleSubmit} className="form-container">
        <div className="inputs-container">
          <input
            type="text"
            className="input-field"
            placeholder="Address to"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onBlur={validateAddress}
            required
          />

          <input
            type="text"
            className="input-field"
            placeholder="Issued on (DD-MM-YYYY)"
            value={issuedOn}
            onChange={(e) => setIssuedOn(e.target.value)}
            onBlur={validateIssuedOn}
            required
          />

          <input
            type="text"
            className="input-field text-area"
            placeholder="Employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            onBlur={validateEmployeeId}
            required
          />

          <textarea
            className="input-field"
            placeholder="Purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            onBlur={validatePurpose}
            required
          />
          <div className="errors-container">
            {errors.address && (
              <p className="error-message">
                <FaExclamationCircle /> {errors.address}
              </p>
            )}
            {errors.issuedOn && (
              <p className="error-message">
                <FaExclamationCircle /> {errors.issuedOn}
              </p>
            )}
            {errors.employeeId && (
              <p className="error-message">
                <FaExclamationCircle /> {errors.employeeId}
              </p>
            )}
            {errors.purpose && (
              <p className="error-message">
                <FaExclamationCircle /> {errors.purpose}
              </p>
            )}
          </div>
          {isSubmitted && (
            <p className="success-message">
              <FaCheckCircle /> Form submitted successfully!
            </p>
          )}

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default RequestCertificates;
