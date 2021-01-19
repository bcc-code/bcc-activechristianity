import React from 'react'

const NotFound = () => (
    <main className="flex items-center flex-col p-8 text-ac-secondary ">
        <h1 className="text-gray-200 text-center" style={{ fontSize: "120px", textShadow: "-1px -1px 0 var(--secondary), 0 0 1px var(--secondary), 4px 4px 0 var(--secondary)" }}>
            404
            </h1>
        <h2 className="text-lg text-center py-6">Sorry, we could not find the page you where looking for</h2>
        <div className="flex items-center mx-auto">
            <a href="/" className="bg-gray-200 rounded hover:bg-primary hover:text-white m-4 px-8 py-2 uppercase active">Home</a>
            <a href="/topics" className="bg-gray-200 rounded hover:bg-primary hover:text-white m-4 px-8 py-2 uppercase">Topics</a>
        </div>
    </main>
)

export default NotFound