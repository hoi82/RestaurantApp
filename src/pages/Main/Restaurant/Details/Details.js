import React, { useEffect } from 'react';

function Details({match}) {    
    useEffect(() => {

    }, []);
    return (
        <div>
            {match.params.id}
        </div>
    );
}

export default Details;