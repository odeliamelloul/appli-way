import React, { useState, useEffect } from "react"
import Card from "./Product/productCard/Card"
import Pagination from "./Pagination";
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from "../actions/productActions"
import Loader from "./Loader";
import { load } from "dotenv";
import categories from "../categories";

function Catalog(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const [display, setDisplay] = useState("none")

  let keyword = props.match.params.keyword
  if (categories.hasOwnProperty(keyword)) {
    keyword = categories[keyword];
  }
  const dispatch = useDispatch()
  const productsList = useSelector(state => state.productList)
  const { loading, error, products } = productsList


  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // let filteredProduct=localStorage.getItem("filteredProducts")?JSON.parse(localStorage.getItem("filteredProducts")): localStorage.setItem("filteredProducts",JSON.stringify(products))
  let currentProducts = products ? products.slice(indexOfFirstProduct, indexOfLastProduct) : [];


  useEffect(() => {
    dispatch(listProducts(keyword))
  }, [dispatch, keyword]
  )

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const displayChange = () => {
    display === "none" ? setDisplay("block") : setDisplay("none")
  }
  return (
    <>
      {loading ? <Loader /> : error ? <p>{error}</p> :

        <div className="Catalog">
          <div className="d-flex" >

            <div div className="container-Products" width="100%">
              {loading ? <Loader /> :
                products.length === 0 ? <p className="p-5" >לא נמצאו מוצרים תואמים לחיפושך</p> :
                  currentProducts.map((product) => <Card product={product} history={props.history} />
                  )
              }
            </div>
          </div>
          <Pagination
            currentPage={currentPage}
            productsPerPage={productsPerPage}
            totalProducts={products.length}
            paginate={paginate}
          />
        </div>
      }
    </>
  )
}
export default Catalog