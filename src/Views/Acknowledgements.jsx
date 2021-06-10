import React from 'react'

export default function Acknowledgements() {
    const libraries = [
        {
            desc: "Frontend",
            name: "Reactjs",
            link: "https://reactjs.org/docs/getting-started.html"
        },
        {
            desc: "Routing",
            name: "react-router (v6)",
            link: "https://reactrouter.com/"
        },
        {
            desc: "Backend framework",
            name: "Express",
            link: "https://expressjs.com"
        },
        {
            desc: "Backend ODM",
            name: "Mongoose",
            link: "https://mongoosejs.com/"
        },
        {
            desc: "CSS Library",
            name: "Mint CSS",
            link: "https://mintui.netlify.app/"
        },
        {
            desc: "Toasts",
            name: "react-toastify",
            link: "https://www.npmjs.com/package/react-toastify"
        },
        {
            desc: "Skeleton loading states",
            name: "react-loading-skeleton",
            link: "https://www.npmjs.com/package/react-loading-skeleton"
        },
        {
            desc: "Video player",
            name: "react-player",
            link: "https://www.npmjs.com/package/react-player"
        },
        {
            desc: "Build tool",
            name: "Vite",
            link: "https://vitejs.dev/"
        },
        {
            desc: "Icons used in app",
            name: "React-icons",
            link: "https://www.npmjs.com/package/react-icons"
        },
        {
            desc: "App logo icon",
            name: "Game-Icons",
            link: "https://game-icons.net/1x1/lorc/moebius-star.html"
        },
        {
            desc: "Avatar Images",
            name: "Dicebear Api",
            link: "https://avatars.dicebear.com/"
        },
    ]

    return (
        <div className="lineHeightMd mb12">
            <h2 className="mb1 textMd md:textLg">Acknowledgements</h2>
            <p className="textGray4 mb4">These are the open source libraries & resources used to make Wisp.</p>

            <ul className="listNoStyle mb12">
                {
                    libraries.map(library => {
                        return(
                            <li key={library.link} className="mb1 pt2 pb2 ">
                                {library.desc} - 
                                <a href={library.link} target="_blank" rel="noopener noreferrer" className="textBlue5 hover:textBlue6 ml2">{library.name}</a>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
