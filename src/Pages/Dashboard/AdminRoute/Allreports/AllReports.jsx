import React from 'react';

const AllReports = () => {

    const [reports, setReports] = React.useState([]);

    React.useEffect(() => {
        fetch('https://swap-hand-server-hasibul240.vercel.app/report')
            .then(res => res.json())
            .then(data => setReports(data))
    }, [])

    return (
        <div className='grid lg:grid-cols-3 ml-5 my-5 gap-5 md:grid-col2 sm:grid-cols-2 grid-cols-1'>
            {
                reports.map((report, index) => <div >
                    <div className="card card-compact bg-green-100 w-full shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">{report.problem}</h2>
                            <p>{report.complain}</p>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default AllReports;