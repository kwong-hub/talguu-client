import React, {useEffect} from 'react'

const RenderLaughterVideos = ({dataSource, goToDetail, handleScroll}) => {



  useEffect(() => {
    // getAllVideos()
    window.addEventListener('scroll', handleScroll)
    return () => {}
  }, [])



  return (
    <div className="px-1 relative">
      <div className="flex flex-wrap">
        {dataSource.map((data, index) => {
          return (
            <div
              className="p-1 flex flex-wrap md:w-1/3 w-1/2 h-44"
              key={index}
              onClick={() => goToDetail(data.id)}
            >
              {/* <img
                className="w-full h-full"
                src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR_BSXPlBjoBeJruSaCamv7kQuMNjoIIWX0CITXUVoapFCbRM9g"
                alt="Messi"
              /> */}
              <video className="block w-full h-full" controls>
                    <source src={data.gifPath} type="video/mp4" />
               </video>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RenderLaughterVideos