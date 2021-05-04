import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { ShopContext } from '../context/shopContext'



const Home = () => {
  const { fetchAllProducts, products } = useContext(ShopContext)

  // useEffect same as componentDidMount
  useEffect(() => {
    fetchAllProducts()
  }, [fetchAllProducts])


  if (!products) return <div>Loading...</div>



  return (
    <div>
      {
        products.map(product => {
          return (
            <Link to={`/products/${product.handle}`} key={product.title}>{product.title}</Link>
          )
        })
      }
    </div>
  )
}

export default Home