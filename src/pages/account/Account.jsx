import { Avatar } from "antd";
import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { userActions } from "../../_actions";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Header from "../../partials/header/Header";

const Account = (props) => {
  var history = useHistory();
  const logout = () => {
    props.logout();
    history.push("/login");
  };
  return (

    <div className="bg-gray-100">
      <Header className="transparent bg-opacity-20" ></Header>

      <section className="relative block w-full" style={{ height: "400px" }}>
        <div
          className="absolute bg-opacity-70 top-0 w-full h-full bg-center bg-cover bg-gray-500"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
          }}
        ></div>
        <span
          id="blackOverlay"
          className="w-full h-full left-0 top-0 bg-center bg-cover absolute bg-opacity-70 bg-blue-900"
        ></span>
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
          style={{ height: "70px", transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-gray-100 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </section>
      <section className="relative py-16 w-4/5  mx-auto bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-8">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    <Avatar
                      className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                      size={120}
                      icon={<UserOutlined />}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    <button
                      onClick={(e) => logout()}
                      className="bg-blue-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                    >
                      Log-out
                    </button>
                  </div>
                </div>

                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                        22
                      </span>
                      <span className="text-sm text-gray-500">Views</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                        10
                      </span>
                      <span className="text-sm text-gray-500">Videos</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                        89
                      </span>
                      <span className="text-sm text-gray-500">Live Stream</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal text-gray-800 mb-2">
                  Jenna Stones
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
                  Los Angeles, California
                </div>
                <div className="mb-2 text-gray-700 mt-10">
                  <i className="fas fa-briefcase mr-2 text-lg text-gray-500"></i>
                  Solution Manager - Creative Tim Officer
                </div>
                <div className="mb-2 text-gray-700">
                  <i className="fas fa-university mr-2 text-lg text-gray-500"></i>
                  University of Computer Science
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = (response) => ({ response });
const actionCreators = {
  logout: userActions.logout,
};
export default connect(mapStateToProps, actionCreators)(Account);
