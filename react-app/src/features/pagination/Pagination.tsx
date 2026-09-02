import React, { useEffect, useState } from 'react';
import styles from './Pagination.module.css';

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string
}

const ProductCard = ({ product }: { product: Product }) => {
  return <div className={styles.productCard}>
    <img src={product.thumbnail} width={140} height={140} alt={product.title} />
    <span>{product.title}</span>
    {/* <span>{product.price}</span> */}
  </div>
}

const Pagination = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const totalPages = Math.ceil(products.length / pageSize);
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const displayStart = start + 1;
  const displayEnd = Math.min(end, products.length);

  const fetchData = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products?limit=500");
      const data: { products: Product[] } = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(event.target.value));
    setCurrentPage(1);
  }

  const handlePrev = () => {
    setCurrentPage(currPage => currPage - 1);
  }

  const handleNext = () => {
    setCurrentPage(currPage => currPage + 1);
  }

  const handlePageChange = (pageNum: number) => {
    setCurrentPage(pageNum);
  }

  const getPaginationItems = (currentPage: number, totalPages: number) => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }
    if (currentPage < 5) {
      return [1, 2, 3, 4, 5, '...', totalPages];
    }
    if (currentPage > totalPages - 4) {
      return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    }
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  }
  const paginationItem = getPaginationItems(currentPage, totalPages);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.app}>
      <h1>Pagination</h1>
      <div>
        <button disabled={currentPage === 1} onClick={handlePrev}>Prev</button>
        {/* {[...Array(totalPages).keys()].map(item =>
          <button
            key={item}
            style={{ background: item == currentPage ? "lightBlue" : "transparent" }}
            className={styles.paginationItem}
            onClick={() => handlePageChange(item)}>
            {item + 1}
          </button>)} */}
        {paginationItem.map((item, index) => {
          if (item === '...') {
            return <span key={`ellipsis-${index}`}>...</span>
          }
          return (
            <button
              key={item}
              style={{ background: item == currentPage ? "lightBlue" : "transparent" }}
              className={styles.paginationItem}
              onClick={() => handlePageChange(Number(item))}>
              {item}
            </button>
          );
        })}
        <button disabled={currentPage === totalPages} onClick={handleNext}>Next</button>
        <select value={pageSize} onChange={handlePageSizeChange} >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>
      <span>
        {displayStart}-{displayEnd} of {products.length}
      </span>
      <div className={styles.productContainer}>
        {
          products.length == 0
            ? <p>No data...</p>
            : products.slice(start, end).map((product) => <ProductCard product={product} key={product.id} />)
        }
      </div>
    </div>
  )
}

export default Pagination