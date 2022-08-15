
import {Table } from "antd";
import Home from "./Home";


const Users = () => {


    const columns = [
        {
            title: 'Full Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'User Type',
            dataIndex: 'userType',
            key: 'userType',
        },
        {
            title: 'Address',
            key: 'address',
            dataIndex: 'address'
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <div className="flex gap-2">
                    <button className="px-3 py-1 text-yellow-400 hover:text-blue-500 outline-gray ">Suspend</button>
                    <button className="px-3 py-1 text-red-800  hover:text-blue-500 outline-gray">Ban</button>
                </div>
            ),
        },
    ];


    const data = [
        {
            key: '1',
            name: 'Mark Jarry',
            phoneNumber: "+1 999 778 7787",
            userType:"Producer",
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            name: 'Jim Green',
            phoneNumber: "+1 999 778 7787",
            userType: "User",
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '3',
            name: 'Joe Black',
            phoneNumber: "+1 999 778 7787",
            userType: "Producer",
            address: 'New York No. 1 Lake Park',
        }
    ];

    return (
        <Home>
            <div className="p-5 m-4">
                <div className="flex flex-col items-start m-2">
                    <h2 className="text-xl text-gray-700 font-medium">
                    Users Content{' '}
                    </h2>
                    <p className="font-normal text-gray-500">
                    Analyze,Manage,Edit,Delete
                    </p>
                </div>
            
            <div className="mt-3">
                 <Table 
                    columns={columns} 
                    dataSource={data}
                    rowKey={(record) => record.id}
                />
            </div>
            </div>
        </Home>
    )
}



export default Users;