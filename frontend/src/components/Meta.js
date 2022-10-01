import React from 'react'
import {Helmet} from 'react-helmet'

const Meta = ({title, description, keywords}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description}/>
            <meta name='keywords' content={keywords}/>
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Welcome to EasyShop',
    description: 'Find the best products, with the cheapest prices in the market!',
    keywords: 'Shop, Shopping, Electronics, Buy, Sell, Cheap Products, free delivery'

}

export default Meta
