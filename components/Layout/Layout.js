import Head from "next/head";
import React from 'react';

function Layout({ children }) {
    return (
        <div id="body">
            <Head>
                {/* Stylesheets */}
                <link rel="stylesheet" href="../../static/css/styles.chunk.css" />
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" />
                <title>Boo</title>
            </Head>
            {children}
        </div>
    );
}

export default Layout;