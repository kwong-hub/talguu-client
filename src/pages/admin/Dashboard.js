import React from 'react';


import { Layout } from 'antd';


const Dashboard = (props) => {

    const { Header,  Sider, Content } = Layout;


    return (
        <div className="">
            <Layout>
                <Sider className="bg-blue-700 h-screen">
                    <div className="mt-10 py-10 text-white">
                        <h1 className="text-white">Dashboard</h1>
                        <h1 className="text-white">Users</h1>
                        <h1 className="text-white">Videos</h1>
                        <h1 className="text-white">Laughters</h1>

                    </div>
                </Sider>
                <Layout>
                    <Header className="bg-blue-700">
                        <div className="text-white">
                            <h1 className="text-black">Admin Panel</h1>
                        </div>
                    </Header>
                    <Content>
                        <div>
                            {
                                props.children
                            }
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}





export default Dashboard;