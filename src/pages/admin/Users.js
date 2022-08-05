
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
                    <button className="px-3 py-1 text-white bg-yellow-400 rounded-md">Suspend</button>
                    <button className="px-3 py-1 text-white bg-red-400 rounded-md">Ban</button>
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
            <div className="p-5">
                <Table 
                    columns={columns} 
                    dataSource={data}
                />
            </div>
        </Home>
    )
}



export default Users;