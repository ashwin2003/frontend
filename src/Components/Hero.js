import React, { useState, useEffect, useRef } from "react";
import "./Hero.css";
import HeroButton from "./HeroButton";
import axios from "axios";
import Modal from "@mui/material/Modal";
import { FaFilter } from "react-icons/fa";

const Hero = () => {
  const [cases, setCases] = useState([]);
  const [addFormError, setAddFormError] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [validCaseNo, setValidcaseNo] = useState(false);
  const [oldCase, setOldcase] = useState();
  const [updateFormError, setUpdateFormError] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [filterModal, setFilterModal] = useState(false);

  const caseNo = useRef();
  const branch = useRef();
  const reportingMethod = useRef();
  const dateRef = useRef();
  const time = useRef();
  const category = useRef();
  const subCategory = useRef();
  const priority = useRef();
  const nature = useRef();
  const manager = useRef();
  const reporter = useRef();
  const status = useRef();

  const ucaseNo = useRef();
  const ubranch = useRef();
  const ureportingMethod = useRef();
  const udateRef = useRef();
  const utime = useRef();
  const ucategory = useRef();
  const usubCategory = useRef();
  const upriority = useRef();
  const unature = useRef();
  const umanager = useRef();
  const ureporter = useRef();
  const ustatus = useRef();

  const dcaseNo = useRef();

  const fcaseNo = useRef();
  const fbranch = useRef();
  const freportingMethod = useRef();
  const fdateRef = useRef();
  const ftime = useRef();
  const fcategory = useRef();
  const fsubCategory = useRef();
  const fpriority = useRef();
  const fnature = useRef();
  const fmanager = useRef();
  const freporter = useRef();
  const fstatus = useRef();

  useEffect(() => {
    getCases();
  }, [refresh]);

  const getCases = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.get("/cases", config);
      setCases(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const openAddModal = () => {
    setAddModal(true);
  };

  const handleNewCase = async (e) => {
    e.preventDefault();
    setAddModal(true);
    const newCaseData = {
      caseNo: Number(caseNo.current.value),
      branch: branch.current.value,
      reportingMethod: reportingMethod.current.value,
      date: dateRef.current.value + " " + time.current.value,
      category: category.current.value,
      subCategory: subCategory.current.value,
      priority: priority.current.value,
      nature: nature.current.value,
      caseManager: manager.current.value,
      caseReporter: reporter.current.value,
      caseStatus: status.current.value === "active" ? true : false,
    };

    if (
      !newCaseData.caseNo ||
      !newCaseData.branch ||
      !newCaseData.reportingMethod ||
      !newCaseData.date ||
      !newCaseData.category ||
      !newCaseData.subCategory ||
      !newCaseData.nature ||
      !newCaseData.caseManager ||
      !newCaseData.caseReporter
    ) {
      setAddFormError(true);
      return;
    } else {
      setAddFormError(false);
    }

    try {
      const data = await axios.post("add", newCaseData);
      if (data) {
        setAddModal(false);
        setRefresh(!refresh);
      }
    } catch (error) {
      setAddFormError(true);
      setAddModal(true);
    }
  };

  const openUpdateModal = () => {
    setUpdateModal(true);
  };
  const checkCaseNo = async (e) => {
    e.preventDefault();
    const caseNo = ucaseNo.current.value;

    try {
      const { data } = await axios.get(`/cases?caseNo=${caseNo}`);
      if (data.length > 0) {
        setValidcaseNo(true);
        setOldcase(data[0]);
      } else {
        setValidcaseNo(false);
      }
    } catch (error) {}
  };

  const handleUpdateCase = async (e) => {
    e.preventDefault();
    setUpdateModal(true);
    const updateCasedata = {
      caseNo: Number(ucaseNo.current.value),
      branch: ubranch.current.value,
      reportingMethod: ureportingMethod.current.value,
      date: udateRef.current.value + " " + utime.current.value,
      category: ucategory.current.value,
      subCategory: usubCategory.current.value,
      priority: upriority.current.value,
      nature: unature.current.value,
      caseManager: umanager.current.value,
      caseReporter: ureporter.current.value,
      caseStatus: ustatus.current.value === "active" ? true : false,
    };

    if (
      !updateCasedata.caseNo ||
      !updateCasedata.branch ||
      !updateCasedata.reportingMethod ||
      !updateCasedata.date ||
      !updateCasedata.category ||
      !updateCasedata.subCategory ||
      !updateCasedata.nature ||
      !updateCasedata.caseManager ||
      !updateCasedata.caseReporter
    ) {
      setUpdateFormError(true);
      return;
    } else {
      setUpdateFormError(false);
    }

    console.log(updateCasedata);

    try {
      const data = await axios.put(`/${updateCasedata.caseNo}`, updateCasedata);
      if (data) {
        setUpdateModal(false);
        setRefresh(!refresh);
        setOldcase();
        setValidcaseNo(false);
      }
    } catch (error) {
      setUpdateFormError(true);
      setUpdateModal(true);
    }
  };

  const openDeleteModal = () => {
    setDeleteModal(true);
  };
  const handleDeleteCase = async (e) => {
    e.preventDefault();

    const caseNo = dcaseNo.current.value;

    try {
      await axios.delete(`/${caseNo}`);
      setDeleteModal(false);
      setRefresh(!refresh);
    } catch (error) {
      setDeleteModal(true);
    }
  };

  const handleFilter = async (e) => {
    e.preventDefault();
    setFilterModal(true);

    let queryParams = "";

    queryParams +=
      fcaseNo.current.value && `&caseNo=${fcaseNo.current.value.trim()}`;

    queryParams +=
      fbranch.current.value && `&branch=${fbranch.current.value.trim()}`;

    queryParams +=
      freportingMethod.current.value &&
      `&reportingMethod=${freportingMethod.current.value.trim()}`;

    queryParams +=
      fdateRef.current.value && `&date=${fdateRef.current.value.trim()}`;

    queryParams += ftime.current.value && `&time=${ftime.current.value.trim()}`;

    queryParams +=
      fcategory.current.value && `&category=${fcategory.current.value.trim()}`;

    queryParams +=
      fsubCategory.current.value &&
      `&subCategory=${fsubCategory.current.value.trim()}`;

    if (fpriority.current.value !== "Select Priority")
      queryParams += `&priority=${fpriority.current.value}`;

    queryParams +=
      fnature.current.value && `&nature=${fnature.current.value.trim()}`;

    queryParams +=
      fmanager.current.value && `&caseManager=${fmanager.current.value.trim()}`;

    queryParams +=
      freporter.current.value &&
      `&caseReporter=${freporter.current.value.trim()}`;

    if (fstatus.current.value !== "Select Status")
      queryParams +=
        fstatus.current.value === "active"
          ? `&caseStatus=${true}`
          : `&caseStatus=${false}`;

    try {
      const url = "/cases?" + queryParams.substring(1);

      const { data } = await axios.get(url);
      setCases(data);
    } catch (error) {
      console.log("error", error);
    }
    setFilterModal(false);
  };

  // const buttonsDetails = [
  //   {
  //     btnNo: 1,
  //     label: "Add Record",
  //     icon: <FaAdn />,
  //     color: "lightgreen",
  //   },

  //   {
  //     btnNo: 2,
  //     label: "Update Record",
  //     icon: <FaAnchor />,
  //     color: "lightblue",
  //   },
  //   {
  //     btnNo: 3,
  //     label: "Delete Record",
  //     icon: <FaMailBulk />,
  //     color: "orange",
  //   },
  // ];

  // const demoData = [
  //   {
  //     caseNo: 1,
  //     branch: "Jaipur",
  //     reportingMethod: "online",
  //     Date: "22 November 2022",
  //     category: "Employment",
  //     subCategory: "Query",
  //     nature: "Health",
  //     caseManager: "Quency",
  //     caseReporter: "Tanner",
  //     caseStatus: true,
  //   },
  //   {
  //     caseNo: 2,
  //     branch: "Delhi",
  //     reportingMethod: "online",
  //     Date: "22 November 2022",

  //     category: "Employment",
  //     subCategory: "Query",
  //     nature: "Health",
  //     caseManager: "Quency",
  //     caseReporter: "Tanner",
  //     caseStatus: true,
  //   },
  //   {
  //     caseNo: 2,
  //     branch: "Chandigarh",
  //     reportingMethod: "online",
  //     Date: "22 November 2022",

  //     category: "Employment",
  //     subCategory: "Query",
  //     nature: "Health",
  //     caseManager: "Quency",
  //     caseReporter: "Tanner",
  //     caseStatus: true,
  //   },
  // ];

  return (
    <>
      <Modal open={addModal}>
        <div className="add-modal-container">
          <h1 onClick={() => setAddModal(false)}>X</h1>

          <form action="" className="add-form" onSubmit={handleNewCase}>
            <h2>Add Case</h2>
            <input type="text" placeholder="Enter case no" ref={caseNo} />
            <input type="text" placeholder="Enter Branch" ref={branch} />
            <input
              type="text"
              placeholder="Enter Reporting Method"
              ref={reportingMethod}
            />
            <input type="Date" placeholder="Enter Date" ref={dateRef} />
            <input type="Time" placeholder="Enter Time" ref={time} />
            <input type="text" placeholder="Enter Category" ref={category} />
            <input
              type="text"
              placeholder="Enter Sub Category"
              ref={subCategory}
            />
            <div className="priority-select">
              <select
                name="Priority"
                id=""
                placeholder="Priority"
                ref={priority}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <input type="text" placeholder="Enter Nature" ref={nature} />
            <input type="text" placeholder="Enter Case Manager" ref={manager} />
            <input
              type="text"
              placeholder="Enter Case Reporter"
              ref={reporter}
            />
            <select name="Status" id="" placeholder="Status" ref={status}>
              <option value="active">Prepared</option>
              <option value="not-active">Not Prepared</option>
            </select>

            {addFormError && <p>Please enter correct case data.</p>}

            <button type="submit">Submit</button>
          </form>
        </div>
      </Modal>

      <Modal open={updateModal}>
        <div className="add-modal-container">
          <h1 onClick={() => setUpdateModal(false)}>X</h1>

          <form action="" className="add-form" onSubmit={handleUpdateCase}>
            <h2>Update Case</h2>
            <input type="text" placeholder="Enter case no" ref={ucaseNo} />
            {!validCaseNo && <p>Enter valid Case No.</p>}
            {validCaseNo && (
              <>
                <input
                  type="text"
                  placeholder="Enter Branch"
                  ref={ubranch}
                  defaultValue={oldCase.branch}
                />
                <input
                  type="text"
                  placeholder="Enter Reporting Method"
                  ref={ureportingMethod}
                  defaultValue={oldCase.reportingMethod}
                />
                <input
                  type="Date"
                  placeholder="Enter Date"
                  ref={udateRef}
                  defaultValue={oldCase.date.substr(0, 10)}
                />
                <input
                  type="Time"
                  placeholder="Enter Time"
                  ref={utime}
                  defaultValue={oldCase.date.substr(11, 8)}
                />
                <input
                  type="text"
                  placeholder="Enter Category"
                  ref={ucategory}
                  defaultValue={oldCase.category}
                />
                <input
                  type="text"
                  placeholder="Enter Sub Category"
                  ref={usubCategory}
                  defaultValue={oldCase.subCategory}
                />
                <div className="priority-select">
                  <select
                    name="Priority"
                    id=""
                    placeholder="Priority"
                    ref={upriority}
                    defaultValue={oldCase.priority}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <input
                  type="text"
                  placeholder="Enter Nature"
                  ref={unature}
                  defaultValue={oldCase.nature}
                />
                <input
                  type="text"
                  placeholder="Enter Case Manager"
                  ref={umanager}
                  defaultValue={oldCase.caseManager}
                />
                <input
                  type="text"
                  placeholder="Enter Case Reporter"
                  ref={ureporter}
                  defaultValue={oldCase.caseReporter}
                />
                <select
                  name="Status"
                  id=""
                  placeholder="Status"
                  ref={ustatus}
                  defaultValue={oldCase.caseStatus ? "active" : "not-active"}
                >
                  <option value="active">Prepared</option>
                  <option value="not-active">Not Prepared</option>
                </select>

                {updateFormError && <p>Please enter correct case data.</p>}

                <button type="submit">Submit</button>
              </>
            )}
            {!validCaseNo && (
              <button onClick={checkCaseNo}>Check Case No</button>
            )}
          </form>
        </div>
      </Modal>

      <Modal open={deleteModal}>
        <div className="add-modal-container">
          <h1 onClick={() => setDeleteModal(false)}>X</h1>

          <form action="" className="add-form" onSubmit={handleDeleteCase}>
            <h2>Delete Case</h2>
            <input type="text" ref={dcaseNo} />
            <p>Enter valid Case No.</p>
            <button type="submit">Submit</button>
          </form>
        </div>
      </Modal>

      <Modal open={filterModal}>
        <div className="add-modal-container">
          <h1 onClick={() => setFilterModal(false)}>X</h1>

          <form action="" className="add-form" onSubmit={handleFilter}>
            <h2>Filter Cases</h2>
            <input type="text" placeholder="Enter case no" ref={fcaseNo} />
            <>
              <input type="text" placeholder="Enter Branch" ref={fbranch} />
              <input
                type="text"
                placeholder="Enter Reporting Method"
                ref={freportingMethod}
              />
              <input type="Date" placeholder="Enter Date" ref={fdateRef} />
              <input type="Time" placeholder="Enter Time" ref={ftime} />
              <input type="text" placeholder="Enter Category" ref={fcategory} />
              <input
                type="text"
                placeholder="Enter Sub Category"
                ref={fsubCategory}
              />
              <div className="priority-select">
                <select
                  name="Priority"
                  id=""
                  placeholder="Priority"
                  ref={fpriority}
                  defaultValue="Select Priority"
                >
                  <option value="Select Priority">Select Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <input type="text" placeholder="Enter Nature" ref={fnature} />
              <input
                type="text"
                placeholder="Enter Case Manager"
                ref={fmanager}
              />
              <input
                type="text"
                placeholder="Enter Case Reporter"
                ref={freporter}
              />
              <select
                name="Status"
                id=""
                placeholder="Status"
                ref={fstatus}
                defaultValue="Select Status"
              >
                <option value="Select Status">Select Status</option>
                <option value="active">Prepared</option>
                <option value="not-active">Not Prepared</option>
              </select>

              {/* {updateFormError && <p>Please enter correct case data.</p>} */}

              <button type="submit">Submit</button>
            </>
            {/* )} */}
            {/* {!validCaseNo && ( */}
            {/* <button onClick={checkCaseNo}>Check Case No</button> */}
            {/* )} */}
          </form>
        </div>
      </Modal>
      <div className="hero-container">
        <div className="buttons-container">
          <HeroButton
            details={{
              btnNo: 1,
              label: "Add Record",
              color: "rgb(60, 196, 140)",
            }}
            handleClick={openAddModal}
          />

          <HeroButton
            details={{
              btnNo: 2,
              label: "Update Record",
              color: "rgb(28, 96, 220)",
            }}
            handleClick={openUpdateModal}
          />

          <HeroButton
            details={{
              btnNo: 3,
              label: "Delete Record",
              color: "rgb(252, 124, 52)",
            }}
            handleClick={openDeleteModal}
          />
        </div>
        <div className="filterContainer">
          <h3>New Cases</h3>
          <FaFilter size="1.5em" onClick={handleFilter} />
        </div>
        <div className="table-container">
          <table>
            <tr>
              <th>Case No</th>
              <th>Branch</th>
              <th>Reporting Method</th>
              <th>Date</th>
              <th>Time</th>
              <th>Category</th>
              <th>Sub Category</th>
              <th>Priority</th>
              <th>Nature</th>
              <th>Case Manager</th>
              <th>Case Reporter</th>
              <th>Case Status</th>
            </tr>
            {cases.map((item, index) => (
              <tr
                style={{
                  backgroundColor: index % 2 === 0 ? "whitesmoke" : "white",
                }}
              >
                <td>{item.caseNo}</td>
                <td>{item.branch}</td>
                <td>{item.reportingMethod}</td>
                <td>{item.date.substring(0, 10)}</td>
                <td>{item.date.substring(11, 16)}</td>
                <td>{item.category}</td>
                <td>{item.subCategory}</td>
                <td>
                  <div
                    className="priority-cell"
                    style={{
                      backgroundColor:
                        item.priority === "Low"
                          ? "rgb(252,164,4)"
                          : item.priority === "Medium"
                          ? "rgb(252,123,49)"
                          : "rgb(252,4,4)",
                    }}
                  >
                    {item.priority}
                  </div>
                </td>
                <td>{item.nature}</td>
                <td>{item.caseManager}</td>
                <td>{item.caseReporter}</td>
                <td>
                  <div className="class-status">
                    <div
                      className="dot"
                      style={{
                        backgroundColor: item.caseStatus
                          ? "rgb(252,164,4)"
                          : "rgb(252,4,4)",
                      }}
                    ></div>
                    {item.caseStatus ? "Prepared" : "Not Prepared"}
                  </div>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </>
  );
};

export default Hero;
