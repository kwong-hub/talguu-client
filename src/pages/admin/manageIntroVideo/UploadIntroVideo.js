import { Button, Select } from 'antd'
import Dragger from 'antd/lib/upload/Dragger'
import React, { useState } from 'react'
import Home from '../Home'


import { RiArrowRightCircleLine } from 'react-icons/ri'
import { AiOutlineInbox } from 'react-icons/ai'


const UploadIntroVideo = () => {

    const [initialState, setInitialState] = useState({
        file: null,
        fileSelected: false,
        drag: false,
        upload: false,
        title: '',
        describe: '',
        files: {},
        progress: 0,
        active: '',
    });

    const [initialStateEmpty, setInitialStateEmpty] = useState({
        file: null,
        fileSelected: false,
        drag: false,
        upload: false,
        title: '',
        describe: '',
        files: {},
        progress: 0,
        active: '',
    })


    const [uploadProps, setUploadProps] = useState({

            accept: '.mp4, .flv, .mkv, .mpeg, .mov',
            name: 'file',
            multiple: false,
            action: '',
            showUploadList: true,
            customRequest: (data) => {
                return fileSelected(data.file)
       
        }
    })

    const submit = () => {
        console.log("submitting...")
    }

    const cancelUpload = () => {
        setInitialState(() => ({
            ...initialStateEmpty
        }))
    }

    const fileSelected = (file) => {
        setInitialState((prev) => ({
            ...prev,
            file,
            fileSelected: true
        }))
    }


    return (
        <Home>
            <div className="p-5">
                <div className="flex flex-col mb-16 mx-auto items-center justify-center w-1/2 h-fit rounded-xl shadow-xl bg-gray-100">
                    <div className="flex justify-around mx-4 ">
                        <p className="text-2xl text-gray-600 m-2">
                            Upload Intro video here
                        </p>
                    </div>

                    {!initialState.progress > 0 && initialState.active === '' && (
                        <div>
                            <form
                                onSubmit={submit}
                                className="flex flex-col w-full items-center text-md text-gray-500 bg-gray-100"
                            >
                                <div className="w-full p-2 ">
                                    {!initialState.fileSelected && (
                                        <Dragger
                                            className="max-w-lg mx-auto"
                                            {...uploadProps}
                                        >
                                            <p className="flex w-full justify-center ant-upload-drag-icon">
                                                <AiOutlineInbox className="text-4xl font-bold" />
                                            </p>
                                            <p className="ant-upload-text">
                                                Click or drag file to this area to upload
                                            </p>
                                            <p className="ant-upload-hint text-xs p-2">
                                                Be sure to upload only video files like .mp4 .flv .mkv
                                                .mpeg .mov...
                                            </p>
                                        </Dragger>
                                    )}
                                    {initialState.fileSelected && (
                                        <div className="mx-auto flex justify-center items-center border-2 border-gray-200 p-2 max-w-lg flex-wrap">
                                            {initialState.file.name}
                                            <div className="w-48 m-1">
                                                <Button onClick={cancelUpload} danger>
                                                    Select a new file
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-1 p-3 w-full  px-5">

                                    <label className="flex flex-col sm:flex-row items-baseline w-full">
                                        Title:
                                        <input
                                            className="border p-2 m-2 ml-14 w-full focus:outline-none focus:ring-1 focus:ring-green-400 focus:border-transparent focus:border-blue-500"
                                            type="text"
                                            value={initialState.title}
                                            onChange={(e) => {
                                                setInitialState((prev) => ({
                                                    ...prev,
                                                    title: e.target.value
                                                }))
                                            }}
                                        />
                                    </label>

                                    <label className="flex flex-col sm:flex-row items-baseline w-full">
                                        Description:
                                    </label>
                                    <textarea
                                        rows={3}
                                        className="border w-full p-1 m-4 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-400 focus:border-transparent focus:border-blue-500"
                                        type="text"
                                        value={initialState.describe}
                                        onChange={(e) => {
                                            setInitialState((prev) => ({
                                                ...prev,
                                                describe: e.target.value
                                            }))
                                        }}
                                    ></textarea>
                                </div>
                                <Button
                                    size={60}
                                    type="primary"
                                    shape="round"
                                    icon={<RiArrowRightCircleLine />}
                                    onClick={submit}
                                    className="w-32 mb-4 py-5 flex justify-center items-center text-md p-4 transform hover:scale-110 motion-reduce:transform-none"
                                >
                                    Next
                                </Button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </Home>
    )
}

export default UploadIntroVideo