
import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios";
import "./DasReport.css";
import { Button } from 'primereact/button';

function DasReport() {


    const [user, setUser] = useState({

        orderNumber: "",
        referenceNumber: "",
        searchDate: "",
        effectiveDate: "",
        propertyAddress: "",
        state: "",
        county: "",
        borrowerName: "",
        parcelNumber: "",
        subdivision: "",
        lotUnit: "",
        block: "",
        propertyType: "",

    })

    const { orderNumber, referenceNumber, searchDate, effectiveDate, propertyAddress, state, county, parcelNumber, borrowerName,

        subdivision, lotUnit, block, propertyType } = user



    {/**const [tablesData, setTablesData] = useState([{ id: 1, data: {} }]); */ }

    const [tablesData, setTablesData] = useState([{ id: 1, indicator: 0, data: {}, name: 'VESTING INFORMATION' }]);
    const [nextTableId, setNextTableId] = useState(2);




    const [tablesData2, setTablesData2] = useState([{ id: 1, indicator: 0, data: {} }]);
    const [nextTableId2, setNextTableId2] = useState(2);

    const [tableRowsData, setTableRowsData] = useState([
        { id: 1, data: { caseType: '', bkPgCaseNo: '', recordingDate: '', amount: '' } },
        { id: 2, data: { caseType: '', bkPgCaseNo: '', recordingDate: '', amount: '' } },
        { id: 3, data: { caseType: '', bkPgCaseNo: '', recordingDate: '', amount: '' } }
    ]);


    const [nextRowsId, setNextRowsId] = useState(4);

    const [nameRunData, setNameRunData] = useState([
        { id: 1, data: {} },
        { id: 2, data: {} },
    ]);
    const [nextNameRunId, setNextNameRunId] = useState(4);

    const [tableTaxInstaData, setTableTaxInstaData] = useState([
        { id: 1, data: {} },
        { id: 2, data: {} },
    ]);
    const [nextTableTaxInstaId, setNextTableTaxInstaId] = useState(2);



    const [taxinfo, setTaxInfo] = useState({
        taxYear: "",
        landValue: "",
        buildingValue: "",
        extraValue: "",
        totalValue: "",
        comments: "",
    })

    const { taxYear, landValue, buildingValue, extraValue, totalValue, comments } = taxinfo

    const onInputChange2 = (e) => {

        setTaxInfo({ ...taxinfo, [e.target.name]: e.target.value })
    };

    const handleChange = (e, rowId) => {
        const { name, value } = e.target;
        const updatedTableRowsData = tableRowsData.map(row => {
            if (row.id === rowId) {
                return {
                    ...row,
                    data: {
                        ...row.data,
                        [name]: value.toUpperCase()
                    }
                };
            }
            return row;
        });
        setTableRowsData(updatedTableRowsData);
    };
    // const handleRowInputChange = (e, rowId) => {
    //     const { name, value } = e.target;
    //     const updatedRows = tableRowsData.map(row =>
    //         row.id === rowId ? { ...row, data: { ...row.data, [name]: value } } : row
    //     );
    //     setTableRowsData(updatedRows);
    // };


    // Function to add a new row


    const getTableName = (index) => {
        if (index === 1) return 'VESTING INFORMATION';
        else return `CHAIN OF TITLE ${index - 1}`;
    };

    const [amount, setAmount] = useState('');
    const handleInputChange = (e, tableId) => {
        const { name, value } = e.target;
        const updatedTablesData = tablesData.map(table =>
            table.id === tableId ? { ...table, [name]: value } : table
        );
        setTablesData(updatedTablesData);
    };

    const formatValueForDisplay = (value) => {
        if (value === null || value === undefined || isNaN(value)) {
            return '';
        }
        // Ensure value is converted to a number before applying toFixed
        const numericValue = Number(value);
        return `$${numericValue.toFixed(2)}`;
    };
    const handleInputChange2 = (e, tableId) => {
        const { name, value } = e.target;
        const tableIndex = tablesData2.findIndex(table => table.id === tableId);
        if (tableIndex === -1) return;

        const updatedTable = {
            ...tablesData2[tableIndex],
            [name]: value
        };

        const updatedTablesData = [...tablesData2];
        updatedTablesData[tableIndex] = updatedTable;
        setTablesData2(updatedTablesData);
    };

    const handleChangeNameRun = (e, rowId) => {
        const { name, value } = e.target;
        const updatedNameRunData = nameRunData.map(row => {
            if (row.id === rowId) {
                return {
                    ...row,
                    data: {
                        ...row.data,
                        [name]: value
                    }
                };
            }
            return row;
        });
        setNameRunData(updatedNameRunData);
    };
    //saveDataToLocalStorage(updatedNameRunData);

    const handleInputChangeTaxInsta = (e, rowId) => {
        const { name, value } = e.target;
        const updatedTableTaxInstaData = tableTaxInstaData.map(row => {
            if (row.id === rowId) {
                return {
                    ...row,
                    data: {
                        ...row.data,
                        [name]: value
                    }
                };
            }
            return row;
        });
        setTableTaxInstaData(updatedTableTaxInstaData);
    };

    const [showDeleteButton, setShowDeleteButton] = useState(false);

    //   const getTableName = (id) => `Table ${id}`;

    const handleAddTable = (e) => {
        e.preventDefault();
        const newTableId = nextTableId;
        const newName = getTableName(newTableId); // const newTableId = tablesData.length + 1;

        const newIndicator = tablesData.length;
        setTablesData([...tablesData, { id: newTableId, indicator: newIndicator, data: {}, name: newName }]);
        setNextTableId(newTableId + 1);
    };

    const handleDeleteTable = (idToDelete) => {
        const updatedTables = tablesData.filter(table => table.id !== idToDelete);
        setTablesData(updatedTables);
    };



    const handleAddTable2 = (e) => {
        e.preventDefault();
        const newTableId2 = nextTableId2;   // const newTableId = tablesData.length + 1;       
        const newIndicator = tablesData2.length;
        setTablesData2([...tablesData2, { id: newTableId2, indicator: newIndicator, data: {} }]);
        setNextTableId2(newTableId2 + 1);
    };

    const handleDeleteTable2 = (idToDelete) => {
        const updatedTables2 = tablesData2.filter(table => table.id !== idToDelete);
        setTablesData2(updatedTables2);
    };


    const handleAddRow = () => {
        const newRowId = tableRowsData.length + 1;
        const newRow = { id: newRowId, data: { caseType: '', bkPgCaseNo: '', recordingDate: '', amount: '' } };
        setTableRowsData([...tableRowsData, newRow]);
    };

    const handleDeleteLastRow = () => {
        if (tableRowsData.length > 0) {
            const updatedRows = [...tableRowsData];
            updatedRows.pop();
            setTableRowsData(updatedRows);
        }
    };
    const handleAddNameRow = (e) => {
        e.preventDefault()
        const newNameRunId = nextNameRunId;
        const newRow = { id: newNameRunId, data: {} };
        setNameRunData([...nameRunData, newRow]);
        setNextNameRunId(newNameRunId + 1);
    };

    const handleDeleteLastNameRow = () => {
        if (nameRunData.length > 0) {
            const updatedRows = nameRunData.slice(0, -1); // Remove the last row
            setNameRunData(updatedRows);
        }
    };

    const handleAddTaxInstaRow = (e) => {
        e.preventDefault()
        const newTableTaxInstaId = nextTableTaxInstaId;
        const newRow = { id: newTableTaxInstaId, data: {} };
        setTableTaxInstaData([...tableTaxInstaData, newRow]);
        setNextTableTaxInstaId(newTableTaxInstaId + 1);
    };

    const handleDeleteLastTaxInstaRow = () => {
        if (tableTaxInstaData.length > 0) {
            const updatedRows = tableTaxInstaData.slice(0, -1); // Remove the last row
            setTableTaxInstaData(updatedRows);
        }
    };


    {/*const handleAddTable = (e) => {
    e.preventDefault();
    const newTableId = tablesData.length + 1;
    setTablesData([...tablesData, { id: newTableId, data: {} }]);
};*/}

    // the below code is for save and clear for the first table data

    const onInputChange = (e) => {

        setUser({ ...user, [e.target.name]: e.target.value })


    };

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('userData'));
        if (savedUser) {
            setUser(savedUser);
        }

        const storedTablesData = JSON.parse(localStorage.getItem('tablesData')) || [];
        if (storedTablesData.length > 0) {
            setTablesData(storedTablesData);
        }

        const storedTablesData2 = JSON.parse(localStorage.getItem('tablesData2')) || [];
        if (storedTablesData2.length > 0) {
            setTablesData2(storedTablesData2);
            setNextTableId2(storedTablesData2[storedTablesData2.length - 1].id + 1);
        }

        // const savedTableRowsData = JSON.parse(localStorage.getItem('tableRowsData'));
        // if (savedTableRowsData) {
        //     setTableRowsData(savedTableRowsData);
        // }
        const tempTableRowsData = localStorage.getItem('tempTableRowsData');
        if (tempTableRowsData) {
            setTableRowsData(JSON.parse(tempTableRowsData));
        }
    },
        []);



    const onSave = () => {
        // Check if any field is empty
        const isAnyFieldEmpty = Object.values(user).some(value => value === '');

        if (isAnyFieldEmpty) {
            alert("Please fill in all fields before saving!");
        } else {
            // Save data to local storage temporarily
            localStorage.setItem('tempUserData', JSON.stringify(user));
            alert("Data saved temporarily!");
        }
    };

    const clearLocalStorage = () => {
        // Check if any field is filled
        const isAnyFieldFilled = Object.values(user).some(value => value !== '');

        if (isAnyFieldFilled) {
            // Clear local storage
            localStorage.removeItem('tempUserData');
            // Clear user state
            setUser({
                orderNumber: '',
                referenceNumber: '',
                searchDate: '',
                effectiveDate: '',
                propertyAddress: '',
                state: '',
                county: '',
                borrowerName: '',
                parcelNumber: '',
                subdivision: '',
                lotUnit: '',
                block: '',
                propertyType: ''
            });
            alert("Local storage cleared!");
        } else {
            alert("There is no data to clear!");
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const tempUserData = JSON.parse(localStorage.getItem('tempUserData'));

        if (tempUserData) {
            // Perform HTTP request to save data permanently to the database
            axios.post('/api/saveFormData', tempUserData)
                .then(response => {
                    console.log("Data saved successfully!", response.data);
                    // Clear local storage after saving data to the database
                    clearLocalStorage();
                    alert("Data saved successfully to the database!");
                })
                .catch(error => {
                    console.error("Error saving data:", error);
                    alert("An error occurred while saving data. Please try again.");
                });
        } else {
            alert("No data to submit!");
        }
        localStorage.removeItem('tableRowsData');
    };



    // the below code is for save and clear for the second table table data

    const handleSaveTable = (tableId) => {
        const tableData = tablesData.find(table => table.id === tableId);

        // Check if all required fields are filled
        const requiredFields = ['deedType', 'considerationAmount', 'grantor', 'grantee', 'vesting', 'instaBookPage', 'datedDate', 'recordedDate'];
        const isAnyFieldEmpty = requiredFields.some(field => !tableData[field]); // Updated condition to check for empty fields

        if (isAnyFieldEmpty) {
            alert("Please fill in all required fields before saving!");
        } else {
            localStorage.setItem(`tableData${tableId}`, JSON.stringify(tableData));
            alert(`Data for ${tableData.name} saved temporarily!`);
        }
    };

    const handleClearTable = (tableId) => {
        const tableData = tablesData.find(table => table.id === tableId);

        // Check if any field other than 'id' and 'name' contains data
        const isDataPresent = Object.keys(tableData).some(key => key !== 'id' && key !== 'name' && tableData[key] !== '' && tableData[key] !== null);

        if (isDataPresent) {
            const clearedData = Object.keys(tableData).reduce((acc, key) => {
                if (key !== 'id' && key !== 'name') {
                    acc[key] = '';
                } else {
                    acc[key] = tableData[key];
                }
                return acc;
            }, {});

            const updatedTablesData = tablesData.map(table =>
                table.id === tableId ? clearedData : table
            );
            setTablesData(updatedTablesData);
            localStorage.removeItem(`tableData${tableId}`);
            alert(`Data for ${tableData.name} cleared!`);
        } else {
            alert(`There is no data to clear for ${tableData.name}.`);
        }
    };

    // const handleSave2 = () => {
    //     // Check if all fields in all tables are filled
    //     const isAnyFieldEmpty = tablesData2.some(table => 
    //         ['mortgagor', 'mortgagee', 'instrBookPage', 'amount', 'datedDate', 'recordedDate'].some(field => !table[field])
    //     );

    //     if (isAnyFieldEmpty) {
    //         alert("Please fill in all fields before saving!");
    //     } else {
    //         // Save data to local storage temporarily
    //         localStorage.setItem('tempTablesData2', JSON.stringify(tablesData2));
    //         alert("Data saved temporarily!");
    //     }
    // };

    // const handleClear2 = () => {
    //     // Check if any table contains data
    //     const isDataPresent = tablesData2.some(table =>
    //         Object.values(table).some(value => value)
    //     );

    //     if (isDataPresent) {
    //         // Clear data inside the tables without removing the tables themselves
    //         const clearedData = tablesData2.map(table => ({
    //             ...table,
    //             mortgagor: '',
    //             mortgagee: '',
    //             trustee: '',
    //             instrBookPage: '',
    //             amount: '',
    //             datedDate: '',
    //             recordedDate: '',
    //             maturityDate: '',
    //             mortgageAssignedTo: '',
    //             assignmentBkPg: '',
    //             assignmentDated: '',
    //             assignmentRecorded: '',
    //             comments: ''
    //         }));
    //         setTablesData2(clearedData);
    //         localStorage.removeItem('tempTablesData2');
    //         alert('Table data cleared!');
    //     } else {
    //         alert('There is no data to clear.');
    //     }
    // };

    //save and clear for the third table

    const handleSaveTable1 = (tableId) => {
        const tableIndex = tablesData2.findIndex(table => table.id === tableId);
        if (tableIndex === -1) return;

        const tableData = tablesData2[tableIndex];

        // Example check for required fields (adjust as per your table structure)
        const requiredFields = ['mortgagor', 'mortgagee', 'instrBookPage', 'amount', 'datedDate', 'recordedDate'];
        const isAnyFieldEmpty = requiredFields.some(field => !tableData[field]);

        if (isAnyFieldEmpty) {
            alert(`Please fill in all required fields for Table ${tableId} before saving!`);
        } else {
            // Save data to local storage or perform any other necessary actions
            localStorage.setItem(`tempTableData2${tableId}`, JSON.stringify(tableData));
            alert(`Data for Table ${tableId} saved temporarily!`);
        }
    };

    const handleClearTable1 = (tableId) => {
        const tableData = tablesData2.find(table => table.id === tableId);

        // Check if any field other than 'id' contains data
        const isDataPresent = Object.keys(tableData).some(key => key !== 'id' && tableData[key] !== '');

        if (isDataPresent) {
            const clearedData = {
                ...tableData,
                mortgagor: '',
                mortgagee: '',
                trustee: '',
                instrBookPage: '',
                amount: '',
                datedDate: '',
                recordedDate: '',
                maturityDate: '',
                mortgageAssignedTo: '',
                assignmentBkPg: '',
                assignmentDated: '',
                assignmentRecorded: '',
                comments: ''
            };

            const updatedTablesData = tablesData2.map(table =>
                table.id === tableId ? clearedData : table
            );
            setTablesData2(updatedTablesData);
            localStorage.removeItem(`tableData${tableId}`);
            alert(`Data for Table ${tableId} cleared!`);
        } else {
            alert(`There is no data to clear for Table ${tableId}.`);
        }
    };


    //save and clear for activejudgements and lines
    const handleSaveTemporarilyRow = () => {
        // Check if any field in any row is empty
        const isAnyFieldEmpty = tableRowsData.some(row =>
            Object.values(row.data).some(value => value === '')
        );

        if (isAnyFieldEmpty) {
            alert("Please fill in all fields before saving!");
        } else {
            // Ensure no empty rows are saved
            const filteredRowsData = tableRowsData.filter(row =>
                Object.values(row.data).some(value => value !== '')
            );

            if (filteredRowsData.length === 0) {
                alert("There is no data to save. Please fill in the fields.");
            } else {
                // Save filtered data to temporary storage
                localStorage.setItem('tempTableRowsData', JSON.stringify(filteredRowsData));
                alert("Table data saved temporarily!");
            }
        }
    };


    const handleClearRows = () => {
        if (tableRowsData.length === 0 || tableRowsData.every(row => Object.values(row.data).every(value => value === ''))) {
            alert("There is no data to clear.");
        } else {
            // Clear table data
            setTableRowsData([]);
            // Clear data from local storage
            localStorage.removeItem('tempTableRowsData');
            alert("Table data cleared!");
        }
    };

    //save and clear function for taxinfo
    const handleSaveTemporarilyTaxInstaRow = () => {
        // Check if any field in any row is empty
        const isAnyFieldEmpty = tableTaxInstaData.some(row =>
            Object.values(row.data).some(value => value === '')
        );

        if (isAnyFieldEmpty) {
            alert("Please fill in all fields before saving!");
        } else {
            // Ensure no empty rows are saved
            const filteredRowsData = tableTaxInstaData.filter(row =>
                Object.values(row.data).some(value => value !== '')
            );

            if (filteredRowsData.length === 0) {
                alert("There is no data to save. Please fill in the fields.");
            } else {
                // Save filtered data to temporary storage
                localStorage.setItem('tempTaxInstaData', JSON.stringify(filteredRowsData));
                alert("Table data saved temporarily!");
            }
        }
    };
    const handleClearTaxInstaRows = () => {
        if (tableTaxInstaData.length === 0 || tableTaxInstaData.every(row => Object.values(row.data).every(value => value === ''))) {
            alert("There is no data to clear.");
        } else {
            // Clear table data
            setTableTaxInstaData([]);
            // Clear data from local storage
            localStorage.removeItem('tempTaxInstaData');
            alert("Table data cleared!");
        }
    };
    //save and clear for namesand run

    const handleSaveTemporarilyNameRunRow = () => {
        const isAnyFieldEmpty = nameRunData.some(row =>
            Object.values(row.data).some(value => value === '')
        );

        if (isAnyFieldEmpty) {
            alert("Please fill in all fields before saving!");
        } else {
            const filteredRowsData = nameRunData.filter(row =>
                Object.values(row.data).some(value => value !== '')
            );

            if (filteredRowsData.length === 0) {
                alert("There is no data to save. Please fill in the fields.");
            } else {
                localStorage.setItem('tempNameRunData', JSON.stringify(filteredRowsData));
                alert("Table data saved temporarily!");
            }
        }
    };

    const handleClearNameRunRows = () => {
        if (nameRunData.length === 0 || nameRunData.every(row => Object.values(row.data).every(value => value === ''))) {
            alert("There is no data to clear.");
        } else {
            setNameRunData([]);
            localStorage.removeItem('tempNameRunData');
            alert("Table data cleared!");
        }
    };

    const [tablesDataD, setTablesDataD] = useState([
        { id: 1, name: 'Table 1' },
        { id: 2, name: 'Table 2' },
        { id: 3, name: 'Table 3' }
    ]);

    const handleInputChangeD = (e, tableId) => {
        // Handle input change here
    };

    const handleDeleteTableD = (tableId) => {
        setTablesDataD(tablesDataD.filter(table => table.id !== tableId));
    };

    const onSubmit = async (e) => {

        e.preventDefault();
        try {
            const token = localStorage.getItem('token');

            const payload = {
                propertyinfo: {
                    orderNumber: orderNumber,
                    referenceNumber: referenceNumber,
                    searchDate: searchDate,
                    effectiveDate: effectiveDate,
                    propertyAddress: propertyAddress,
                    state: state,
                    county: county,
                    borrowerName: borrowerName,
                    parcelNumber: parcelNumber,
                    subdivision: subdivision,
                    lotUnit: lotUnit,
                    block: block,
                    propertyType: propertyType,

                    vestingdeedinfo: tablesData.map(table => ({ ...table.data })),
                    absopenmortgagedeedinfo: tablesData2.map(table => ({ ...table.data })),
                    absActiveJudgementsAndLines: tableRowsData.map(table => ({ ...table.data })),

                    assessementsAndTaxInfo: [
                        {

                            taxYear: taxYear,
                            landValue: landValue,
                            buildingValue: buildingValue,
                            extraValue: extraValue,
                            totalValue: totalValue,
                            comments: comments

                        }
                    ],
                    namesrun: nameRunData.map(row => ({ ...row.data })),
                    taxinstallments: tableTaxInstaData.map(row => ({ ...row.data })),
                }
            };
            await axios.post("http://localhost:8080/insert", payload, {

                headers: {
                    'Authorization': `Bearer ${token}`
                }

            });
            window.alert("Data Sent Sucessfully");


        } catch (error) {
            console.error("Registration failed:", error);
            // Handle error if registration fails
        }


    };

    return (
        <div className='abstractform-container'>
            <form onSubmit={(e) => onSubmit(e)}>

                <table className='Abstract-Report' style={{ border: '2px solid black', borderCollapse: 'collapse' }} >
                    <tr>
                        <th><h2> DISCOVER ABSTRACT REPORT</h2></th>
                    </tr>
                    {/* Table-----------------------------------------------------------------1*/}
                </table>
                {/* --------------------------------------------------------------Table 1-----------------------------------------------*/}
                <div>

                    <br />
                    <center>
                        <table className='abstractform-table' style={{ border: '2px solid black', borderCollapse: 'collapse' }}>
                            <tr>
                                <th className="header-table" colSpan={8}>PROPERTY INFO </th>
                            </tr>

                            <tr>
                                <th style={{ border: '1px solid black' }}>ORDER NUMBER :</th>
                                <td colSpan={4} style={{ border: '1px solid black' }}>
                                    <input type="text" placeholder="Enter order Number" className="abstract-control" name="orderNumber" value={user.orderNumber} onChange={(e) => onInputChange(e)} style={{ width: '100%' }} />

                                </td>
                                <th style={{ border: '1px solid black' }}>REFERENCE NUMBER :</th>
                                <td colSpan={'100%'} style={{ border: '1px solid black' }}>
                                    <input type="text" placeholder='Enter Reference Number' className="abstract-control" name='referenceNumber' value={user.referenceNumber} onChange={(e) => onInputChange(e)} style={{ width: '100%' }} />
                                </td>
                            </tr>

                            <tr>
                                <th style={{ border: '1px solid black' }}>SEARCH DATE :</th>
                                <td colSpan={'2'} style={{ border: '1px solid black' }}>
                                    <input type="Date" className="abstract-control" placeholder="Enter Serch Data" name="searchDate" value={user.searchDate} onChange={(e) => onInputChange(e)} style={{ width: '100%' }} />
                                </td>

                                <th style={{ border: '1px solid black' }}>As Of</th>
                                <td >7:30 Am</td>

                                <th style={{ border: '1px solid black' }}>EFFECTIVE DATE :</th>
                                <td colSpan={2} style={{ border: '1px solid black' }}>
                                    <input type="Date" className="abstract-control" placeholder="Enter Effective Data " name="effectiveDate" value={user.effectiveDate} onChange={(e) => onInputChange(e)} style={{ width: '100%' }} />
                                </td>
                            </tr>

                            <tr>

                                <th style={{ border: '1px solid black' }}>PROPERTY ADDRESS :</th>
                                <td colSpan={6} style={{ border: '1px solid black' }}>
                                    <input type="text" className="abstract-control" placeholder="Enter Address " name="propertyAddress" value={user.propertyAddress} onChange={(e) => onInputChange(e)} style={{ width: '100%' }} />
                                </td>

                            </tr>

                            <tr>
                                <th style={{ border: '1px solid black' }}> STATE : </th>
                                <td colSpan={'4'} style={{ border: '1px solid black' }}>
                                    <input type="text" className="abstract-control" name="state" placeholder='Enter State' value={user.state} onChange={(e) => onInputChange(e)} style={{ width: '100%' }} />
                                </td>

                                <th style={{ border: '1px solid black' }}> COUNTY :</th>
                                <td colSpan={2} style={{ border: '1px solid black' }}>
                                    <input type="text" className="abstract-control" placeholder="Enter Country" name="county" value={user.county} onChange={(e) => onInputChange(e)} style={{ width: '100%' }} />
                                </td>
                            </tr>

                            <tr>
                                <th style={{ border: '1px solid black' }}>BORROWER NAME :</th>
                                <td colSpan={6} style={{ border: '1px solid black' }}>
                                    <input type="text" className="abstract-control" placeholder="Enter Notes" name="borrowerName" value={user.borrowerName} style={{ width: '100%' }} onChange={(e) => onInputChange(e)} />
                                </td>

                            </tr>
                            <tr>
                                <th style={{ border: '1px solid black' }}> PARCEL NUMBER :</th>
                                <td colSpan={'4'} style={{ border: '1px solid black' }}>
                                    <input type="text" className="abstract-control" placeholder='Enter Parcel Number' name="parcelNumber" value={user.parcelNumber} onChange={(e) => onInputChange(e)} style={{ width: '100%' }} />
                                </td>

                                <th style={{ border: '1px solid black' }}> SUBDIVISION : </th>
                                <td colSpan={2} style={{ border: '1px solid black' }}>
                                    <input type="text" className="abstract-control" placeholder="Enter Sub Division" name="subdivision" value={user.subdivision} onChange={(e) => onInputChange(e)} style={{ width: '100%' }} />
                                </td>
                            </tr>

                            <tr>
                                <th style={{ border: '1px solid black' }}> Lot/Unit </th>
                                <td colSpan={'4'} style={{ border: '1px solid black' }}>
                                    <input type="text" className="abstract-control" placeholder='Enter Unit' name="lotUnit" value={user.lotUnit} onChange={(e) => onInputChange(e)} style={{ width: '100%' }} />
                                </td>
                                <th style={{ border: '1px solid black' }}>BLOCK:</th>
                                <td colSpan={2} style={{ border: '1px solid black' }}>
                                    <input type="text" className="abstract-control" placeholder="Enter Block" name="block" value={user.block} onChange={(e) => onInputChange(e)} style={{ width: '100%' }} />
                                </td>
                            </tr>

                            <tr>
                                <th style={{ border: '1px solid black' }}>PROPERTY TYPE:</th>
                                <td colSpan={'8'} style={{ border: '1px solid black' }}>
                                    <input type="text" className="abstract-control" placeholder='Enter SFR/PUD/CONDO' name="propertyType" value={user.propertyType} onChange={(e) => onInputChange(e)} style={{ width: '100%' }} />
                                </td>
                                <td colSpan={'1'} style={{ border: '1px solid black' }}></td>
                                <td colSpan={'1'} style={{ border: '1px solid black' }}></td>

                            </tr>

                        </table>
                    </center>
                    <br />
                    {/* <button type="button" onClick={onSave}>Save</button>
                    <br />
                    <br />
                    <button type="button" onClick={clearLocalStorage}>Clear</button> */}
                    <Button className='das-report-general-info-saave-button' label="Save&nbsp;" icon="pi pi-check" onClick={onSave} />
                    <Button className='das-report-general-info-clear-button ' label="Clear&nbsp;" icon="pi pi-times" onClick={clearLocalStorage} />
                </div>

                {/* --------------------------------------------------------------Table 2-----------------------------------------------*/}

                <div>
                    {tablesData.map((table, index) => (
                        <div key={table.id}>
                            <br />
                            <center>
                                <table className='abstractform-table' style={{ border: '2px solid black', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr>
                                            <th className='header-table' colSpan="7">{table.name}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th style={{ border: '1px solid black' }}> DEED TYPE </th>
                                            <td colSpan={4} style={{ border: '1px solid black' }}>
                                                <input type="text" className="abstract-control" placeholder="Enter Deed Type" name="deedType" value={table.deedType || ''} onChange={(e) => handleInputChange(e, table.id)} style={{ width: '100%' }} required />
                                            </td>
                                            <th style={{ border: '1px solid black' }}> CONSIDERATION Amount : $ </th>
                                            <td colSpan={'100%'} style={{ border: '1px solid black' }}>
                                                <input type="text" className="dollar-input" placeholder="Enter Consideration Amount" name="considerationAmount" value={table.considerationAmount || ''} onChange={(e) => handleInputChange(e, table.id)} style={{ width: '100%' }} required />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th style={{ border: '1px solid black' }}> GRANTOR : </th>
                                            <td colSpan={'6'} style={{ border: '1px solid black' }}>
                                                <input type="text" className="abstract-control" placeholder="Enter Grantor" name="grantor" value={table.grantor || ''} onChange={(e) => handleInputChange(e, table.id)} style={{ width: '100%' }} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th style={{ border: '1px solid black' }}>GRANTEE : </th>
                                            <td colSpan={6} style={{ border: '1px solid black' }}>
                                                <input type="text" className="abstract-control" placeholder="Enter Grantee" name="grantee" value={table.grantee || ''} onChange={(e) => handleInputChange(e, table.id)} style={{ width: '100%' }} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th style={{ border: '1px solid black' }}> VESTING INFO :</th>
                                            <td colSpan={'4'} style={{ border: '1px solid black' }}>
                                                <input type="text" className="abstract-control" placeholder="Enter Vesting" name="vesting" value={table.vesting || ''} onChange={(e) => handleInputChange(e, table.id)} style={{ width: '100%' }} />
                                            </td>
                                            <th style={{ border: '1px solid black' }}>INSTR/BOOK/PAGE:</th>
                                            <td colSpan={2} style={{ border: '1px solid black' }}>
                                                <input type="text" className="abstract-control" placeholder="Enter INSTR/BOOK/PAGE" name="instaBookPage" value={table.instaBookPage || ''} onChange={(e) => handleInputChange(e, table.id)} style={{ width: '100%' }} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th style={{ border: '1px solid black' }}> DATED DATE: </th>
                                            <td colSpan={'4'} style={{ border: '1px solid black' }}>
                                                <input type="date" className="abstract-control" placeholder="Enter Date" name="datedDate" value={table.datedDate || ''} onChange={(e) => handleInputChange(e, table.id)} style={{ width: '100%' }} />
                                            </td>
                                            <th style={{ border: '1px solid black' }}>RECORDED DATE:</th>
                                            <td colSpan={2} style={{ border: '1px solid black' }}>
                                                <input type="date" className="abstract-control" placeholder="Enter RECORDED DATE" name="recordedDate" value={table.recordedDate || ''} onChange={(e) => handleInputChange(e, table.id)} style={{ width: '100%' }} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th style={{ border: '1px solid black' }}>COMMENTS :</th>
                                            <td colSpan={6} style={{ border: '1px solid black' }}>
                                                <input type="text" className="abstract-control" placeholder="Enter Notes" name="comments" value={table.comments || ''} onChange={(e) => handleInputChange(e, table.id)} style={{ width: '100%' }} />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </center>
                            <br />
                            {table.id > 1 && (
                                // <button className="btn-delete" onClick={() => handleDeleteTable(table.id)}>Delete Table</button>
                                <button className="Abstract-report-delete-button" onClick={() => handleDeleteTable(table.id)}>
                                    <i className="pi pi-trash" style={{ marginRight: '8px' }}></i> Table</button>
                            )} <button className="Abstract-report-add-button" onClick={handleAddTable}> <i className="pi pi-plus" style={{ marginRight: '8px' }}></i>Table</button>
                            <br />

                            {/* <button onClick={() => handleSaveTable(table.id)}>Save</button>
                            <br />
                            <button onClick={() => handleClearTable(table.id)}>Clear</button> */}
                            <Button className='das-report-general-info-saave-button' label="Save&nbsp;" icon="pi pi-check" onClick={() => handleSaveTable(table.id)} />
                            <Button className='das-report-general-info-clear-button' label="Clear&nbsp;" icon="pi pi-times" onClick={() => handleClearTable(table.id)} />
                        </div>
                    ))}
                    <br />
                    {/* <button className='btn-style' onClick={handleAddTable}>Add Table</button> */}

                    <br />
                    {/* <button className='btn-style' onClick={handleAddTable}>Add Table</button> */}
                    <br />

                    <br />

                    {/* <button onClick={() => handleSaveTable(table.id)}>Save {table.name}</button>
                    <br />
                    <br />
                   <button onClick={() => handleClearTable(table.id)}>Clear {table.name}</button> */}

                </div>
                <br />

                {/* --------------------------------------------------------------Table 3-----------------------------------------------*/}
                <div>
                    {tablesData2.map((table, index) => (
                        <div key={table.id} >
                            <br />
                            <center>
                                <center>
                                    <table className='abstractform-table' style={{ border: '2px solid black', borderCollapse: 'collapse' }}>
                                        <tr>
                                            <th className="header-table" colSpan="7">OPEN MORTGAGE / DEED OF TRUST  ({table.id}) </th>
                                        </tr>
                                        <tr>
                                            <th style={{ border: '1px solid black' }}> MORTGAGOR :</th>
                                            <td colSpan={6} style={{ border: '1px solid black' }}>
                                                <input type="text" className="abstract-control" placeholder="Enter  MORTGAGO" name="mortgagor" style={{ width: '100%' }} onChange={(e) => handleInputChange2(e, table.id)} required />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th style={{ border: '1px solid black' }}> MORTGAGEE :</th>
                                            <td colSpan={'6'} style={{ border: '1px solid black' }}>
                                                <input type="text" className="abstract-control" name="mortgagee" placeholder='Enter MORTGAGEE' style={{ width: '100%' }} onChange={(e) => handleInputChange2(e, table.id)} required />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th style={{ border: '1px solid black' }}> TRUSTEE :</th>
                                            <td colSpan={6} style={{ border: '1px solid black' }}>
                                                <input type="text" className="abstract-control" placeholder="Enter TRUSTEE" name="trustee" style={{ width: '100%' }} onChange={(e) => handleInputChange2(e, table.id)} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th style={{ border: '1px solid black' }}> INSTRUMENT/BOOK/PAGE :</th>
                                            <td colSpan={'4'} style={{ border: '1px solid black' }}>
                                                <input type="text" className="abstract-control" name="instrBookPage" placeholder='Enter INSTRUMENT/BOOK/PAGE:' style={{ width: '100%' }} onChange={(e) => handleInputChange2(e, table.id)} />
                                            </td>
                                            <th style={{ border: '1px solid black' }}>Amount [$]:</th>
                                            <td colSpan={2} style={{ border: '1px solid black' }}>
                                                <input type="Number" className="abstract-control" placeholder="$ Enter Amount" name="amount" style={{ width: '100%' }} onChange={(e) => handleInputChange2(e, table.id)} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th style={{ border: '1px solid black' }}> DATED DATE:</th>
                                            <td colSpan={'4'} style={{ border: '1px solid black' }}>
                                                <input type="Date" className="abstract-control" name="datedDate" placeholder='Enter DATED DATE:' style={{ width: '100%' }} onChange={(e) => handleInputChange2(e, table.id)} />
                                            </td>
                                            <th style={{ border: '1px solid black' }}>RECORDED DATE:</th>
                                            <td colSpan={2} style={{ border: '1px solid black' }}>
                                                <input type="Date" className="abstract-control" placeholder="Enter RECORDED DATE" name="recordedDate" style={{ width: '100%' }} onChange={(e) => handleInputChange2(e, table.id)} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={5}></td>
                                            <th style={{ border: '1px solid black' }}>MATURITY DATE :</th>
                                            <td colSpan={3} style={{ border: '1px solid black' }}>
                                                <input type="Date" className="abstract-control" placeholder="Enter Maturity Date" name="maturityDate" style={{ width: '100%' }} onChange={(e) => handleInputChange2(e, table.id)} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th style={{ border: '1px solid black' }}> MORTGAGE ASSIGNED TO</th>
                                            <td colSpan={'6'} style={{ border: '1px solid black' }}>
                                                <input type="text" className="abstract-control" name="mortgageAssignedTo" placeholder='Enter MORTGAGE ASSIGNED TO' style={{ width: '100%' }} onChange={(e) => handleInputChange2(e, table.id)} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th style={{ border: '1px solid black' }}> ASSIGNMENT BK/PG :</th>
                                            <td colSpan={'4'} style={{ border: '1px solid black' }}>
                                                <input type="text" className="abstract-control" name="assignmentBkPg" placeholder='Enter ASSIGNMENT BK/PG :' style={{ width: '100%' }} onChange={(e) => handleInputChange2(e, table.id)} />
                                            </td>
                                            <th style={{ border: '1px solid black' }}>ASSIGNMENT DATED :</th>
                                            <td colSpan={2} style={{ border: '1px solid black' }}>
                                                <input type="Date" className="abstract-control" placeholder="Enter ASSIGNMENT DATED" name="assignmentDated" style={{ width: '100%' }} onChange={(e) => handleInputChange2(e, table.id)} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={5}></td>
                                            <th style={{ border: '1px solid black' }}>ASSIGNMENT RECORDED :</th>
                                            <td colSpan={3} style={{ border: '1px solid black' }}>
                                                <input type="Date" className="abstract-control" placeholder="Enter ASSIGNMENT RECORDED:" name="assignmentRecorded" style={{ width: '100%' }} onChange={(e) => handleInputChange2(e, table.id)} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th style={{ border: '1px solid black' }}>COMMENTS :</th>
                                            <td colSpan={6} style={{ border: '1px solid black' }}>
                                                <input type='text-area' className="abstract-control" placeholder="Enter COMMENTS" name="comments" style={{ width: '100%' }} onChange={(e) => handleInputChange2(e, table.id)} />
                                            </td>
                                        </tr>
                                    </table>
                                </center>
                            </center>
                            {table.id > 1 && (
                                // <button className="btn-delete" onClick={() => handleDeleteTable2(table.id)}>Delete Table</button>
                                <button className="Abstract-report-delete-button" onClick={() => handleDeleteTable2(table.id)}>
                                    <i className="pi pi-trash" style={{ marginRight: '8px' }}></i> Table</button> 
                            )} <button className="Abstract-report-add-button" onClick={handleAddTable2}> <i className="pi pi-plus" style={{ marginRight: '8px' }}></i>Table</button>
                            <br />
                            {/* <button className="btn-save" onClick={() => handleSaveTable1(table.id)}>Save</button>
                            <button className="btn-clear" onClick={() => handleClearTable1(table.id)}>Clear</button> */}
                            <Button className='das-report-general-info-saave-button' label="Save&nbsp;" icon="pi pi-check" onClick={() => handleSaveTable1(table.id)} />
                            <Button className='das-report-general-info-clear-button ' label="Clear&nbsp;" icon="pi pi-times" onClick={() => handleClearTable1(table.id)} />
                        </div>
                    ))}
                    <br />
                    {/* <button className="btn-add" onClick={handleAddTable2}>Add Table</button> */}
                    <br />
                    <br />
                </div>



                <br />


                <div>
                    <br />
                    <center>
                        {tableRowsData.length > 0 ? (
                            <table className='abstractform-table' style={{ border: '2px solid black', borderCollapse: 'collapse' }}>
                                {/* Table headers */}
                                <thead>
                                    <tr className='header-table'>
                                        <th colSpan={4}>ACTIVE JUDGMENTS AND LIENS</th>
                                    </tr>
                                    <tr className='th-color'>
                                        <th className='heading-table' style={{ border: '1px solid black' }}>CASE NUMBER</th>
                                        <th className='heading-table' style={{ border: '1px solid black' }}>DESCRIPTION</th>
                                        <th className='heading-table' style={{ border: '1px solid black' }}>DATE RECORDED</th>
                                        <th className='heading-table' style={{ border: '1px solid black' }}>AMOUNT</th>
                                    </tr>
                                </thead>
                                {/* Table body */}
                                <tbody>
                                    {tableRowsData.map((row) => (
                                        <tr key={row.id}>
                                            <td style={{ border: '1px solid black' }}>
                                                <input type="text" className="service-control" placeholder="Enter Case Number" name="caseType" value={row.data.caseType} onChange={e => handleChange(e, row.id)} style={{ width: '100%' }} />
                                            </td>
                                            <td style={{ border: '1px solid black' }}>
                                                <input type="text" className="service-control" placeholder="Enter Description" name="bkPgCaseNo" value={row.data.bkPgCaseNo} onChange={e => handleChange(e, row.id)} style={{ width: '100%' }} />
                                            </td>
                                            <td style={{ border: '1px solid black' }}>
                                                <input type="Date" className="service-control" placeholder="Enter Date" name="recordingDate" value={row.data.recordingDate} onChange={e => handleChange(e, row.id)} style={{ width: '100%' }} />
                                            </td>
                                            <td style={{ border: '1px solid black' }}>
                                                <input type="text" className="service-control" placeholder="Enter Amount" name="amount" value={row.data.amount} onChange={e => handleChange(e, row.id)} style={{ width: '100%' }} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>Table data is empty</p>
                        )}
                        <br />
                        {/* <button className='btn-style' onClick={handleAddRow}>Add</button> */}
                        <button className="Abstract-report-add-button-2" onClick={handleAddRow}> <i className="pi pi-plus" style={{ marginRight: '8px' }}></i>Table</button>
                        
                        {tableRowsData.length > 3 && (
                            // <button type="button" className='btn-style' onClick={handleDeleteLastRow}>Delete</button>
                            <button className="Abstract-report-delete-button-2" onClick={handleDeleteLastRow}>
                                    <i className="pi pi-trash" style={{ marginRight: '8px' }}></i> Table</button>
                        )}
                        <br />
                        {/* <button onClick={handleSaveTemporarilyRow}>Save</button>
                        <br />
                        <br />
                        <button onClick={handleClearRows}>Clear</button>
                        <br />
                        <br /> */}
                        <Button className='das-report-general-info-saave-button-2' label="Save&nbsp;" icon="pi pi-check" onClick={handleSaveTemporarilyRow} />
                        <Button className='das-report-general-info-clear-button-2' label="Clear&nbsp;" icon="pi pi-times" onClick={handleClearRows} />

                    </center>
                    <br />
                </div>



                <div>
                    <br />

                    <br />
                </div>
                <center>
                    <div>
                        <br />

                        <table className='abstractform-table' style={{ border: '2px solid black', borderCollapse: 'collapse' }} >
                            <thead>
                                <tr>
                                    <th className='header-table' colSpan="4">TAX INFORMATION</th>
                                </tr>
                                <tr className='th-color'>
                                    <th style={{ border: '1px solid black' }}>ASSESMENT YEAR</th>
                                    <th style={{ border: '1px solid black' }}>2023</th>
                                    <th style={{ border: '1px solid black' }}>TAX YEAR</th>
                                    <th style={{ border: '1px solid black' }}>2023</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan='1' style={{ border: '1px solid black' }} > LAND VALUE </td>
                                    <td colSpan='1' style={{ border: '1px solid black' }} >
                                        <input type="text" className="service-control" placeholder="Enter LandValue" name="landValue" style={{ width: '100%' }} />
                                    </td>
                                    <td colSpan='1' style={{ border: '1px solid black' }} > Building Value </td>
                                    <td colSpan='1' style={{ border: '1px solid black' }} >
                                        <input type="text" className="service-control" placeholder="Enter BuildingValue" name="buildingValue" style={{ width: '100%' }} />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan='1' style={{ border: '1px solid black' }} > TOTAL VALUE </td>
                                    <td colSpan='1' style={{ border: '1px solid black' }} >
                                        <input type="text" className="service-control" placeholder="Enter TotalValue" name="totalValue" style={{ width: '100%' }} />
                                    </td>
                                    <td colSpan='1' style={{ border: '1px solid black' }} > EXEMPTION </td>
                                    <td colSpan='1' style={{ border: '1px solid black' }} >
                                        <input type="text" className="service-control" placeholder="Enter extraValue" name="extraValue" style={{ width: '100%' }} />
                                    </td>
                                </tr>
                                <tr>
                                    <th className='heading-table' style={{ border: '1px solid black' }}>INSTALLMENT</th>
                                    <th className='heading-table' style={{ border: '1px solid black' }}>AMOUNT</th>
                                    <th className='heading-table' style={{ border: '1px solid black' }}>STATUS</th>
                                    <th className='heading-table' style={{ border: '1px solid black' }}>PAID/DUE DATE</th>
                                </tr>
                                {tableTaxInstaData.map((row, index) => (
                                    <tr key={row.id}>
                                        <td colSpan='1' style={{ border: '1px solid black' }}>
                                            {index + 1 === 1 ? `${index + 1}st Installment` : index + 1 === 2 ? `${index + 1}nd Installment` : index + 1 === 3 ? `${index + 1}rd Installment` : `${index + 1}th Installment`}
                                        </td>
                                        <td colSpan='1' style={{ border: '1px solid black' }} >
                                            <input type="text" className="service-control" name="amount" placeholder='Enter Amount' onChange={e => handleInputChangeTaxInsta(e, row.id)} style={{ width: '100%' }} />
                                        </td>
                                        <td colSpan='1' style={{ border: '1px solid black' }} >
                                            <input type="text" className="service-control" name="status" placeholder='Enter Status' onChange={e => handleInputChangeTaxInsta(e, row.id)} style={{ width: '100%' }} />
                                        </td>
                                        <td colSpan='1' style={{ border: '1px solid black' }} >
                                            <input type="date" className="service-control" name="paidDueDate" placeholder='Enter Date' onChange={e => handleInputChangeTaxInsta(e, row.id)} style={{ width: '100%' }} />
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <th style={{ border: '1px solid black' }}>Notes</th>
                                    <td colSpan={6} style={{ border: '1px solid black' }}>
                                        <input type='text' className="service-control" placeholder="Enter Notes" name="comments" style={{ width: '100%' }} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <br />

                        {tableTaxInstaData.length > 2 && (
                            // <button type="button" className='btn-style' onClick={handleDeleteLastTaxInstaRow}>Delete</button>
                            <button className="Abstract-report-delete-button-2" onClick={handleDeleteLastTaxInstaRow}>
                                    <i className="pi pi-trash" style={{ marginRight: '8px' }}></i> Table</button>
                        )}<button className="Abstract-report-add-button-2" onClick={handleAddTaxInstaRow}> <i className="pi pi-plus" style={{ marginRight: '8px' }}></i>Table</button>
                        {/* <button className='btn-style' onClick={handleAddTaxInstaRow}>Add</button> */}
                        <br />
                        {/* <button className='btn-style' onClick={handleSaveTemporarilyTaxInstaRow}>Save</button>
                            <br />
                            <button className='btn-style' onClick={handleClearTaxInstaRows}>Clear</button> */}
                        <Button className='das-report-general-info-saave-button-2' label="Save&nbsp;" icon="pi pi-check" onClick={handleSaveTemporarilyTaxInstaRow} />
                        <Button className='das-report-general-info-clear-button-2' label="Clear&nbsp;" icon="pi pi-times" onClick={handleClearTaxInstaRows} />

                    </div>
                    <br />
                </center>
                <br />
                <div>
                    <br />
                    <center>
                        <table className='abstractform-table' style={{ border: '2px solid black', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    <th className='header-table' colSpan={5}>Names Runs</th>
                                </tr>
                                <tr className='heading-table'>
                                    <th style={{ border: '1px solid black', width: '25%' }}>Names</th>
                                    <th style={{ border: '1px solid black' }}>JUD</th>
                                    <th style={{ border: '1px solid black' }}>Liens</th>
                                    <th style={{ border: '1px solid black' }}>UCC</th>
                                    <th style={{ border: '1px solid black' }}>Others</th>
                                </tr>
                            </thead>
                            <tbody>
                                {nameRunData.map((row) => (
                                    <tr key={row.id}>
                                        <td style={{ border: '1px solid black' }}>
                                            <input type="text" className="abstract-control" name="name" placeholder='Enter Name' onChange={e => handleChangeNameRun(e, row.id)} style={{ width: '100%' }} />
                                        </td>
                                        <td style={{ border: '1px solid black' }}>
                                            <input type="text" className="abstract-control" name="jud" placeholder='Enter JUD' onChange={e => handleChangeNameRun(e, row.id)} style={{ width: '100%' }} />
                                        </td>
                                        <td style={{ border: '1px solid black' }}>
                                            <input type="text" className="abstract-control" name="liens" placeholder='Enter LIENS' onChange={e => handleChangeNameRun(e, row.id)} style={{ width: '100%' }} />
                                        </td>
                                        <td style={{ border: '1px solid black' }}>
                                            <input type="text" className="abstract-control" name="ucc" placeholder='Enter UCC' onChange={e => handleChangeNameRun(e, row.id)} style={{ width: '100%' }} />
                                        </td>
                                        <td style={{ border: '1px solid black' }}>
                                            <input type="text" className="abstract-control" name="others" placeholder='Enter Others' onChange={e => handleChangeNameRun(e, row.id)} style={{ width: '100%' }} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <br />
                        {/* <button className='btn-style' onClick={handleAddNameRow}>Add</button> */}
                        <button className="Abstract-report-add-button-2" onClick={handleAddNameRow}> <i className="pi pi-plus" style={{ marginRight: '8px' }}></i>Table</button>
                        {nameRunData.length > 2 && (
                            // <button type="button" className='btn-style' onClick={handleDeleteLastNameRow}>Delete</button>
                            <button className="Abstract-report-delete-button-2" onClick={handleDeleteLastNameRow}>
                                    <i className="pi pi-trash" style={{ marginRight: '8px' }}></i> Table</button>
                        )}
                        <br />
                        {/* <button className='btn-style' onClick={handleSaveTemporarilyNameRunRow}>Save</button>
                        <br />
                        <button className='btn-style' onClick={handleClearNameRunRows}>Clear</button> */}

                        <Button className='das-report-general-info-saave-button-2' label="Save&nbsp;" icon="pi pi-check" onClick={handleSaveTemporarilyNameRunRow} />
                        <Button className='das-report-general-info-clear-button-2' label="Clear&nbsp;" icon="pi pi-times" onClick={handleClearNameRunRows} />

                    </center>
                </div>

                <div className='abstractreport-container-13'>
                    <br />
                    <center>
                        <table className='abstractform-table' style={{ border: '2px solid black', borderCollapse: 'collapse' }}>
                            <tr>
                                <th className="header-table" colSpan="5"> SHORT LEGAL DESCRIPTION </th>

                            </tr>

                            <tr>

                                <td colSpan={1} style={{ border: '1px solid black' }}>
                                    FOR COMPLETE LEGAL DESCRIPTION SEE ATTACHED VESTING DEED
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    PROPERTY ADDRESS:

                                </td>
                                <br />
                            </tr>

                        </table>
                    </center>
                </div>
                <br />
                <br />
                <br />
                <div className='abstractform-container-11'>
                    <center>
                        <table className='abstractform-table' style={{ border: '2px solid black', borderCollapse: 'collapse' }} >

                            <tr>
                                <th className='header-table' colSpan="5">DISCLAIMER</th>
                            </tr>

                            <tr>
                                <td colSpan='1' style={{ border: '1px solid black' }}>This title search report was performed in accordance with generally accepted standards. This report may not contain information
                                    affecting above real estate property that cannot be indexed due to different spelling of owner's name or incorrectly recorded
                                    parcel number or recorder clerk error. Taxes are informational purposes only, all information contained herein are obtained
                                    from Tax collectors office/website. Please do check for any additional levies and assessments before settlement. We makes no
                                    warranties, and assumes no liability whatsoever for the accuracy of the information contained herein beyond the exercise of
                                    such reasonable care.</td>
                            </tr>

                        </table>
                    </center>

                </div>


                <br />
                {/* <button type="Submit" className="btn btn-outline-primary">Submit</button> */}
                <button className="das-report-submit-button" type="Submit">
                    <i className="pi pi-check" style={{ marginRight: '8px' }}></i>Submit
                </button>
            </form>
        </div>
    )
}

export default DasReport
