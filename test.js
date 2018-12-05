

export function transfer_data_collection(data){

    let dataArray = [];
    let topHeader = [];
    let { reporting_period_publications, reporting_period } = data;

    reporting_period_publications = reporting_period_publications[0];

    reporting_period.map(rp => {

        reporting_period_publications.map(rpp => {

            const index = rp.monthly_usage.map(e => e.publication_identifier).indexOf(rpp);
            topHeader.push(rp.month_year);

            if(index == -1){

                if(dataArray.hasOwnProperty(rpp)){

                    dataArray[rpp][rp.month_year] = {
                        total_page_views: 0,
                        total_downloads: 0,
                        total_pdf: 0,
                        total_web: 0,
                        total_thumb: 0
                    }
                    
                }else{

                    dataArray[rpp] = {}
                    dataArray[rpp]['id'] = rpp
                    dataArray[rpp][rp.month_year] = {
                        total_page_views: 0,
                        total_downloads: 0,
                        total_pdf: 0,
                        total_web: 0,
                        total_thumb: 0
                    }

                }
            }else{

                const elem_pub = [rp.monthly_usage][index].publication_usage;

                if(dataArray.hasOwnProperty(rpp)){
                
                    dataArray[rpp][rp.month_year] = {
                        total_page_views: elem_pub.total_page_views,
                        total_downloads: elem_pub.total_downloads,
                        total_pdf: elem_pub.total_pdf,
                        total_web: elem_pub.total_web,
                        total_thumb: elem_pub.total_thumb
                    }
                
                }else{

                    dataArray[rpp] = {}
                    dataArray[rrp]['id'] = rpp
                    dataArray[rpp][rp.month_year] = {
                        total_page_views: elem_pub.total_page_views,
                        total_downloads: elem_pub.total_downloads,
                        total_pdf: elem_pub.total_pdf,
                        total_web: elem_pub.total_web,
                        total_thumb: elem_pub.total_thumb
                    }

                }

            }

        })


    })

    topHeader = _.uniqWith(topHeader, _.isEqual)

    return(
        dataArray,
        topHeader
    )


}