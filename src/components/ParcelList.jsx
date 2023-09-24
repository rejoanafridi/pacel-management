import React, { useState, useEffect } from 'react';
import { Input, Button, message, Table } from 'antd';

import axios from 'axios';
import AddParcelForm from './AddParcelForm';

const { Search } = Input;

const ParcelList = () => {
  const queryParams = new URLSearchParams(location.search);
  const [data, setData] = useState([]); // Parcel data

  const [searchText, setSearchText] = useState(
    queryParams.get('searchText') || '',
  );
  const [searchPhone, setSearchPhone] = useState(
    queryParams.get('recipientPhone') || '',
  );

  const [isAddParcelModalVisible, setIsAddParcelModalVisible] = useState(false);

  const showAddParcelModal = () => {
    setIsAddParcelModalVisible(true);
  };

  const handleCancel = () => {
    setIsAddParcelModalVisible(false);
  };

  // Function to fetch parcel data from the API
  const fetchData = async () => {
    try {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdkYzEyODAxMjA3YjBmYTE3MGUzYWEiLCJyb2xlIjp7Il9pZCI6IjY0NGI2MDA0MGYyM2NiMjlmYzg3ZDA0NiIsImFsaWFzIjoiTUVSQ0hBTlQiLCJwZXJtaXNzaW9uU3RyaW5nIjoiXHUwMDAxcCAgMDBcdTAwMDZcZjJHQFx1MDAwNlx1MDAwMFx1MDAwMFx1MDAwMlx1MDAwN1x1MDAwMFx1MDAwMUAiLCJfX3YiOjB9LCJwZXJtaXNzaW9uU3RyaW5nIjoiXHUwMDAxcCAgMDBcdTAwMDZcZjJHQFx1MDAwNlx1MDAwMFx1MDAwMFx1MDAwMlx1MDAwN1x1MDAwMFx1MDAwMUAiLCJpc1NlbGxlciI6dHJ1ZSwicGhvbmUiOiI4ODAxNjI3NTYxNTU2IiwiZnVsbE5hbWUiOiJOYWZpdWwgSXNsYW0iLCJlbWFpbCI6Im5pbmFkbmFmaXVsQGdtYWlsLmNvbSIsImlhdCI6MTY5NDAxOTEyNH0.FKPbxGaa7txaCSJH_AFYH4gHR7_8kfYtW71IwzInep8';
      const queryParams = new URLSearchParams();
      queryParams.append('recipientName', searchText);
      queryParams.append('recipientPhone', searchPhone);

      const response = await axios.get(
        `https://demo.zfcourier.xyz/api/v/1.0.0/parcels?${queryParams.toString()}`,
        {
          headers: {
            'x-auth-token': token, // Include the token in the Authorization header
          },
        },
      );
      if (response.status === 401) {
        console.error('Authorization failed: Token invalid or not provided');
      } else {
        setData(response.data.content); // Set the fetched data into the state
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Call the fetchData function when the component mounts
  useEffect(() => {
    fetchData();
  }, [searchText, searchPhone]); //

  // Handle search input changes
  const handleSearch = (value) => {
    const newSearchParams = new URLSearchParams();
    if (value) {
      newSearchParams.set('searchText', value);
    } else {
      newSearchParams.delete('searchText');
    }
    history.push({ search: newSearchParams.toString() });
  };

  const handleAddParcel = async (parcelData) => {
    console.log(parcelData);
    const createData = {
      recipientName: parcelData.recipientName,
      recipientPhone: parcelData.recipientPhone,
      merchantOrderId: 'test1',
      recipientCity: 'Rangpur',
      recipientArea: 'Uttara',
      recipientZone: 'Uttara',
      recipientAddress: 'Example address 2',
      amountToCollect: 450,
      stockPrice: 550,
      itemDescription: '2 gazet',
      itemQuantity: 2,
      itemWeight: 1,
      specialInstruction: 'Need to carry softly.',
    };
    try {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdkYzEyODAxMjA3YjBmYTE3MGUzYWEiLCJyb2xlIjp7Il9pZCI6IjY0NGI2MDA0MGYyM2NiMjlmYzg3ZDA0NiIsImFsaWFzIjoiTUVSQ0hBTlQiLCJwZXJtaXNzaW9uU3RyaW5nIjoiXHUwMDAxcCAgMDBcdTAwMDZcZjJHQFx1MDAwNlx1MDAwMFx1MDAwMFx1MDAwMlx1MDAwN1x1MDAwMFx1MDAwMUAiLCJfX3YiOjB9LCJwZXJtaXNzaW9uU3RyaW5nIjoiXHUwMDAxcCAgMDBcdTAwMDZcZjJHQFx1MDAwNlx1MDAwMFx1MDAwMFx1MDAwMlx1MDAwN1x1MDAwMFx1MDAwMUAiLCJpc1NlbGxlciI6dHJ1ZSwicGhvbmUiOiI4ODAxNjI3NTYxNTU2IiwiZnVsbE5hbWUiOiJOYWZpdWwgSXNsYW0iLCJlbWFpbCI6Im5pbmFkbmFmaXVsQGdtYWlsLmNvbSIsImlhdCI6MTY5NDAyMDYxNH0.HDMMBFMhc3cEkPHLnLhOTXwEFJ18GtRbXo_l69vvD_s'; // Replace with your actual token

      const response = await axios.post(
        'https://demo.zfcourier.xyz/api/v/1.0.0/parcels/create',
        createData,
        {
          headers: {
            'x-auth-token': token,
          },
        },
      );

      if (response.status === 200) {
        message.success('Parcel added successfully');
        setIsAddParcelModalVisible(false);
        fetchData(); // Refresh the parcel list
      } else {
        message.error('Failed to add parcel');
      }
    } catch (error) {
      console.error('Error adding parcel:', error);
      message.error('Failed to add parcel');
    }
  };

  const columns = [
    // Define your table columns here
    // Example:
    {
      title: 'Recipient Name',
      dataIndex: 'recipientName',
      key: 'recipientName',
    },
    {
      title: 'Recipient Phone',
      dataIndex: 'recipientPhone',
      key: 'recipientPhone',
    },
  ];
  return (
    <div>
      <div className='flex justify-center gap-4'>
        <Search
          placeholder='Search by recipient name'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onSearch={handleSearch}
          style={{ width: 300 }}
        />
        <Search
          placeholder='Search by Phone Number'
          value={searchPhone}
          onChange={(e) => setSearchPhone(e.target.value)}
          onSearch={handleSearch}
          style={{ width: 300 }}
        />

        <Button
          className='bg-blue-500'
          type='primary'
          onClick={showAddParcelModal}>
          Add Parcel
        </Button>
      </div>
      <AddParcelForm
        visible={isAddParcelModalVisible}
        onCancel={handleCancel}
        onAddParcel={handleAddParcel}
      />

      <Table
        className='mt-5'
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default ParcelList;
